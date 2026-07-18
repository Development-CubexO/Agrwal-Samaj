# Agrawal Samaj Election

Single-page React + Tailwind election campaign website for Agrawal Samaj.

## Features

- Hindi / English language toggle (navbar)
- Royal maroon–gold theme on off-white
- Banner, about section, candidate profiles (modal with photo, about, mission)
- Searchable members directory (name, M.No., mobile, address)
- Fully responsive

## Run

```bash
npm install
npm run dev
```

## Data

- Candidates: `src/data/candidates.js`
- Members (full PDF extract): `public/data/members.json` (~8737 voters)
- Copy / translations: `src/data/translations.js`

Re-extract from the voter PDF:

```bash
pip install pymupdf
python scripts/extract_voters.py
```

Place candidate photos in `public/candidates/` (e.g. `bharat.jpg`). If a photo is missing, initials are shown as fallback.
