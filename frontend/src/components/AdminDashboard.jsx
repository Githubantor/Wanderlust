import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminFetchBookings, adminUpdateBooking } from '../api'

const statusColors = {
  pending: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B', label: 'Pending' },
  approved: { bg: 'rgba(52,211,153,0.12)', text: '#34D399', label: 'Approved' },
  rejected: { bg: 'rgba(244,114,182,0.12)', text: '#F472B6', label: 'Rejected' },
}

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

function BookingCard({ booking, onAction }) {
  const statusStyle = statusColors[booking.status] || statusColors.pending
  const dateStr = booking.departure ? new Date(booking.departure).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      style={{
        padding: 20, borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))',
        border: '1px solid rgba(99,102,241,0.08)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{booking.dest || 'Unknown'}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: statusStyle.bg, color: statusStyle.text, fontWeight: 600 }}>
              {statusStyle.label}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''} · {dateStr}
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#A78BFA' }}>${(booking.total || 0).toLocaleString()}</div>
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'rgba(255,255,255,0.35)', flexWrap: 'wrap' }}>
        {booking.name && <span><span style={{ color: 'rgba(255,255,255,0.5)' }}>Name:</span> {booking.name}</span>}
        {booking.email && <span><span style={{ color: 'rgba(255,255,255,0.5)' }}>Email:</span> {booking.email}</span>}
        {booking.phone && <span><span style={{ color: 'rgba(255,255,255,0.5)' }}>Phone:</span> {booking.phone}</span>}
      </div>

      {booking.notes && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          "{booking.notes}"
        </div>
      )}

      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
        Booked: {new Date(booking.bookedAt || booking.timestamp).toLocaleString()}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => onAction(booking._id, 'approved')}
          style={{
            flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
            background: booking.status === 'approved'
              ? 'rgba(52,211,153,0.15)'
              : 'linear-gradient(135deg, #34D399, #059669)',
            color: booking.status === 'approved' ? 'rgba(52,211,153,0.5)' : '#fff',
            fontWeight: 600, fontSize: 12, cursor: 'pointer',
            opacity: booking.status === 'approved' ? 0.6 : 1,
          }}
        >
          {booking.status === 'approved' ? 'Approved' : 'Approve'}
        </motion.button>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => onAction(booking._id, 'rejected')}
          style={{
            flex: 1, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(244,114,182,0.3)',
            background: booking.status === 'rejected'
              ? 'rgba(244,114,182,0.12)'
              : 'transparent',
            color: booking.status === 'rejected' ? 'rgba(244,114,182,0.5)' : '#F472B6',
            fontWeight: 600, fontSize: 12, cursor: 'pointer',
            opacity: booking.status === 'rejected' ? 0.6 : 1,
          }}
        >
          {booking.status === 'rejected' ? 'Rejected' : 'Reject'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null

  useEffect(() => {
    if (!token) {
      navigate('/admin-login')
      return
    }
    loadBookings()
  }, [token])

  async function loadBookings() {
    setLoading(true)
    try {
      const data = await adminFetchBookings(token)
      setBookings(data)
    } catch {
      sessionStorage.removeItem('admin_token')
      navigate('/admin-login')
    }
    setLoading(false)
  }

  async function handleAction(id, status) {
    try {
      await adminUpdateBooking(id, { status }, token)
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b))
    } catch {
      loadBookings()
    }
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)
  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_token')
    navigate('/admin-login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', position: 'relative' }}>
      <AnimatedBg />
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 20px 80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ color: '#818CF8', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Admin Panel</span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, marginTop: 6, color: '#fff', letterSpacing: '-0.5px' }}>
              Manage Bookings
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={loadBookings}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Refresh
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(244,114,182,0.3)', background: 'transparent', color: '#F472B6', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Logout
            </motion.button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All', count: counts.all },
            { key: 'pending', label: 'Pending', count: counts.pending },
            { key: 'approved', label: 'Approved', count: counts.approved },
            { key: 'rejected', label: 'Rejected', count: counts.rejected },
          ].map(f => (
            <motion.button key={f.key} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '6px 14px', borderRadius: 100, border: `1px solid ${filter === f.key ? '#818CF8' : 'rgba(255,255,255,0.08)'}`,
                background: filter === f.key ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                color: filter === f.key ? '#818CF8' : 'rgba(255,255,255,0.4)',
                fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s',
              }}>
              {f.label} ({f.count})
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(99,102,241,0.2)', borderTopColor: '#818CF8', margin: '0 auto 12px' }} />
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Loading bookings...</div>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '60px 20px', borderRadius: 18, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.3" strokeLinecap="round" style={{ margin: '0 auto 12px', display: 'block' }}>
              <circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>
            </svg>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>No bookings found</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Waiting for customers to book their trips.</p>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AnimatePresence>
              {filtered.map(b => <BookingCard key={b._id} booking={b} onAction={handleAction} />)}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
