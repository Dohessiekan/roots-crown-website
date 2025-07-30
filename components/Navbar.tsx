import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-pure-white shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-accent text-xl font-bold">👑</span>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-primary">
                  Roots & Crown
                </h1>
                <p className="text-xs text-text-dark opacity-75">
                  Kigali Beauty Lounge
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-16">
            <Link href="/" className={`font-serif font-medium transition-colors ${
              isScrolled ? 'text-gray-800 hover:text-green-700' : 'text-white hover:text-yellow-400'
            }`}>
              Home
            </Link>
            <Link href="/services" className={`font-serif font-medium transition-colors ${
              isScrolled ? 'text-text-dark hover:text-primary' : 'text-white hover:text-accent'
            }`}>
              Services
            </Link>
            <Link href="/contact" className={`font-serif font-medium transition-colors ${
              isScrolled ? 'text-text-dark hover:text-primary' : 'text-white hover:text-accent'
            }`}>
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/services" 
              className="btn-secondary px-6 py-3 rounded-lg font-body font-light"
              style={{ backgroundColor: '#C49B38', color: '#fff', border: 'none' }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-text-dark' : 'text-white'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-pure-white border-t border-secondary">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-text-dark hover:text-primary font-serif"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-text-dark hover:text-primary font-serif"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-text-dark hover:text-primary font-serif"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Link 
                  href="/services" 
                  className="btn-secondary w-full text-center py-2 px-4 rounded-lg font-serif font-extralight"
                  style={{ backgroundColor: '#C49B38', color: '#fff', border: 'none' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
