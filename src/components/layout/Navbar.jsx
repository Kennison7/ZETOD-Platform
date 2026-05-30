import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { ASSESSMENT_URL } from '../../config/api'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-18">
          <a href="#" className="shrink-0">
            <Logo />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-muted hover:text-text transition-colors duration-200"
            >
              Login
            </a>
            <Button href={ASSESSMENT_URL} size="sm">
              Commencer l&apos;évaluation
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-muted hover:text-text transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-white/5 mt-px">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-muted hover:text-text transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                onClick={handleLinkClick}
                className="text-muted hover:text-text transition-colors py-2"
              >
                Login
              </a>
              <Button href={ASSESSMENT_URL} onClick={handleLinkClick} className="w-full">
                Commencer l&apos;évaluation
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
