import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import useMediaQuery from '../hooks/useMediaQuery'
import { useBookingPreview } from '../hooks/useLocalStorage'

const destinations = ['Maldives', 'Santorini', 'Bali', 'Tokyo', 'Swiss Alps', 'Amazon']
const travelers = [1, 2, 3, 4, 5, 6]

const basePrice = {
  Maldives: 2899, Santorini: 1899, Bali: 1299,
  Tokyo: 2299, 'Swiss Alps': 3499, Amazon: 2599,
}

function PriceBreakdown({ dest, count, date }) {
  const price = (basePrice[dest] || 1299) * count
  const tax = Math.round(price * 0.08)
  const total = price + tax

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: 'hidden', marginTop: 14 }}
    >
      <div style={{
        padding: 18,
        borderRadius: 14,
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.12)',
      }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Price Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13,             color: 'rgba(255,255,255,0.5)' }}>
            <span>{dest} × {count} traveler{count > 1 ? 's' : ''}</span>
            <span>${price.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13,             color: 'rgba(255,255,255,0.5)' }}>
            <span>Taxes & fees</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#fff' }}>
            <span>Total</span>
            <span style={{ color: '#818CF8' }}>${total.toLocaleString()}</span>
          </div>
        </div>
          {date && (
          <div style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Trip date: <span style={{ color: 'rgba(255,255,255,0.6)' }}>{date}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function BookingPreview() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { previewState, updateField } = useBookingPreview()

  const { dest, count, date, showPrice } = previewState

  const today = new Date().toISOString().split('T')[0]
  const bookingId = useMemo(() => Math.floor(Math.random() * 9000) + 1000, [])

  const handleConfirmBooking = () => {
    try {
      localStorage.setItem('selected_trip', JSON.stringify({
        destination: dest,
        travelers: count,
        date,
      }))
    } catch {
      // ignore
    }
    router.push('/book-now')
  }

  return (
    <section id="booking" style={{ padding: '80px 20px', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '-8%',
        width: 450,
        height: 450,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 40 : 56,
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ color: '#A78BFA', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Booking Preview
          </span>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 800,
            marginTop: 10,
            letterSpacing: '-1px',
            lineHeight: 1.15,
          }}>
            Preview Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #818CF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Dream Trip
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 420 }}>
            See real-time pricing, check availability, and customize your journey before you commit.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                Destination
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {destinations.map((d) => (
                  <motion.button
                    key={d}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { updateField('dest', d); updateField('showPrice', false) }}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 100,
                      border: `1px solid ${dest === d ? '#818CF8' : 'rgba(255,255,255,0.08)'}`,
                      background: dest === d ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                      color: dest === d ? '#818CF8' : 'rgba(255,255,255,0.4)',
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                  Travelers
                </label>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {travelers.map((n) => (
                    <motion.button
                      key={n}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => updateField('count', n)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: `1px solid ${count === n ? '#818CF8' : 'rgba(255,255,255,0.08)'}`,
                        background: count === n ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                        color: count === n ? '#818CF8' : 'rgba(255,255,255,0.4)',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s',
                      }}
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                  Departure
                </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => updateField('date', e.target.value)}
                    min={today}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    color: '#fff',
                    fontSize: 13,
                    colorScheme: 'dark',
                    fontWeight: 500,
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(99,102,241,0.2)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => updateField('showPrice', !showPrice)}
              style={{
                padding: '12px 28px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                marginTop: 4,
              }}
            >
              {showPrice ? 'Hide Pricing' : 'Preview Pricing'}
            </motion.button>

            <AnimatePresence>
              {showPrice && <PriceBreakdown dest={dest} count={count} date={date} />}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ position: 'relative' }}
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.01, 0.99, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
              borderRadius: 24,
              padding: isMobile ? 24 : 34,
              border: '1px solid rgba(99,102,241,0.15)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: '0.5px' }}>
                  Booking Summary
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#818CF8' }}>
                  #{bookingId}
                </span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
              {[
                { label: 'Destination', value: dest },
                { label: 'Travelers', value: `${count} ${count > 1 ? 'travelers' : 'traveler'}` },
                { label: 'Departure', value: date || 'Not set' },
                { label: 'Duration', value: '7 days / 6 nights' },
                { label: 'Accommodation', value: '★★★★★ Premium' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>{row.label}</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700 }}>
                <span style={{ color: '#fff' }}>Estimated Total</span>
                <span style={{ background: 'linear-gradient(135deg, #6366F1, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 18 }}>
                  ${((basePrice[dest] || 1299) * count * 1.08).toLocaleString()}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleConfirmBooking}
                style={{
                  marginTop: 6,
                  padding: '13px 0',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: '0.3px',
                }}
              >
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
