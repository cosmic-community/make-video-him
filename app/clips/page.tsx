import type { Metadata } from 'next'
import { getClips } from '@/lib/queries'
import { getEffects, getPlatform, uniqueSorted } from '@/lib/utils'
import ClipGrid from '@/components/ClipGrid'
import FilterBar from '@/components/FilterBar'

export const metadata: Metadata = {
  title: 'Clips',
  description: 'Browse every short-form AI character video by platform and effect.',
}

interface ClipsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? ''
  }
  return value ?? ''
}

export default async function ClipsPage({ searchParams }: ClipsPageProps) {
  const params = await searchParams
  const activePlatform = firstValue(params['platform'])
  const activeEffect = firstValue(params['effect'])

  const clips = await getClips()

  const platforms = uniqueSorted(clips.map((clip) => getPlatform(clip)))
  const effects = uniqueSorted(clips.flatMap((clip) => getEffects(clip)))

  const filtered = clips.filter((clip) => {
    if (activePlatform && getPlatform(clip) !== activePlatform) return false
    if (activeEffect && !getEffects(clip).includes(activeEffect)) return false
    return true
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-5xl tracking-wide [text-shadow:0_0_24px_rgba(255,31,61,0.55)] sm:text-6xl">
        All <span className="text-laser">clips</span>
      </h1>
      <p className="mt-2 text-gray-400">
        {filtered.length} {filtered.length === 1 ? 'clip' : 'clips'}
        {activePlatform ? ` on ${activePlatform}` : ''}
        {activeEffect ? ` with ${activeEffect}` : ''}
      </p>

      <div className="mt-6">
        <FilterBar
          basePath="/clips"
          platforms={platforms}
          effects={effects}
          activePlatform={activePlatform}
          activeEffect={activeEffect}
        />
      </div>

      <div className="mt-8">
        <ClipGrid clips={filtered} />
      </div>
    </div>
  )
}