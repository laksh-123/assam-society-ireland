import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '60px 64px 40px',
    }}>
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '48px',
        marginBottom: '48px',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            color: 'var(--cream)',
            letterSpacing: '0.04em',
            marginBottom: '12px',
          }}>
            Assam Society of Ireland
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Celebrating the rich culture and heritage of Assam, building community across Ireland.
          </p>
        </div>

        <div>
          <p style={{
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}>
            Navigate
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['/', '/about', '/events', '/gallery', '/contact'].map((to, i) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  {['Home', 'About', 'Events', 'Gallery', 'Contact'][i]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '20px',
          }}>
            Connect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'info@assamireland.ie', href: 'mailto:info@assamireland.ie' },
              { label: 'Facebook', href: '#' },
              { label: 'Instagram', href: '#' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ fontSize: '0.82rem', color: 'var(--text-muted)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Assam Society of Ireland
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Dublin, Ireland
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer { padding: 48px 24px 32px; }
          footer > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
