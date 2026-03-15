import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, MessageSquare, Calendar, Heart, Clock, Eye, Plus, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../data/cars';
import { useCars } from '../context/CarContext';
import CarCard from '../components/CarCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { cars } = useCars();
  const [tab, setTab] = useState('overview');

  if (!user) return <Navigate to="/login" />;

  const isSeller = user.role === 'seller';

  const mockEnquiries = [
    { id: 1, carTitle: 'Lamborghini Huracán EVO', status: 'pending', date: '2024-03-10', message: 'Interested in test drive' },
    { id: 2, carTitle: 'Porsche 911 GT3 RS', status: 'responded', date: '2024-03-08', message: 'What is the lowest price?' },
  ];

  const mockTestDrives = [
    { id: 1, carTitle: 'Ferrari F8 Tributo', date: '2024-03-15', time: '10:00 AM', status: 'confirmed' },
    { id: 2, carTitle: 'Mercedes-AMG G63', date: '2024-03-20', time: '2:00 PM', status: 'pending' },
  ];

  const myListings = cars.slice(0, 3);

  const tabs = isSeller
    ? [
        { key: 'overview', label: 'Overview' },
        { key: 'listings', label: 'My Listings' },
        { key: 'enquiries', label: 'Enquiries Received' },
      ]
    : [
        { key: 'overview', label: 'Overview' },
        { key: 'enquiries', label: 'My Enquiries' },
        { key: 'testdrives', label: 'Test Drives' },
        { key: 'saved', label: 'Saved Cars' },
      ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gold-400/10 rounded-full flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-gold-400">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Welcome, {user.name}</h1>
              <p className="text-sm text-luxury-muted capitalize">{user.role} Account • {user.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`text-sm font-medium pb-3 border-b-2 transition-all whitespace-nowrap ${
                  tab === t.key
                    ? 'border-gold-400 text-gold-400'
                    : 'border-transparent text-luxury-muted hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(isSeller
                ? [
                    { icon: Car, label: 'Active Listings', value: '3', color: 'text-blue-400' },
                    { icon: MessageSquare, label: 'Enquiries', value: '12', color: 'text-green-400' },
                    { icon: Eye, label: 'Total Views', value: '1,458', color: 'text-purple-400' },
                    { icon: Clock, label: 'Avg Response', value: '2h', color: 'text-gold-400' },
                  ]
                : [
                    { icon: MessageSquare, label: 'My Enquiries', value: '5', color: 'text-blue-400' },
                    { icon: Calendar, label: 'Test Drives', value: '2', color: 'text-green-400' },
                    { icon: Heart, label: 'Saved Cars', value: '8', color: 'text-red-400' },
                    { icon: Eye, label: 'Recently Viewed', value: '24', color: 'text-gold-400' },
                  ]
              ).map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-luxury p-6"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                  <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-luxury-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link to="/listings" className="flex items-center gap-3 bg-luxury-dark border border-luxury-border rounded-sm p-4 hover:border-gold-400/30 transition-all">
                  <Car className="w-5 h-5 text-gold-400" />
                  <span className="text-sm text-white">Browse Cars</span>
                  <ChevronRight className="w-4 h-4 text-luxury-muted ml-auto" />
                </Link>
                <Link to="/sell" className="flex items-center gap-3 bg-luxury-dark border border-luxury-border rounded-sm p-4 hover:border-gold-400/30 transition-all">
                  <Plus className="w-5 h-5 text-gold-400" />
                  <span className="text-sm text-white">Sell a Car</span>
                  <ChevronRight className="w-4 h-4 text-luxury-muted ml-auto" />
                </Link>
                <Link to="/compare" className="flex items-center gap-3 bg-luxury-dark border border-luxury-border rounded-sm p-4 hover:border-gold-400/30 transition-all">
                  <Eye className="w-5 h-5 text-gold-400" />
                  <span className="text-sm text-white">Compare Cars</span>
                  <ChevronRight className="w-4 h-4 text-luxury-muted ml-auto" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Listings Tab (Seller) */}
        {tab === 'listings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display text-lg font-bold text-white">My Listings</h3>
              <Link to="/sell" className="btn-gold text-xs py-2">+ Add New</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Enquiries Tab */}
        {tab === 'enquiries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white">
              {isSeller ? 'Enquiries Received' : 'My Enquiries'}
            </h3>
            {mockEnquiries.map((enq) => (
              <div key={enq.id} className="card-luxury p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{enq.carTitle}</h4>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    enq.status === 'pending'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <p className="text-sm text-luxury-muted">{enq.message}</p>
                <p className="text-xs text-luxury-muted mt-2">{enq.date}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Test Drives Tab */}
        {tab === 'testdrives' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white">Test Drive Bookings</h3>
            {mockTestDrives.map((td) => (
              <div key={td.id} className="card-luxury p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{td.carTitle}</h4>
                  <p className="text-sm text-luxury-muted">{td.date} at {td.time}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  td.status === 'confirmed'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {td.status}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Saved Cars Tab */}
        {tab === 'saved' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white">Saved Cars</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.slice(0, 6).map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
