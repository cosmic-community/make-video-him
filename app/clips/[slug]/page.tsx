// app/clips/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMetafieldValue } from '@/lib/cosmic'
import { getClipBySlug, getClips } from '@/lib/queries'
import {
  formatDuration,
  getClipCharacter,
  getEffects,
  getPlatform,
  getStatus,
  getVideoSrc,
} from '@/lib/utils'
import EffectTag from '@/components/EffectTag'
import ClipGrid from '@/components/ClipGrid'
import SectionHeading from '@/components/SectionHeading'

interface ClipPageProps {
  params: Promise<{ slug: string }>
}

export default async function ClipDetailPage({ params }: ClipPageProps) {
  const { slug } = await params
  const clip = await getClipBySlug(slug)

  if (!clip) {
    notFound()
  }

  const src = getVideoSrc(clip)
  const platform = getPlatform(clip)
  const status = getStatus(clip)
  const duration = formatDuration(clip.metadata?.duration)
  const effects = getEffects(clip)
  const script = getMetafieldValue(clip.metadata?.dialogue_script)
  const character = getClipCharacter(clip)
  const characterName = character
    ? getMetafieldValue(character.metadata?.name) || character.title
    : ''
  const characterPhoto = character?.metadata?.reference_photo?.imgix_url

  let related = [] as Awaited<ReturnType<typeof getClips>>
  if (character) {
    const all = await getClips()
    related = all
      .filter((item) => {
        const itemCharacter = getClipCharacter(item)
        return item.id !== clip.id && itemCharacter !== null && itemCharacter.id === character.id
      })
      .slice(0, 4)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: clip.id, object_type: clip.type })}
      />

      <Link href="/clips" className="text-sm text-gray-400 transition hover:text-laser-soft">
        ← All clips
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,360px)_1fr]">
        {/* Player */}
        <div className="mx-auto w-full max-w-sm md:mx-0">
          <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-laser/50 bg-ink-800 shadow-laser-lg">
            {src ? (
              <video
                src={src}
                controls
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-ink-700 to-ink-800 text-center">
                <span className="text-6xl">🎬</span>
                <p className="px-6 text-sm text-gray-400">
                  {status ? `Status: ${status}` : 'Video coming soon'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {platform && (
              <span className="rounded-full bg-laser px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {platform}
              </span>
            )}
            {duration && (
              <span className="rounded-full border border-ink-700 px-3 py-1 text-xs font-semibold text-gray-300">
                ⏱ {duration}
              </span>
            )}
            {status && (
              <span className="rounded-full border border-ink-700 px-3 py-1 text-xs font-semibold text-gray-300">
                {status}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-5xl tracking-wide [text-shadow:0_0_24px_rgba(255,31,61,0.5)] sm:text-6xl">
            {clip.title}
          </h1>

          {effects.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Effects
              </h2>
              <div className="flex flex-wrap gap-2">
                {effects.map((effect) => (
                  <EffectTag
                    key={effect}
                    label={effect}
                    href={`/clips?effect=${encodeURIComponent(effect)}`}
                  />
                ))}
              </div>
            </div>
          )}

          {script && (
            <div className="mt-8">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Dialogue script
              </h2>
              <blockquote className="whitespace-pre-line rounded-2xl border-l-4 border-laser bg-ink-800 p-5 text-lg leading-relaxed text-gray-100">
                {script}
              </blockquote>
            </div>
          )}

          {character && (
            <div className="mt-8">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Starring
              </h2>
              <Link
                href={`/characters/${character.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-800 p-3 transition hover:border-laser hover:shadow-laser"
              >
                {characterPhoto ? (
                  <img
                    src={`${characterPhoto}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={characterName}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-ink-700 text-3xl">
                    🧑
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-laser-soft">
                    {characterName}
                  </p>
                  <p className="text-sm text-gray-400">View character →</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title={`More with ${characterName}`} />
          <ClipGrid clips={related} />
        </section>
      )}
    </div>
  )
}