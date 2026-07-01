import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import useMediaQuery from '../hooks/useMediaQuery'

const floatingWords = ['Maldives', 'Santorini', 'Bali', 'Tokyo', 'Alps', 'Amazon']

const travelImages = [
  { src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=520&fit=crop&auto=format', label: 'Maldives', color: '#0C4A6E' },
  { src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=440&h=560&fit=crop&auto=format', label: 'Tokyo', color: '#1C1917' },
  { src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=360&h=480&fit=crop&auto=format', label: 'Santorini', color: '#0EA5E9' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=420&h=550&fit=crop&auto=format', label: 'Bali', color: '#14532D' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=440&h=570&fit=crop&auto=format', label: 'Alps', color: '#0F172A' },
]

const entranceVariants = [
  {
    initial: { opacity: 0, x: 120, y: -80, rotate: 12 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    float: { y: [0, -6, 0], rotate: [0, 2, 0] },
    pos: { bottom: '56%', right: '42%', w: 95, h: 126 },
    delay: 0.2,
  },
  {
    initial: { opacity: 0, x: 80, y: 100, rotate: -8 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    float: { y: [0, 5, 0], rotate: [0, -1.5, 0] },
    pos: { bottom: '4%', right: '12%', w: 108, h: 138 },
    delay: 0.4,
  },
  {
    initial: { opacity: 0, x: -60, y: 60, rotate: 10 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    float: { y: [0, -4, 0], rotate: [0, -2, 0] },
    pos: { bottom: '10%', right: '50%', w: 88, h: 116 },
    delay: 0.6,
  },
  {
    initial: { opacity: 0, x: -80, y: -60, rotate: -10 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    float: { y: [0, 6, 0], rotate: [0, 1.5, 0] },
    pos: { bottom: '36%', right: '34%', w: 100, h: 130 },
    delay: 0.8,
  },
  {
    initial: { opacity: 0, x: 0, y: -120, rotate: 8 },
    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
    float: { y: [0, -5, 0], rotate: [0, -1, 0] },
    pos: { bottom: '62%', right: '12%', w: 102, h: 132 },
    delay: 1.0,
  },
]

export default function Hero() {
  const ref = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  if (isMobile) {
    return (
      <section ref={ref} style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, rgba(99,102,241,0.08), transparent),
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(139,92,246,0.06), transparent),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(0,180,216,0.05), transparent)
          `,
          pointerEvents: 'none',
        }} />
        <motion.div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 20px 40px', maxWidth: 900, y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-block', padding: '7px 18px', borderRadius: 100,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)',
              marginBottom: 28, fontSize: 12, fontWeight: 600, color: '#818CF8',
              letterSpacing: '1.5px', textTransform: 'uppercase',
            }}
          >
            Explore the Extraordinary
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontSize: 'clamp(32px, 8vw, 84px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 20 }}
          >
            <span style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA, #67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Discover
            </span>
            <br />
            Your Next Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7, padding: '0 12px' }}
          >
            From the crystal waters of the Maldives to the vibrant streets of Tokyo — let us craft your perfect journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexDirection: 'column' }}
          >
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.3)' }} whileTap={{ scale: 0.96 }}
              onClick={() => router.push('/#destinations')}
              style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%' }}>
              Start Exploring
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 32px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: 14, cursor: 'pointer', width: '100%' }}>
              Watch Film
            </motion.button>
          </motion.div>
        </motion.div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #08080e, transparent)' }} />
      </section>
    )
  }

  return (
    <section ref={ref} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 30% 20%, rgba(99,102,241,0.08), transparent),
          radial-gradient(ellipse 60% 50% at 70% 40%, rgba(139,92,246,0.06), transparent),
          radial-gradient(ellipse 50% 40% at 50% 80%, rgba(0,180,216,0.05), transparent)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '0 20px', width: '100%', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div style={{ flex: '0 0 65%', padding: '80px 60px 40px 0', y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-block', padding: '7px 18px', borderRadius: 100,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)',
              marginBottom: 28, fontSize: 12, fontWeight: 600, color: '#818CF8',
              letterSpacing: '1.5px', textTransform: 'uppercase',
            }}
          >
            Explore the Extraordinary
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 20 }}
          >
            <span style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA, #67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Discover
            </span>
            <br />
            Your Next Adventure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 440, lineHeight: 1.8, marginBottom: 32 }}
          >
            From the crystal waters of the Maldives to the vibrant streets of Tokyo — let us craft your perfect journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: 12 }}
          >
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.3)' }} whileTap={{ scale: 0.96 }}
              onClick={() => router.push('/#destinations')}
              style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Start Exploring
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.96 }}
              style={{ padding: '14px 32px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
              Watch Film
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 6 }}
          >
            {floatingWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.07, duration: 0.4 }}
                whileHover={{ scale: 1.08, color: '#818CF8', borderColor: 'rgba(99,102,241,0.2)' }}
                style={{
                  padding: '5px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)',
                  fontSize: 12, fontWeight: 500, cursor: 'default', transition: 'all 0.3s',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <div style={{ flex: '0 0 35%', position: 'relative', height: '70vh', minHeight: 460 }}>
          {travelImages.map(({ src, label, color }, i) => {
            const v = entranceVariants[i]
            return (
              <motion.div
                key={label}
                initial={v.initial}
                animate={v.animate}
                transition={{ type: 'spring', stiffness: 80, damping: 14, delay: v.delay }}
                style={{
                  position: 'absolute',
                  bottom: v.pos.bottom,
                  right: v.pos.right,
                  width: v.pos.w,
                  height: v.pos.h,
                }}
              >
                <motion.div
                  animate={v.float}
                  transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: `0 12px 40px -8px ${color}50, 0 0 0 1px rgba(0,0,0,0.04)`,
                    cursor: 'default',
                    position: 'relative',
                  }}
                >
                  <img
                    src={src}
                    alt={label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '6px 10px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>
                      {label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, #08080e, transparent)' }} />
    </section>
  )
}
