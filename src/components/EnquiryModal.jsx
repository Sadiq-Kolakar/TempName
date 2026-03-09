import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare } from 'lucide-react';

export default function EnquiryModal({ car, isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-luxury-card border border-luxury-border rounded-sm overflow-hidden"
          >
            {/* Header */}
            <div className="bg-luxury-dark p-6 border-b border-luxury-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-400/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Enquire Now</h3>
                  <p className="text-xs text-luxury-muted">{car?.title}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-luxury-muted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">Enquiry Sent!</h4>
                <p className="text-sm text-luxury-muted">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-luxury"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-luxury"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-luxury"
                />
                <textarea
                  placeholder="Your Message (optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-luxury resize-none"
                />
                <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
