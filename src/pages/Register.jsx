import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'buyer' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    register(form.name, form.email, form.password, form.role);
    navigate('/dashboard');
  };

  return (
    <div className="pt-20 min-h-screen bg-luxury-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center">
              <Car className="w-6 h-6 text-luxury-black" />
            </div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-luxury-muted">Join the LuxeMotors community</p>
        </div>

        <div className="card-luxury p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="input-luxury pl-11"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-luxury pl-11"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Phone</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="input-luxury pl-11"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                {['buyer', 'seller'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`px-4 py-3 border rounded-sm text-sm font-medium transition-all ${
                      form.role === role
                        ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                        : 'border-luxury-border text-luxury-muted hover:border-gold-400/30'
                    }`}
                  >
                    {role === 'buyer' ? '🔍 Buy Cars' : '💰 Sell Cars'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-luxury pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="input-luxury pl-11"
                />
              </div>
            </div>

            <button type="submit" className="btn-gold w-full mt-6">Create Account</button>
          </form>

          <p className="text-center text-sm text-luxury-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
