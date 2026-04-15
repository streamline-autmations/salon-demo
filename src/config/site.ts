// ─── SITE CONFIG ───────────────────────────────────────────────
// Swap these values to rebrand for any hair salon client.
// ────────────────────────────────────────────────────────────────

export const SITE = {
  business: {
    name:      'Noir Studio',
    tagline:   'Hair, done differently.',
    phone:     '016 982 4471',
    whatsapp:  '27716824471',
    email:     'hello@noirstudio.co.za',
    address:   '14 Frikkie Meyer Blvd, Vanderbijlpark',
    area:      'Vanderbijlpark',
    instagram: '#',
    facebook:  '#',
    google:    '#',
    hours: [
      { day: 'Tuesday – Friday', time: '08:30 – 17:30' },
      { day: 'Saturday',         time: '08:30 – 15:00' },
      { day: 'Sunday & Monday',  time: 'Closed'         },
    ],
  },

  hero: {
    label:       'Est. 2016 · Vanderbijlpark, Gauteng',
    line1:       'Hair, done',
    line2:       'differently.',
    subheadline: 'Vanderbijlpark\'s premier hair atelier.\nWhere craft meets confidence.',
    cta1:        'Book Your Appointment',
    cta2:        'Our Services',
    image:       'https://picsum.photos/1920/1080?random=33',
  },

  stats: [
    { value: '4.9', label: 'Google Rating' },
    { value: '2k+', label: 'Happy Clients' },
    { value: '8',   label: 'Years Experience' },
  ],

  services: [
    {
      id: 1, num: '01',
      name: 'Signature Cut & Style',
      short: 'Precision cut tailored to your face shape, finished and styled to perfection.',
      description: 'Every cut begins with a thorough consultation. Adéle studies your face shape, hair texture, and lifestyle before a single snip is made. The result is a cut that works for you every single day — not just on the day.',
      price: 'From R450',
      duration: '60 – 90 min',
      icon: '✂',
    },
    {
      id: 2, num: '02',
      name: 'Colour & Balayage',
      short: 'Hand-painted colour and full-spectrum toning, from subtle to statement.',
      description: 'From seamless root blends to full transformations, our colour work is mixed and applied by hand. We use only professional-grade colour that conditions while it processes. Toner and glossing included.',
      price: 'From R850',
      duration: '2 – 4 hours',
      icon: '◈',
    },
    {
      id: 3, num: '03',
      name: 'Keratin Treatment',
      short: 'Frizz-free, glossy results that last up to 5 months. Includes blowout.',
      description: 'Our keratin treatment eliminates frizz, reduces drying time by up to 60%, and leaves hair silky and manageable for months. The treatment is fully customisable — from a light smoothing to a complete bond repair.',
      price: 'From R1 200',
      duration: '3 – 4 hours',
      icon: '◇',
    },
    {
      id: 4, num: '04',
      name: 'Bridal Hair',
      short: 'Trial and wedding day styling for brides and bridal parties.',
      description: 'From intimate elopements to full bridal parties, we work with you from trial to the morning of your wedding. We travel to your venue. Packages available for bridesmaids, mothers, and flower girls.',
      price: 'From R2 500',
      duration: 'By arrangement',
      icon: '♢',
    },
    {
      id: 5, num: '05',
      name: 'Hair Extensions',
      short: 'Tape-in or clip-in extensions using 100% Remy human hair.',
      description: 'Add length, volume, or both. We source only Grade A Remy human hair, colour-matched to your own. Extensions are applied in one session and maintained every 6 – 8 weeks. Removal and refit available.',
      price: 'From R1 800',
      duration: '2 – 3 hours',
      icon: '◉',
    },
    {
      id: 6, num: '06',
      name: 'Scalp & Bond Treatment',
      short: 'Deep conditioning, scalp therapy and Olaplex bond repair.',
      description: 'Designed for over-processed, brittle, or dry hair. We combine an Olaplex bond repair with a targeted scalp treatment to restore strength, moisture and shine from root to tip. Add-on to any service or standalone.',
      price: 'From R350',
      duration: '45 – 60 min',
      icon: '○',
    },
  ],

  gallery: [
    { id: 1,  src: 'https://picsum.photos/600/800?random=21',  category: 'Colour',     alt: 'Balayage result' },
    { id: 2,  src: 'https://picsum.photos/800/600?random=22',  category: 'Cuts',       alt: 'Precision cut' },
    { id: 3,  src: 'https://picsum.photos/600/800?random=23',  category: 'Treatments', alt: 'Keratin treatment' },
    { id: 4,  src: 'https://picsum.photos/800/600?random=24',  category: 'Colour',     alt: 'Full colour' },
    { id: 5,  src: 'https://picsum.photos/600/800?random=25',  category: 'Bridal',     alt: 'Bridal hair updo' },
    { id: 6,  src: 'https://picsum.photos/800/600?random=26',  category: 'Cuts',       alt: 'Styled blowout' },
    { id: 7,  src: 'https://picsum.photos/600/800?random=27',  category: 'Colour',     alt: 'Highlights' },
    { id: 8,  src: 'https://picsum.photos/800/600?random=28',  category: 'Bridal',     alt: 'Bridal trial' },
    { id: 9,  src: 'https://picsum.photos/600/800?random=29',  category: 'Treatments', alt: 'Bond treatment' },
    { id: 10, src: 'https://picsum.photos/800/600?random=30',  category: 'Cuts',       alt: 'Textured cut' },
    { id: 11, src: 'https://picsum.photos/600/800?random=31',  category: 'Colour',     alt: 'Toning result' },
    { id: 12, src: 'https://picsum.photos/800/600?random=32',  category: 'Treatments', alt: 'Scalp treatment' },
  ],

  products: [
    {
      id: 1, name: 'Olaplex No. 3 Hair Perfector',
      brand: 'Olaplex', category: 'Treatments',
      price: 620, originalPrice: 0, badge: 'Best Seller',
      image: 'https://picsum.photos/400/400?random=41',
      description: 'At-home bond-building treatment that visibly strengthens and repairs damaged, broken bonds.',
    },
    {
      id: 2, name: 'Kérastase Nutritive Masque Magistral',
      brand: 'Kérastase', category: 'Treatments',
      price: 680, originalPrice: 850, badge: 'Sale',
      image: 'https://picsum.photos/400/400?random=42',
      description: 'Intense nourishing mask for very dry, sensitised hair. 200ml.',
    },
    {
      id: 3, name: 'Olaplex No. 6 Bond Smoother',
      brand: 'Olaplex', category: 'Styling',
      price: 550, originalPrice: 0, badge: 'New',
      image: 'https://picsum.photos/400/400?random=43',
      description: 'Reparative leave-in styling cream that eliminates frizz and adds shine.',
    },
    {
      id: 4, name: 'Moroccanoil Treatment Original',
      brand: 'Moroccanoil', category: 'Treatments',
      price: 590, originalPrice: 0, badge: '',
      image: 'https://picsum.photos/400/400?random=44',
      description: 'The iconic argan oil treatment that started a revolution. Instant conditioning and shine.',
    },
    {
      id: 5, name: 'Schwarzkopf BC Bonacure Shampoo',
      brand: 'Schwarzkopf', category: 'Shampoo & Care',
      price: 280, originalPrice: 340, badge: 'Sale',
      image: 'https://picsum.photos/400/400?random=45',
      description: 'Colour-protecting moisture shampoo with quinoa + ceramide complex. 1L.',
    },
    {
      id: 6, name: 'Kevin Murphy Repair-Me Rinse',
      brand: 'Kevin Murphy', category: 'Shampoo & Care',
      price: 480, originalPrice: 0, badge: '',
      image: 'https://picsum.photos/400/400?random=46',
      description: 'Strengthening conditioner for damaged and chemically treated hair.',
    },
    {
      id: 7, name: 'L\'Oréal Série Expert Serum',
      brand: 'L\'Oréal Pro', category: 'Styling',
      price: 390, originalPrice: 490, badge: 'Sale',
      image: 'https://picsum.photos/400/400?random=47',
      description: 'Absolute repair serum for fine, damaged hair. Weightless finish.',
    },
    {
      id: 8, name: 'Redken All Soft Conditioner',
      brand: 'Redken', category: 'Shampoo & Care',
      price: 340, originalPrice: 0, badge: '',
      image: 'https://picsum.photos/400/400?random=48',
      description: 'Softening conditioner for dry, brittle hair. With argan oil. 300ml.',
    },
  ],

  testimonials: [
    {
      name: 'Thandi M.',
      location: 'Vereeniging',
      text: 'Came in for a colour correction after a bad at-home bleach job. Adéle fixed everything in one session and my hair has never looked better. She also took the time to explain exactly how to maintain it. I won\'t go anywhere else.',
      rating: 5,
    },
    {
      name: 'Riana K.',
      location: 'Vanderbijlpark',
      text: 'Three years as a client and I still get compliments on my balayage every month it\'s freshened up. It grows out so beautifully you barely notice the regrowth. This is genuinely the best salon in the Vaal.',
      rating: 5,
    },
    {
      name: 'Sharon N.',
      location: 'Centurion',
      text: 'Booked Noir Studio for my wedding and they were calm, professional, and so talented. Four of us were done on time and exactly as planned. My hair held all night. Absolutely worth every cent.',
      rating: 5,
    },
  ],
}

export type Service  = typeof SITE.services[number]
export type Product  = typeof SITE.products[number]
export type GalleryItem = typeof SITE.gallery[number]
