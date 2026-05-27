import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease, delay },
})

const values = [
  { title: 'Cultural Preservation', text: 'Keeping Bihu, Borgeet, Ankia Bhaona and other traditions alive in the diaspora.' },
  { title: 'Hospitality', text: 'Ahôphora — the Assamese spirit of welcome — extended to all who join us.' },
  { title: 'Bridge Building', text: 'Connecting our Assamese roots with the warmth and openness of Irish society.' },
  { title: 'Next Generation', text: 'Ensuring our children grow up knowing the rivers, forests and stories of home.' },
]

export default function About() {
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
          <motion.span {...fadeUp(0)} className="section-label">About Us</motion.span>
          <motion.h1
            {...fadeUp(0.15)}
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--cream)', maxWidth: '700px' }}
          >
            Our Story
          </motion.h1>
          <motion.div {...fadeUp(0.25)} style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '28px 0' }} />
          <motion.p
            {...fadeUp(0.3)}
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '560px', lineHeight: 1.9 }}
          >
            From the mist-covered tea gardens of Assam to the emerald hills of Ireland —
            a community carried by memory, culture and a deep love of home.
          </motion.p>
        </div>
      </section>

      {/* ── Story Section 1 ── */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          maxWidth: '1180px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start',
        }}>
          <motion.div {...fadeUp(0)}>
            <span className="section-label">Origins</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', marginBottom: '24px' }}>
              The Land We Carry<br />
              <em style={{ color: 'var(--gold)' }}>Within Us</em>
            </h2>
            <div className="gold-line" />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.95, marginBottom: '20px' }}>
              Assam — nestled in the far northeast of India — is a land of extraordinary richness.
              Its vast tea estates, the mighty Brahmaputra river, the one-horned rhinoceros of Kaziranga,
              and the golden silk woven by silkworms found nowhere else on earth: these are the textures of home.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.95 }}>
              When Assamese people began arriving in Ireland — drawn by education, work and opportunity —
              they brought with them this layered culture: the spring joy of Bohag Bihu, the sound of
              the dhol and pepa, the taste of pitha and laru.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            style={{
              background: 'var(--surface)',
              borderLeft: '1px solid var(--border)',
              padding: '48px 40px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--cream)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '28px' }}>
              "Assam is not just a place. It is a feeling — the smell of first rain on tea leaves,
              the sound of the Brahmaputra in monsoon."
            </p>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)', marginBottom: '16px' }} />
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Community Member, Dublin
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story Section 2 ── */}
      <section style={{ padding: '100px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          maxWidth: '1180px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            style={{
              background: 'var(--surface)',
              borderRight: '1px solid var(--border)',
              padding: '48px 40px',
            }}
          >
            {/* Logo */}
            <div style={{ marginBottom: '32px' }}>
              <img
                src="/logo.jpg"
                alt="Assam Society of Ireland"
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid rgba(196,149,58,0.4)',
                }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--cream)', fontStyle: 'italic', lineHeight: 1.7 }}>
              Ireland, with its own deep traditions of storytelling, music and community,
              offered a natural home for Assamese culture to take root and flourish.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <span className="section-label">Ireland</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--cream)', marginBottom: '24px' }}>
              Finding Home in<br />
              <em style={{ color: 'var(--gold)' }}>the Emerald Isle</em>
            </h2>
            <div className="gold-line" />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.95, marginBottom: '20px' }}>
              The Assam Society of Ireland was founded to give our community a gathering place —
              to celebrate together, to support one another, and to share our culture with our Irish neighbours
              and friends.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.95 }}>
              From Bihu celebrations in Dublin to cultural evenings across the country, we have woven
              Assamese colour into the fabric of Irish life. The warmth of Irish céad míle fáilte and
              the generosity of Assamese ahôphora are, it turns out, the same thing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '100px 64px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: '64px' }}>
            <span className="section-label">What Guides Us</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--cream)' }}>
              Our Values
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {values.map(({ title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg)',
                  padding: '48px 44px',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div style={{ width: '32px', height: '1px', background: 'var(--gold)', marginBottom: '24px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '14px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
