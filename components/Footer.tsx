import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-pure-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-page-mobile lg:px-page-desktop relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Tagline + Social */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">👑</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">Roots & Crown</h3>
                <p className="text-sm opacity-90">A one-stop beauty lounge in Kigali</p>
              </div>
            </div>
            <p className="text-pure-white opacity-80 font-body mb-8">
              Experience premium beauty and wellness services in the heart of Kigali. 
              We combine traditional techniques with modern luxury for your complete transformation.
            </p>
            {/* Social Icons - SVGs */}
            <div className="mt-2">
              <h4 className="font-body font-semibold mb-4 text-pure-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-all">
                  <img src="/images/Instagram.svg" alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-all">
                  <img src="/images/Facebook.svg" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-all">
                  <img src="/images/TikTok.svg" alt="TikTok" className="w-6 h-6" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-all">
                  <img src="/images/YouTube.png" alt="YouTube" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body text-lg font-semibold mb-6 text-pure-white">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-pure-white opacity-80 hover:opacity-100 hover:text-accent transition-all font-body">
                Home
              </Link>
              <Link href="/about" className="block text-pure-white opacity-80 hover:opacity-100 hover:text-accent transition-all font-body">
                About Us
              </Link>
              <Link href="/services" className="block text-pure-white opacity-80 hover:opacity-100 hover:text-accent transition-all font-body">
                Services
              </Link>
              <Link href="/contact" className="block text-pure-white opacity-80 hover:opacity-100 hover:text-accent transition-all font-body">
                Contact
              </Link>
              <Link href="/booking" className="block text-pure-white opacity-80 hover:opacity-100 hover:text-accent transition-all font-body">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-body text-lg font-semibold mb-6 text-pure-white">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                {/* Location Icon */}
                <span className="mt-1">
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
                </span>
                <div>
                  <p className="font-body text-pure-white opacity-90">
                    KN 78 Street, Nyarugenge<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {/* Phone Icon */}
                <span>
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0122 16.92z"/></svg>
                </span>
                <p className="font-body text-pure-white opacity-90">+250 788 123 456</p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Mail Icon */}
                <span>
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                </span>
                <p className="font-body text-pure-white opacity-90">hello@rootsandcrown.rw</p>
              </div>
              <div className="flex items-start space-x-3">
                {/* Clock Icon */}
                <span className="mt-1">
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <div className="font-body text-pure-white !text-white">
                  <p className="!text-white">Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p className="!text-white">Saturday: 8:00 AM - 7:00 PM</p>
                  <p className="!text-white">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent border-opacity-30 text-center relative z-10">
          <p className="font-body text-pure-white">
            &copy; 2025 Roots & Crown Beauty Lounge. All rights reserved. | Kigali, Rwanda
          </p>
        </div>
      </div>
      {/* Footer SVG at bottom left */}
      <img src="/images/footer.svg" alt="Footer motif" className="absolute bottom-0 left-0 w-24 md:w-32 lg:w-40 pointer-events-none select-none z-0" />
    </footer>
  )
}
