import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-ink-700 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-gray-400 sm:flex-row">
        <p>© {year} Make Video Him. Not a bot. 🔴</p>
        <nav className="flex gap-4">
          <Link href="/clips" className="transition hover:text-laser-soft">
            Clips
          </Link>
          <Link href="/characters" className="transition hover:text-laser-soft">
            Characters
          </Link>
        </nav>
      </div>
    </footer>
  )
}