import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, MapPin, Calendar, Gauge, Fuel, GitBranch, Palette,
  Users, Zap, Settings, ArrowRight, MessageCircle, Phone, Share2, Heart, X
} from 'lucide-react';
import { formatPrice, formatKm } from '../data/cars';
import { useCars } from '../context/CarContext';
import EMICalculator from '../components/EMICalculator';
import EnquiryModal from '../components/EnquiryModal';
import CarCard from '../components/CarCard';

export default function CarDetail() {
  const { id } = useParams();
  const { cars } = useCars();
  const car = cars.find((c) => c.id === Number(id));
  const [mainImage, setMainImage] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!car) {
    return (
      <div className="pt-20 min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="section-title text-white mb-4">Car Not Found</h2>
          <Link to="/listings" className="btn-gold">Browse All Cars</Link>
        </div>
      </div>
    );
  }

  const similarCars = cars.filter((c) => c.id !== car.id && (c.brand === car.brand || c.bodyType === car.bodyType)).slice(0, 4);

  const specs = [
    { icon: Settings, label: 'Engine', value: car.engine },
    { icon: Zap, label: 'Power', value: car.power },
    { icon: Gauge, label: 'Top Speed', value: car.topSpeed },
    { icon: ArrowRight, label: '0-100 km/h', value: car.acceleration },
    { icon: Fuel, label: 'Fuel Type', value: car.fuel },
    { icon: GitBranch, label: 'Transmission', value: car.transmission },
    { icon: Palette, label: 'Color', value: car.color },
    { icon: Users, label: 'Seats', value: `${car.seats} Seater` },
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'KM Driven', value: formatKm(car.kmDriven) },
    { icon: MapPin, label: 'Location', value: car.city },
    { icon: Users, label: 'Owners', value: `${car.owners} Owner` },
  ];

  const whatsappLink = `https://wa.me/919876543210?text=Hi! I'm interested in the ${car.title} (${car.year}) listed at ${formatPrice(car.price)}. Please share more details.`;

  return (
    <div className="pt-20 min-h-screen bg-luxury-black">
      {/* Breadcrumb */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-luxury-muted hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-luxury-muted">/</span>
            <Link to="/listings" className="text-luxury-muted hover:text-gold-400 transition-colors">Cars</Link>
            <span className="text-luxury-muted">/</span>
            <span className="text-gold-400">{car.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery + Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div
                className="relative aspect-[16/10] bg-luxury-card rounded-sm overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(true)}
              >
                <img
                  src={car.images[mainImage]}
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {car.featured && (
                  <span className="absolute top-4 left-4 bg-gold-400 text-luxury-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
                    Featured
                  </span>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      liked ? 'bg-red-500 text-white' : 'bg-black/50 backdrop-blur-sm text-white hover:bg-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold-400 hover:text-luxury-black transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); setMainImage((prev) => (prev - 1 + car.images.length) % car.images.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold-400 hover:text-luxury-black transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMainImage((prev) => (prev + 1) % car.images.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold-400 hover:text-luxury-black transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`flex-1 aspect-video rounded-sm overflow-hidden border-2 transition-all ${
                      i === mainImage ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Title & Price (Mobile) */}
            <div className="lg:hidden">
              <p className="text-xs text-gold-400 font-medium tracking-wider uppercase mb-1">{car.brand}</p>
              <h1 className="font-display text-2xl font-bold text-white mb-2">{car.title}</h1>
              <p className="font-display text-3xl font-bold gold-gradient-text">{formatPrice(car.price)}</p>
            </div>

            {/* Specs Grid */}
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-luxury-dark border border-luxury-border rounded-sm p-4 flex items-start gap-3"
                  >
                    <spec.icon className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-luxury-muted">{spec.label}</p>
                      <p className="text-sm font-medium text-white">{spec.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4">About this Car</h2>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>
          </div>

          {/* Right Column - Price & Actions */}
          <div className="space-y-6">
            <div className="card-luxury p-6 sticky top-28">
              {/* Title */}
              <div className="hidden lg:block mb-6">
                <p className="text-xs text-gold-400 font-medium tracking-wider uppercase mb-1">{car.brand}</p>
                <h1 className="font-display text-2xl font-bold text-white mb-3">{car.title}</h1>
                <p className="font-display text-3xl font-bold gold-gradient-text">{formatPrice(car.price)}</p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-luxury-dark rounded-sm p-3 text-center">
                  <p className="text-xs text-luxury-muted">Year</p>
                  <p className="text-sm font-bold text-white">{car.year}</p>
                </div>
                <div className="bg-luxury-dark rounded-sm p-3 text-center">
                  <p className="text-xs text-luxury-muted">KM Driven</p>
                  <p className="text-sm font-bold text-white">{formatKm(car.kmDriven)}</p>
                </div>
                <div className="bg-luxury-dark rounded-sm p-3 text-center">
                  <p className="text-xs text-luxury-muted">Fuel</p>
                  <p className="text-sm font-bold text-white">{car.fuel}</p>
                </div>
                <div className="bg-luxury-dark rounded-sm p-3 text-center">
                  <p className="text-xs text-luxury-muted">Location</p>
                  <p className="text-sm font-bold text-white">{car.city}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire Now
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-sm hover:bg-green-500 transition-all duration-300 tracking-wider uppercase text-sm"
                >
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:+919876543210" className="btn-outline w-full flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator carPrice={car.price} />
          </div>
        </div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-white">
                Similar <span className="text-gold-400">Cars</span>
              </h2>
              <Link to="/listings" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setMainImage((prev) => (prev - 1 + car.images.length) % car.images.length); }}
            className="absolute left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={car.images[mainImage]}
            alt={car.title}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setMainImage((prev) => (prev + 1) % car.images.length); }}
            className="absolute right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}

      {/* Floating CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-luxury-card/95 backdrop-blur-xl border-t border-luxury-border p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-luxury-muted">{car.title}</p>
            <p className="font-display text-lg font-bold gold-gradient-text">{formatPrice(car.price)}</p>
          </div>
          <button onClick={() => setEnquiryOpen(true)} className="btn-gold text-xs py-2.5 px-6">
            Enquire Now
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal car={car} isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
