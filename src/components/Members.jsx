import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react'
import { MEMBERS_URL } from '../data/members'
import { useLanguage } from '../context/LanguageContext'

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
    <section
      id="members"
      className="scroll-mt-24 border-t border-maroon/8 bg-ivory-deep/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
            {t.membersTitle}
          </h2>
          <div className="gold-line mx-auto mt-5 w-28" />
          <p className="mt-4 text-sm text-ink-muted sm:text-base">{t.membersSubtitle}</p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {TYPES.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTypeFilter(key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition sm:text-sm ${
                typeFilter === key
                  ? 'bg-maroon text-ivory shadow-sm'
                  : 'border border-maroon/15 bg-ivory text-ink-muted hover:border-gold/50 hover:text-maroon'
              }`}
            >
              {typeLabel(key)}
              {key !== 'ALL' && typeCounts[key] > 0 && (
                <span className="ml-1 opacity-70">({typeCounts[key]})</span>
              )}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mb-6 max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-deep"
            size={18}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-maroon/15 bg-ivory py-3.5 pl-11 pr-4 text-sm text-ink outline-none ring-gold/40 transition placeholder:text-ink-muted/60 focus:border-gold focus:ring-2"
          />
        </div>

        <p className="mb-4 text-center text-xs text-ink-muted">
          {loading
            ? t.loadingMembers
            : `${t.showing} ${filtered.length} ${t.of} ${members.length} ${t.members}`}
        </p>

        {error && (
          <p className="mb-4 rounded-xl border border-maroon/20 bg-ivory py-4 text-center text-sm text-maroon">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-16 text-maroon">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-maroon/10 bg-ivory shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead>
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
                            <span className="rounded-full bg-maroon/8 px-2 py-0.5 text-[11px] font-semibold text-maroon-soft">
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

            <div className="space-y-3 md:hidden">
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
                    className="w-full rounded-2xl border border-maroon/10 bg-ivory p-4 text-left shadow-sm transition active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-maroon">{m['VARSHIK MEMBER NAME']}</p>
                        <p className="mt-1 text-xs text-ink-muted">
                          {t.mno}: <span className="font-medium text-ink">{m['M.No.']}</span>
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
                    <p className="mt-2 text-sm font-medium text-maroon-soft">{m.MOBILE || '—'}</p>
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
                  className="inline-flex items-center gap-1 rounded-full border border-maroon/15 bg-ivory px-4 py-2 text-sm font-medium text-maroon disabled:opacity-40"
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
                  className="inline-flex items-center gap-1 rounded-full border border-maroon/15 bg-ivory px-4 py-2 text-sm font-medium text-maroon disabled:opacity-40"
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
          className="modal-backdrop fixed inset-0 z-[60] flex items-end bg-maroon-deep/50 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6 md:hidden"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="modal-panel w-full rounded-t-3xl bg-ivory p-6 shadow-2xl sm:max-w-md sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="font-display text-2xl font-semibold text-maroon">
              {selected['VARSHIK MEMBER NAME']}
            </h3>
            <p className="mt-1 text-xs font-semibold text-gold-deep">{typeLabel(selected.TYPE)}</p>
            <div className="gold-line mt-3 w-16" />
            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">{t.sno}</dt>
                <dd className="font-medium text-ink">{selected['S.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">{t.mno}</dt>
                <dd className="font-medium text-ink">{selected['M.No.']}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">{t.address}</dt>
                <dd className="font-medium leading-relaxed text-ink">{selected.ADDRESS}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-muted">{t.mobile}</dt>
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
