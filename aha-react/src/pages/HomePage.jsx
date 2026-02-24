import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <header className="container">
        <nav className="navbar" aria-label="Main navigation">
          <Link className="brand" to="/" aria-label="Aha! Home">Aha!</Link>
          <div className="nav-center" aria-label="Primary">
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/doc">Doc</Link>
          </div>
          <button className="menu-toggle" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle menu" onClick={(e) => {
            const menu = document.getElementById('navMenu')
            if (!menu) return
            const isOpen = menu.classList.toggle('open')
            e.currentTarget.setAttribute('aria-expanded', String(isOpen))
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div id="navMenu" role="region" aria-label="Mobile menu">
            <div className="mobile-group">
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/doc">Doc</Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="container hero" aria-label="Hero">
          <h1>Build with Aha! and ship faster</h1>
          <p>A minimal, fast, and modern starter you can deploy anywhere.</p>
          <div className="cta">
            <Link className="btn primary" to="/features">Explore features</Link>
            <Link className="btn" to="/pricing">View pricing</Link>
            <Link className="btn" to="/doc">Read docs</Link>
          </div>
        </section>
      </main>
    </>
  )
}


