import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
if (!uri) {
  console.error('MONGODB_URI environment variable is required')
  process.exit(1)
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
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=80&h=80&fit=crop&auto=format',
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
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&h=80&fit=crop&auto=format',
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
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&h=80&fit=crop&auto=format',
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
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=80&h=80&fit=crop&auto=format',
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
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&auto=format',
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
    image: undefined,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'Los Angeles, CA',
    trip: 'Maldives',
    vibe: '#0EA5E9',
    accent: '#38BDF8',
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
    text: 'The Amazon expedition was raw, real, and revelatory. Kayaking through flooded forests at dawn \u2014 something Ill never forget.',
    rating: 5,
    dots: ['🦜', '🐆', '🌴'],
    bgBlob: 'radial-gradient(circle at 60% 30%, rgba(5,150,105,0.15), transparent 60%), radial-gradient(circle at 40% 80%, rgba(16,185,129,0.08), transparent 50%)',
  },
]

const addons = [
  { id: 'guide', label: 'Private Guide', price: 399, desc: 'Personal local guide for your entire trip' },
  { id: 'photography', label: 'Photography Package', price: 249, desc: 'Professional photos throughout your journey' },
  { id: 'insurance', label: 'Travel Insurance', price: 179, desc: 'Full coverage including cancellation' },
  { id: 'transport', label: 'Luxury Transfers', price: 299, desc: 'Airport pickup & drop, all destinations' },
]

async function seed() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('wanderlust')

  await db.collection('destinations').deleteMany({})
  await db.collection('testimonials').deleteMany({})
  await db.collection('addons').deleteMany({})

  await db.collection('destinations').insertMany(destinations)
  await db.collection('testimonials').insertMany(testimonials)
  await db.collection('addons').insertMany(addons)

  console.log('Database seeded successfully')
  await client.close()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
