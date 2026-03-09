import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Plus, X, ArrowRight } from 'lucide-react';
import { cars, formatPrice, formatKm } from '../data/cars';
import { useCompare } from '../context/CompareContext';

export default function Compare() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [selectOpen, setSelectOpen] = useState(null);

  const specRows = [
    { label: 'Price', key: 'price', format: (v) => formatPrice(v) },
    { label: 'Year', key: 'year' },
    { label: 'Engine', key: 'engine' },
    { label: 'Power', key: 'power' },
    { label: 'Torque', key: 'torque' },
    { label: 'Top Speed', key: 'topSpeed' },
    { label: '0-100 km/h', key: 'acceleration' },
    { label: 'Fuel Type', key: 'fuel' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'KM Driven', key: 'kmDriven', format: (v) => formatKm(v) },
    { label: 'Body Type', key: 'bodyType' },
    { label: 'Seats', key: 'seats' },
    { label: 'Color', key: 'color' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'City', key: 'city' },
  ];

  const availableCars = cars.filter((c) => !compareList.find((cc) => cc.id === c.id));

  return (
    <div className="pt-20 min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-6 h-6 text-gold-400" />
            <p className="section-subtitle">Side by Side</p>
          </div>
          <h1 className="section-title text-white">
            Compare <span className="gold-gradient-text">Cars</span>
          </h1>
          <p className="text-luxury-muted mt-2">Select up to 3 cars to compare specifications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Car Selector Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((slot) => {
            const car = compareList[slot];
            return (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: slot * 0.1 }}
              >
                {car ? (
                  <div className="card-luxury p-4 relative group">
                    <button
                      onClick={() => removeFromCompare(car.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-luxury-dark rounded-full flex items-center justify-center text-luxury-muted hover:text-red-400 hover:bg-red-400/10 transition-all z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="aspect-video rounded-sm overflow-hidden mb-4">
                      <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-xs text-gold-400 uppercase tracking-wider">{car.brand}</p>
                    <h3 className="font-display text-lg font-bold text-white">{car.title}</h3>
                    <p className="font-display text-xl font-bold gold-gradient-text mt-1">{formatPrice(car.price)}</p>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setSelectOpen(selectOpen === slot ? null : slot)}
                      className="w-full border-2 border-dashed border-luxury-border rounded-sm p-12 flex flex-col items-center gap-3 hover:border-gold-400/30 transition-colors"
                    >
                      <div className="w-14 h-14 bg-luxury-card rounded-full flex items-center justify-center">
                        <Plus className="w-6 h-6 text-gold-400" />
                      </div>
                      <span className="text-sm text-luxury-muted">Add Car {slot + 1}</span>
                    </button>
                    {selectOpen === slot && (
                      <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-luxury-card border border-luxury-border rounded-sm shadow-xl max-h-64 overflow-y-auto">
                        {availableCars.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => { addToCompare(c); setSelectOpen(null); }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-luxury-dark transition-colors text-left"
                          >
                            <img src={c.images[0]} alt={c.title} className="w-12 h-12 rounded-sm object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate">{c.title}</p>
                              <p className="text-xs text-gold-400">{formatPrice(c.price)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        {compareList.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury overflow-hidden"
          >
            <div className="p-6 border-b border-luxury-border">
              <h2 className="font-display text-xl font-bold text-white">Detailed Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-luxury-dark">
                    <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider w-40">Specification</th>
                    {compareList.map((car) => (
                      <th key={car.id} className="text-left px-6 py-4 text-xs text-gold-400 uppercase tracking-wider">
                        {car.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row, i) => {
                    const values = compareList.map((c) => row.format ? row.format(c[row.key]) : c[row.key]);
                    const allSame = values.every((v) => String(v) === String(values[0]));
                    return (
                      <tr key={i} className="border-t border-luxury-border hover:bg-luxury-dark/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-luxury-muted font-medium">{row.label}</td>
                        {compareList.map((car, j) => {
                          const val = row.format ? row.format(car[row.key]) : car[row.key];
                          return (
                            <td
                              key={car.id}
                              className={`px-6 py-4 text-sm font-medium ${
                                !allSame && compareList.length >= 2
                                  ? 'text-gold-400'
                                  : 'text-white'
                              }`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {compareList.length < 2 && (
          <div className="text-center py-12">
            <p className="text-luxury-muted mb-4">Select at least 2 cars to start comparing</p>
            <Link to="/listings" className="btn-gold inline-flex items-center gap-2">
              Browse Cars <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {compareList.length > 0 && (
          <div className="text-center mt-8">
            <button onClick={clearCompare} className="btn-outline text-xs">
              Clear All & Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
