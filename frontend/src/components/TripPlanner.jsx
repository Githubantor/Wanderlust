import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'

function DreamIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="5" width="18" height="14" rx="4" stroke={color} strokeWidth="1.3" fill={`${color}15`}/>
      <path d="M8 10h6M8 13h4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="3" cy="3" r="2.5" fill={color} opacity="0.3"/>
      <circle cx="3" cy="3" r="1" fill={color}/>
      <path d="M23 8l-1 2 2 1-2 1 1 2-2-1-2 1 1-2-2-1 2-1-1-2 2 1 2-1Z" fill={color} opacity="0.4"/>
    </svg>
  )
}

function CraftIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="10" stroke={color} strokeWidth="1.2" fill={`${color}10`}/>
      <path d="M13 5v8l5 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="13" cy="13" r="2" fill={color} opacity="0.5"/>
      <path d="M4 4l3 2M22 4l-3 2M4 22l3-2M22 22l-3-2" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
    </svg>
  )
}

function MagicIcon({ color }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 3v2M13 21v2M5 13H3M23 13h-2M6.34 6.34l-1.42-1.42M21.08 21.08l-1.42-1.42" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      <path d="M9 17l2-6 6-2-2 6-6 2Z" fill={color} opacity="0.25"/>
      <path d="M11 11l4-1.5-1.5 4-4 1.5L11 11Z" fill={color} opacity="0.6"/>
      <circle cx="19" cy="5" r="1.5" fill={color} opacity="0.5"/>
      <circle cx="21" cy="9" r="1" fill={color} opacity="0.3"/>
      <circle cx="17" cy="3" r="0.8" fill={color} opacity="0.4"/>
    </svg>
  )
}

function CompassIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3Z" fill={color} opacity="0.25"/>
      <path d="M9 5l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill={color} opacity="0.5"/>
    </svg>
  )
}

function HotelIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="5" width="12" height="10" rx="1.5" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <rect x="6" y="2" width="6" height="5" rx="1" fill={color} opacity="0.3"/>
      <rect x="5" y="8" width="2" height="2" rx="0.3" fill={color} opacity="0.4"/>
      <rect x="8" y="8" width="2" height="2" rx="0.3" fill={color} opacity="0.4"/>
      <rect x="11" y="8" width="2" height="2" rx="0.3" fill={color} opacity="0.4"/>
      <rect x="5" y="11" width="8" height="4" rx="0.5" fill={color} opacity="0.15"/>
      <rect x="7" y="12" width="4" height="3" rx="0.5" fill={color} opacity="0.4"/>
    </svg>
  )
}

function PlaneIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 13l3-1 2 2 4-4 3-1-1-1-4 1-3-3-1 1 3 3-3 2-2-1-1 2Z" fill={color} opacity="0.3"/>
      <path d="M9 9l4-4M9 9l-3 3M13 5l2-2-2 2Zm-1 1l3 2-3-2Zm-3 3l-2 3 2-3Z" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M6 12l-3 1 1-3 2 2Z" fill={color} opacity="0.6"/>
    </svg>
  )
}

function SupportIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <path d="M5 12c0-2 4-3 4-3s4 1 4 3v1a4 4 0 0 1-8 0v-1Z" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <circle cx="9" cy="7" r="1.5" fill={color} opacity="0.5"/>
      <circle cx="5" cy="14" r=".6" fill={color} opacity="0.4"/>
      <circle cx="13" cy="14" r=".6" fill={color} opacity="0.4"/>
    </svg>
  )
}

function ShieldIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2l6 2.5v4.5c0 3-2.5 5.5-6 7-3.5-1.5-6-4-6-7V4.5L9 2Z" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <path d="M9 4v10M6 7.5l2 2 4-3.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}

function CameraIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="5" width="14" height="10" rx="2" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <circle cx="9" cy="10" r="3" stroke={color} strokeWidth="1" fill={`${color}10`}/>
      <circle cx="9" cy="10" r="1.5" fill={color} opacity="0.4"/>
      <rect x="4" y="3" width="10" height="3" rx="1" fill={color} opacity="0.2"/>
      <circle cx="4.5" cy="7.5" r=".6" fill={color} opacity="0.5"/>
    </svg>
  )
}

