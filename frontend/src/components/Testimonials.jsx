import { motion } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'

function SarahIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" fill={color} opacity="0.3"/>
      <circle cx="11" cy="7" r="2.5" fill={color} opacity="0.6"/>
      <path d="M4 17c0-3 3-5 7-5s7 2 7 5v1H4v-1Z" fill={color} opacity="0.25"/>
      <path d="M6 17c0-2 2.5-4 5-4s5 2 5 4" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      <circle cx="11" cy="9" r="1" fill="#fff" opacity="0.5"/>
    </svg>
  )
}

function MarcusIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" fill={color} opacity="0.3"/>
      <circle cx="11" cy="7" r="2.5" fill={color} opacity="0.6"/>
      <path d="M4 17c0-3 3-5 7-5s7 2 7 5v1H4v-1Z" fill={color} opacity="0.25"/>
      <path d="M6 17c0-2 2.5-4 5-4s5 2 5 4" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      <circle cx="9.5" cy="11" r=".5" fill="#fff" opacity="0.4"/>
      <circle cx="12.5" cy="11" r=".5" fill="#fff" opacity="0.4"/>
    </svg>
  )
}

function ElenaIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <ellipse cx="11" cy="7" rx="3.5" ry="4" fill={color} opacity="0.3"/>
      <ellipse cx="11" cy="7" rx="2.2" ry="2.8" fill={color} opacity="0.6"/>
      <path d="M5 17c0-3 3-5 6-5s6 2 6 5v1H5v-1Z" fill={color} opacity="0.25"/>
      <path d="M7 17c0-2 2-4 4-4s4 2 4 4" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      <path d="M11 4v1" stroke="#fff" strokeWidth="0.6" opacity="0.4"/>
      <circle cx="11" cy="8" r=".8" fill="#fff" opacity="0.4"/>
    </svg>
  )
}

function JamesIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4.5" fill={color} opacity="0.3"/>
      <circle cx="11" cy="7" r="3" fill={color} opacity="0.6"/>
      <path d="M4 18c0-3.5 3-5.5 7-5.5s7 2 7 5.5" stroke={color} strokeWidth="1" opacity="0.4" fill="none"/>
      <path d="M4 18v1h14v-1" fill={color} opacity="0.2"/>
      <circle cx="11" cy="7" r="1.2" fill="#fff" opacity="0.35"/>
    </svg>
  )
}

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'Los Angeles, CA',
    trip: 'Maldives',
    vibe: '#0EA5E9',
    accent: '#38BDF8',
    Icon: SarahIcon,
    text: 'An absolutely life-changing experience. The overwater villa was beyond anything I could have imagined. Every detail was perfectly curated.',
    rating: 5,
    dots: ['🌸', '🫧', '🌊'],
    bgBlob: 'radial-gradient(circle at 80% 30%, rgba(14,165,233,0.15), transparent 60%), radial-gradient(circle at 20% 80%, rgba(6,182,212,0.08), transparent 50%)',
  },
  {
    name: 'Marcus Rivera',
    location: 'Austin, TX',
    trip: 'Tokyo',
    vibe: '#EC4899',
    accent: '#F472B6',
    Icon: MarcusIcon,
    text: 'Tokyo exceeded every expectation. Our guide took us to hidden ramen spots we never would have found on our own. Unforgettable.',
    rating: 5,
    dots: ['🎌', '🏮', '🎆'],
    bgBlob: 'radial-gradient(circle at 70% 40%, rgba(236,72,153,0.15), transparent 60%), radial-gradient(circle at 30% 70%, rgba(217,70,239,0.08), transparent 50%)',
  },
  {
    name: 'Elena Petrova',
    location: 'London, UK',
    trip: 'Santorini',
    vibe: '#8B5CF6',
    accent: '#A78BFA',
    Icon: ElenaIcon,
    text: 'Watching the sunset from Oia with someone you love is pure magic. Wanderlust made it effortless. We are already planning our next trip.',
    rating: 5,
    dots: ['☀️', '✨', '🌅'],
    bgBlob: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), transparent 60%), radial-gradient(circle at 70% 80%, rgba(167,139,250,0.08), transparent 50%)',
  },
  {
    name: 'James Okafor',
    location: 'Lagos, NG',
    trip: 'Amazon',
    vibe: '#059669',
    accent: '#34D399',
    Icon: JamesIcon,
    text: 'The Amazon expedition was raw, real, and revelatory. Kayaking through flooded forests at dawn \u2014 something Ill never forget.',
    rating: 5,
    dots: ['🦜', '🐆', '🌴'],
    bgBlob: 'radial-gradient(circle at 60% 30%, rgba(5,150,105,0.15), transparent 60%), radial-gradient(circle at 40% 80%, rgba(16,185,129,0.08), transparent 50%)',
  },
]

export default function Testimonials() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="testimonials" style={{ padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-5%',
        width: 350,
        height: 350,
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
          <span style={{ color: '#A78BFA', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Testimonials
          </span>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 800,
            marginTop: 10,
            letterSpacing: '-1px',
            lineHeight: 1.15,
          }}>
            Voices of{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #818CF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Wanderers
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 10, maxWidth: 460, margin: '10px auto 0' }}>
            Real stories from travelers who trusted us with their adventures.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 18,
        }}>
          {testimonials.map((t, i) => {
            const PersonIcon = t.Icon
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.25,
                  }}
                  whileHover={{
                    y: -16,
                    scale: 1.02,
                    borderColor: `${t.accent}55`,
                    transition: { type: 'spring', stiffness: 400, damping: 8 },
                  }}
                  style={{
                    padding: 24,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${t.vibe}06, rgba(255,255,255,0.015))`,
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: t.bgBlob,
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
                    {t.dots.map((d, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
                        transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: 9 }}
                      >
                        {d}
                      </motion.span>
                    ))}
                  </div>

                  <div style={{ height: 3, background: `linear-gradient(90deg, ${t.vibe}, ${t.accent})`, width: '100%', borderRadius: 2, position: 'relative', zIndex: 1 }} />

                  <div style={{ display: 'flex', gap: 6, position: 'relative', zIndex: 1 }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.06 }}
                        style={{ color: '#F59E0B', fontSize: 14 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>

                  <p style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    &ldquo;<span style={{ color: t.accent, fontWeight: 600 }}>{t.trip}</span>&rdquo; — {t.text}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    paddingTop: 8,
                    borderTop: `1px solid ${t.vibe}12`,
                  }}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${t.vibe}25, ${t.vibe}08)`,
                        border: `1px solid ${t.vibe}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 16px ${t.vibe}12`,
                      }}
                    >
                      <PersonIcon color={t.accent} />
                    </motion.div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{t.location}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 11, color: t.accent, fontWeight: 600, opacity: 0.7 }}>
                      {t.trip}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
