// app/characters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMetafieldValue } from '@/lib/cosmic'
import { getCharacterBySlug, getClipsForCharacter } from '@/lib/queries'
import ClipGrid from '@/components/ClipGrid'
import SectionHeading from '@/components/SectionHeading'

interface CharacterPageProps {
  params: Promise<{ slug: string }>
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { slug } = await params
  const character = await getCharacterBySlug(slug)

  if (!character) {
    notFound()
  }

  const clips = await getClipsForCharacter(character.id)

  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)
  const notes = getMetafieldValue(character.metadata?.consistency_notes)
  const photo = character.metadata?.reference_photo?.imgix_url

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: character.id, object_type: character.type })}
      />

      <Link href="/characters" className="text-sm text-gray-400 transition hover:text-laser-soft">
        ← All characters
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,360px)_1fr]">
        <div className="mx-auto w-full max-w-sm md:mx-0">
          <div className="relative overflow-hidden rounded-3xl border border-laser/50 bg-ink-800 shadow-laser-lg">
            {photo ? (
              <img
                src={`${photo}?w=800&h=1000&fit=crop&auto=format,compress`}
                alt={name}
                width={400}
                height={500}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-b from-ink-700 to-ink-800 text-7xl">
                🧑
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-display text-6xl tracking-wide [text-shadow:0_0_28px_rgba(255,31,61,0.6)] sm:text-7xl">
            {name}
          </h1>

          {description && (
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-gray-200">
              {description}
            </p>
          )}

          {notes && (
            <div className="mt-8 rounded-2xl border border-laser/30 bg-laser/5 p-5">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-laser-soft">
                Consistency notes
              </h2>
              <p className="whitespace-pre-line text-gray-200">{notes}</p>
            </div>
          )}

          <p className="mt-8 text-sm text-gray-400">
            Featured in {clips.length} {clips.length === 1 ? 'clip' : 'clips'}
          </p>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading title={`Clips featuring ${name}`} />
        <ClipGrid clips={clips} />
      </section>
    </div>
  )
}