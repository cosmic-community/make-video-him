import Link from 'next/link'
import { getClips, getCharacters } from '@/lib/queries'
import { getVideoSrc } from '@/lib/utils'
import ClipGrid from '@/components/ClipGrid'
import CharacterCard from '@/components/CharacterCard'
import SectionHeading from '@/components/SectionHeading'

export default async function HomePage() {
  const [clips, characters] = await Promise.all([getClips(), getCharacters()])

  const withVideo = clips.filter((clip) => getVideoSrc(clip).length > 0)
  const featured = (withVideo.length > 0 ? withVideo : clips).slice(0, 8)

  const heroCharacter = characters[0]
  const heroPhoto = heroCharacter?.metadata?.reference_photo?.imgix_url

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-700">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,31,61,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(176,0,31,0.25),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-laser/40 bg-laser/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-laser-soft">
              <span className="h-2 w-2 animate-glow-pulse rounded-full bg-laser" />
              AI character shorts
            </p>
            <h1 className="font-display text-6xl leading-[0.95] tracking-wide [text-shadow:0_0_28px_rgba(255,31,61,0.65)] sm:text-8xl">
              Hey guys,
              <br />
              <span className="text-laser">I found this AI.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-gray-300 sm:text-lg">
              Spin arounds. Laser eyes. Same character, every single clip. Built for TikTok,
              YouTube Shorts and Instagram Reels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/clips"
                className="rounded-full bg-laser px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-laser transition hover:bg-laser-soft"
              >
                Watch clips
              </Link>
              <Link
                href="/characters"
                className="rounded-full border border-ink-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-laser hover:text-laser-soft"
              >
                Meet the characters
              </Link>
            </div>
            <dl className="mt-10 flex gap-8">
              <div>
                <dt className="text-xs uppercase tracking-widest text-gray-400">Clips</dt>
                <dd className="font-display text-4xl text-white">{clips.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-gray-400">Characters</dt>
                <dd className="font-display text-4xl text-white">{characters.length}</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-4 rounded-[2rem] bg-laser/30 blur-3xl" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-laser/50 bg-ink-800 shadow-laser-lg">
              {heroPhoto ? (
                <img
                  src={`${heroPhoto}?w=800&h=1422&fit=crop&auto=format,compress`}
                  alt={heroCharacter?.metadata?.name || heroCharacter?.title || 'Featured character'}
                  width={400}
                  height={711}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-ink-700 to-ink-800 text-7xl">
                  🔴
                </div>
              )}
              <div className="absolute inset-x-0 top-[32%] flex justify-center gap-10">
                <span className="h-2 w-10 animate-glow-pulse rounded-full bg-laser blur-[2px]" />
                <span className="h-2 w-10 animate-glow-pulse rounded-full bg-laser blur-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured clips */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          title="Featured clips"
          subtitle="Tap any clip to see the full script and effects."
          href="/clips"
          linkLabel="All clips"
        />
        <ClipGrid clips={featured} />
      </section>

      {/* Characters */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionHeading
          title="The characters"
          subtitle="Same look in every video."
          href="/characters"
          linkLabel="All characters"
        />
        {characters.length === 0 ? (
          <p className="text-gray-400">No characters yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {characters.slice(0, 4).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}