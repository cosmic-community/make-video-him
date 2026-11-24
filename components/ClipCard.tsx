import Link from 'next/link'
import type { VideoClip } from '@/types'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import { formatDuration, getClipCharacter, getEffects, getPlatform, getVideoSrc } from '@/lib/utils'

interface ClipCardProps {
  clip: VideoClip
}

export default function ClipCard({ clip }: ClipCardProps) {
  const src = getVideoSrc(clip)
  const platform = getPlatform(clip)
  const duration = formatDuration(clip.metadata?.duration)
  const effects = getEffects(clip).slice(0, 2)
  const character = getClipCharacter(clip)
  const photo = character?.metadata?.reference_photo?.imgix_url

  return (
    <Link
      href={`/clips/${clip.slug}`}
      className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 transition duration-200 hover:-translate-y-1 hover:border-laser hover:shadow-laser"
    >
      {src ? (
        <AutoPlayVideo src={src} className="h-full w-full object-cover" />
      ) : photo ? (
        <img
          src={`${photo}?w=600&h=1066&fit=crop&auto=format,compress`}
          alt={clip.title}
          width={300}
          height={533}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-ink-700 to-ink-800 text-5xl">
          🎬
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40" />

      <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
        {platform ? (
          <span className="rounded-full bg-laser px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {platform}
          </span>
        ) : (
          <span />
        )}
        {duration && (
          <span className="rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
            {duration}
          </span>
        )}
      </div>

      <div className="absolute inset-x-3 bottom-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base">
          {clip.title}
        </h3>
        {effects.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {effects.map((effect) => (
              <span
                key={effect}
                className="rounded-full border border-laser/60 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-laser-soft"
              >
                {effect}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}