import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatTime, formatTimeUTC } from '../lib/formatDate'

const SATELLITES = ['Todos', 'METEOR M2-3', 'METEOR M2-4', 'METEOR M2-X']
const PER_PAGE = 20

export default function PassesPage({ passes, loading, error }) {
    const [filterSat, setFilterSat] = useState('Todos')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        if (filterSat === 'Todos') return passes
        return passes.filter(p => p.satellite === filterSat)
    }, [passes, filterSat])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <section className="section passes-page" id="pases-lista">
            <div className="section__header">
                <div className="section__tag"><svg className="section__tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6M9 10h6"/></svg> Registro</div>
                <h2 className="section__title">Lista de Pases</h2>
                <p className="section__subtitle">
                    Registro completo de todos los pases satelitales recibidos por la estación terrena.
                </p>
            </div>

            {error && (
                <div className="system-status__error" style={{ margin: '0 0 1rem' }}>
                    Error al cargar pases: {error}
                </div>
            )}

            {!loading && filtered.length === 0 && (
                <div className="empty-state" style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
                    <p>No se encontraron pases para este satélite.</p>
                </div>
            )}

            {/* Filtros */}
            <div className="passes-filters">
                <div className="passes-filters__group">
                    <span className="passes-filters__label">Satélite:</span>
                    {SATELLITES.map(sat => (
                        <button
                            key={sat}
                            className={`passes-filters__btn ${filterSat === sat ? 'passes-filters__btn--active' : ''}`}
                            onClick={() => { setFilterSat(sat); setPage(1) }}
                        >
                            {sat}
                        </button>
                    ))}
                </div>
                <span className="passes-count">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loading-spinner" />
                    Cargando pases...
                </div>
            ) : (
                <>
                    {/* Tabla */}
                    <div className="passes-table-wrap">
                        <table className="passes-table">
                            <thead>
                                <tr>
                                    <th>Satélite</th>
                                    <th>Fecha Local</th>
                                    <th>Fecha UTC</th>
                                    <th>Vista previa</th>
                                    <th>Imágenes</th>
                                    <th>PNGs</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map(pass => {
                                    const hasImages = pass.images && pass.images.length > 0
                                    return (
                                        <tr key={pass.id} className={hasImages ? '' : 'passes-table__row--dim'}>
                                            <td>
                                                <span className="passes-table__sat">
                                                    <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2a7 7 0 0 1 0-8.4M16.2 7.8a7 7 0 0 1 0 8.4M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/><circle cx="12" cy="12" r="1"/></svg> {pass.satellite}
                                                </span>
                                            </td>
                                            <td className="passes-table__time">{formatTime(pass.timestamp)}</td>
                                            <td className="passes-table__time">{formatTimeUTC(pass.timestamp)}</td>
                                            <td className="passes-table__preview">
                                                {hasImages ? (
                                                    <img
                                                        src={pass.images[0].thumbnail_url || pass.images[0].image_url}
                                                        alt={pass.images[0].label || pass.satellite}
                                                        className="passes-table__thumb"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="passes-table__no-img">—</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="passes-table__images-count">
                                                    {hasImages ? (
                                                        <>
                                                            <span className="passes-table__img-badge">
                                                                <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg> {pass.images.length}
                                                            </span>
                                                            <span className="passes-table__img-types">
                                                                {pass.images.map(img => img.type).join(', ')}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="passes-table__no-img">—</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="passes-table__count">
                                                    {pass.pngCount > 0 ? pass.pngCount : '—'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`passes-table__status ${hasImages ? 'passes-table__status--ok' : 'passes-table__status--fail'}`}>
                                                    {hasImages ? '● OK' : '● SIN DATOS'}
                                                </span>
                                            </td>
                                            <td>
                                                {hasImages && (
                                                    <Link to={`/pase/${pass.id}`} className="passes-table__link">
                                                        Ver →
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="passes-pagination">
                            <button
                                className="passes-pagination__btn"
                                disabled={page <= 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                ← Anterior
                            </button>
                            <span className="passes-pagination__info">
                                Página {page} de {totalPages}
                            </span>
                            <button
                                className="passes-pagination__btn"
                                disabled={page >= totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
