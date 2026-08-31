import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ passes = [] }) {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="navbar__brand">
                <img src="/logo.png" alt="Sat4Life Logo" className="navbar__logo" />
                <div>
                    <div className="navbar__name">SAT4LIFE</div>
                    <div className="navbar__sub">Estación Terrena</div>
                </div>
            </Link>
            <div className="navbar__links">
                {isHome ? (
                    <a href="#galeria">Galería</a>
                ) : (
                    <Link to="/#galeria">Galería</Link>
                )}
                <Link to="/pases" className={location.pathname === '/pases' ? 'navbar__link--active' : ''}>
                    Pases
                </Link>
                {isHome ? (
                    <a href="#estacion">Estación</a>
                ) : (
                    <Link to="/#estacion">Estación</Link>
                )}
                {isHome ? (
                    <a href="#estadisticas">Estadísticas</a>
                ) : (
                    <Link to="/#estadisticas">Estadísticas</Link>
                )}
            </div>
            <button
                className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" className="hamburger__line hamburger__line--top" />
                    <line x1="3" y1="12" x2="21" y2="12" className="hamburger__line hamburger__line--mid" />
                    <line x1="3" y1="18" x2="21" y2="18" className="hamburger__line hamburger__line--bot" />
                </svg>
            </button>
            <div className="navbar__status">
                <span className="navbar__status-dot"></span>
                <span className="navbar__status-text">{passes.length > 0 ? `EN VIVO — ${passes.length} pases` : 'EN VIVO'}</span>
            </div>
            <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
                {isHome ? (
                    <a href="#galeria" className="navbar__mobile-link" onClick={closeMenu}>Galería</a>
                ) : (
                    <Link to="/#galeria" className="navbar__mobile-link" onClick={closeMenu}>Galería</Link>
                )}
                <Link to="/pases" className={`navbar__mobile-link ${location.pathname === '/pases' ? 'navbar__link--active' : ''}`} onClick={closeMenu}>
                    Pases
                </Link>
                {isHome ? (
                    <a href="#estacion" className="navbar__mobile-link" onClick={closeMenu}>Estación</a>
                ) : (
                    <Link to="/#estacion" className="navbar__mobile-link" onClick={closeMenu}>Estación</Link>
                )}
                {isHome ? (
                    <a href="#estadisticas" className="navbar__mobile-link" onClick={closeMenu}>Estadísticas</a>
                ) : (
                    <Link to="/#estadisticas" className="navbar__mobile-link" onClick={closeMenu}>Estadísticas</Link>
                )}
                <div className="navbar__mobile-status">
                    <span className="navbar__status-dot"></span>
                    <span className="navbar__mobile-status-text">{passes.length > 0 ? `EN VIVO — ${passes.length} pases` : 'EN VIVO'}</span>
                </div>
            </div>
        </nav>
    )
}
