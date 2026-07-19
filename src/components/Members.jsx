import { useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
} from 'lucide-react'
import { MEMBERS_URL } from '../data/members'
import { useLanguage } from '../context/LanguageContext'
import PalaceCorners from './PalaceCorners'

const PAGE_SIZE = 50
const TYPES = ['ALL', 'SANRAKSHAK', 'AAJIVAN', 'VARSHIK', 'SANSTHAGAT']

export default function Members() {
  const { t } = useLanguage()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

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

  return (
    <section id="members" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-center">
          <div className="gold-flourish mb-2">
            <span className="text-gold">✦</span>
          </div>
          <h2 className="section-heading">
            {t.membersTitle}
          </h2>
          <div className="gold-line-thick mx-auto mt-5 w-44" />
          <p className="mt-3 text-sm text-ink-muted sm:text-base">{t.membersSubtitle}</p>
        </div>

        {/* Search + filters */}
        <div className="palace-frame relative mb-6 overflow-hidden rounded-3xl border border-gold/45 bg-linear-to-br from-maroon via-maroon to-maroon-deep p-5 shadow-[0_16px_40px_rgba(63,15,26,0.2)] sm:p-6">
          <PalaceCorners />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L52 28 L72 32 L56 48 L60 68 L40 58 L20 68 L24 48 L8 32 L28 28 Z' fill='none' stroke='%23c9a227' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative mx-auto max-w-2xl">
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
        </div>

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
            <div className="hidden h-[100vh] overflow-hidden rounded-2xl border border-gold/40 bg-ivory shadow-[0_12px_40px_rgba(63,15,26,0.08)] md:block">
              <div className="h-full overflow-auto">
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
                        <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">
                          {t.noResults}
                        </td>
                      </tr>
                    ) : (
                      pageRows.map((m, idx) => (
                        <tr
                          key={m.ID || `${m.TYPE}-${m['S.No.']}-${m['M.No.']}`}
                          className={`border-t border-maroon/8 transition hover:bg-gold/10 ${
                            idx % 2 === 0 ? 'bg-ivory' : 'bg-ivory-deep/50'
                          }`}
                        >
                          <td className="px-4 py-3 text-ink-muted">{m['S.No.']}</td>
                          <td className="px-4 py-3 font-medium text-maroon">{m['M.No.']}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-maroon/8 px-2.5 py-0.5 text-[11px] font-semibold text-maroon-soft">
                              {typeLabel(m.TYPE)}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {m['VARSHIK MEMBER NAME']}
                          </td>
                          <td className="max-w-xs px-4 py-3 text-ink-muted">{m.ADDRESS}</td>
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

            <div className="h-[100vh] space-y-3 overflow-y-auto md:hidden">
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
                          <span className="font-medium text-ink">{m['M.No.']}</span>
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

            {filtered.length > PAGE_SIZE && (
              <div className="mt-6 flex items-center justify-center gap-3">
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
                <dt className="text-xs tracking-wider text-ink-muted uppercase">{t.sno}</dt>
                <dd className="font-medium text-ink">{selected['S.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">{t.mno}</dt>
                <dd className="font-medium text-ink">{selected['M.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">{t.address}</dt>
                <dd className="font-medium leading-relaxed text-ink">{selected.ADDRESS}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-ink-muted uppercase">{t.mobile}</dt>
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
