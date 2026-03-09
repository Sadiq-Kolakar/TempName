import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Users, MessageSquare, TrendingUp, CheckCircle, XCircle, Eye, 
  Search, Filter, MoreVertical, DollarSign 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cars, formatPrice } from '../data/cars';

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [carStatuses, setCarStatuses] = useState(
    Object.fromEntries(cars.map((c) => [c.id, c.status || 'approved']))
  );

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const stats = [
    { icon: Car, label: 'Total Listings', value: cars.length, change: '+3 this week', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Users, label: 'Registered Users', value: 248, change: '+12 this week', color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: MessageSquare, label: 'Active Enquiries', value: 34, change: '+5 today', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: DollarSign, label: 'Revenue', value: '₹12.5L', change: '+18%', color: 'text-gold-400', bg: 'bg-gold-400/10' },
  ];

  const enquiries = [
    { id: 1, buyer: 'Rajesh K.', car: 'Lamborghini Huracán EVO', message: 'Want to schedule test drive', status: 'new', date: '2h ago' },
    { id: 2, buyer: 'Priya S.', car: 'Rolls-Royce Ghost', message: 'Can you offer EMI?', status: 'new', date: '4h ago' },
    { id: 3, buyer: 'Arjun M.', car: 'Ferrari F8 Tributo', message: 'Is price negotiable?', status: 'replied', date: '1d ago' },
    { id: 4, buyer: 'Meera R.', car: 'Mercedes-AMG G63', message: 'Available for viewing?', status: 'replied', date: '2d ago' },
  ];

  const handleApprove = (carId) => setCarStatuses({ ...carStatuses, [carId]: 'approved' });
  const handleReject = (carId) => setCarStatuses({ ...carStatuses, [carId]: 'rejected' });

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'cars', label: 'Car Management' },
    { key: 'enquiries', label: 'Enquiries' },
    { key: 'users', label: 'Users' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-subtitle mb-1">Administration</p>
              <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-2 bg-gold-400/10 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gold-400 font-medium">Admin Mode</span>
            </div>
          </div>

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
        {/* Dashboard Tab */}
        {tab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-luxury p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                  </div>
                  <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-luxury-muted mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card-luxury p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Recent Enquiries</h3>
                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="flex items-center gap-3 bg-luxury-dark rounded-sm p-3">
                      <div className="w-8 h-8 bg-gold-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-gold-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{enq.buyer} → {enq.car}</p>
                        <p className="text-xs text-luxury-muted">{enq.date}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                        enq.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-luxury p-6">
                <h3 className="font-display text-lg font-bold text-white mb-4">Popular Brands</h3>
                <div className="space-y-3">
                  {[
                    { brand: 'Lamborghini', count: 4, pct: 80 },
                    { brand: 'Ferrari', count: 3, pct: 60 },
                    { brand: 'Porsche', count: 3, pct: 60 },
                    { brand: 'Mercedes-Benz', count: 2, pct: 40 },
                    { brand: 'Rolls-Royce', count: 1, pct: 20 },
                  ].map((b, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{b.brand}</span>
                        <span className="text-luxury-muted">{b.count} cars</span>
                      </div>
                      <div className="h-2 bg-luxury-dark rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.pct}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Car Management Tab */}
        {tab === 'cars' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-white">All Listings</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
                  <input type="text" placeholder="Search cars..." className="input-luxury pl-9 text-sm py-2 w-48" />
                </div>
              </div>
            </div>
            <div className="card-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-luxury-dark border-b border-luxury-border">
                      <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Car</th>
                      <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Price</th>
                      <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Year</th>
                      <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr key={car.id} className="border-t border-luxury-border hover:bg-luxury-dark/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={car.images[0]} alt={car.title} className="w-14 h-10 rounded-sm object-cover flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">{car.title}</p>
                              <p className="text-xs text-luxury-muted">{car.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gold-400 font-medium">{formatPrice(car.price)}</td>
                        <td className="px-6 py-4 text-sm text-white">{car.year}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            carStatuses[car.id] === 'approved'
                              ? 'bg-green-500/10 text-green-400'
                              : carStatuses[car.id] === 'rejected'
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {carStatuses[car.id]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApprove(car.id)}
                              className="w-8 h-8 bg-green-500/10 rounded-sm flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(car.id)}
                              className="w-8 h-8 bg-red-500/10 rounded-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enquiries Tab */}
        {tab === 'enquiries' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white mb-4">All Enquiries</h3>
            {enquiries.map((enq) => (
              <div key={enq.id} className="card-luxury p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-400/10 rounded-full flex items-center justify-center">
                      <span className="text-gold-400 font-bold text-sm">{enq.buyer.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{enq.buyer}</p>
                      <p className="text-xs text-luxury-muted">{enq.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    enq.status === 'new' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <p className="text-xs text-gold-400 mb-1">Re: {enq.car}</p>
                <p className="text-sm text-gray-300">{enq.message}</p>
                <div className="flex gap-2 mt-4">
                  <button className="btn-gold text-xs py-2 px-4">Reply</button>
                  <button className="btn-outline text-xs py-2 px-4">Mark as Read</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-display text-lg font-bold text-white mb-6">Registered Users</h3>
            <div className="card-luxury overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-luxury-dark border-b border-luxury-border">
                    <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs text-luxury-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Rajesh Kapoor', email: 'rajesh@mail.com', role: 'buyer', status: 'active' },
                    { name: 'Priya Sharma', email: 'priya@mail.com', role: 'seller', status: 'active' },
                    { name: 'Arjun Mehta', email: 'arjun@mail.com', role: 'buyer', status: 'active' },
                    { name: 'Meera Rajan', email: 'meera@mail.com', role: 'seller', status: 'suspended' },
                  ].map((u, i) => (
                    <tr key={i} className="border-t border-luxury-border hover:bg-luxury-dark/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold-400/10 rounded-full flex items-center justify-center">
                            <span className="text-gold-400 text-xs font-bold">{u.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{u.name}</p>
                            <p className="text-xs text-luxury-muted">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white capitalize">{u.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          u.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-luxury-muted hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
