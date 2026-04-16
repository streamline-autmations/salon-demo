/* ── image helpers ─────────────────────────────────────────── */
const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

/* curated hair/salon photo IDs from Unsplash */
export const SALON_IMAGES = {
  hero:         '1560066984-138daaa7a4b8',
  services:     '1522337360788-8b13dee7a37e',
  gallery:      '1487412947147-5cebf100d293',
  shop:         '1583922606661-5934e74c9a69',
  about:        '1580618672591-eb180b1a973f',
  ownerPortrait:'1512290923902-8a9f81dc236c',
  homeAbout:    '1527799820374-dcf8d9d4a388',
  videoStill:   '1560869713-7d0a29430803',
}

/* curated gallery hair transformation IDs */
const G = [
  '1620331311520-246a47a412b0', // balayage result
  '1560869713-7d0a29430803',    // hair colouring close-up
  '1519699047748-de8e457a634e', // blow-dry styling
  '1522337360788-8b13dee7a37e', // full colour
  '1595152772835-6e75b60e9a2c', // long hair updo
  '1527799820374-dcf8d9d4a388', // keratin / smoothing
  '1503951914875-452162b0f3f1', // highlights portrait
  '1487412947147-5cebf100d293', // bridal hair
  '1562322140-8baeececf3df',    // curly defined curls
  '1578941987177-2aecf9f3b84e', // stylist at work
  '1616394584738-fc6e612e71b9', // colour correction
  '1508214751196-bcfd4ca60f91', // salon blowout
]

