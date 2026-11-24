import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const description = getMetafieldValue(character.metadata?.description)
  const photo = character.metadata?.reference_photo?.imgix_url

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="group block overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 transition duration-200 hover:-translate-y-1 hover:border-laser hover:shadow-laser"
    >
      {photo ? (
        <img
          src={`${photo}?w=700&h=875&fit=crop&auto=format,compress`}
          alt={name}
          width={350}
          height={437}
          className="aspect-[4/5] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-b from-ink-700 to-ink-800 text-5xl">
          🧑
        </div>
      )}
      <div className="p-4">
        <h3 className="font-display text-2xl tracking-wide text-white group-hover:text-laser-soft">
          {name}
        </h3>
        {description && <p className="mt-1 line-clamp-2 text-sm text-gray-400">{description}</p>}
      </div>
    </Link>
  )
}