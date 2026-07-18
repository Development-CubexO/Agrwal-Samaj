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


def parse_sansthagat(doc, page_indices: list[int]) -> list[dict]:
    """Best-effort parse of SANSTHAGAT pages into person rows."""
    records: list[dict] = []
    lines: list[str] = []
    for i in page_indices:
        lines.extend(clean_lines(doc[i].get_text() or ""))

    # Heuristic: when we see NAME then ADDRESS then optional MOBILE,
    # and name looks like a person (not org ending in SAMITI/MANDAL etc.)
    org_hint = re.compile(r"(SAMITI|MANDAL|TRUST|SOCIETY|SANGH|SANSTHA)", re.I)
    i = 0
    seq = 0
    current_org_mno = ""
    while i < len(lines):
        line = lines[i]

        # org block often: org_sno, org_mno, optional phone, then members
        if SNO_RE.match(line) and i + 1 < len(lines) and re.match(r"^\d{1,6}$", lines[i + 1]):
            # could be org header or member sno+mno — ambiguous
            # if next next is phone-only or name
            current_org_mno = lines[i + 1]
            i += 2
            if i < len(lines) and is_phone(lines[i]):
                i += 1
            continue

        if is_name(line) and not org_hint.search(line):
            name = line
            i += 1
            addr_parts: list[str] = []
            phone = ""
            while i < len(lines):
                cur = lines[i]
                if is_phone(cur):
                    phone = re.sub(r"\s+", "", cur)
                    i += 1
                    break
                if SNO_RE.match(cur):
                    break
                if is_name(cur) and addr_parts:
                    break
                if org_hint.search(cur):
                    break
                addr_parts.append(cur)
                i += 1
            seq += 1
            records.append(
                {
                    "S.No.": seq,
                    "M.No.": str(current_org_mno),
                    "VARSHIK MEMBER NAME": name.upper(),
                    "ADDRESS": ", ".join(addr_parts).upper(),
                    "MOBILE": phone,
                    "TYPE": "SANSTHAGAT",
                }
            )
            continue

        if org_hint.search(line):
            # organization name line — skip as person
            i += 1
            continue

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
