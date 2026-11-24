import Link from 'next/link'
import { isLaserEffect } from '@/lib/utils'

interface EffectTagProps {
  label: string
  href?: string
}

export default function EffectTag({ label, href }: EffectTagProps) {
  const base =
    'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition'
  const tone = isLaserEffect(label)
    ? 'border-laser bg-laser/15 text-laser-soft shadow-laser hover:bg-laser/25'
    : 'border-ink-700 bg-ink-800 text-gray-200 hover:border-laser hover:text-laser-soft'

  const content = (
    <>
      {isLaserEffect(label) ? '🔴' : '✨'} {label}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${base} ${tone}`}>
        {content}
      </Link>
    )
  }

  return <span className={`${base} ${tone}`}>{content}</span>
}