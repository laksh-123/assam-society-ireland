import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

const ease = [0.16, 1, 0.3, 1]

// Hardcoded leaf positions for consistent render
const leaves = [
  { size: 26, left: '7%',  top: '18%', rot: 35,  dur: 18, delay: 0   },
  { size: 16, left: '84%', top: '22%', rot: -20, dur: 23, delay: 3   },
  { size: 22, left: '18%', top: '72%', rot: 62,  dur: 17, delay: 1.5 },
  { size: 12, left: '70%', top: '64%', rot: -44, dur: 25, delay: 5   },
  { size: 30, left: '44%', top: '82%', rot: 16,  dur: 20, delay: 2   },
  { size: 18, left: '91%', top: '48%', rot: -32, dur: 19, delay: 4   },
  { size: 14, left: '4%',  top: '53%', rot: 78,  dur: 22, delay: 6   },
  { size: 20, left: '58%', top: '12%', rot: -58, dur: 16, delay: 2.5 },
  { size: 10, left: '32%', top: '38%', rot: 42,  dur: 24, delay: 7   },
]

const TeaLeaf = ({ size, style }) => (
  <svg width={size} height={size * 1.65} viewBox="0 0 24 40" fill="none" style={style}>
    <path d="M12 2 C17 2 22 8 21 18 C20 28 12 38 12 38 C12 38 4 28 3 18 C2 8 7 2 12 2 Z"
      fill="var(--gold)" />
    <line x1="12" y1="2" x2="12" y2="38" stroke="rgba(9,22,15,0.4)" strokeWidth="0.8" />
    <line x1="7" y1="14" x2="17" y2="12" stroke="rgba(9,22,15,0.3)" strokeWidth="0.6" />
    <line x1="6" y1="22" x2="18" y2="20" stroke="rgba(9,22,15,0.3)" strokeWidth="0.6" />
  </svg>
)

