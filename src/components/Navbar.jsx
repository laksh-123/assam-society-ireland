import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
    <ellipse cx="14" cy="14" rx="13" ry="13" stroke="var(--gold)" strokeWidth="0.8" />
    <path d="M14 5 C17 5 21 8 20 14 C19 20 14 23 14 23 C14 23 9 20 8 14 C7 8 11 5 14 5 Z"
      fill="none" stroke="var(--gold)" strokeWidth="0.8" />
    <line x1="14" y1="5" x2="14" y2="23" stroke="var(--gold)" strokeWidth="0.5" />
    <line x1="9.5" y1="12" x2="18.5" y2="12" stroke="var(--gold)" strokeWidth="0.5" />
    <line x1="8.5" y1="16" x2="19.5" y2="16" stroke="var(--gold)" strokeWidth="0.5" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scrolled ? '14px 48px' : '26px 48px',
    background: scrolled ? 'rgba(9, 22, 15, 0.94)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'padding 0.4s var(--ease), background 0.4s var(--ease), border-color 0.4s',
  }

  const linkStyle = (isActive) => ({
    fontFamily: 'var(--font-sans)',
    fontSize: '0.72rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: isActive ? 'var(--gold)' : 'var(--cream-muted)',
    transition: 'color 0.3s',
    padding: '4px 0',
    borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
  })

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={navStyle}
      >
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            letterSpacing: '0.06em',
            color: 'var(--cream)',
          }}>
            Assam Society of Ireland
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }}
          className="desktop-nav">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} style={({ isActive }) => linkStyle(isActive)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px' }}
          className="hamburger"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--gold)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen
                ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(9, 22, 15, 0.97)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '36px',
            }}
          >
            {links.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: isActive ? 'var(--gold)' : 'var(--cream)',
                    letterSpacing: '0.06em',
                  })}
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
