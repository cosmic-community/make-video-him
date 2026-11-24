import type { Metadata } from 'next'
import { getCharacters } from '@/lib/queries'
import CharacterCard from '@/components/CharacterCard'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = {
  title: 'Characters',
  description: 'Meet the AI characters behind every clip.',
}

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-5xl tracking-wide [text-shadow:0_0_24px_rgba(255,31,61,0.55)] sm:text-6xl">
        The <span className="text-laser">characters</span>
      </h1>
      <p className="mt-2 text-gray-400">Same face. Same look. Every single video.</p>

      <div className="mt-8">
        {characters.length === 0 ? (
          <EmptyState title="No characters yet" message="Add a character in Cosmic to see it here." />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}