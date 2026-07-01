import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useMediaQuery from '../hooks/useMediaQuery'
import { useBookingForm, useBookingHistory, useUserProfile, useSelectedTrip } from '../hooks/useLocalStorage'
import { createBooking } from '../lib/api-client'

const destinations = [
  { name: 'Maldives', price: 2899, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=80&h=80&fit=crop&auto=format' },
  { name: 'Santorini', price: 1899, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&h=80&fit=crop&auto=format' },
  { name: 'Bali', price: 1299, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&h=80&fit=crop&auto=format' },
  { name: 'Tokyo', price: 2299, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=80&h=80&fit=crop&auto=format' },
  { name: 'Swiss Alps', price: 3499, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&auto=format' },
  { name: 'Amazon', price: 2599, image: undefined },
]

const addons = [
  { id: 'guide', label: 'Private Guide', price: 399, desc: 'Personal local guide for your entire trip' },
  { id: 'photography', label: 'Photography Package', price: 249, desc: 'Professional photos throughout your journey' },
  { id: 'insurance', label: 'Travel Insurance', price: 179, desc: 'Full coverage including cancellation' },
  { id: 'transport', label: 'Luxury Transfers', price: 299, desc: 'Airport pickup & drop, all destinations' },
]

function AnimatedBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-5%', width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-5%', right: '-5%', width: 450, height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent)',
          filter: 'blur(70px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -20, 40, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '40%', left: '60%', width: 350, height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.04), transparent)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { trip: selectedTrip, setTrip, removeTrip } = useSelectedTrip()
  const { formState, updateField, updateMultiple, resetForm } = useBookingForm()
  const { addBooking } = useBookingHistory()
  const { profile, updateProfile } = useUserProfile()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const {
    dest,
    travelers,
    departure,
    returnDate,
    name,
    email,
    phone,
    notes,
    selectedAddons,
    step,
  } = formState

  const today = new Date().toISOString().split('T')[0]
  const dateError = departure && returnDate && returnDate < departure
    ? 'Return date must be after departure'
    : ''

  useEffect(() => {
    if (selectedTrip) {
      const updates = {}
      if (selectedTrip.destination) updates.dest = selectedTrip.destination
      if (selectedTrip.travelers) updates.travelers = selectedTrip.travelers
      if (selectedTrip.count) updates.travelers = selectedTrip.count
      if (selectedTrip.date) updates.departure = selectedTrip.date
      updates.step = 2
      updateMultiple(updates)
      removeTrip()
    }
  }, [selectedTrip])

  useEffect(() => {
    if (!selectedTrip && !searchParams.get('destination')) {
      try { localStorage.removeItem('booking_form_state') } catch {}
    }
  }, [])

  useEffect(() => {
    if ((!selectedTrip && !searchParams.get('destination')) || dest) return
    if (profile.name && !name) {
      updateMultiple({ name: profile.name, email: profile.email, phone: profile.phone })
    }
  }, [profile, name])

  const bookingId = useMemo(() => Math.floor(Math.random() * 90000) + 10000, [])

  const selectedDest = destinations.find(d => d.name === dest)
  const baseTotal = selectedDest ? selectedDest.price * travelers : 0
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = addons.find(x => x.id === id)
    return sum + (a ? a.price : 0)
  }, 0)
  const tax = Math.round((baseTotal + addonsTotal) * 0.08)
  const total = baseTotal + addonsTotal + tax

  function toggleAddon(id) {
    updateField('selectedAddons',
      selectedAddons.includes(id)
        ? selectedAddons.filter(x => x !== id)
        : [...selectedAddons, id]
    )
  }

  function validate() {
    const errs = {}
    if (!dest) errs.dest = 'Select a destination'
    if (!name?.trim()) errs.name = 'Enter your full name'
    if (!email?.trim()) errs.email = 'Enter your email'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email format'
    if (!departure) errs.departure = 'Select a departure date'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsSubmitting(true)
    const bookingData = {
      dest,
      travelers,
      departure,
      returnDate,
      name,
      email,
      phone,
      notes,
      selectedAddons,
      total,
      bookedAt: new Date().toISOString(),
    }

    try {
      await createBooking(bookingData)
    } catch {
      // continue with local save even if backend fails
    }

    addBooking({
      id: bookingId,
      ...bookingData,
    })
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const cardStyle = {
    padding: 28,
    borderRadius: 18,
    background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))',
    border: '1px solid rgba(99,102,241,0.08)',
  }

  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)',
    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8, display: 'block',
  }

  const inputStyle = {
    padding: '11px 14px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.02)',
    color: '#fff', fontSize: 13, fontWeight: 500,
    outline: 'none', width: '100%', fontFamily: 'inherit',
    transition: 'border-color 0.25s',
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#08080e', position: 'relative', color: '#fff' }}>
        <AnimatedBg />
        <div style={{ position: 'relative', zIndex: 1, padding: '120px 20px 80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', maxWidth: 480 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #34D399, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 32,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </motion.div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Booking Confirmed!</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 8 }}>Your adventure is being prepared. We'll be in touch within 24 hours.</p>
            <div style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: 8,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)',
              fontSize: 13, fontWeight: 700, color: '#818CF8', letterSpacing: '1px', marginBottom: 20,
            }}>
              BOOKING #{bookingId}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }} whileTap={{ scale: 0.96 }}
                onClick={() => router.push('/#destinations')}
                style={{
                  padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  letterSpacing: '0.3px',
                }}
              >
                Explore More Trips
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' }} whileTap={{ scale: 0.96 }}
                onClick={() => router.push('/')}
                style={{
                  padding: '12px 28px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  letterSpacing: '0.3px',
                }}
              >
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#08080e', position: 'relative' }}>
      <AnimatedBg />

      <div style={{ position: 'relative', zIndex: 1, padding: '100px 20px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <span style={{ color: '#818CF8', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Book Your Trip
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginTop: 8,
            letterSpacing: '-1px', color: '#fff',
          }}>
            Let's Make It{' '}
            <span style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Official
            </span>
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit} style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
            gap: 28,
            alignItems: 'start',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Step indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}
              >
                {[1, 2, 3, 4].map(s => (
                  <motion.div
                    key={s}
                    animate={step >= s ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: step >= s ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      color: step >= s ? '#fff' : 'rgba(255,255,255,0.25)',
                      border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.3s',
                    }}>
                      {s}
                    </div>
                    {s < 4 && <div style={{
                      width: 24, height: 1.5,
                      background: step > s ? '#818CF8' : 'rgba(255,255,255,0.06)',
                      borderRadius: 1,
                      transition: 'background 0.3s',
                    }} />}
                  </motion.div>
                ))}
              </motion.div>

              {/* Step 1: Destination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ ...cardStyle, borderColor: errors.dest ? 'rgba(244,114,182,0.3)' : cardStyle.border }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  <span style={{ color: '#818CF8' }}>01</span> Choose Destination
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 8 }}>
                  {destinations.map(d => (
                    <motion.button
                      type="button"
                      key={d.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setErrors(prev => ({ ...prev, dest: '' })); updateField('dest', d.name); updateField('step', Math.max(step, 2)) }}
                      style={{
                        padding: 14, borderRadius: 12,
                        border: `1px solid ${dest === d.name ? '#818CF8' : 'rgba(255,255,255,0.06)'}`,
                        background: dest === d.name ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.015)',
                        cursor: 'pointer', textAlign: 'center',
                        transition: 'all 0.25s',
                      }}
                    >
                      <div style={{
                        fontSize: 12, fontWeight: 600,
                        color: dest === d.name ? '#818CF8' : 'rgba(255,255,255,0.6)',
                        marginBottom: 2,
                      }}>
                        {d.name}
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 700,
                        color: dest === d.name ? '#A78BFA' : 'rgba(255,255,255,0.25)',
                      }}>
                        From ${d.price}
                      </div>
                    </motion.button>
                  ))}
                </div>
                {errors.dest && (
                  <div style={{ fontSize: 11, color: '#F472B6', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
                    {errors.dest}
                  </div>
                )}
              </motion.div>

              {/* Step 2: Dates & Travelers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={cardStyle}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  <span style={{ color: '#818CF8' }}>02</span> Dates & Travelers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Departure</label>
                      <input type="date" value={departure} onChange={e => { setErrors(prev => ({ ...prev, departure: '' })); updateField('departure', e.target.value); updateField('step', Math.max(step, 3)) }}
                        min={today}
                        style={{ ...inputStyle, colorScheme: 'dark', borderColor: errors.departure ? 'rgba(244,114,182,0.4)' : inputStyle.border }} />
                      {errors.departure && (
                        <div style={{ fontSize: 11, color: '#F472B6', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
                          {errors.departure}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={labelStyle}>Return</label>
                      <input type="date" value={returnDate} onChange={e => updateField('returnDate', e.target.value)}
                        min={departure || today}
                        style={{ ...inputStyle, colorScheme: 'dark', borderColor: dateError ? 'rgba(244,114,182,0.4)' : 'rgba(255,255,255,0.08)' }} />
                      {dateError && (
                        <div style={{ fontSize: 11, color: '#F472B6', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
                          {dateError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Travelers</label>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <motion.button
                          type="button" key={n}
                          whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.94 }}
                          onClick={() => updateField('travelers', n)}
                          style={{
                            width: 38, height: 38, borderRadius: 8,
                            border: `1px solid ${travelers === n ? '#818CF8' : 'rgba(255,255,255,0.08)'}`,
                            background: travelers === n ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                            color: travelers === n ? '#818CF8' : 'rgba(255,255,255,0.4)',
                            fontSize: 12, fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.25s',
                          }}
                        >
                          {n}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Personal Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={cardStyle}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  <span style={{ color: '#818CF8' }}>03</span> Personal Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" value={name} onChange={e => { setErrors(prev => ({ ...prev, name: '' })); updateField('name', e.target.value); updateField('step', Math.max(step, 4)); updateProfile({ name: e.target.value }) }}
                        placeholder="John Doe" style={{ ...inputStyle, borderColor: errors.name ? 'rgba(244,114,182,0.4)' : inputStyle.border }} />
                      {errors.name && (
                        <div style={{ fontSize: 11, color: '#F472B6', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input type="email" value={email} onChange={e => { setErrors(prev => ({ ...prev, email: '' })); updateField('email', e.target.value); updateProfile({ email: e.target.value }) }}
                        placeholder="john@example.com" style={{ ...inputStyle, borderColor: errors.email ? 'rgba(244,114,182,0.4)' : inputStyle.border }} />
                      {errors.email && (
                        <div style={{ fontSize: 11, color: '#F472B6', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"><circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h0"/></svg>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={phone} onChange={e => { updateField('phone', e.target.value); updateProfile({ phone: e.target.value }) }}
                      placeholder="+1 (555) 000-0000" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Special Requests</label>
                    <textarea value={notes} onChange={e => updateField('notes', e.target.value)}
                      placeholder="Any dietary requirements, room preferences, or special occasions..."
                      rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                </div>
              </motion.div>

              {/* Step 4: Extras */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={cardStyle}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  <span style={{ color: '#818CF8' }}>04</span> Add-Ons
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {addons.map(a => (
                    <motion.div
                      key={a.id}
                      whileHover={{ borderColor: 'rgba(129,140,248,0.2)', y: -1 }}
                      onClick={() => toggleAddon(a.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                        border: `1px solid ${selectedAddons.includes(a.id) ? '#818CF8' : 'rgba(255,255,255,0.06)'}`,
                        background: selectedAddons.includes(a.id) ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.015)',
                        transition: 'all 0.25s',
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        border: `2px solid ${selectedAddons.includes(a.id) ? '#818CF8' : 'rgba(255,255,255,0.15)'}`,
                        background: selectedAddons.includes(a.id) ? '#818CF8' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.25s',
                      }}>
                        {selectedAddons.includes(a.id) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6l2.5 2.5 4.5-5"/>
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{a.label}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{a.desc}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA' }}>${a.price}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar: Price Summary */}
            <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={cardStyle}
              >
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 18 }}>
                  Booking Summary
                </h4>

                {selectedDest ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                      display: 'flex', gap: 12, marginBottom: 16, padding: 12, borderRadius: 12,
                      background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.1)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {selectedDest.image ? (
                        <img src={selectedDest.image} alt={selectedDest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{selectedDest.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{selectedDest.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>${selectedDest.price} / person</div>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ padding: '20px 0', textAlign: 'center' }}>
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 0.95, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: 56, height: 56, margin: '0 auto 8px',
                        borderRadius: 16,
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))',
                        border: '1px solid rgba(99,102,241,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#818CF8" strokeWidth="1.3" opacity="0.4"/>
                        <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#A78BFA" strokeWidth="1" opacity="0.5"/>
                        <line x1="3" y1="12" x2="21" y2="12" stroke="#818CF8" strokeWidth="1" opacity="0.3"/>
                        <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" stroke="#A78BFA" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2"/>
                        <circle cx="12" cy="12" r="2" fill="url(#glowGrad)" opacity="0.6"/>
                        <defs>
                          <radialGradient id="glowGrad"><stop stopColor="#818CF8"/><stop offset="1" stopColor="#A78BFA"/></radialGradient>
                        </defs>
                      </svg>
                    </motion.div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Select a destination to see pricing</div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <span>Base ({travelers} traveler{travelers > 1 ? 's' : ''})</span>
                    <span>${baseTotal.toLocaleString()}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}
                    >
                      <span>Add-ons ({selectedAddons.length})</span>
                      <span>${addonsTotal.toLocaleString()}</span>
                    </motion.div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <span>Taxes & fees</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '14px 0' }} />

                <motion.div
                  animate={total > 0 ? { scale: [1, 1.01, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}
                >
                  <span>Total</span>
                  <span style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ${total.toLocaleString()}
                  </span>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={!isSubmitting ? { scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.25)' } : {}}
                  whileTap={!isSubmitting ? { scale: 0.96 } : {}}
                  style={{
                    width: '100%', padding: '15px 0', borderRadius: 12, border: 'none',
                    background: `linear-gradient(135deg, #6366F1, #8B5CF6)`,
                    color: '#fff', fontWeight: 600, fontSize: 13, cursor: isSubmitting ? 'wait' : 'pointer',
                    letterSpacing: '0.3px',
                    opacity: isSubmitting ? 0.6 : 1,
                    transition: 'opacity 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                      Confirming...
                    </>
                  ) : (
                    'Confirm & Book'
                  )}
                </motion.button>

                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 10 }}>
                  No payment required now. We'll confirm availability first.
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
