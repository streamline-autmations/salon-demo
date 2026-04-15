import { motion } from 'framer-motion'

interface Props {
  label:     string
  title:     string
  subtitle?: string
  image?:    string
}

export default function PageHeader({ label, title, subtitle, image }: Props) {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 bg-ink overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="lbl text-accent mb-5">{label}</p>
          <h1
            className="font-display font-light text-white leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 68px)' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && (
            <p className="mt-5 text-white/55 text-[15px] font-light max-w-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