const steps = [
  {
    number: '01',
    title: 'Tell Us Your Dream',
    desc: 'Share your preferences — destination, budget, travel style. We listen.',
    accent: '#818CF8',
    vibe: '#6366F1',
    Icon: DreamIcon,
    dots: ['✨', '💭', '⭐'],
    bgBlob: 'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15), transparent 60%), radial-gradient(circle at 20% 80%, rgba(129,140,248,0.08), transparent 50%)',
  },
  {
    number: '02',
    title: 'We Craft Your Journey',
    desc: 'Our experts design a personalized itinerary tailored exactly to you.',
    accent: '#A78BFA',
    vibe: '#8B5CF6',
    Icon: CraftIcon,
    dots: ['🎨', '✨', '🔮'],
    bgBlob: 'radial-gradient(circle at 20% 30%, rgba(139,92,246,0.15), transparent 60%), radial-gradient(circle at 80% 70%, rgba(167,139,250,0.08), transparent 50%)',
  },
  {
    number: '03',
    title: 'Experience the Magic',
    desc: 'Set off on a seamless, unforgettable adventure. We handle everything.',
    accent: '#34D399',
    vibe: '#059669',
    Icon: MagicIcon,
    dots: ['🌟', '🚀', '🎉'],
    bgBlob: 'radial-gradient(circle at 70% 30%, rgba(5,150,105,0.15), transparent 60%), radial-gradient(circle at 30% 80%, rgba(52,211,153,0.08), transparent 50%)',
  },
]

const perks = [
  { label: 'Local Guides', Icon: CompassIcon, color: '#818CF8' },
  { label: 'Premium Stays', Icon: HotelIcon, color: '#A78BFA' },
  { label: 'Flight Support', Icon: PlaneIcon, color: '#34D399' },
  { label: '24/7 Assistance', Icon: SupportIcon, color: '#F472B6' },
  { label: 'Best Price Guarantee', Icon: ShieldIcon, color: '#F59E0B' },
  { label: 'Photo Packages', Icon: CameraIcon, color: '#22D3EE' },
]

export default function TripPlanner() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="planner" style={{ padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '-8%',
        width: 450,
        height: 450,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.04), transparent)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 44 }}
        >
          <span style={{ color: '#34D399', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Plan Your Trip
          </span>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 800,
            marginTop: 10,
            letterSpacing: '-1px',
            lineHeight: 1.15,
          }}>
            Three Steps to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #34D399, #818CF8, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Adventure
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 10, maxWidth: 460, margin: '10px auto 0' }}>
            Planning with us is simple. Tell us where you want to go, and we take care of the rest.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 44,
        }}>
          {steps.map((step, i) => {
            const StepIcon = step.Icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.12 } }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                  whileHover={{
                    y: -18,
                    scale: 1.02,
                    borderColor: `${step.accent}55`,
                    transition: { type: 'spring', stiffness: 400, damping: 8 },
                  }}
                  style={{
                    padding: 0,
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: step.bgBlob,
                    pointerEvents: 'none',
                  }} />

                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 3,
                    opacity: 0.35,
                    pointerEvents: 'none',
                  }}>
                    {step.dots.map((d, j) => (
                      <motion.span
                        key={j}
                        animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
                        transition={{ duration: 2.2 + j * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: 9 }}
                      >
                        {d}
                      </motion.span>
                    ))}
                  </div>

                  <div style={{
                    height: 3,
                    background: `linear-gradient(90deg, ${step.vibe}, ${step.accent})`,
                    width: '100%',
                    borderRadius: '2px 2px 0 0',
                  }} />

                  <div style={{ padding: '20px 28px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${step.accent}20, ${step.accent}08)`,
                      border: `1px solid ${step.accent}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 24px ${step.accent}12`,
                    }}
                  >
                    <StepIcon color={step.accent} />
                  </motion.div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: step.accent,
                    letterSpacing: '1.5px',
                    background: `${step.vibe}12`,
                    padding: '3px 10px',
                    borderRadius: 6,
                  }}>
                    STEP {step.number}
                  </span>
                   <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{step.title}</h3>
                   <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
                    {step.desc}
                  </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            padding: isMobile ? 28 : 44,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 20 : 32,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}>
            {perks.map((perk) => {
              const PerkIcon = perk.Icon
              return (
                <motion.div
                  key={perk.label}
                  whileHover={{ scale: 1.1, y: -4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 500,
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `${perk.color}12`,
                    border: `1px solid ${perk.color}1a`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <PerkIcon color={perk.color} />
                  </div>
                  {perk.label}
                </motion.div>
              )
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(99,102,241,0.25)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/book-now')}
            style={{
              padding: '15px 40px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            Start Planning Your Trip
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
