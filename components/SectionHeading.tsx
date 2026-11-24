import Link from 'next/link'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
}

export default function SectionHeading({ title, subtitle, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="whitespace-nowrap text-sm font-semibold text-laser-soft transition hover:text-white"
        >
          {linkLabel ?? 'View all'} →
        </Link>
      )}
    </div>
  )
}