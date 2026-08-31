/**
 * Formato local (es-MX) sin día de la semana.
 * Usado por PassCard, PassesPage, PassDetailPage.
 */
export function formatTime(ts) {
    try {
        const d = new Date(ts)
        return d.toLocaleString('es-MX', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        })
    } catch { return ts }
}

/**
 * Formato local con día de la semana.
 * Usado solo por Lightbox.
 */
export function formatTimeLong(ts) {
    try {
        const d = new Date(ts)
        return d.toLocaleString('es-MX', {
            weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        })
    } catch { return ts }
}

/**
 * Formato UTC.
 * Usado por PassesPage, PassDetailPage.
 */
export function formatTimeUTC(ts) {
    try {
        const d = new Date(ts)
        return d.toLocaleString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: 'UTC'
        }) + ' UTC'
    } catch { return ts }
}
