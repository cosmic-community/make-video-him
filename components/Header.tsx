import Link from 'next/link'

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/clips', label: 'Clips' },
  { href: '/characters', label: 'Characters' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-3 w-3 animate-glow-pulse rounded-full bg-laser shadow-laser" />
          <span className="font-display text-2xl tracking-wider text-white">
            Make Video <span className="text-laser">Him</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-300 transition hover:bg-laser/10 hover:text-laser-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}