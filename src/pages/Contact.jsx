import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const inputStyle = (focused) => ({
  width: '100%',
  background: focused ? 'var(--surface)' : 'transparent',
  border: 'none',
  borderBottom: `1px solid ${focused ? 'var(--gold)' : 'var(--border)'}`,
  padding: '14px 0',
  color: 'var(--text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s, background 0.3s',
  resize: 'none',
})

function Field({ label, type = 'text', multiline = false, rows = 5 }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const Tag = multiline ? 'textarea' : 'input'

  return (
    <div style={{ position: 'relative', marginBottom: '36px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.66rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: focused ? 'var(--gold)' : 'var(--text-muted)',
        marginBottom: '10px',
        transition: 'color 0.3s',
      }}>
        {label}
      </label>
      <Tag
        type={type}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyle(focused)}
      />
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
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
            Reach Out
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--cream)' }}
          >
            Get in Touch
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '28px 0' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.9 }}
          >
            Whether you are Assamese, a friend of Assam, or simply curious about our community —
            we would love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section style={{ padding: '100px 64px 120px' }}>
        <div style={{
          maxWidth: '1180px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '100px', alignItems: 'start',
        }}>
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div style={{ marginBottom: '56px' }}>
              <span className="section-label">Location</span>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--cream)', lineHeight: 1.7 }}>
                Dublin, Ireland<br />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Serving Assamese across the island
                </span>
              </p>
            </div>

            <div style={{ marginBottom: '56px' }}>
              <span className="section-label">Email</span>
              <a
                href="mailto:info@assamireland.ie"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--cream)',
                  transition: 'color 0.3s',
                  display: 'block',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--cream)'}
              >
                info@assamireland.ie
              </a>
            </div>

            <div>
              <span className="section-label">Follow Us</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Facebook — Assam Society of Ireland', 'Instagram — @assamireland'].map(link => (
                  <a key={link} href="#"
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative motif */}
            <div style={{ marginTop: '60px', opacity: 0.15 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="55" fill="none" stroke="var(--gold)" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="38" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <circle key={a}
                    cx={60 + 55 * Math.cos((a - 90) * Math.PI / 180)}
                    cy={60 + 55 * Math.sin((a - 90) * Math.PI / 180)}
                    r="2.5" fill="var(--gold)" />
                ))}
                <circle cx="60" cy="60" r="5" fill="var(--gold)" />
              </svg>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                style={{
                  padding: '60px 48px',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '24px' }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto' }}>
                    <circle cx="24" cy="24" r="22" stroke="var(--gold)" strokeWidth="1" />
                    <path d="M14 24 L21 31 L34 17" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '14px' }}>
                  Message sent
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Thank you for reaching out. We will be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Field label="Your Name" />
                <Field label="Email Address" type="email" />
                <Field label="Subject" />
                <Field label="Message" multiline rows={6} />
                <button
                  type="submit"
                  style={{
                    display: 'inline-block',
                    padding: '16px 48px',
                    background: 'var(--gold)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.3s',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
