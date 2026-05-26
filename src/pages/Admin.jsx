import { useState, useEffect } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const TAGS = ['Cultural Festival','Arts','Community','Seasonal','Sports','Food','Music','Dance','Other']
const YEAR = new Date().getFullYear().toString()

const UPCOMING_EMPTY = {
  title: '', subtitle: '',
  date: { day: '', month: 'Jan', year: YEAR },
  location: '', desc: '', tag: 'Cultural Festival',
}
const PAST_EMPTY = { year: YEAR, title: '', location: '' }

// ── style helpers ────────────────────────────────────────────
const inp = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(196,149,58,0.2)',
  borderRadius: '4px',
  color: 'var(--cream)',
  padding: '10px 14px',
  fontSize: '0.85rem',
  fontFamily: 'var(--font-sans)',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
}
const lbl = {
  display: 'block',
  fontSize: '0.68rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '6px',
}
const field = { marginBottom: '16px' }

function btn(variant = 'ghost') {
  const base = {
    border: 'none', cursor: 'pointer', borderRadius: '3px',
    fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '8px 18px', fontFamily: 'var(--font-sans)',
  }
  if (variant === 'primary') return { ...base, background: 'var(--gold)', color: '#09160f' }
  if (variant === 'danger')  return { ...base, background: 'rgba(220,50,50,0.12)', color: '#e06060', border: '1px solid rgba(220,50,50,0.25)' }
  return { ...base, background: 'rgba(255,255,255,0.06)', color: 'var(--cream)', border: '1px solid var(--border)' }
}

