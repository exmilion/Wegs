import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="section" style={{ paddingTop: '120px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Algo sali\u00f3 mal</h2>
          <p style={{ color: 'var(--text-dim)' }}>La p\u00e1gina encontr\u00f3 un error inesperado. Intenta recargar.</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
            className="btn"
            style={{ marginTop: '1rem' }}
          >
            Recargar p\u00e1gina
          </button>
        </section>
      )
    }
    return this.props.children
  }
}
