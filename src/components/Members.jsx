import { useEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Loader2,
  Search,
} from 'lucide-react'
import { MEMBERS_URL } from '../data/members'
import { translations } from '../data/translations'
import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'
import cubexoLogo from '../assets/cubexo.png'

const PAGE_SIZE = 50
const TYPES = ['ALL', 'SANRAKSHAK', 'AAJIVAN', 'VARSHIK', 'SANSTHAGAT']
const translationsEn = translations.en

const CUBEXO = {
  name: 'Cubexo Software Solutions',
  address: '2nd Floor, MR Business Park, Rani Bagh Main, Indore, Madhya Pradesh 452001',
  websiteLabel: 'www.cubexo.io',
  websiteUrl: 'https://www.cubexo.io',
  // cubexo.png is 200×46 — keep natural aspect ratio
  logoRatio: 200 / 46,
}

function cubexoLogoBox(heightMm) {
  return { w: heightMm * CUBEXO.logoRatio, h: heightMm }
}

async function imageToDataUrl(src) {
  const res = await fetch(src)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default function Members() {
  const { t, lang } = useLanguage()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [listOpen, setListOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(MEMBERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setMembers(Array.isArray(data) ? data : [])
          setError('')
        }
      })
      .catch(() => {
        if (!cancelled) setError(t.loadError)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [t.loadError])

  useEffect(() => {
    setPage(1)
  }, [query, typeFilter])

  useEffect(() => {
    setListOpen(Boolean(query.trim()))
  }, [query])

  const typeCounts = useMemo(() => {
    const counts = { SANRAKSHAK: 0, AAJIVAN: 0, VARSHIK: 0, SANSTHAGAT: 0 }
    for (const m of members) {
      if (counts[m.TYPE] !== undefined) counts[m.TYPE] += 1
    }
    return counts
  }, [members])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return members.filter((m) => {
      if (typeFilter !== 'ALL' && m.TYPE !== typeFilter) return false
      if (!q) return true
      const name = String(m['VARSHIK MEMBER NAME'] || '').toLowerCase()
      const mno = String(m['M.No.'] || '').toLowerCase()
      const mobile = String(m.MOBILE || '').toLowerCase()
      const address = String(m.ADDRESS || '').toLowerCase()
      const sno = String(m['S.No.'] || '')
      return (
        name.includes(q) ||
        mno.includes(q) ||
        mobile.includes(q) ||
        address.includes(q) ||
        sno.includes(q)
      )
    })
  }, [members, query, typeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const typeLabel = (key) => t.memberTypes?.[key] || key

  const canExport = Boolean(query.trim()) && filtered.length > 0 && !loading && !error

  const exportPdf = async () => {
    if (!canExport || exporting) return
    setExporting(true)
    try {
      const [{ jsPDF }, autoTableModule, logoDataUrl] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
        imageToDataUrl(cubexoLogo),
      ])
      const autoTable = autoTableModule.default
      const typeLabelEn = (key) => translationsEn.memberTypes?.[key] || key
      const year = new Date().getFullYear()

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()

      const subtitle = [
        `Search: "${query.trim()}"`,
        typeFilter !== 'ALL' ? `Type: ${typeLabelEn(typeFilter)}` : null,
        `Total: ${filtered.length}`,
      ]
        .filter(Boolean)
        .join('  |  ')

      const drawHeader = () => {
        const bandH = 28
        doc.setFillColor(255, 250, 242)
        doc.rect(0, 0, pageW, bandH, 'F')

        const { w: logoW, h: logoH } = cubexoLogoBox(10)
        const logoX = 14
        const logoY = (bandH - logoH) / 2
        doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH, undefined, 'FAST')
        doc.link(logoX, logoY, logoW, logoH, { url: CUBEXO.websiteUrl })

        const dividerX = logoX + logoW + 5
        doc.setDrawColor(201, 162, 39)
        doc.setLineWidth(0.35)
        doc.line(dividerX, 7, dividerX, bandH - 7)

        const textX = dividerX + 6
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(12)
        doc.setTextColor(31, 79, 122)
        doc.text(CUBEXO.name, textX, 11)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(90, 70, 70)
        doc.text(CUBEXO.address, textX, 16.5)

        doc.setFontSize(8)
        doc.setTextColor(26, 48, 216)
        doc.textWithLink(CUBEXO.websiteLabel, textX, 21.5, { url: CUBEXO.websiteUrl })

        doc.setDrawColor(201, 162, 39)
        doc.setLineWidth(0.5)
        doc.line(0, bandH, pageW, bandH)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(107, 29, 42)
        doc.text('Member Search Results', 14, 35)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(90, 90, 90)
        doc.text(subtitle, 14, 40)
      }

      const drawWatermark = () => {
        const { w: wmW, h: wmH } = cubexoLogoBox(28)
        const x = (pageW - wmW) / 2
        const y = (pageH - wmH) / 2
        doc.saveGraphicsState()
        doc.setGState(new doc.GState({ opacity: 0.07 }))
        doc.addImage(logoDataUrl, 'PNG', x, y, wmW, wmH, undefined, 'FAST')
        doc.restoreGraphicsState()
      }

      const drawFooter = () => {
        const pageNum = doc.internal.getNumberOfPages()
        const bandTop = pageH - 16

        doc.setFillColor(255, 250, 242)
        doc.rect(0, bandTop, pageW, 16, 'F')
        doc.setDrawColor(201, 162, 39)
        doc.setLineWidth(0.4)
        doc.line(0, bandTop, pageW, bandTop)

        const { w: footLogoW, h: footLogoH } = cubexoLogoBox(5)
        const footLogoY = bandTop + (16 - footLogoH) / 2
        doc.addImage(logoDataUrl, 'PNG', 14, footLogoY, footLogoW, footLogoH, undefined, 'FAST')
        doc.link(14, footLogoY, footLogoW, footLogoH, { url: CUBEXO.websiteUrl })

        const textY = bandTop + 9.5
        const textX = 14 + footLogoW + 4
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(100, 100, 100)
        const before = 'Designed & Developed by '
        const name = 'Prashant Soni'
        const mid = ' from '
        const company = 'Cubexo Software Solutions LLP'
        doc.text(before, textX, textY)
        let x = textX + doc.getTextWidth(before)
        doc.setTextColor(80, 80, 80)
        doc.setFont('helvetica', 'bold')
        doc.text(name, x, textY)
        x += doc.getTextWidth(name)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100, 100, 100)
        doc.text(mid, x, textY)
        x += doc.getTextWidth(mid)
        doc.setTextColor(26, 48, 216)
        doc.textWithLink(company, x, textY, { url: CUBEXO.websiteUrl })
        x += doc.getTextWidth(company)
        doc.setTextColor(100, 100, 100)
        doc.text(`  ·  © ${year}`, x, textY)

        doc.setFontSize(7)
        doc.setTextColor(26, 48, 216)
        const siteW = doc.getTextWidth(CUBEXO.websiteLabel)
        const pageLabel = `Page ${pageNum}`
        doc.setTextColor(120, 120, 120)
        const pageWdt = doc.getTextWidth(pageLabel)
        doc.text(pageLabel, pageW - 14, textY, { align: 'right' })
        doc.setTextColor(26, 48, 216)
        doc.textWithLink(CUBEXO.websiteLabel, pageW - 14 - pageWdt - 4 - siteW, textY, {
          url: CUBEXO.websiteUrl,
        })
      }

      autoTable(doc, {
        startY: 44,
        head: [['S.No.', 'M.No.', 'Type', 'Member Name', 'Address', 'Mobile']],
        body: filtered.map((m) => [
          m['S.No.'] ?? '',
          m['M.No.'] ?? '',
          typeLabelEn(m.TYPE),
          m['VARSHIK MEMBER NAME'] ?? '',
          m.ADDRESS ?? '',
          m.MOBILE ?? '',
        ]),
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [107, 29, 42],
          textColor: [255, 250, 240],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [252, 248, 240],
        },
        columnStyles: {
          0: { cellWidth: 16 },
          1: { cellWidth: 22 },
          2: { cellWidth: 28 },
          3: { cellWidth: 50 },
          4: { cellWidth: 'auto' },
          5: { cellWidth: 32 },
        },
        margin: { top: 44, left: 14, right: 14, bottom: 22 },
        willDrawPage: () => {
          drawHeader()
        },
        didDrawPage: () => {
          drawWatermark()
          drawFooter()
        },
      })

      const safeQuery = query
        .trim()
        .replace(/[^\w\-]+/g, '_')
        .slice(0, 40)
      doc.save(`members_${safeQuery || 'export'}.pdf`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <section id="members" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-center">
          <div className="gold-flourish mb-2">
            <span className="text-gold">✦</span>
          </div>
          <h2 className="section-heading">{t.membersTitle}</h2>
          <div className="gold-line-thick mx-auto mt-5 w-44" />
          <p className="mt-3 text-sm text-ink-muted sm:text-base">{t.membersSubtitle}</p>
        </div>

        <div className="palace-frame relative overflow-hidden rounded-3xl border border-gold/45 bg-linear-to-br from-maroon via-maroon to-maroon-deep shadow-[0_16px_40px_rgba(63,15,26,0.2)]">
          <PalaceCorners />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L52 28 L72 32 L56 48 L60 68 L40 58 L20 68 L24 48 L8 32 L28 28 Z' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative p-5 sm:p-6">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full rounded-full border-2 border-gold/55 bg-ivory py-3 pl-5 pr-14 text-sm text-ink outline-none shadow-md transition placeholder:text-ink-muted/55 focus:border-gold focus:ring-4 focus:ring-gold/20 sm:py-3.5 sm:text-base"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-maroon-deep">
                  <Search size={16} />
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {TYPES.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTypeFilter(key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition sm:text-sm ${
                      typeFilter === key
                        ? 'bg-gold text-maroon-deep shadow-sm'
                        : 'border border-gold/40 bg-maroon-deep/40 text-ivory/85 hover:border-gold hover:text-gold-light'
                    }`}
                  >
                    {typeLabel(key)}
                    {key !== 'ALL' && typeCounts[key] > 0 && (
                      <span className="ml-1 opacity-70">({typeCounts[key]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setListOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold px-6 py-2.5 text-sm font-extrabold text-maroon-deep shadow-[0_8px_20px_rgba(201,162,39,0.35)] transition hover:scale-[1.02] hover:bg-gold-light"
                aria-expanded={listOpen}
              >
                {listOpen ? t.hideList : t.viewList}
                {listOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <button
                type="button"
                disabled={!canExport || exporting}
                onClick={exportPdf}
                title={
                  canExport
                    ? t.exportPdf
                    : lang === 'hi'
                      ? 'खोज परिणाम आने पर सक्रिय होगा'
                      : 'Active when search has results'
                }
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory px-6 py-2.5 text-sm font-extrabold text-maroon shadow-[0_8px_20px_rgba(63,15,26,0.12)] transition enabled:hover:scale-[1.02] enabled:hover:bg-gold/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {exporting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {exporting ? t.exporting : t.exportPdf}
              </button>
            </div>
          </div>

          <div
            className={`relative grid transition-[grid-template-rows] duration-300 ease-out ${
              listOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-gold/25 bg-ivory/95 px-3 py-4 sm:px-5 sm:py-5">
                {error && (
                  <p className="mb-4 rounded-2xl border border-maroon/20 bg-ivory py-4 text-center text-sm text-maroon">
                    {error}
                  </p>
                )}

                {loading ? (
                  <div className="flex justify-center py-14 text-maroon">
                    <Loader2 className="animate-spin" size={32} />
                  </div>
                ) : (
                  <>
                    <div className="hidden max-h-[70vh] overflow-hidden rounded-2xl border border-gold/40 bg-ivory shadow-[0_12px_40px_rgba(63,15,26,0.08)] md:block">
                      <div className="h-full max-h-[70vh] overflow-auto">
                        <table className="w-full min-w-[780px] text-left text-sm">
                          <thead className="sticky top-0 z-10">
                            <tr className="bg-maroon text-ivory">
                              <th className="px-4 py-3.5 font-semibold">{t.sno}</th>
                              <th className="px-4 py-3.5 font-semibold">{t.mno}</th>
                              <th className="px-4 py-3.5 font-semibold">{t.type}</th>
                              <th className="px-4 py-3.5 font-semibold">{t.name}</th>
                              <th className="px-4 py-3.5 font-semibold">{t.address}</th>
                              <th className="px-4 py-3.5 font-semibold">{t.mobile}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pageRows.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="px-4 py-10 text-center text-ink-muted"
                                >
                                  {t.noResults}
                                </td>
                              </tr>
                            ) : (
                              pageRows.map((m, idx) => (
                                <tr
                                  key={
                                    m.ID || `${m.TYPE}-${m['S.No.']}-${m['M.No.']}`
                                  }
                                  className={`border-t border-maroon/8 transition hover:bg-gold/10 ${
                                    idx % 2 === 0 ? 'bg-ivory' : 'bg-ivory-deep/50'
                                  }`}
                                >
                                  <td className="px-4 py-3 text-ink-muted">
                                    {m['S.No.']}
                                  </td>
                                  <td className="px-4 py-3 font-medium text-maroon">
                                    {m['M.No.']}
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="rounded-full bg-maroon/8 px-2.5 py-0.5 text-[11px] font-semibold text-maroon-soft">
                                      {typeLabel(m.TYPE)}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 font-semibold text-ink">
                                    {m['VARSHIK MEMBER NAME']}
                                  </td>
                                  <td className="max-w-xs px-4 py-3 text-ink-muted">
                                    {m.ADDRESS}
                                  </td>
                                  <td className="px-4 py-3">
                                    {m.MOBILE ? (
                                      <a
                                        href={`tel:${String(m.MOBILE).replace(/\D/g, '')}`}
                                        className="text-maroon-soft hover:underline"
                                      >
                                        {m.MOBILE}
                                      </a>
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="max-h-[70vh] space-y-3 overflow-y-auto md:hidden">
                      {pageRows.length === 0 ? (
                        <p className="rounded-2xl border border-maroon/10 bg-ivory py-10 text-center text-ink-muted">
                          {t.noResults}
                        </p>
                      ) : (
                        pageRows.map((m) => (
                          <button
                            key={m.ID || `${m.TYPE}-${m['S.No.']}-${m['M.No.']}`}
                            type="button"
                            onClick={() => setSelected(m)}
                            className="w-full rounded-2xl border border-gold/40 bg-ivory p-4 text-left shadow-sm transition active:scale-[0.99]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-maroon">
                                  {m['VARSHIK MEMBER NAME']}
                                </p>
                                <p className="mt-1 text-xs text-ink-muted">
                                  {t.mno}:{' '}
                                  <span className="font-medium text-ink">
                                    {m['M.No.']}
                                  </span>
                                  {' · '}
                                  {t.sno}: {m['S.No.']}
                                </p>
                              </div>
                              <span className="shrink-0 rounded-full bg-maroon/8 px-2 py-0.5 text-[10px] font-semibold text-maroon-soft">
                                {typeLabel(m.TYPE)}
                              </span>
                            </div>
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                              {m.ADDRESS}
                            </p>
                            <p className="mt-2 text-sm font-medium text-maroon-soft">
                              {m.MOBILE || '—'}
                            </p>
                          </button>
                        ))
                      )}
                    </div>

                    {(filtered.length > 0 || query.trim()) && !loading && !error && (
                      <p className="mt-4 text-center text-sm italic text-maroon-deep/80">
                        {query.trim()
                          ? lang === 'hi'
                            ? (
                              <>
                                {t.found}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {members.length}
                                </span>{' '}
                                {t.from}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {filtered.length}
                                </span>
                              </>
                            )
                            : (
                              <>
                                {t.found}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {filtered.length}
                                </span>{' '}
                                {t.from}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {members.length}
                                </span>
                              </>
                            )
                          : lang === 'hi'
                            ? (
                              <>
                                {t.showing}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {filtered.length}
                                </span>{' '}
                                {t.of}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {pageRows.length}
                                </span>{' '}
                                {t.members}
                              </>
                            )
                            : (
                              <>
                                {t.showing}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {pageRows.length}
                                </span>{' '}
                                {t.of}{' '}
                                <span className="font-semibold not-italic text-maroon">
                                  {filtered.length}
                                </span>{' '}
                                {t.members}
                              </>
                            )}
                      </p>
                    )}

                    {filtered.length > PAGE_SIZE && (
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-ivory px-5 py-2.5 text-sm font-medium text-maroon disabled:opacity-40"
                        >
                          <ChevronLeft size={16} />
                          {t.prev}
                        </button>
                        <span className="text-sm text-ink-muted">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-ivory px-5 py-2.5 text-sm font-medium text-maroon disabled:opacity-40"
                        >
                          {t.next}
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="modal-backdrop fixed inset-0 z-[60] flex items-end bg-maroon-deep/55 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6 md:hidden"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="palace-frame modal-panel relative w-full overflow-hidden rounded-t-3xl border border-gold/40 bg-ivory p-6 shadow-2xl sm:max-w-md sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <PalaceCorners />
            <h3 className="font-display text-2xl font-semibold text-maroon">
              {selected['VARSHIK MEMBER NAME']}
            </h3>
            <p className="mt-1 text-xs font-semibold tracking-wide text-gold-deep uppercase">
              {typeLabel(selected.TYPE)}
            </p>
            <div className="gold-line mt-3 w-16" />
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">
                  {t.sno}
                </dt>
                <dd className="font-medium text-ink">{selected['S.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">
                  {t.mno}
                </dt>
                <dd className="font-medium text-ink">{selected['M.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">
                  {t.address}
                </dt>
                <dd className="font-medium leading-relaxed text-ink">
                  {selected.ADDRESS}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">
                  {t.mobile}
                </dt>
                <dd>
                  {selected.MOBILE ? (
                    <a
                      href={`tel:${String(selected.MOBILE).replace(/\D/g, '')}`}
                      className="font-medium text-maroon-soft"
                    >
                      {selected.MOBILE}
                    </a>
                  ) : (
                    '—'
                  )}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-full bg-maroon py-3 text-sm font-semibold text-ivory"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
