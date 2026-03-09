import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Buy Cars' },
    { to: '/sell', label: 'Sell Your Car' },
    { to: '/compare', label: 'Compare' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-luxury-black/95 backdrop-blur-xl border-b border-luxury-border shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Car className="w-5 h-5 text-luxury-black" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-white tracking-wide">
                LUXE<span className="text-gold-400">MOTORS</span>
              </span>
              <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase -mt-1">
                Premium Automobiles
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-gold-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth / User */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gold-400/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-48 bg-luxury-card border border-luxury-border rounded-sm shadow-xl overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-luxury-dark hover:text-gold-400 transition-colors"
                      >
                        Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-luxury-dark hover:text-gold-400 transition-colors"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-luxury-dark hover:text-red-400 transition-colors flex items-center gap-2 border-t border-luxury-border"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-xs py-2 px-4">
                  Sign In
                </Link>
                <Link to="/register" className="btn-gold text-xs py-2 px-4">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-black/98 backdrop-blur-xl border-t border-luxury-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-sm font-medium tracking-wider uppercase py-2 ${
                    isActive(link.to) ? 'text-gold-400' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-luxury-border flex gap-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="btn-outline text-xs py-2 px-4 flex-1 text-center">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }} className="btn-dark text-xs py-2 px-4 flex-1">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline text-xs py-2 px-4 flex-1 text-center">
                      Sign In
                    </Link>
                    <Link to="/register" className="btn-gold text-xs py-2 px-4 flex-1 text-center">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
