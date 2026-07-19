"""Extract all voter records from SASKS VOTER LIST 2026.pdf into members.json"""

from __future__ import annotations

import json
import re
from pathlib import Path

import fitz

PDF = Path(r"c:\Users\admin\Downloads\SASKS VOTER LIST 2026.pdf")
OUT_JSON = Path(__file__).resolve().parents[1] / "public" / "data" / "members.json"
OUT_JS = Path(__file__).resolve().parents[1] / "src" / "data" / "members.js"

SKIP_RE = re.compile(
    r"^(S\.?\s*No\.?|M\.?\s*No\.?|ADDRESS|PHONE|MOBILE|SANRAKSHAK|SANKRAKSHAK|"
    r"AAJIVAN|VARSHIK|SANSTHA|SHRI AGRAWAL|VOTER LIST|Page\s+\d+|SANSTHAGAT|"
    r"MEMBER NAME|MOBILE1).*$",
    re.I,
)
PHONE_RE = re.compile(r"^[\d\s,/+\-()]{6,}$")
SNO_RE = re.compile(r"^\d{1,5}$")
MNO_NAME_RE = re.compile(r"^(\d{1,6})\s+([A-Za-z].+)$")


def detect_type(text: str) -> str | None:
    u = text.upper()
    if "SANSTHA" in u or "SANSTHAGAT" in u:
        return "SANSTHAGAT"
    if "SANRAKSHAK" in u or "SANKRAKSHAK" in u:
        return "SANRAKSHAK"
    if "AAJIVAN" in u:
        return "AAJIVAN"
    if "VARSHIK" in u:
        return "VARSHIK"
    return None


def is_skip(line: str) -> bool:
    return bool(SKIP_RE.match(line.strip()))


def is_phone(line: str) -> bool:
    s = line.strip()
    if not PHONE_RE.match(s):
        return False
    digits = re.sub(r"\D", "", s)
    return 6 <= len(digits) <= 24


def is_name(line: str) -> bool:
    s = line.strip()
    if not s or is_skip(s) or is_phone(s) or SNO_RE.match(s):
        return False
    # names are mostly letters / spaces / punctuation
    letters = sum(c.isalpha() for c in s)
    return letters >= 2 and not s.lower().startswith("page")


def clean_lines(text: str) -> list[str]:
    lines = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        if is_skip(line):
            continue
        lines.append(line)
    return lines


def parse_individual_pages(doc, page_indices: list[int], member_type: str) -> list[dict]:
    """Parse SANRAKSHAK / AAJIVAN / VARSHIK style pages."""
    records: list[dict] = []
    lines: list[str] = []
    for i in page_indices:
        lines.extend(clean_lines(doc[i].get_text() or ""))

    i = 0
    while i < len(lines):
        line = lines[i]

        # S.No.
        if not SNO_RE.match(line):
            i += 1
            continue
        sno = int(line)
        i += 1
        if i >= len(lines):
            break

        mno = ""
        name = ""
        nxt = lines[i]

        m = MNO_NAME_RE.match(nxt)
        if m:
            mno, name = m.group(1), m.group(2).strip()
            i += 1
        elif SNO_RE.match(nxt) or re.match(r"^\d{1,6}$", nxt):
            mno = nxt
            i += 1
            if i < len(lines) and is_name(lines[i]):
                name = lines[i]
                i += 1
        elif is_name(nxt):
            # missing M.No somehow
            name = nxt
            i += 1
        else:
            continue

        if not name:
            continue

        addr_parts: list[str] = []
        phones: list[str] = []

        while i < len(lines):
            cur = lines[i]
            # next record starts with S.No. followed by M.No/name pattern
            if SNO_RE.match(cur):
                # peek ahead - if looks like new record, stop
                if i + 1 < len(lines):
                    peek = lines[i + 1]
                    if (
                        MNO_NAME_RE.match(peek)
                        or re.match(r"^\d{1,6}$", peek)
                        or is_name(peek)
                    ):
                        # could be address line that's only digits? rare
                        # Prefer treating as new S.No when next looks like mno/name
                        if MNO_NAME_RE.match(peek) or re.match(r"^\d{1,6}$", peek):
                            break
                        # if next is name and we already have address, likely new record
                        if is_name(peek) and (addr_parts or phones):
                            break
            if is_phone(cur):
                phones.append(re.sub(r"\s+", "", cur))
                i += 1
                # optional second mobile on next line
                continue
            if is_name(cur) and not addr_parts and not phones:
                # accidental second name line — treat as address continuation unlikely
                # actually for multi-line address after name
                addr_parts.append(cur)
                i += 1
                continue
            if SNO_RE.match(cur) and addr_parts:
                break
            addr_parts.append(cur)
            i += 1

        address = ", ".join(addr_parts)
        # normalize double commas / spaces
        address = re.sub(r"\s+,", ",", address)
        address = re.sub(r",\s*,+", ", ", address)
        address = re.sub(r"\s{2,}", " ", address).strip(" ,")

        mobile = phones[0] if phones else ""
        if len(phones) > 1:
            # merge unique
            extra = [p for p in phones[1:] if p not in mobile]
            if extra:
                mobile = ", ".join([mobile] + extra) if mobile else ", ".join(extra)

        records.append(
            {
                "S.No.": sno,
                "M.No.": str(mno),
                "VARSHIK MEMBER NAME": name.upper(),
                "ADDRESS": address.upper() if address else "",
                "MOBILE": mobile,
                "TYPE": member_type,
            }
        )

    return records


