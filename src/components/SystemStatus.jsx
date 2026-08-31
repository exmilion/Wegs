export default function SystemStatus({ error }) {
    const lastHeartbeat = new Date().toLocaleString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false,
    })

    return (
        <section className="section">
            <div className="section__header">
                <div className="section__tag">⚡ Sistema</div>
                <h2 className="section__title">Estado del Sistema</h2>
            </div>

            <div className="system-status__container">
                <div className="system-status__main">
                    <div className={`system-status__indicator ${error ? 'system-status__indicator--error' : 'system-status__indicator--online'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div>
                        <div className="system-status__label">Estación Sat4Life</div>
                        <div className={`system-status__value ${error ? 'system-status__value--error' : 'system-status__value--online'}`}>
                            {error ? 'SIN CONEXIÓN' : 'DATOS EN VIVO'}
                        </div>
                        {error && (
                            <div className="system-status__error">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="system-status__details">
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{error ? '—' : 'v7.0'}</div>
                        <div className="system-status__detail-label">Versión Bot</div>
                    </div>
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{lastHeartbeat}</div>
                        <div className="system-status__detail-label">Última Consulta</div>
                    </div>
                    <div className="system-status__detail">
                        <div className="system-status__detail-value">{error ? '—' : 'Supabase'}</div>
                        <div className="system-status__detail-label">Fuente de Datos</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
