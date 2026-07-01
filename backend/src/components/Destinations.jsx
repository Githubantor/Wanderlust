import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import useMediaQuery from '../hooks/useMediaQuery'

function MaldivesIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <ellipse cx="10" cy="20" rx="9" ry="3" fill={color} opacity="0.25"/>
      <path d="M8 10c0-3 4-7 4-7s4 4 4 7a4 4 0 0 1-8 0Z" fill={color}/>
      <rect x="11.5" y="6" width="1" height="7" rx="0.5" fill="#fff" opacity="0.8"/>
      <ellipse cx="12" cy="5" rx="3" ry="2" fill={color} opacity="0.6"/>
      <path d="M3 21h18v1H3z" fill={color} opacity="0.15"/>
      <path d="M3 21q3-2 6 0t6 0 6 0" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  )
}

function SantoriniIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="18" cy="8" r="5" fill={color} opacity="0.2"/>
      <circle cx="18" cy="8" r="3" fill={color} opacity="0.35"/>
      <rect x="5" y="14" width="18" height="2" rx="1" fill={color} opacity="0.2"/>
      <rect x="7" y="12" width="5" height="5" rx="1" fill={color}/>
      <rect x="8" y="17" width="3" height="5" rx="0.5" fill={color} opacity="0.7"/>
      <circle cx="9.5" cy="14" r="0.8" fill="#fff" opacity="0.6"/>
      <rect x="14" y="13" width="4" height="4" rx="2" fill={color} opacity="0.5"/>
    </svg>
  )
}

function BaliIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 22h16l-3-10H9l-3 10Z" fill={color} opacity="0.15"/>
      <path d="M9 12h10l-2-6H11l-2 6Z" fill={color} opacity="0.25"/>
      <rect x="10" y="6" width="1" height="16" rx="0.5" fill={color} opacity="0.7"/>
      <rect x="17" y="6" width="1" height="16" rx="0.5" fill={color} opacity="0.7"/>
      <path d="M7 16h14M7 19h14" stroke={color} strokeWidth="0.5" opacity="0.25"/>
      <path d="M9 6h10l-2 3h-6l-2-3Z" fill={color}/>
      <circle cx="14" cy="7.5" r="1" fill={color} opacity="0.8"/>
    </svg>
  )
}

function TokyoIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="12" y="2" width="4" height="4" rx="0.5" fill={color}/>
      <rect x="10" y="6" width="8" height="3" rx="0.5" fill={color} opacity="0.8"/>
      <rect x="11" y="9" width="6" height="2" rx="0.5" fill={color} opacity="0.65"/>
      <rect x="10" y="11" width="8" height="8" rx="0.5" fill={color} opacity="0.15"/>
      <rect x="9" y="11" width="10" height="2" rx="0.5" fill={color} opacity="0.5"/>
      <rect x="7" y="13" width="14" height="2" rx="0.5" fill={color} opacity="0.35"/>
      <rect x="5" y="15" width="18" height="2" rx="0.5" fill={color} opacity="0.2"/>
      <path d="M7 19h14l-2 5H9l-2-5Z" fill={color} opacity="0.1"/>
      <rect x="8" y="19" width="12" height="2" rx="0.5" fill={color} opacity="0.4"/>
      <rect x="13" y="21" width="2" height="5" rx="0.5" fill={color} opacity="0.7"/>
    </svg>
  )
}

function AlpsIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M3 22h22L17 8l-4 6-3-4-7 12Z" fill={color} opacity="0.15"/>
      <path d="M14 14l-3-6-8 14h6l5-8Z" fill={color} opacity="0.3"/>
      <path d="M14 14l4-8 7 12-5 4-6-8Z" fill={color} opacity="0.5"/>
      <path d="M14 14l2-4 5 8-3 2-4-6Z" fill={color} opacity="0.7"/>
      <path d="M14 14l-3 4 3 4 3-4-3-4Z" fill="#fff" opacity="0.15"/>
      <circle cx="18" cy="10" r="1.5" fill="#fff" opacity="0.2"/>
    </svg>
  )
}

function AmazonIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4c-1 3-3 5-6 7l-1 1 2 1c2 0 4 1 5 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M14 4c1 3 3 5 6 7l1 1-2 1c-2 0-4 1-5 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M11 13c-2 1-4 3-5 5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M17 13c2 1 4 3 5 5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <circle cx="14" cy="16" r="3" fill={color} opacity="0.12"/>
      <circle cx="14" cy="16" r="1.5" fill={color} opacity="0.25"/>
      <circle cx="14" cy="16" r="0.5" fill={color} opacity="0.5"/>
    </svg>
  )
}

const DestIcon = {
  Maldives: MaldivesIcon,
  Santorini: SantoriniIcon,
  Bali: BaliIcon,
  Tokyo: TokyoIcon,
  'Swiss Alps': AlpsIcon,
  Amazon: AmazonIcon,
}

const destinations = [
  {
    name: 'Maldives',
    tagline: 'Overwater Paradise',
    vibe: '#0EA5E9',
    accent: '#38BDF8',
    gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4)',
    bgBlob: 'radial-gradient(circle at 30% 20%, rgba(14,165,233,0.2), transparent 60%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.12), transparent 50%)',
    dots: ['🔵', '🫧', '🌊'],
    stats: { rating: 4.9, tours: 340, price: '$2,899' },
    description: 'Crystal-clear waters, private overwater villas, and world-class diving.',
  },
  {
    name: 'Santorini',
    tagline: 'Sunset Dreams',
    vibe: '#F97316',
    accent: '#FB923C',
    gradient: 'linear-gradient(135deg, #F97316, #F59E0B)',
    bgBlob: 'radial-gradient(circle at 70% 30%, rgba(249,115,22,0.2), transparent 60%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.12), transparent 50%)',
    dots: ['☀️', '✨', '🌅'],
    stats: { rating: 4.8, tours: 280, price: '$1,899' },
    description: 'Whitewashed buildings, breathtaking caldera views, and legendary sunsets.',
  },
  {
    name: 'Bali',
    tagline: 'Tropical Serenity',
    vibe: '#10B981',
    accent: '#34D399',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    bgBlob: 'radial-gradient(circle at 40% 30%, rgba(16,185,129,0.2), transparent 60%), radial-gradient(circle at 70% 80%, rgba(5,150,105,0.12), transparent 50%)',
    dots: ['🌺', '🌸', '🌴'],
    stats: { rating: 4.7, tours: 410, price: '$1,299' },
    description: 'Lush rice terraces, ancient temples, and vibrant spiritual culture.',
  },
  {
    name: 'Tokyo',
    tagline: 'Neon Nights',
    vibe: '#EC4899',
    accent: '#F472B6',
    gradient: 'linear-gradient(135deg, #EC4899, #D946EF)',
    bgBlob: 'radial-gradient(circle at 60% 20%, rgba(236,72,153,0.2), transparent 60%), radial-gradient(circle at 30% 80%, rgba(217,70,239,0.12), transparent 50%)',
    dots: ['🎌', '🏮', '🎆'],
    stats: { rating: 4.8, tours: 520, price: '$2,299' },
    description: 'Electric streets, Michelin-star dining, and ancient traditions collide.',
  },
  {
    name: 'Swiss Alps',
    tagline: 'Peak Majesty',
    vibe: '#06B6D4',
    accent: '#22D3EE',
    gradient: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
    bgBlob: 'radial-gradient(circle at 50% 30%, rgba(6,182,212,0.2), transparent 60%), radial-gradient(circle at 80% 70%, rgba(14,165,233,0.1), transparent 50%)',
    dots: ['❄️', '⛷️', '🏔️'],
    stats: { rating: 4.9, tours: 195, price: '$3,499' },
    description: 'Snow-capped peaks, alpine villages, and the worlds best ski slopes.',
  },
  {
    name: 'Amazon',
    tagline: 'Wild Frontier',
    vibe: '#059669',
    accent: '#34D399',
    gradient: 'linear-gradient(135deg, #059669, #10B981)',
    bgBlob: 'radial-gradient(circle at 30% 40%, rgba(5,150,105,0.2), transparent 60%), radial-gradient(circle at 70% 60%, rgba(16,185,129,0.12), transparent 50%)',
    dots: ['🦜', '🐆', '🌴'],
    stats: { rating: 4.6, tours: 160, price: '$2,599' },
    description: 'Untamed rainforest, exotic wildlife, and immersive indigenous encounters.',
  },
]