def _iter_word_rows(page, y_tol: float = 2.0):
    """Cluster PDF words into visual rows by Y position."""
    words = page.get_text("words") or []
    words = sorted(words, key=lambda w: (w[1], w[0]))
    if not words:
        return
    cluster = [words[0]]
    cy = words[0][1]
    for w in words[1:]:
        if abs(w[1] - cy) <= y_tol:
            cluster.append(w)
        else:
            yield sorted(cluster, key=lambda t: t[0])
            cluster = [w]
            cy = w[1]
    if cluster:
        yield sorted(cluster, key=lambda t: t[0])


def _is_sanstha_header_footer(ws: list) -> bool:
    line = " ".join(w[4] for w in ws).upper()
    return (
        "SANSTHA MEMBER" in line
        or "VOTER LIST" in line
        or line.startswith("SHRI AGRAWAL SAMAJ")
        or "SANSTHAGAT PAGE" in line
        or line.startswith("S.NO.")
        or line.startswith("M.NO.")
    )


def _left_digits(ws: list) -> list[tuple[float, str]]:
    return [(w[0], w[4]) for w in ws if w[0] < 145 and w[4].isdigit()]


def _parse_member_fields(ws: list, sno_x: float) -> tuple[str, str, str]:
    after = [w for w in ws if w[0] > sno_x + 5]
    name_ws: list[str] = []
    addr_ws: list[str] = []
    phone = ""
    for w in after:
        tok = w[4]
        if w[0] >= 650 or (PHONE_RE.match(tok) and w[0] >= 600):
            phone = re.sub(r"\s+", "", tok)
            continue
        if w[0] < 310:
            name_ws.append(tok)
        else:
            addr_ws.append(tok)
    return " ".join(name_ws).strip(), " ".join(addr_ws).strip(), phone