const pillars = [
  {
    num: '01',
    title: 'Culture',
    text: 'Bihu, music, dance, literature and the living traditions of Assam — kept vibrant far from home.',
  },
  {
    num: '02',
    title: 'Community',
    text: 'A network of Assamese diaspora across Ireland, building bonds over shared roots and new friendships.',
  },
  {
    num: '03',
    title: 'Heritage',
    text: 'Tea gardens, muga silk, the Brahmaputra — stories and symbols carried into the heart of Ireland.',
  },
]

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 70% at 50% 60%, #0e2a18 0%, #09160f 100%)',
      }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute',
          top: '35%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,149,58,0.07) 0%, transparent 70%)',
          animation: 'hero-pulse 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Floating tea leaves */}
        {leaves.map(({ size, left, top, rot, dur, delay }, i) => (
          <div key={i} style={{
            position: 'absolute',
            left, top,
            transform: `rotate(${rot}deg)`,
            animation: `${i % 2 === 0 ? 'leaf-float' : 'leaf-float-2'} ${dur}s ease-in-out ${delay}s infinite`,
            pointerEvents: 'none',
          }}>
            <TeaLeaf size={size} style={{ display: 'block' }} />
          </div>
        ))}

        {/* Celtic ring decoration */}
        <div style={{ position: 'absolute', top: '12%', right: '8%', opacity: 0.06 }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--gold)" strokeWidth="1" />
            <circle cx="90" cy="90" r="60" fill="none" stroke="var(--gold)" strokeWidth="0.7" />
            <circle cx="90" cy="90" r="40" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
            {[0, 45, 90, 135].map(angle => (
              <line key={angle}
                x1={90 + 80 * Math.cos(angle * Math.PI / 180)}
                y1={90 + 80 * Math.sin(angle * Math.PI / 180)}
                x2={90 + 80 * Math.cos((angle + 180) * Math.PI / 180)}
                y2={90 + 80 * Math.sin((angle + 180) * Math.PI / 180)}
                stroke="var(--gold)" strokeWidth="0.4" />
            ))}
          </svg>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '820px' }}>
          <motion.span
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="section-label"
            style={{ marginBottom: '28px' }}
          >
            Est. in Ireland
          </motion.span>

          <motion.h1
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              color: 'var(--cream)',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}
          >
            Where the Hills of<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Assam</em> Meet<br />
            the Emerald Isle
          </motion.h1>

          <motion.div
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
          >
            <div style={{ width: '48px', height: '1px', background: 'var(--gold)' }} />
          </motion.div>

          <motion.p
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            style={{
              fontSize: '1rem',
              color: 'var(--cream-muted)',
              maxWidth: '480px',
              margin: '0 auto 44px',
              lineHeight: 1.8,
            }}
          >
            A vibrant community celebrating Assamese culture, heritage and fellowship across Ireland.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="initial" animate="animate"
            transition={{ duration: 0.7, ease, delay: 0.72 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/about" style={{
              display: 'inline-block',
              padding: '14px 36px',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'background 0.3s, color 0.3s',
              borderRadius: '2px',
            }}
              onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--bg)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
            >
              Our Story
            </Link>
            <Link to="/events" style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'transparent',
              border: '1px solid rgba(228,219,208,0.2)',
              color: 'var(--cream-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'border-color 0.3s, color 0.3s',
              borderRadius: '2px',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--cream-muted)'; e.target.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(228,219,208,0.2)'; e.target.style.color = 'var(--cream-muted)'; }}
            >
              Upcoming Events
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: '40px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Scroll
          </span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, var(--gold), transparent)',
          }} />
        </motion.div>
      </section>

      {/* ── Bridge section ── */}
      <section style={{ padding: '120px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-label">Who We Are</span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--cream)', marginBottom: '24px' }}>
              Two Cultures,<br />
              <em style={{ color: 'var(--gold)' }}>One Community</em>
            </h2>
            <div className="gold-line" />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.9, marginBottom: '16px' }}>
              The Assam Society of Ireland brings together Assamese people living across the island of Ireland —
              a community rooted in the tea gardens and river valleys of Northeast India, now flourishing
              in the green hills of Ireland.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.9 }}>
              We gather to celebrate Bihu, share our language and food, and keep the warmth of home
              alive — while building lasting bonds with our adopted land.
            </p>
            <Link to="/about" style={{
              display: 'inline-block',
              marginTop: '32px',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              borderBottom: '1px solid var(--gold)',
              paddingBottom: '3px',
              transition: 'opacity 0.3s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.7'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Read our story →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <svg width="320" height="320" viewBox="0 0 320 320" style={{ opacity: 0.85 }}>
              {/* Outer Celtic ring */}
              <circle cx="160" cy="160" r="148" fill="none" stroke="var(--border)" strokeWidth="1" />
              <circle cx="160" cy="160" r="120" fill="none" stroke="var(--border)" strokeWidth="0.8" />
              {/* Cross lines */}
              {[0, 30, 60, 90, 120, 150].map(a => (
                <line key={a}
                  x1={160 + 148 * Math.cos(a * Math.PI / 180)}
                  y1={160 + 148 * Math.sin(a * Math.PI / 180)}
                  x2={160 + 148 * Math.cos((a + 180) * Math.PI / 180)}
                  y2={160 + 148 * Math.sin((a + 180) * Math.PI / 180)}
                  stroke="var(--border)" strokeWidth="0.5" />
              ))}
              {/* Tea leaf cluster in centre */}
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const r = 55
                const cx = 160 + r * Math.cos((angle - 90) * Math.PI / 180)
                const cy = 160 + r * Math.sin((angle - 90) * Math.PI / 180)
                return (
                  <ellipse key={i} cx={cx} cy={cy} rx="8" ry="18"
                    fill="none" stroke="var(--gold)" strokeWidth="0.8"
                    transform={`rotate(${angle}, ${cx}, ${cy})`}
                    opacity="0.6" />
                )
              })}
              {/* Centre dot */}
              <circle cx="160" cy="160" r="5" fill="var(--gold)" opacity="0.8" />
              <circle cx="160" cy="160" r="20" fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.4" />
              {/* Compass points */}
              {[0, 90, 180, 270].map(a => (
                <circle key={a}
                  cx={160 + 148 * Math.cos((a - 90) * Math.PI / 180)}
                  cy={160 + 148 * Math.sin((a - 90) * Math.PI / 180)}
                  r="3" fill="var(--gold)" opacity="0.5" />
              ))}
            </svg>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .bridge-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Three Pillars ── */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: '64px', maxWidth: '500px' }}
          >
            <span className="section-label">What We Stand For</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)' }}>
              Rooted in tradition,<br />
              <em style={{ color: 'var(--gold)' }}>open to the world</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {pillars.map(({ num, title, text }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                style={{
                  background: 'var(--bg)',
                  padding: '48px 40px',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3rem',
                  color: 'var(--gold)',
                  opacity: 0.25,
                  display: 'block',
                  marginBottom: '20px',
                  lineHeight: 1,
                }}>
                  {num}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  color: 'var(--cream)',
                  marginBottom: '16px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .pillars-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Quote ── */}
      <section style={{ padding: '120px 64px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
              <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                <path d="M0 28 C0 18 5 8 16 0 L20 6 C12 10 10 16 11 20 L16 20 L16 28 Z" fill="var(--gold)" opacity="0.4" />
                <path d="M22 28 C22 18 27 8 38 0 L42 6 C34 10 32 16 33 20 L38 20 L38 28 Z" fill="var(--gold)" opacity="0.4" />
              </svg>
            </div>
            <blockquote style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              color: 'var(--cream)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: '32px',
              fontWeight: 300,
            }}>
              A people without the knowledge of their past history, origin and culture is like a tree without roots.
            </blockquote>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            </div>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Marcus Garvey
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 64px 120px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', marginBottom: '12px' }}>
              Join our community
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              All Assamese across Ireland — and friends of Assam — are welcome.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '16px 44px',
              background: 'var(--gold)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'opacity 0.3s',
              borderRadius: '2px',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