/* curated beauty / hair product IDs – cycling for 25 products */
const P = [
  '1608248597279-f99d160bfcbc',
  '1556228578-8c89e6adf883',
  '1571781926291-c477ebfd024b',
  '1523293182086-7651a899d37f',
  '1507652313519-a4e9400a8c14',
  '1583922606661-5934e74c9a69',
  '1532938315268-e3f78e47e3c4',
  '1519823551278-64ac92734fb1',
  '1621607512022-6a68aa7bf43d',
  '1574482620811-1aa16ffe3c82',
  '1535585416636-e982de4de2a7',
  '1527531286090-5def7a7be7bf',
]
const img = (i: number) => U(P[i % P.length], 400, 400)

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
    subheadline: 'Vanderbijlpark\'s premier hair atelier. Where craft meets confidence.',
    cta1:        'Book Your Appointment',
    cta2:        'Our Services',
    image:       U(SALON_IMAGES.hero, 1920, 1080),
  },

  stats: [
    { value: '4.9', label: 'Google Rating'    },
    { value: '2k+', label: 'Happy Clients'    },
    { value: '8',   label: 'Years Experience' },
  ],

  services: [
    {
      id: 1, num: '01',
      name: 'Signature Cut & Style',
      short: 'Precision cut tailored to your face shape, finished and styled to perfection.',
      description: 'Every cut starts with a consultation. Adéle studies your face shape, hair texture, and lifestyle before a single snip. The result is a cut that works for you every day — not just in the salon.',
      price: 'From R450', duration: '60 – 90 min',
    },
    {
      id: 2, num: '02',
      name: 'Colour & Balayage',
      short: 'Hand-painted colour and full-spectrum toning, from subtle to statement.',
      description: 'From seamless root blends to full transformations, our colour work is mixed and applied by hand using professional-grade colour that conditions while it processes. Toner and glossing included.',
      price: 'From R850', duration: '2 – 4 hours',
    },
    {
      id: 3, num: '03',
      name: 'Keratin Treatment',
      short: 'Frizz-free, glossy results that last up to 5 months.',
      description: 'Eliminates frizz, reduces drying time by up to 60%, and leaves hair silky and manageable for months. Fully customisable from a light smoothing to a complete bond repair. Blowout included.',
      price: 'From R1 200', duration: '3 – 4 hours',
    },
    {
      id: 4, num: '04',
      name: 'Bridal Hair',
      short: 'Trial and wedding day styling for brides and bridal parties.',
      description: 'From intimate elopements to full bridal parties. We work with you from trial to the morning of your wedding and travel to your venue. Packages for bridesmaids, mothers and flower girls.',
      price: 'From R2 500', duration: 'By arrangement',
    },
    {
      id: 5, num: '05',
      name: 'Hair Extensions',
      short: 'Tape-in or clip-in extensions using 100% Remy human hair.',
      description: 'Add length, volume, or both using Grade A Remy human hair, colour-matched to your own. Applied in one session and maintained every 6–8 weeks. Removal and refit available.',
      price: 'From R1 800', duration: '2 – 3 hours',
    },
    {
      id: 6, num: '06',
      name: 'Scalp & Bond Treatment',
      short: 'Deep conditioning, scalp therapy and Olaplex bond repair.',
      description: 'Designed for over-processed, brittle, or dry hair. Combines Olaplex bond repair with a targeted scalp treatment to restore strength, moisture and shine from root to tip.',
      price: 'From R350', duration: '45 – 60 min',
    },
  ],

  gallery: [
    { id: 1,  src: U(G[0],  600, 800), category: 'Colour',     alt: 'Balayage result'     },
    { id: 2,  src: U(G[1],  800, 600), category: 'Colour',     alt: 'Colour close-up'     },
    { id: 3,  src: U(G[2],  600, 800), category: 'Styling',    alt: 'Blow-dry styling'    },
    { id: 4,  src: U(G[3],  800, 600), category: 'Colour',     alt: 'Full colour result'  },
    { id: 5,  src: U(G[4],  600, 800), category: 'Bridal',     alt: 'Bridal updo'         },
    { id: 6,  src: U(G[5],  800, 600), category: 'Treatments', alt: 'Keratin treatment'   },
    { id: 7,  src: U(G[6],  600, 800), category: 'Colour',     alt: 'Highlights'          },
    { id: 8,  src: U(G[7],  800, 600), category: 'Bridal',     alt: 'Bridal hair trial'   },
    { id: 9,  src: U(G[8],  600, 800), category: 'Styling',    alt: 'Defined curls'       },
    { id: 10, src: U(G[9],  800, 600), category: 'Cuts',       alt: 'Stylist at work'     },
    { id: 11, src: U(G[10], 600, 800), category: 'Colour',     alt: 'Colour correction'   },
    { id: 12, src: U(G[11], 800, 600), category: 'Cuts',       alt: 'Salon blowout'       },
  ],

  products: [
    /* ── TREATMENTS ──────────────────────────────────────── */
    {
      id: 1, name: 'Moroccanoil Treatment Original',
      brand: 'Moroccanoil', category: 'Treatments',
      price: 590, originalPrice: 0, badge: 'Best Seller',
      image: img(0), size: '100ml',
      description: 'The iconic argan oil-infused treatment that defined a category. Instantly conditions, detangles and adds brilliant shine. A finishing treatment, leave-in conditioner and styling product all in one.',
      benefits: ['Reduces drying time by up to 40%', 'Eliminates frizz and flyaways', 'Adds lasting shine', 'Suitable for all hair types', 'Colour-safe formula'],
      howToUse: 'Apply a small amount to damp or dry hair. Work through mid-lengths to ends. Style as usual. Can be used daily.',
    },
    {
      id: 2, name: 'Olaplex No. 3 Hair Perfector',
      brand: 'Olaplex', category: 'Treatments',
      price: 620, originalPrice: 0, badge: 'Best Seller',
      image: img(1), size: '100ml',
      description: 'The at-home bond-building treatment that started the Olaplex revolution. Visibly strengthens and repairs damaged, breaking and brittle hair. Used before shampooing for best results.',
      benefits: ['Repairs broken hair bonds', 'Reduces breakage and brittleness', 'Improves hair strength', 'Safe for colour-treated hair', 'Visible results from first use'],
      howToUse: 'Apply generously to damp, towel-dried hair. Leave for at least 10 minutes (up to 90 min). Rinse, shampoo and condition as normal.',
    },
    {
      id: 3, name: 'Olaplex No. 0 Intensive Bond Building',
      brand: 'Olaplex', category: 'Treatments',
      price: 580, originalPrice: 0, badge: 'New',
      image: img(2), size: '155ml',
      description: 'The first step in the ultimate at-home Olaplex ritual. A highly concentrated bond-building primer that supercharges the effect of No. 3. For severely damaged or over-processed hair.',
      benefits: ['Primes hair for maximum bond repair', 'Works synergistically with No. 3', 'Strengthens from the inside out', 'No-rinse formula', 'Suitable for all damage types'],
      howToUse: 'Apply to dry, unwashed hair. Leave on for 10 minutes, then apply No. 3 on top. Leave for a further 10+ minutes. Rinse and shampoo.',
    },
    {
      id: 4, name: 'Kérastase Nutritive Masquintense Rich',
      brand: 'Kérastase', category: 'Treatments',
      price: 680, originalPrice: 850, badge: 'Sale',
      image: img(3), size: '200ml',
      description: 'An intensely nourishing mask for dry, sensitised hair. Rich formula infused with irisome and glucose proteins restores suppleness and luminosity to parched strands.',
      benefits: ['Deep nourishes dry hair', 'Restores softness and suppleness', 'Adds brilliant luminosity', 'Reduces breakage from brushing', 'Visible results from first use'],
      howToUse: 'After shampooing, apply to wet hair from mid-lengths to ends. Leave for 3–5 minutes, then rinse. Use 1–2 times per week.',
    },
    {
      id: 5, name: 'Wella Fusion Intense Repair Mask',
      brand: 'Wella Professionals', category: 'Treatments',
      price: 460, originalPrice: 560, badge: 'Sale',
      image: img(4), size: '150ml',
      description: 'A professional-grade reconstruction mask for heavily damaged hair. Powered by amino silk complex and fibrilite silk protein to restore strength, elasticity and smoothness.',
      benefits: ['Reconstructs damaged hair structure', 'Improves elasticity and strength', 'Adds smoothness and manageability', 'Reduces split ends', 'Long-lasting results'],
      howToUse: 'Shampoo first. Apply to wet hair, leave for 5–10 minutes. Use heat for deeper penetration. Rinse well.',
    },
    {
      id: 6, name: 'Redken Extreme Mega Mask',
      brand: 'Redken', category: 'Treatments',
      price: 490, originalPrice: 0, badge: '',
      image: img(5), size: '250ml',
      description: 'An intensely reinforcing hair mask for highly damaged, over-processed hair. Powered by RCT protein complex, this mega-treatment rebuilds the hair from cortex to cuticle in one application.',
      benefits: ['Intensely repairs extreme damage', 'RCT protein complex rebuilds structure', 'Strengthens and reduces breakage', 'Adds softness and shine', 'Professional salon results at home'],
      howToUse: 'After shampooing, apply generously to towel-dried hair. Leave for 3–5 minutes. For severe damage, leave up to 10 minutes with heat. Rinse thoroughly.',
    },

    /* ── SHAMPOO & CARE ───────────────────────────────── */
    {
      id: 7, name: 'Redken All Soft Shampoo',
      brand: 'Redken', category: 'Shampoo & Care',
      price: 280, originalPrice: 0, badge: '',
      image: img(6), size: '300ml',
      description: 'A hydrating shampoo for dry, brittle hair. Enriched with argan oil and RCT protein, this formula gently cleanses while infusing hair with weightless moisture.',
      benefits: ['Gently cleanses dry, brittle hair', 'Provides weightless moisture', 'Improves softness and flexibility', 'Colour-safe', 'Suitable for daily use'],
      howToUse: 'Apply to wet hair. Massage through scalp and lengths. Rinse thoroughly. Follow with Redken All Soft Conditioner.',
    },
    {
      id: 8, name: 'Redken All Soft Conditioner',
      brand: 'Redken', category: 'Shampoo & Care',
      price: 310, originalPrice: 0, badge: '',
      image: img(7), size: '300ml',
      description: 'A deeply softening conditioner for dry, brittle hair. Formulated with argan oil to detangle and smooth, leaving hair silky soft and easy to manage.',
      benefits: ['Deeply conditions dry hair', 'Detangles with ease', 'Adds silky softness', 'Reduces frizz', 'Colour-safe formula'],
      howToUse: 'After shampooing, apply to mid-lengths and ends. Leave for 2–3 minutes, then rinse.',
    },
    {
      id: 9, name: 'Kérastase Bain Satin Shampoo',
      brand: 'Kérastase', category: 'Shampoo & Care',
      price: 380, originalPrice: 0, badge: '',
      image: img(8), size: '250ml',
      description: 'A luxurious shampoo for dry to very dry sensitised hair. Milk-like texture melts into hair to restore natural vitality and leave hair luminous and nourished.',
      benefits: ['Nourishes sensitised dry hair', 'Gentle daily cleansing', 'Restores natural hair vitality', 'Pairs with Masquintense mask', 'Colour-safe formula'],
      howToUse: 'Apply to wet hair, lather gently and rinse. Use with Kérastase Nutritive Masquintense for best results.',
    },
    {
      id: 10, name: 'Goldwell Colour Brilliance Shampoo',
      brand: 'Goldwell', category: 'Shampoo & Care',
      price: 290, originalPrice: 360, badge: 'Sale',
      image: img(9), size: '250ml',
      description: 'A colour-protecting shampoo for vibrant, coloured hair. Intelligent Keratinite technology strengthens the hair surface to protect colour vibrancy and maintain shine.',
      benefits: ['Protects colour vibrancy', 'Strengthens hair surface', 'Maintains brilliant shine', 'Gentle daily cleanser', 'Prolongs colour longevity'],
      howToUse: 'Lather into wet hair. Massage gently and rinse. Follow with Goldwell Colour Brilliance Conditioner.',
    },
    {
      id: 11, name: 'Schwarzkopf BC Repair Rescue Shampoo',
      brand: 'Schwarzkopf Professional', category: 'Shampoo & Care',
      price: 250, originalPrice: 0, badge: 'New',
      image: img(10), size: '250ml',
      description: 'A targeted repair shampoo for damaged hair. Micro-protein concentrate bonds with the hair structure to restore strength and resilience with every wash.',
      benefits: ['Repairs and strengthens damaged hair', 'Bonds into the hair structure', 'Suitable for daily use', 'Builds resilience over time', 'Professional salon formula'],
      howToUse: 'Apply to wet hair, lather and rinse. For best results, use with the full BC Repair Rescue range.',
    },
    {
      id: 12, name: 'Wella Elements Renewing Shampoo',
      brand: 'Wella Professionals', category: 'Shampoo & Care',
      price: 260, originalPrice: 0, badge: '',
      image: img(11), size: '250ml',
      description: 'A gentle shampoo with plant stem cell technology and renewing extracts. Restores hair\'s natural balance while gently cleansing for a healthy, luminous look.',
      benefits: ['Plant stem cell technology', 'Restores hair\'s natural balance', 'Gentle enough for daily use', 'Adds luminosity and softness', 'Sulphate-free formula'],
      howToUse: 'Work into a lather on wet hair. Rinse thoroughly. Follow with Wella Elements Renewing Conditioner.',
    },
    {
      id: 13, name: 'Redken Color Extend Magnetics Shampoo',
      brand: 'Redken', category: 'Shampoo & Care',
      price: 300, originalPrice: 0, badge: '',
      image: img(0), size: '300ml',
      description: 'A colour-protecting shampoo that extends the life of vibrant colour. Magnetic technology seals the cuticle to lock in colour pigments and prevent fade.',
      benefits: ['Extends colour vibrancy', 'Magnetic colour-locking technology', 'Sulphate-free gentle cleanse', 'Adds softness and shine', 'Safe for coloured hair'],
      howToUse: 'Apply to wet hair, lather and rinse. Use as part of the full Color Extend Magnetics system for best colour protection.',
    },

    /* ── STYLING ─────────────────────────────────────── */
    {
      id: 14, name: 'Olaplex No. 6 Bond Smoother',
      brand: 'Olaplex', category: 'Styling',
      price: 550, originalPrice: 0, badge: 'New',
      image: img(1), size: '100ml',
      description: 'A reparative styling cream that eliminates frizz and adds moisture without weighing hair down. Bonds are repaired as you style — works on all hair types.',
      benefits: ['Eliminates frizz and flyaways', 'Repairs bonds while you style', 'Adds moisture without weight', 'Heat protection up to 230°C', 'No-rinse formula'],
      howToUse: 'Apply to damp or dry hair. Work through mid-lengths to ends. Style as usual.',
    },
    {
      id: 15, name: 'Sebastian Potion 9 Wearable Treatment',
      brand: 'Sebastian Professional', category: 'Styling',
      price: 360, originalPrice: 0, badge: '',
      image: img(2), size: '150ml',
      description: 'A multi-benefit leave-in treatment for smooth, controlled, shiny hair. The 9-in-1 formula conditions, detangles, controls frizz, adds shine and protects from heat.',
      benefits: ['9-in-1 multi-benefit formula', 'Controls frizz and flyaways', 'Adds lasting shine', 'Protects from heat up to 220°C', 'Lightweight, non-greasy finish'],
      howToUse: 'Apply to damp or dry hair. Distribute evenly through mid-lengths and ends. Style as desired.',
    },
    {
      id: 16, name: "Bumble and Bumble Hairdresser's Invisible Oil",
      brand: 'Bumble and Bumble', category: 'Styling',
      price: 520, originalPrice: 620, badge: 'Sale',
      image: img(3), size: '100ml',
      description: 'A supremely lightweight dry oil for sleek, glossy hair. Six featherweight oils give salon-fresh shine without weight or greasiness.',
      benefits: ['Ultra-lightweight dry oil formula', 'Adds high-shine gloss', 'Heat protection up to 230°C', 'Detangles and smooths', 'Suitable for all hair types'],
      howToUse: 'Apply 1–2 pumps to damp hair before blow-drying, or to dry hair as a finishing touch. Focus on mid-lengths and ends.',
    },
    {
      id: 17, name: 'Redken Frizz Dismiss Leave-In Smoothing',
      brand: 'Redken', category: 'Styling',
      price: 320, originalPrice: 0, badge: '',
      image: img(4), size: '150ml',
      description: 'A lightweight leave-in treatment that smooths, conditions and provides humidity protection all day. Fights frizz from within for touchably smooth results.',
      benefits: ['Controls frizz in high humidity', 'Lightweight leave-in formula', 'Smooths and conditions', 'Heat protection up to 230°C', 'Works on all hair types'],
      howToUse: 'Spray evenly onto towel-dried hair. Comb through and style as desired. Do not rinse.',
    },
    {
      id: 18, name: 'Moroccanoil Moisture Repair Spray',
      brand: 'Moroccanoil', category: 'Styling',
      price: 440, originalPrice: 0, badge: '',
      image: img(5), size: '160ml',
      description: 'A lightweight leave-in treatment spray that strengthens damaged hair while delivering argan oil moisture. Ideal for chemically processed or heat-styled hair.',
      benefits: ['Repairs damage with every use', 'Argan oil moisture infusion', 'Reduces breakage and split ends', 'Improves manageability', 'Heat protection properties'],
      howToUse: 'Spray onto clean, damp hair from mid-lengths to ends. Do not rinse. Style as usual.',
    },
    {
      id: 19, name: 'Goldwell Kerasilk Control Hair Oil',
      brand: 'Goldwell', category: 'Styling',
      price: 490, originalPrice: 0, badge: '',
      image: img(6), size: '75ml',
      description: 'A luxurious hair oil with micro-fine keratin that integrates into the hair fibre for superior frizz control and incredible shine. Lightweight, non-greasy finish.',
      benefits: ['Micro-fine keratin smoothing', 'Intense frizz control', 'Adds brilliant gloss and shine', 'Lightweight non-greasy texture', 'Lasts all day'],
      howToUse: 'Apply 1–3 drops to the palm. Work through lengths and ends of damp or dry hair. Style as desired.',
    },
    {
      id: 20, name: 'Sebastian Craft Clay',
      brand: 'Sebastian Professional', category: 'Styling',
      price: 340, originalPrice: 0, badge: 'New',
      image: img(7), size: '52ml',
      description: 'A flexible-hold clay for textured, lived-in styles. Absorbs quickly to give a matte, pliable finish that can be reworked throughout the day without stiffness.',
      benefits: ['Matte finish, flexible hold', 'Buildable texture and separation', 'Reworkable all day', 'Absorbs quickly without residue', 'Ideal for short to medium hair'],
      howToUse: 'Emulsify a small amount in hands. Work through damp or dry hair to add texture and separation. Style as desired.',
    },

    /* ── SCALP CARE ──────────────────────────────────── */
    {
      id: 21, name: 'Nioxin System 1 Cleanser Shampoo',
      brand: 'Nioxin', category: 'Scalp Care',
      price: 340, originalPrice: 0, badge: '',
      image: img(8), size: '300ml',
      description: 'A scalp-focused cleanser for natural hair with fine hair and light thinning. Removes follicle-clogging sebum and environmental residues to create optimal scalp conditions for thicker-looking hair.',
      benefits: ['Removes follicle-clogging sebum', 'Optimises scalp conditions', 'Leaves hair looking thicker', 'Gentle enough for daily use', 'Cleanses scalp and hair fibre'],
      howToUse: 'Apply to wet hair and scalp. Lather and massage in. Leave on for 1 minute. Rinse and follow with Nioxin System 1 Scalp Therapy.',
    },
    {
      id: 22, name: 'Kérastase Spécifique Bain Vital',
      brand: 'Kérastase', category: 'Scalp Care',
      price: 420, originalPrice: 0, badge: 'New',
      image: img(9), size: '250ml',
      description: 'A rebalancing shampoo for normal to combination scalps. Dermo-Calm complex soothes scalp sensitivity while gently removing impurities, leaving the scalp refreshed and hair luminous.',
      benefits: ['Rebalances scalp microbiome', 'Soothes sensitivity and irritation', 'Gentle, non-stripping formula', 'Adds luminosity to hair', 'Safe for coloured hair'],
      howToUse: 'Apply to wet hair. Massage into scalp with fingertips. Rinse thoroughly. Can be used daily.',
    },
    {
      id: 23, name: 'Aveda Scalp Solutions Exfoliating Shampoo',
      brand: 'Aveda', category: 'Scalp Care',
      price: 450, originalPrice: 0, badge: '',
      image: img(10), size: '200ml',
      description: 'A plant-powered exfoliating shampoo that buffs away scalp buildup while soothing irritation. Salicylic acid and wintergreen-derived extracts gently resurface the scalp for a healthy foundation.',
      benefits: ['Exfoliates scalp buildup', 'Reduces flakiness and dandruff', 'Soothes scalp irritation', '99% naturally derived ingredients', 'Vegan and cruelty-free'],
      howToUse: 'Wet hair and scalp. Apply shampoo and massage gently into scalp for 1–2 minutes. Rinse thoroughly. Use 1–2 times per week.',
    },

    /* ── TOOLS ───────────────────────────────────────── */
    {
      id: 24, name: 'Tangle Teezer The Ultimate Detangler',
      brand: 'Tangle Teezer', category: 'Tools',
      price: 290, originalPrice: 0, badge: 'New',
      image: img(11), size: 'Full Size',
      description: 'The iconic detangling brush that glides through wet or dry hair without tugging or causing breakage. Unique two-tiered tooth technology flexes and bends to protect your hair.',
      benefits: ['Detangles without breakage', 'Works on wet and dry hair', 'Reduces tension on scalp', 'Suitable for all hair types', 'Ergonomic grip design'],
      howToUse: 'Start from the ends and work up through knots. Use wet or dry. Ideal for use with conditioner in the shower.',
    },
    {
      id: 25, name: 'Denman Classic Styling Brush D3',
      brand: 'Denman', category: 'Tools',
      price: 220, originalPrice: 0, badge: '',
      image: img(0), size: '7-Row',
      description: 'The original styling brush trusted by professionals for over 80 years. Seven rows of cushion-mounted nylon pins give a smooth, tension-free glide for perfect blowouts and defined curls.',
      benefits: ['7 rows of cushion-mounted pins', 'Perfect for blowouts and curls', 'Detangles without pulling', 'Adds shine and smoothness', 'Durable professional-grade build'],
      howToUse: 'Use on wet or damp hair with a blow-dryer for smooth results. Or use on dry hair to define curls and reduce frizz.',
    },
  ],

  testimonials: [
    {
      name: 'Thandi M.', location: 'Vereeniging',
      text: 'Came in for a colour correction after a bad at-home bleach job. Adéle fixed everything in one session and my hair has never looked better. She also explained exactly how to maintain it. I won\'t go anywhere else.',
      rating: 5,
    },
    {
      name: 'Riana K.', location: 'Vanderbijlpark',
      text: 'Three years as a client and I still get compliments on my balayage every time. It grows out so beautifully you barely notice the regrowth. Genuinely the best salon in the Vaal.',
      rating: 5,
    },
    {
      name: 'Sharon N.', location: 'Centurion',
      text: 'Booked Noir Studio for my wedding and they were calm, professional and so talented. Four of us were done on time and exactly as planned. My hair held all night. Absolutely worth it.',
      rating: 5,
    },
  ],
}

export type Service     = typeof SITE.services[number]
export type Product     = typeof SITE.products[number]
export type GalleryItem = typeof SITE.gallery[number]