def parse_sansthagat(doc, page_indices: list[int]) -> list[dict]:
    """Parse SANSTHAGAT pages using column X positions.

    PDF layout interleaves:
      - org rows (S.No ~x60, M.No ~x87, sanstha name) — skipped as voters
      - member rows (S.No ~x123, name, address, mobile)
    Members inherit the current organisation M.No.
    """
    records: list[dict] = []
    current_mno = ""
    pending: list[str] = []

    for pi in page_indices:
        rows = list(_iter_word_rows(doc[pi]))
        i = 0
        while i < len(rows):
            ws = rows[i]
            if _is_sanstha_header_footer(ws):
                i += 1
                continue

            ld = _left_digits(ws)
            org_nums = [(x, n) for x, n in ld if x < 110]
            mem_nums = [(x, n) for x, n in ld if 110 <= x <= 140]

            # Organisation header — update M.No., never emit as a member
            if org_nums and not mem_nums:
                if len(org_nums) >= 2:
                    current_mno = org_nums[1][1]
                else:
                    x, n = org_nums[0]
                    if x >= 70:
                        current_mno = n
                i += 1
                continue

            if mem_nums:
                sno = int(mem_nums[0][1])
                name_row, addr, phone = _parse_member_fields(ws, mem_nums[0][0])
                had_name_on_row = bool(name_row)
                name_parts = pending + ([name_row] if name_row else [])
                name = " ".join(name_parts).strip()
                pending = []

                j = i + 1
                while j < len(rows):
                    nws = rows[j]
                    if _is_sanstha_header_footer(nws) or _left_digits(nws):
                        break
                    n_name = [w[4] for w in nws if 145 <= w[0] < 310]
                    n_addr = [w[4] for w in nws if 310 <= w[0] < 650]
                    n_phone = [w[4] for w in nws if w[0] >= 650]
                    if not n_name and not n_addr and not n_phone:
                        break
                    # Name wrap only when the sno row itself had no name
                    if n_name and not had_name_on_row:
                        name = f"{name} {' '.join(n_name)}".strip()
                        j += 1
                        continue
                    if n_addr and not addr:
                        addr = f"{addr} {' '.join(n_addr)}".strip()
                        j += 1
                        continue
                    if n_phone and not phone:
                        phone = re.sub(r"\s+", "", n_phone[0])
                        j += 1
                        continue
                    break

                i = j
                records.append(
                    {
                        "S.No.": sno,
                        "M.No.": str(current_mno),
                        "VARSHIK MEMBER NAME": re.sub(r"\s{2,}", " ", name).upper(),
                        "ADDRESS": re.sub(r"\s{2,}", " ", addr).upper(),
                        "MOBILE": phone,
                        "TYPE": "SANSTHAGAT",
                    }
                )
                continue

            # Floating name fragment above the next member sno row
            frag = " ".join(w[4] for w in ws if 145 <= w[0] < 310).strip()
            addr_frag = " ".join(w[4] for w in ws if 310 <= w[0] < 650).strip()
            if frag and not addr_frag:
                pending.append(frag)
            i += 1

    return records


def main() -> None:
    doc = fitz.open(PDF)
    buckets: dict[str, list[int]] = {
        "SANRAKSHAK": [],
        "AAJIVAN": [],
        "VARSHIK": [],
        "SANSTHAGAT": [],
    }

    current = None
    for i in range(doc.page_count):
        text = doc[i].get_text() or ""
        detected = detect_type(text)
        if detected:
            current = detected
        if current and i >= 3:  # skip cover pages 1-3
            buckets[current].append(i)

    all_records: list[dict] = []
    for mtype in ("SANRAKSHAK", "AAJIVAN", "VARSHIK"):
        recs = parse_individual_pages(doc, buckets[mtype], mtype)
        print(f"{mtype}: {len(recs)} records from {len(buckets[mtype])} pages")
        all_records.extend(recs)

    sanstha = parse_sansthagat(doc, buckets["SANSTHAGAT"])
    print(f"SANSTHAGAT: {len(sanstha)} records from {len(buckets['SANSTHAGAT'])} pages")
    all_records.extend(sanstha)

    # Global sequential display number while keeping original S.No. per type in TYPE context
    # Keep original S.No. from PDF; add global index as display helper via array order.
    for idx, r in enumerate(all_records, start=1):
        r["ID"] = idx

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(all_records, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(all_records)} -> {OUT_JSON}")

    # Lightweight JS that loads JSON at runtime is preferred; write a small stub.
    OUT_JS.write_text(
        "/** Members loaded from /data/members.json (full SASKS voter list 2026) */\n"
        "export const members = []\n"
        "export const MEMBERS_URL = '/data/members.json'\n",
        encoding="utf-8",
    )
    print(f"Wrote stub {OUT_JS}")

    # sanity samples
    for t in ("SANRAKSHAK", "AAJIVAN", "VARSHIK", "SANSTHAGAT"):
        sample = next((r for r in all_records if r["TYPE"] == t), None)
        print("sample", t, sample)


if __name__ == "__main__":
    main()