function TiltCard({ dest, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()
  const Icon = DestIcon[dest.name]

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])

  function handleMouse(e) {
    if (isMobile) return
    const rect = ref.current.getBoundingClientRect()
    const xVal = (e.clientX - rect.left) / rect.width - 0.5
    const yVal = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xVal)
    y.set(yVal)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: isMobile ? 'none' : '1000px' }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          background: `linear-gradient(135deg, ${dest.vibe}08, rgba(255,255,255,0.02))`,
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        onClick={() => router.push('/book-now?destination=' + encodeURIComponent(dest.name))}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
        whileHover={{
          borderColor: `${dest.accent}66`,
          boxShadow: `0 0 0 1px ${dest.accent}22, 0 40px 100px -24px ${dest.vibe}40`,
          y: -20,
          scale: 1.02,
          transition: { type: 'spring', stiffness: 400, damping: 8 },
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: dest.bgBlob,
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 4,
          opacity: 0.4,
          pointerEvents: 'none',
        }}>
          {dest.dots.map((d, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 10 }}
            >
              {d}
            </motion.span>
          ))}
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <motion.div
              whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${dest.vibe}25, ${dest.vibe}08)`,
                border: `1px solid ${dest.vibe}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${dest.vibe}15`,
              }}
            >
              <Icon color={dest.accent} />
            </motion.div>
            <div style={{
              padding: '4px 12px',
              borderRadius: 100,
              background: `linear-gradient(135deg, ${dest.vibe}20, ${dest.vibe}08)`,
              border: `1px solid ${dest.vibe}25`,
              fontSize: 12,
              fontWeight: 700,
              color: dest.accent,
              letterSpacing: '0.3px',
            }}>
              ★ {dest.stats.rating}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
              {dest.name}
            </h3>
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              background: dest.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {dest.tagline}
            </span>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            {dest.description}
          </p>

          <div style={{ display: 'flex', gap: 24, paddingTop: 6, borderTop: `1px solid ${dest.vibe}15` }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 3, fontWeight: 500, letterSpacing: '0.3px' }}>Tours</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{dest.stats.tours}+</div>
            </div>
            <div style={{ width: 1, background: `${dest.vibe}15` }} />
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 3, fontWeight: 500, letterSpacing: '0.3px' }}>From</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: dest.accent }}>{dest.stats.price}</div>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: `0 0 32px ${dest.vibe}30`,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/book-now?destination=' + encodeURIComponent(dest.name))}
            style={{
              marginTop: 'auto',
              padding: '12px 0',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg, ${dest.vibe}, ${dest.vibe}dd)`,
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              letterSpacing: '0.2px',
            }}
          >
            Explore {dest.name} →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Destinations() {

  return (
    <section id="destinations" style={{ padding: '80px 20px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 44 }}
        >
          <span style={{ color: '#818CF8', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Destinations
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 5vw, 48px)',
            fontWeight: 800,
            marginTop: 10,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            color: '#fff',
          }}>
            Handpicked{' '}
            <span style={{
              background: 'linear-gradient(135deg, #818CF8, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Wonders
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 10, maxWidth: 480, margin: '10px auto 0' }}>
            Each destination is curated by our travel experts to deliver unforgettable experiences.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 18,
        }}>
          {destinations.map((dest, i) => (
            <TiltCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
