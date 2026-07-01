import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBookingHistory } from '../hooks/useLocalStorage'
import { fetchBookings } from '../api'

function AnimatedBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)', filter: 'blur(80px)' }} />
      <motion.div animate={{ x: [0, -30, 40, 0], y: [0, 40, -20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent)', filter: 'blur(70px)' }} />
    </div>
  )
}

const statusStyles = {
  pending: { color: '#F59E0B', label: 'Pending' },
  approved: { color: '#34D399', label: 'Approved' },
  rejected: { color: '#F472B6', label: 'Rejected' },
}

function BookingCard({ booking, onRemove }) {
  const dateStr = booking.departure
    ? new Date(booking.departure).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Date not set'

  const status = statusStyles[booking.status] || (booking.id ? { color: '#34D399', label: 'Confirmed' } : { color: 'rgba(255,255,255,0.3)', label: 'Local' })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: 20,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))',
        border: '1px solid rgba(99,102,241,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {booking.dest ? booking.dest[0] : '?'}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{booking.dest || 'Unknown'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''} · {dateStr}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#A78BFA' }}>
            ${(booking.total || 0).toLocaleString()}
          </div>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.5px',
            color: status.color,
            marginTop: 2,
          }}>
            {status.label}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, color: '#F472B6' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(booking._id || booking.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.2)', fontSize: 18, padding: 4,
            transition: 'color 0.2s',
          }}
          title="Remove"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M5 4v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function BookingHistory() {
  const navigate = useNavigate()
  const { history, removeBooking, clearHistory } = useBookingHistory()
  const [serverBookings, setServerBookings] = useState([])

  useEffect(() => {
    fetchBookings()
      .then(setServerBookings)
      .catch(() => {})
  }, [])

  const allBookings = [
    ...serverBookings.map(b => ({ ...b, _fromServer: true })),
    ...history.filter(h => !serverBookings.some(s => s.email === h.email && s.dest === h.dest)),
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', position: 'relative' }}>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 20px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 700, margin: '0 auto' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ color: '#818CF8', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                My Bookings
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, marginTop: 6, color: '#fff', letterSpacing: '-0.5px' }}>
                Your Trip History
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>
                {allBookings.length} booking{allBookings.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {allBookings.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: '#F472B655' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={clearHistory}
                  style={{
                    padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Clear All
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(99,102,241,0.2)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/book-now')}
                style={{
                  padding: '10px 20px', borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                New Booking
              </motion.button>
            </div>
          </div>

          {allBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                textAlign: 'center', padding: '60px 20px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 0.95, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 64, height: 64, margin: '0 auto 16px',
                  borderRadius: 18,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))',
                  border: '1px solid rgba(99,102,241,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </motion.div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>No bookings yet</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20, maxWidth: 320, margin: '0 auto 20px' }}>
                Your confirmed trips will appear here. Start planning your next adventure!
              </p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/book-now')}
                style={{
                  padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}
              >
                Plan Your First Trip
              </motion.button>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <AnimatePresence>
                {allBookings.map(booking => (
                  <BookingCard key={booking._id || booking.id} booking={booking} onRemove={removeBooking} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}