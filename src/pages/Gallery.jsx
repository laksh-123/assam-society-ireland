import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const photos = [
  { id: 1, title: 'Tea Gardens at Dawn',        location: 'Assam',   bg: 'linear-gradient(135deg, #0f2a18 0%, #1e5030 60%, #0d3020 100%)',  span: 'tall' },
  { id: 2, title: 'Bohag Bihu — Dublin 2024',   location: 'Dublin',  bg: 'linear-gradient(135deg, #2a1408 0%, #7a3a10 60%, #4a2008 100%)',  span: 'wide' },
  { id: 3, title: 'Muga Silk Weave',            location: 'Assam',   bg: 'linear-gradient(135deg, #22100a 0%, #6a3020 60%, #3a1a0a 100%)',  span: 'normal' },
  { id: 4, title: 'Brahmaputra at Twilight',    location: 'Assam',   bg: 'linear-gradient(135deg, #08102a 0%, #1a2a5a 60%, #0a1838 100%)',  span: 'normal' },
  { id: 5, title: 'Community Gathering',        location: 'Cork',    bg: 'linear-gradient(135deg, #181410 0%, #3a3020 60%, #282016 100%)',  span: 'wide' },
  { id: 6, title: 'Sattriya Dance Performance', location: 'Dublin',  bg: 'linear-gradient(135deg, #1a0a2a 0%, #4a1a6a 60%, #2a0a3a 100%)',  span: 'tall' },
  { id: 7, title: 'Kaziranga — One-Horned Rhino', location: 'Assam', bg: 'linear-gradient(135deg, #0a1a0a 0%, #1a4020 60%, #0a2010 100%)',  span: 'normal' },
  { id: 8, title: 'Phoenix Park — Community Picnic', location: 'Dublin', bg: 'linear-gradient(135deg, #0a200a 0%, #1a5020 60%, #0a2a10 100%)', span: 'normal' },
  { id: 9, title: 'Pitha & Traditional Food',  location: 'Assam',   bg: 'linear-gradient(135deg, #281408 0%, #684018 60%, #381a08 100%)',  span: 'wide' },
]

// Decorative leaf SVG overlay
const LeafOverlay = () => (
  <svg width="60" height="100" viewBox="0 0 60 100" fill="none" style={{ opacity: 0.15 }}>
    <path d="M30 5 C42 5 55 20 52 45 C49 70 30 95 30 95 C30 95 11 70 8 45 C5 20 18 5 30 5 Z"
      fill="white" />
    <line x1="30" y1="5" x2="30" y2="95" stroke="white" strokeWidth="1" />
    <line x1="18" y1="35" x2="42" y2="32" stroke="white" strokeWidth="0.8" />
    <line x1="16" y1="50" x2="44" y2="47" stroke="white" strokeWidth="0.8" />
    <line x1="18" y1="65" x2="42" y2="62" stroke="white" strokeWidth="0.8" />
  </svg>
)

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Page Hero ── */}
      <section style={{
        padding: '180px 64px 100px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, #0e2018 0%, var(--bg) 100%)',
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="section-label"
          >
            Visual Archive
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--cream)' }}
          >
            Gallery
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '28px 0' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.9 }}
          >
            Moments from our events, the landscapes of Assam, and the life we are building together in Ireland.
          </motion.p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ padding: '80px 64px 120px' }}>
        <div style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '260px',
          gap: '2px',
        }}>
          {photos.map(({ id, title, location, bg, span }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
              onClick={() => setActive({ title, location, bg })}
              style={{
                position: 'relative',
                background: bg,
                gridColumn: span === 'wide' ? 'span 2' : 'span 1',
                gridRow: span === 'tall' ? 'span 2' : 'span 1',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {/* Texture pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />

              {/* Leaf decoration */}
              <div style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
                <LeafOverlay />
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(9, 22, 15, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '28px',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span style={{
                  fontSize: '0.64rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--gold)',
                  marginBottom: '8px',
                }}>
                  {location}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  color: 'var(--cream)',
                }}>
                  {title}
                </h3>
                <div style={{
                  width: '28px', height: '1px',
                  background: 'var(--gold)', marginTop: '14px',
                }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(9, 22, 15, 0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '40px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              onClick={e => e.stopPropagation()}
              style={{
                background: active.bg,
                width: '100%',
                maxWidth: '700px',
                aspectRatio: '16/9',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top, rgba(9,22,15,0.8), transparent)' }}>
                <span style={{ fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  {active.location}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--cream)' }}>
                  {active.title}
                </h3>
              </div>
              <button
                onClick={() => setActive(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  color: 'var(--cream)', fontSize: '1.4rem', lineHeight: 1,
                  opacity: 0.7, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.target.style.opacity = '1'}
                onMouseLeave={e => e.target.style.opacity = '0.7'}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
