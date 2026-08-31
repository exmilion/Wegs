import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PassesPage from './pages/PassesPage'
import PassDetailPage from './pages/PassDetailPage'
import ErrorBoundary from './components/ErrorBoundary'
import useSupabasePasses from './hooks/useSupabasePasses'

function App() {
  const { passes, loading, error } = useSupabasePasses()

  return (
    <>
      <a href="#main-content" className="skip-nav">Saltar al contenido</a>
      <Navbar passes={passes} />
      <div id="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={
              <HomePage passes={passes} loading={loading} error={error} />
            } />
            <Route path="/pases" element={
              <PassesPage passes={passes} loading={loading} error={error} />
            } />
            <Route path="/pase/:id" element={
              <PassDetailPage />
            } />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  )
}

export default App
