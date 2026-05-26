import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const DEFAULT_UPCOMING = [
  { id: '1', date: { day: '13', month: 'Apr', year: '2025' }, title: 'Bohag Bihu 2025', subtitle: 'Spring Festival Celebration', location: 'The Mansion House, Dublin', desc: 'Our flagship annual event celebrating the Assamese New Year and the arrival of spring. Music, dance, traditional food and the joy of Bihu.', tag: 'Cultural Festival' },
  { id: '2', date: { day: '19', month: 'Jul', year: '2025' }, title: 'Cultural Evening', subtitle: 'An Evening of Assamese Arts', location: 'National Concert Hall, Dublin', desc: 'A curated evening of Assamese classical music, Sattriya dance performances and storytelling — a night to share our heritage with Ireland.', tag: 'Arts' },
  { id: '3', date: { day: '04', month: 'Oct', year: '2025' }, title: 'Community Gathering', subtitle: 'Autumn Meetup', location: 'Community Centre, Sandyford', desc: 'An informal community gathering for Assamese across Ireland — food, conversation and the warm company of people who share your roots.', tag: 'Community' },
  { id: '4', date: { day: '20', month: 'Dec', year: '2025' }, title: 'Festive Season Celebration', subtitle: 'Winter Gathering', location: 'Dublin City, TBC', desc: 'Ring in the festive season together with Assamese food, music and the warmth of our growing community in Ireland.', tag: 'Seasonal' },
]

const DEFAULT_PAST = [
  { id: '5', year: '2024', title: 'Bohag Bihu — Sold Out', location: 'Dublin' },
  { id: '6', year: '2024', title: 'Cultural Night — Muga Silk Exhibition', location: 'Cork' },
  { id: '7', year: '2023', title: 'Bohag Bihu — Inaugural Event', location: 'Dublin' },
  { id: '8', year: '2023', title: 'Community Picnic', location: 'Phoenix Park, Dublin' },
]

export default function Events() {
  const [upcoming, setUpcoming] = useState(DEFAULT_UPCOMING)
  const [past, setPast] = useState(DEFAULT_PAST)

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => {
        if (data.upcoming) setUpcoming(data.upcoming)
        if (data.past) setPast(data.past)
      })
      .catch(() => {})
  }, [])

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
            What's On
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--cream)' }}
          >
            Events
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '28px 0' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.9 }}
          >
            From Bihu celebrations to cultural evenings and community gatherings —
            moments that keep Assam alive in Ireland.
          </motion.p>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: '60px' }}
          >
            <span className="section-label">Upcoming</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: 'var(--cream)' }}>
              2025 Programme
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {upcoming.map(({ id, date, title, subtitle, location, desc, tag }, i) => (
              <motion.div
                key={id || title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                style={{
                  background: 'var(--bg)',
                  padding: '44px 48px',
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '40px',
                  alignItems: 'start',
                  transition: 'background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                {/* Date */}
                <div style={{ textAlign: 'center', paddingTop: '4px' }}>
                  {date.tbd ? (
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      color: 'var(--gold)',
                      lineHeight: 1,
                      letterSpacing: '0.08em',
                    }}>
                      TBD
                    </span>
                  ) : (
                    <>
                      <span style={{
                        display: 'block',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2.8rem',
                        color: 'var(--gold)',
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}>
                        {date.day}
                      </span>
                      <span style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {date.month} {date.year}
                      </span>
                    </>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--cream)',
                    marginBottom: '4px',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gold)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                    {subtitle}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                    {desc}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--gold)', opacity: 0.6 }}>◆</span>
                    {location}
                  </p>
                </div>

                {/* Tag */}
                <div style={{ paddingTop: '4px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    border: '1px solid var(--border)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    {tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Events ── */}
      <section style={{ padding: '80px 64px 100px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: '48px' }}
          >
            <span className="section-label">Archive</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: 'var(--cream)' }}>
              Past Events
            </h2>
          </motion.div>

          <div>
            {past.map(({ id, year, title, location }, i) => (
              <motion.div
                key={id || title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '22px 0',
                  borderBottom: '1px solid var(--border)',
                  gap: '24px',
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--text-muted)', minWidth: '44px' }}>
                  {year}
                </span>
                <p style={{ flex: 1, fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--cream)', opacity: 0.7 }}>
                  {title}
                </p>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {location}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
