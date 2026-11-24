import Link from 'next/link'

interface FilterBarProps {
  basePath: string
  platforms: string[]
  effects: string[]
  activePlatform: string
  activeEffect: string
}

function buildHref(basePath: string, platform: string, effect: string): string {
  const params = new URLSearchParams()
  if (platform) params.set('platform', platform)
  if (effect) params.set('effect', effect)
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

function chipClass(active: boolean): string {
  const base = 'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition'
  return active
    ? `${base} border-laser bg-laser text-white shadow-laser`
    : `${base} border-ink-700 bg-ink-800 text-gray-300 hover:border-laser hover:text-laser-soft`
}

export default function FilterBar({
  basePath,
  platforms,
  effects,
  activePlatform,
  activeEffect,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {platforms.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Platform
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={buildHref(basePath, '', activeEffect)} className={chipClass(!activePlatform)}>
              All
            </Link>
            {platforms.map((platform) => (
              <Link
                key={platform}
                href={buildHref(basePath, platform, activeEffect)}
                className={chipClass(activePlatform === platform)}
              >
                {platform}
              </Link>
            ))}
          </div>
        </div>
      )}

      {effects.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Effect
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={buildHref(basePath, activePlatform, '')} className={chipClass(!activeEffect)}>
              All
            </Link>
            {effects.map((effect) => (
              <Link
                key={effect}
                href={buildHref(basePath, activePlatform, effect)}
                className={chipClass(activeEffect === effect)}
              >
                {effect}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}