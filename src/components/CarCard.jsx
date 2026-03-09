import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fuel, Gauge, Calendar, GitBranch, Plus, Check } from 'lucide-react';
import { formatPrice, formatKm } from '../data/cars';
import { useCompare } from '../context/CompareContext';

export default function CarCard({ car, index = 0, view = 'grid' }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(car.id);

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="card-luxury flex flex-col md:flex-row group"
      >
        <div className="relative md:w-80 h-56 md:h-auto overflow-hidden flex-shrink-0">
          <img
            src={car.images[0]}
            alt={car.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {car.featured && (
            <span className="absolute top-3 left-3 bg-gold-400 text-luxury-black text-[10px] font-bold uppercase tracking-wider px-3 py-1">
              Featured
            </span>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gold-400 font-medium tracking-wider uppercase mb-1">{car.brand}</p>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                  {car.title}
                </h3>
              </div>
              <p className="font-display text-xl font-bold text-gold-400">
                {formatPrice(car.price)}
              </p>
            </div>
            <p className="text-sm text-luxury-muted mt-2 line-clamp-2">{car.description}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" /> {car.year}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Gauge className="w-3.5 h-3.5" /> {formatKm(car.kmDriven)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Fuel className="w-3.5 h-3.5" /> {car.fuel}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <GitBranch className="w-3.5 h-3.5" /> {car.transmission}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Link to={`/car/${car.id}`} className="btn-gold text-xs py-2">View Details</Link>
            <button
              onClick={() => inCompare ? removeFromCompare(car.id) : addToCompare(car)}
              className={`btn-outline text-xs py-2 flex items-center gap-1 ${inCompare ? 'bg-gold-400/10' : ''}`}
            >
              {inCompare ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              {inCompare ? 'Added' : 'Compare'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-luxury group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {car.featured && (
          <span className="absolute top-3 left-3 bg-gold-400 text-luxury-black text-[10px] font-bold uppercase tracking-wider px-3 py-1">
            Featured
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            inCompare ? removeFromCompare(car.id) : addToCompare(car);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            inCompare
              ? 'bg-gold-400 text-luxury-black'
              : 'bg-black/50 text-white hover:bg-gold-400 hover:text-luxury-black'
          }`}
          title={inCompare ? 'Remove from compare' : 'Add to compare'}
        >
          {inCompare ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
        <div className="absolute bottom-3 left-3">
          <p className="font-display text-lg font-bold text-white drop-shadow-lg">
            {formatPrice(car.price)}
          </p>
        </div>
      </div>
      <Link to={`/car/${car.id}`} className="block p-4">
        <p className="text-[10px] text-gold-400 font-medium tracking-wider uppercase mb-1">{car.brand}</p>
        <h3 className="font-display text-base font-bold text-white group-hover:text-gold-400 transition-colors duration-300 mb-3">
          {car.title}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3 h-3 text-gold-400/60" /> {car.year}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Gauge className="w-3 h-3 text-gold-400/60" /> {formatKm(car.kmDriven)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Fuel className="w-3 h-3 text-gold-400/60" /> {car.fuel}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <GitBranch className="w-3 h-3 text-gold-400/60" /> {car.transmission}
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-luxury-border">
          <span className="text-xs text-luxury-muted">{car.city} • {car.owners} Owner</span>
        </div>
      </Link>
    </motion.div>
  );
}
