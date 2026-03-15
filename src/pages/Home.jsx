import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, TrendingUp, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { brands, testimonials, formatPrice } from '../data/cars';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';

function Counter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const { cars } = useCars();
  const [heroSlide, setHeroSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const featuredCars = cars.filter((c) => c.featured);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600',
      title: 'Discover Your Dream',
      highlight: 'Luxury Car',
      subtitle: 'Handpicked collection of the finest pre-owned exotic automobiles in India',
    },
    {
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600',
      title: 'Exquisite Performance',
      highlight: 'Unmatched Style',
      subtitle: 'From supercars to ultra-luxury sedans — we have it all',
    },
    {
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600',
      title: 'The Art of',
      highlight: 'Fine Motoring',
      subtitle: 'Curated excellence. Every car tells a story of prestige and power.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: 500, suffix: '+', label: 'Cars Sold' },
    { value: 50, suffix: '+', label: 'Premium Brands' },
    { value: 2000, suffix: '+', label: 'Happy Clients' },
    { value: 15, suffix: '+', label: 'Years Experience' },
  ];

  const trustSignals = [
    { icon: Shield, title: '200-Point Inspection', desc: 'Every car undergoes rigorous quality check' },
    { icon: Award, title: 'Certified Pre-Owned', desc: 'Authenticated documentation & ownership' },
    { icon: Clock, title: '7-Day Return Policy', desc: 'Buy with confidence, return if not satisfied' },
    { icon: TrendingUp, title: 'Best Market Price', desc: 'Transparent pricing with market analysis' },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === heroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                India's #1 Luxury Car Marketplace
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-2">
                {heroSlides[heroSlide].title}
              </h1>
              <h1 className="font-display text-5xl md:text-7xl font-bold gold-gradient-text leading-tight mb-6">
                {heroSlides[heroSlide].highlight}
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                {heroSlides[heroSlide].subtitle}
              </p>

              {/* Search Bar */}
              <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm overflow-hidden max-w-xl">
                <div className="flex items-center gap-2 px-4 flex-1">
                  <Search className="w-5 h-5 text-gold-400" />
                  <input
                    type="text"
                    placeholder="Search by brand, model, or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-4 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <Link
                  to={`/listings${searchQuery ? `?search=${searchQuery}` : ''}`}
                  className="btn-gold rounded-none px-8 flex items-center gap-2"
                >
                  Search <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-8">
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i}>
                    <p className="font-display text-2xl font-bold text-white">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Slide Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === heroSlide ? 'w-8 bg-gold-400' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold-400 hover:text-luxury-black transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold-400 hover:text-luxury-black transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* ===== BRANDS SECTION ===== */}
      <section className="py-16 bg-luxury-dark border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="section-subtitle">Browse by Brand</p>
            <Link to="/listings" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/listings?brand=${brand.name}`}
                className="flex-shrink-0 w-32 h-24 bg-luxury-card border border-luxury-border rounded-sm flex flex-col items-center justify-center gap-2 hover:border-gold-400/30 hover:bg-luxury-card/80 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{brand.logo}</span>
                <span className="text-xs text-luxury-muted group-hover:text-gold-400 transition-colors whitespace-nowrap">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CARS ===== */}
      <section className="py-20 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Handpicked for You</p>
            <h2 className="section-title text-white">
              Featured <span className="gold-gradient-text">Collection</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.slice(0, 4).map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/listings" className="btn-outline inline-flex items-center gap-2">
              Explore All Cars <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="py-20 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Why Choose Us</p>
            <h2 className="section-title text-white">
              The <span className="gold-gradient-text">LuxeMotors</span> Promise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-luxury p-6 text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-400/20 transition-colors duration-300">
                  <signal.icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{signal.title}</h3>
                <p className="text-sm text-luxury-muted">{signal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-16 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl font-bold text-luxury-black">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-luxury-black/70 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELL YOUR CAR CTA ===== */}
      <section className="py-20 bg-luxury-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle mb-3">Ready to Sell?</p>
              <h2 className="section-title text-white mb-4">
                Sell Your <span className="gold-gradient-text">Luxury Car</span> at the Best Price
              </h2>
              <p className="text-luxury-muted mb-8 leading-relaxed">
                Get the best value for your premium automobile. Our expert team ensures a hassle-free selling experience with transparent pricing and instant valuation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sell" className="btn-gold inline-flex items-center justify-center gap-2">
                  Start Selling <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+919876543210" className="btn-outline inline-flex items-center justify-center gap-2">
                  Call Us Now
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '48h', label: 'Quick Sale Process' },
                { value: '100%', label: 'Secure Transaction' },
                { value: '0%', label: 'Commission Fee' },
                { value: '24/7', label: 'Expert Support' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <p className="font-display text-2xl font-bold text-gold-400">{item.value}</p>
                  <p className="text-xs text-luxury-muted mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-3">Client Testimonials</p>
            <h2 className="section-title text-white">
              What Our <span className="gold-gradient-text">Clients</span> Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-luxury p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="border-t border-luxury-border pt-4">
                  <p className="font-display font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gold-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
