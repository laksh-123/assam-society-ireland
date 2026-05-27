import { NavLink } from 'react-router-dom'

const icons = {
  email: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
  facebook: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  youtube: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
}

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="mailto:assamsocietyireland@gmail.com"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              {icons.email} assamsocietyireland@gmail.com
            </a>
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              {[
                { icon: icons.facebook,  href: 'https://www.facebook.com/ASSAMSOCIETYOFIRELAND', title: 'Facebook' },
                { icon: icons.instagram, href: 'https://www.instagram.com/assamsocietyofireland/', title: 'Instagram' },
                { icon: icons.youtube,   href: 'https://www.youtube.com/@Assam_Society_Of_Ireland', title: 'YouTube' },
              ].map(({ icon, href, title }) => (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" title={title}
                  style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  {icon}
                </a>
              ))}
            </div>
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
          © Assam Society of Ireland
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Ireland
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
