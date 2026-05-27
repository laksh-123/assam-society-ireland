import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [active, setActive] = useState(null)
  const [activeIdx, setActiveIdx] = useState(null)

  useEffect(() => {
    fetch('/gallery/index.json')
      .then(r => r.json())
      .then(setPhotos)
      .catch(() => {})
  }, [])


  function open(idx) {
    setActive(photos[idx])
    setActiveIdx(idx)
  }

  function prev() {
    const idx = (activeIdx - 1 + photos.length) % photos.length
    setActive(photos[idx])
    setActiveIdx(idx)
  }

  function next() {
    const idx = (activeIdx + 1) % photos.length
    setActive(photos[idx])
    setActiveIdx(idx)
  }

  function handleKey(e) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setActive(null)
  }

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
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {photos.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '80px 0' }}>
              No photos yet.
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
            }}>
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.filename}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease, delay: (i % 3) * 0.07 }}
                  onClick={() => open(i)}
                  style={{ position: 'relative', aspectRatio: '4/3', cursor: 'pointer', overflow: 'hidden', background: 'var(--surface)' }}
                >
                  <img
                    src={`/gallery/${encodeURIComponent(photo.filename)}`}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </motion.div>
              ))}
            </div>
          )}
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
            onKeyDown={handleKey}
            tabIndex={-1}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(9, 22, 15, 0.96)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '40px',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Prev */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                style={{
                  position: 'absolute', left: '24px',
                  color: 'var(--cream)', fontSize: '1.8rem', opacity: 0.6,
                  background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
              >‹</button>
            )}

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
            >
              <img
                src={`/gallery/${encodeURIComponent(active.filename)}`}
                alt=""
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block', borderRadius: '2px' }}
              />
            </motion.div>

            {/* Next */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); next() }}
                style={{
                  position: 'absolute', right: '24px',
                  color: 'var(--cream)', fontSize: '1.8rem', opacity: 0.6,
                  background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
              >›</button>
            )}

            {/* Close */}
            <button
              onClick={() => setActive(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                color: 'var(--cream)', fontSize: '1.6rem', opacity: 0.6,
                background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