// ── LoginScreen ──────────────────────────────────────────────
function LoginScreen({ password, setPassword, onLogin, error }) {
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: '360px', padding: '48px',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ display: 'block', color: 'var(--gold)', fontSize: '2rem', marginBottom: '16px' }}>◆</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontSize: '1.6rem', marginBottom: '6px' }}>
            Admin
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Assam Society of Ireland</p>
        </div>
        <form onSubmit={onLogin}>
          <label style={lbl}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inp, marginBottom: error ? '8px' : '20px' }}
            autoFocus
          />
          {error && (
            <p style={{ color: '#e06060', fontSize: '0.78rem', marginBottom: '16px' }}>{error}</p>
          )}
          <button type="submit" style={{ ...btn('primary'), width: '100%', padding: '12px' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

// ── EventForm ────────────────────────────────────────────────
function EventForm({ form, setForm, onSave }) {
  const { section, data } = form
  const set = (key, val) => setForm(f => ({ ...f, data: { ...f.data, [key]: val } }))
  const setDate = (key, val) => setForm(f => ({ ...f, data: { ...f.data, date: { ...f.data.date, [key]: val } } }))

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid rgba(196,149,58,0.3)',
      borderRadius: '6px', padding: '32px', marginBottom: '24px',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-serif)', color: 'var(--gold)',
        fontSize: '1.1rem', marginBottom: '28px',
      }}>
        {form.type === 'add' ? 'Add' : 'Edit'} {section === 'upcoming' ? 'Upcoming' : 'Past'} Event
      </h3>

      {section === 'upcoming' ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={field}>
              <label style={lbl}>Title</label>
              <input style={inp} value={data.title} onChange={e => set('title', e.target.value)} placeholder="Event name" />
            </div>
            <div style={field}>
              <label style={lbl}>Subtitle</label>
              <input style={inp} value={data.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Short tagline" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!!data.date.tbd}
                onChange={e => setDate('tbd', e.target.checked)}
                style={{ accentColor: 'var(--gold)', width: '15px', height: '15px' }}
              />
              <span style={{ ...lbl, margin: 0 }}>Date TBD</span>
            </label>
          </div>

          {!data.date.tbd && (
            <div style={{ display: 'grid', gridTemplateColumns: '80px 130px 90px 1fr', gap: '16px' }}>
              <div style={field}>
                <label style={lbl}>Day</label>
                <input style={inp} value={data.date.day} onChange={e => setDate('day', e.target.value)} placeholder="13" maxLength="2" />
              </div>
              <div style={field}>
                <label style={lbl}>Month</label>
                <select style={inp} value={data.date.month} onChange={e => setDate('month', e.target.value)}>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div style={field}>
                <label style={lbl}>Year</label>
                <input style={inp} value={data.date.year} onChange={e => setDate('year', e.target.value)} placeholder="2025" maxLength="4" />
              </div>
              <div style={field}>
                <label style={lbl}>Tag</label>
                <select style={inp} value={data.tag} onChange={e => set('tag', e.target.value)}>
                  {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          {data.date.tbd && (
            <div style={{ ...field, maxWidth: '200px' }}>
              <label style={lbl}>Tag</label>
              <select style={inp} value={data.tag} onChange={e => set('tag', e.target.value)}>
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}

          <div style={field}>
            <label style={lbl}>Location</label>
            <input style={inp} value={data.location} onChange={e => set('location', e.target.value)} placeholder="Venue, City" />
          </div>

          <div style={field}>
            <label style={lbl}>Description</label>
            <textarea
              style={{ ...inp, minHeight: '90px', resize: 'vertical' }}
              value={data.desc}
              onChange={e => set('desc', e.target.value)}
              placeholder="Event description..."
            />
          </div>
        </>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', gap: '16px' }}>
          <div style={field}>
            <label style={lbl}>Year</label>
            <input style={inp} value={data.year} onChange={e => set('year', e.target.value)} placeholder="2024" maxLength="4" />
          </div>
          <div style={field}>
            <label style={lbl}>Title</label>
            <input style={inp} value={data.title} onChange={e => set('title', e.target.value)} placeholder="Event name" />
          </div>
          <div style={field}>
            <label style={lbl}>Location</label>
            <input style={inp} value={data.location} onChange={e => set('location', e.target.value)} placeholder="City" />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
        <button onClick={onSave} style={btn('primary')}>Save Event</button>
        <button onClick={() => setForm(null)} style={btn('ghost')}>Cancel</button>
      </div>
    </div>
  )
}

// ── UpcomingRow ──────────────────────────────────────────────
const arrowBtn = (disabled) => ({
  background: 'none', border: '1px solid var(--border)', borderRadius: '3px',
  color: disabled ? 'rgba(255,255,255,0.15)' : 'var(--text-muted)',
  cursor: disabled ? 'default' : 'pointer',
  fontSize: '0.75rem', padding: '5px 8px', lineHeight: 1,
  pointerEvents: disabled ? 'none' : 'auto',
})

function UpcomingRow({ event, onEdit, onDelete, onMove, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div style={{
      background: 'var(--bg)', padding: '20px 28px',
      display: 'grid', gridTemplateColumns: '80px 1fr auto',
      gap: '24px', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        {event.date.tbd ? (
          <span style={{
            display: 'block', fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem', color: 'var(--gold)', lineHeight: 1, letterSpacing: '0.05em',
          }}>
            TBD
          </span>
        ) : (
          <>
            <span style={{
              display: 'block', fontFamily: 'var(--font-serif)',
              fontSize: '2rem', color: 'var(--gold)', lineHeight: 1,
            }}>
              {event.date.day}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {event.date.month} {event.date.year}
            </span>
          </>
        )}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--cream)', marginBottom: '4px' }}>
          {event.title}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {event.location}
          {event.tag && <> · <span style={{ color: 'rgba(196,149,58,0.7)' }}>{event.tag}</span></>}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <button onClick={onMoveUp} style={arrowBtn(isFirst)} title="Move up">▲</button>
          <button onClick={onMoveDown} style={arrowBtn(isLast)} title="Move down">▼</button>
        </div>
        <button onClick={onMove} style={btn('ghost')} title="Move to Past Events">→ Past</button>
        <button onClick={onEdit} style={btn('ghost')}>Edit</button>
        <button onClick={onDelete} style={btn('danger')}>Delete</button>
      </div>
    </div>
  )
}

// ── PastRow ──────────────────────────────────────────────────
function PastRow({ event, onEdit, onDelete, onMove, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '24px',
      padding: '18px 0', borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--text-muted)', minWidth: '44px' }}>
        {event.year}
      </span>
      <p style={{ flex: 1, fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--cream)' }}>
        {event.title}
      </p>
      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{event.location}</span>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <button onClick={isFirst ? undefined : onMoveUp} style={arrowBtn(isFirst)} title="Move up">▲</button>
          <button onClick={isLast ? undefined : onMoveDown} style={arrowBtn(isLast)} title="Move down">▼</button>
        </div>
        <button onClick={onMove} style={btn('ghost')} title="Move to Upcoming Events">← Upcoming</button>
        <button onClick={onEdit} style={btn('ghost')}>Edit</button>
        <button onClick={onDelete} style={btn('danger')}>Delete</button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      No events yet — add one above.
    </div>
  )
}

// ── Admin ────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('upcoming')
  const [events, setEvents] = useState({ upcoming: [], past: [] })
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (authed) fetchEvents()
  }, [authed])

  async function fetchEvents() {
    try {
      const res = await fetch('/api/events')
      setEvents(await res.json())
    } catch {}
  }

  async function login(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('admin_authed', '1')
        setAuthed(true)
      } else {
        setLoginError('Incorrect password')
      }
    } catch {
      setLoginError('Cannot connect to server — is it running?')
    }
  }

  function logout() {
    sessionStorage.removeItem('admin_authed')
    setAuthed(false)
  }

  function openAdd(section) {
    const data = section === 'upcoming'
      ? { ...UPCOMING_EMPTY, date: { ...UPCOMING_EMPTY.date } }
      : { ...PAST_EMPTY }
    setForm({ type: 'add', section, data })
  }

  function openEdit(section, event) {
    const data = section === 'upcoming'
      ? { ...event, date: { ...event.date } }
      : { ...event }
    setForm({ type: 'edit', section, data, id: event.id })
  }

  async function saveForm() {
    const { type, section, data, id } = form
    const url = type === 'add' ? `/api/events/${section}` : `/api/events/${section}/${id}`
    await fetch(url, {
      method: type === 'add' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setForm(null)
    fetchEvents()
  }

  async function deleteEvent(section, id) {
    if (!confirm('Delete this event? This cannot be undone.')) return
    await fetch(`/api/events/${section}/${id}`, { method: 'DELETE' })
    fetchEvents()
  }

  async function reorderEvent(section, id, direction) {
    const list = [...events[section]]
    const idx = list.findIndex(e => e.id === id)
    const next = direction === 'up' ? idx - 1 : idx + 1
    if (next < 0 || next >= list.length) return
    ;[list[idx], list[next]] = [list[next], list[idx]]
    await fetch(`/api/events/${section}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: list.map(e => e.id) }),
    })
    fetchEvents()
  }

  async function moveEvent(section, event) {
    const dest = section === 'upcoming' ? 'past' : 'upcoming'
    if (!confirm(`Move "${event.title}" to ${dest} events?`)) return
    const res = await fetch('/api/events/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: event.id, from: section }),
    })
    const { to } = await res.json()
    setTab(to)
    setForm(null)
    fetchEvents()
  }

  if (!authed) {
    return (
      <LoginScreen
        password={password}
        setPassword={setPassword}
        onLogin={login}
        error={loginError}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--cream)', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)', padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--gold)', fontSize: '1.3rem' }}>◆</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--cream)' }}>Admin</span>
          <span style={{ fontSize: '0.67rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Assam Society of Ireland
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← View Site</a>
          <button onClick={logout} style={btn('ghost')}>Log out</button>
        </div>
      </header>

      {/* Body */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 32px 80px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '40px' }}>
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setForm(null) }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 24px',
                fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom: tab === t ? '1px solid var(--gold)' : '1px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {t === 'upcoming'
                ? `Upcoming Events (${events.upcoming.length})`
                : `Past Events (${events.past.length})`
              }
            </button>
          ))}
        </div>

        {/* Add button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button onClick={() => openAdd(tab)} style={btn('primary')}>+ Add Event</button>
        </div>

        {/* Form */}
        {form && form.section === tab && (
          <EventForm form={form} setForm={setForm} onSave={saveForm} />
        )}

        {/* Upcoming list */}
        {tab === 'upcoming' && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1px',
            background: events.upcoming.length ? 'var(--border)' : 'transparent',
          }}>
            {events.upcoming.length === 0
              ? <EmptyState />
              : events.upcoming.map((ev, i, arr) => (
                <UpcomingRow
                  key={ev.id}
                  event={ev}
                  isFirst={i === 0}
                  isLast={i === arr.length - 1}
                  onMoveUp={() => reorderEvent('upcoming', ev.id, 'up')}
                  onMoveDown={() => reorderEvent('upcoming', ev.id, 'down')}
                  onEdit={() => openEdit('upcoming', ev)}
                  onDelete={() => deleteEvent('upcoming', ev.id)}
                  onMove={() => moveEvent('upcoming', ev)}
                />
              ))
            }
          </div>
        )}

        {/* Past list */}
        {tab === 'past' && (
          <div>
            {events.past.length === 0
              ? <EmptyState />
              : events.past.map((ev, i, arr) => (
                <PastRow
                  key={ev.id}
                  event={ev}
                  isFirst={i === 0}
                  isLast={i === arr.length - 1}
                  onMoveUp={() => reorderEvent('past', ev.id, 'up')}
                  onMoveDown={() => reorderEvent('past', ev.id, 'down')}
                  onEdit={() => openEdit('past', ev)}
                  onDelete={() => deleteEvent('past', ev.id)}
                  onMove={() => moveEvent('past', ev)}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}
