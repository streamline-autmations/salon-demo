const items = [
  'Premium Hair Care', 'Colour Specialists', 'Balayage & Highlights',
  'Keratin Treatments', 'Bridal Hair', 'Extensions', 'Bond Repair',
  'Premium Hair Care', 'Colour Specialists', 'Balayage & Highlights',
  'Keratin Treatments', 'Bridal Hair', 'Extensions', 'Bond Repair',
]

export default function MarqueeStrip() {
  return (
    <div className="bg-ink border-y border-white/[0.06] py-[14px] overflow-hidden">
      <div className="animate-marquee inline-flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="lbl text-white/30">{item}</span>
            <span className="text-accent text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
