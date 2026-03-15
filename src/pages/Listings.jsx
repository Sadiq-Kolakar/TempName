import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid3x3, List, SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { brands } from '../data/cars';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';

const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Hatchback'];

export default function Listings() {
  const { cars } = useCars();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    fuel: '',
    transmission: '',
    bodyType: '',
    priceMin: 0,
    priceMax: 100000000,
    yearMin: 2015,
    yearMax: 2025,
    kmMax: 100000,
  });

  const [sortBy, setSortBy] = useState('newest');

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Only show approved cars in listings
      if (car.status !== 'approved') return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !car.title.toLowerCase().includes(q) &&
          !car.brand.toLowerCase().includes(q) &&
          !car.model.toLowerCase().includes(q) &&
          !car.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (car.price < filters.priceMin || car.price > filters.priceMax) return false;
      if (car.year < filters.yearMin || car.year > filters.yearMax) return false;
      if (car.kmDriven > filters.kmMax) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'year': result.sort((a, b) => b.year - a.year); break;
      case 'mileage': result.sort((a, b) => a.kmDriven - b.kmDriven); break;
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      search: '', brand: '', fuel: '', transmission: '', bodyType: '',
      priceMin: 0, priceMax: 100000000, yearMin: 2015, yearMax: 2025, kmMax: 100000,
    });
    setSearchParams({});
  };

  const activeFilterCount = [
    filters.brand, filters.fuel, filters.transmission, filters.bodyType,
    filters.priceMin > 0, filters.priceMax < 100000000,
    filters.yearMin > 2015, filters.yearMax < 2025,
    filters.kmMax < 100000,
  ].filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Search</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            placeholder="Brand, model..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input-luxury pl-10 text-sm"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="input-luxury text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.name} value={b.name}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">
          Price Range: ₹{(filters.priceMin / 10000000).toFixed(1)} Cr - ₹{(filters.priceMax / 10000000).toFixed(1)} Cr
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100000000"
            step="5000000"
            value={filters.priceMin}
            onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
            className="w-full accent-gold-400 h-1 bg-luxury-border rounded-full appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="100000000"
            step="5000000"
            value={filters.priceMax}
            onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full accent-gold-400 h-1 bg-luxury-border rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Year */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">
          Year: {filters.yearMin} - {filters.yearMax}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="2010"
            max="2025"
            value={filters.yearMin}
            onChange={(e) => setFilters({ ...filters, yearMin: Number(e.target.value) })}
            className="w-full accent-gold-400 h-1 bg-luxury-border rounded-full appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="2010"
            max="2025"
            value={filters.yearMax}
            onChange={(e) => setFilters({ ...filters, yearMax: Number(e.target.value) })}
            className="w-full accent-gold-400 h-1 bg-luxury-border rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Fuel Type</label>
        <div className="grid grid-cols-2 gap-2">
          {FUEL_TYPES.map((f) => (
            <button
              key={f}
              onClick={() => setFilters({ ...filters, fuel: filters.fuel === f ? '' : f })}
              className={`px-3 py-2 text-xs border rounded-sm transition-all ${
                filters.fuel === f
                  ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                  : 'border-luxury-border text-luxury-muted hover:border-gold-400/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Transmission</label>
        <div className="grid grid-cols-2 gap-2">
          {TRANSMISSIONS.map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ ...filters, transmission: filters.transmission === t ? '' : t })}
              className={`px-3 py-2 text-xs border rounded-sm transition-all ${
                filters.transmission === t
                  ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                  : 'border-luxury-border text-luxury-muted hover:border-gold-400/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Body Type</label>
        <div className="grid grid-cols-2 gap-2">
          {BODY_TYPES.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, bodyType: filters.bodyType === b ? '' : b })}
              className={`px-3 py-2 text-xs border rounded-sm transition-all ${
                filters.bodyType === b
                  ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                  : 'border-luxury-border text-luxury-muted hover:border-gold-400/30'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* KM Range */}
      <div>
        <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">
          Max Kilometers: {(filters.kmMax / 1000).toFixed(0)}k km
        </label>
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          value={filters.kmMax}
          onChange={(e) => setFilters({ ...filters, kmMax: Number(e.target.value) })}
          className="w-full accent-gold-400 h-1 bg-luxury-border rounded-full appearance-none cursor-pointer"
        />
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="w-full btn-outline text-xs flex items-center justify-center gap-2">
          <X className="w-3 h-3" /> Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="section-subtitle mb-2">Our Collection</p>
          <h1 className="section-title text-white">
            Luxury <span className="gold-gradient-text">Cars</span>
          </h1>
          <p className="text-luxury-muted mt-2">
            {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-dark text-xs py-2 px-3 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-luxury text-sm py-2 w-auto"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year">Year: Newest</option>
              <option value="mileage">Lowest Mileage</option>
            </select>

            <div className="flex border border-luxury-border rounded-sm overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid' ? 'bg-gold-400 text-luxury-black' : 'text-luxury-muted hover:text-white'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${view === 'list' ? 'bg-gold-400 text-luxury-black' : 'text-luxury-muted hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-luxury-black p-6 overflow-y-auto lg:static lg:z-auto lg:p-0' : 'hidden'} lg:block lg:w-72 flex-shrink-0`}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gold-400" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden text-luxury-muted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Car Grid/List */}
          <main className="flex-1 min-w-0">
            {filteredCars.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-luxury-muted text-lg mb-4">No cars match your filters</p>
                <button onClick={clearFilters} className="btn-gold">Clear Filters</button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} view="list" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
