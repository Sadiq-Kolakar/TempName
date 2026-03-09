import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-luxury-border">
      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-luxury-dark via-luxury-card to-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Stay Updated with <span className="text-gold-400">New Arrivals</span>
              </h3>
              <p className="text-luxury-muted mt-1">Get notified when new luxury cars are listed</p>
            </div>
            <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-luxury rounded-r-none w-full md:w-72"
              />
              <button className="btn-gold rounded-l-none whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center">
                <Car className="w-5 h-5 text-luxury-black" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                LUXE<span className="text-gold-400">MOTORS</span>
              </span>
            </Link>
            <p className="text-luxury-muted text-sm leading-relaxed mb-6">
              India's premier destination for pre-owned luxury and exotic automobiles. Every car is verified, inspected, and delivered with our trust guarantee.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-luxury-card border border-luxury-border rounded-sm flex items-center justify-center text-luxury-muted hover:text-gold-400 hover:border-gold-400/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/listings', label: 'Browse Cars' },
                { to: '/sell', label: 'Sell Your Car' },
                { to: '/compare', label: 'Compare Cars' },
                { to: '/login', label: 'My Account' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-luxury-muted hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">Popular Brands</h4>
            <ul className="space-y-3">
              {['Lamborghini', 'Ferrari', 'Rolls-Royce', 'Porsche', 'Mercedes-Benz', 'Bentley'].map((brand) => (
                <li key={brand}>
                  <Link
                    to={`/listings?brand=${brand}`}
                    className="text-sm text-luxury-muted hover:text-gold-400 transition-colors duration-300"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-luxury-muted">
                  44, Sector-15, Gurugram,<br />Haryana 122001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm text-luxury-muted">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-sm text-luxury-muted">info@luxemotors.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-luxury-muted">
            © 2024 LuxeMotors. All rights reserved. | Premium Pre-Owned Luxury Cars
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-luxury-muted hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-luxury-muted hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-luxury-muted hover:text-gold-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
