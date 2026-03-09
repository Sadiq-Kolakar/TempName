import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Scale } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../data/cars';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-luxury-card/95 backdrop-blur-xl border-t border-gold-400/30 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-gold-400">
                <Scale className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Compare ({compareList.length}/3)
                </span>
              </div>
              <div className="flex gap-2">
                {compareList.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-2 bg-luxury-dark border border-luxury-border rounded-sm px-3 py-1.5"
                  >
                    <img src={car.images[0]} alt={car.title} className="w-8 h-8 rounded-sm object-cover" />
                    <div className="hidden sm:block">
                      <p className="text-xs font-medium text-white truncate max-w-[120px]">{car.title}</p>
                      <p className="text-[10px] text-gold-400">{formatPrice(car.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCompare(car.id)}
                      className="text-luxury-muted hover:text-red-400 transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={clearCompare} className="text-xs text-luxury-muted hover:text-white transition-colors">
                Clear All
              </button>
              <Link
                to="/compare"
                className="btn-gold text-xs py-2 px-4 flex items-center gap-2"
              >
                Compare Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
