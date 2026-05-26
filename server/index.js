import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '../data/events.json')

// Change this password to whatever you prefer
const ADMIN_PASSWORD = 'assam2025'

const app = express()
app.use(cors())
app.use(express.json())

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// Auth
app.post('/api/auth', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ ok: true })
  } else {
    res.status(401).json({ ok: false, error: 'Invalid password' })
  }
})

// Get all events
app.get('/api/events', (req, res) => {
  res.json(readData())
})

// Upcoming events
app.post('/api/events/upcoming', (req, res) => {
  const data = readData()
  const event = { id: randomUUID(), ...req.body }
  data.upcoming.push(event)
  writeData(data)
  res.json(event)
})

app.put('/api/events/upcoming/:id', (req, res) => {
  const data = readData()
  const idx = data.upcoming.findIndex(e => e.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  data.upcoming[idx] = { id: req.params.id, ...req.body }
  writeData(data)
  res.json(data.upcoming[idx])
})

app.delete('/api/events/upcoming/:id', (req, res) => {
  const data = readData()
  data.upcoming = data.upcoming.filter(e => e.id !== req.params.id)
  writeData(data)
  res.json({ ok: true })
})

// Past events
app.post('/api/events/past', (req, res) => {
  const data = readData()
  const event = { id: randomUUID(), ...req.body }
  data.past.push(event)
  writeData(data)
  res.json(event)
})

app.put('/api/events/past/:id', (req, res) => {
  const data = readData()
  const idx = data.past.findIndex(e => e.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  data.past[idx] = { id: req.params.id, ...req.body }
  writeData(data)
  res.json(data.past[idx])
})

app.delete('/api/events/past/:id', (req, res) => {
  const data = readData()
  data.past = data.past.filter(e => e.id !== req.params.id)
  writeData(data)
  res.json({ ok: true })
})

// Reorder events
app.post('/api/events/:section/reorder', (req, res) => {
  const { section } = req.params
  if (!['upcoming', 'past'].includes(section)) return res.status(400).json({ error: 'Invalid section' })
  const data = readData()
  const map = Object.fromEntries(data[section].map(e => [e.id, e]))
  data[section] = req.body.ids.map(id => map[id]).filter(Boolean)
  writeData(data)
  res.json({ ok: true })
})

// Move event between sections
app.post('/api/events/move', (req, res) => {
  const { id, from } = req.body
  const to = from === 'upcoming' ? 'past' : 'upcoming'
  const data = readData()

  const idx = data[from].findIndex(e => e.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })

  const event = data[from].splice(idx, 1)[0]

  const moved = from === 'upcoming'
    ? { id: event.id, year: event.date.year, title: event.title, location: event.location }
    : { id: event.id, date: { day: '', month: 'Jan', year: event.year }, title: event.title, subtitle: '', location: event.location, desc: '', tag: 'Community' }

  data[to].push(moved)
  writeData(data)
  res.json({ moved, to })
})

const PORT = 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
