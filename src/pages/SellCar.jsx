import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ChevronRight, ChevronLeft, Check, Car, Settings, Camera, DollarSign, Send, X } from 'lucide-react';
import { brands } from '../data/cars';
import { useCars } from '../context/CarContext';

const STEPS = [
  { icon: Car, label: 'Car Details' },
  { icon: Settings, label: 'Condition' },
  { icon: Camera, label: 'Photos' },
  { icon: DollarSign, label: 'Pricing' },
  { icon: Send, label: 'Submit' },
];

export default function SellCar() {
  const { addCar } = useCars();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    brand: '', model: '', year: '', variant: '',
    kmDriven: '', fuel: 'Petrol', transmission: 'Automatic', color: '', owners: '1',
    price: '', description: '', name: '', email: '', phone: '',
  });

  const updateForm = (field, value) => setForm({ ...form, [field]: value });

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 10));
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    addCar({
      ...form,
      title: `${form.brand} ${form.model}`,
      images: photos.map(p => p.preview),
      status: 'pending' // User added cars are pending
    });
    setSubmitted(true);
  };

  const canNext = () => {
    switch (step) {
      case 0: return form.brand && form.model && form.year;
      case 1: return form.kmDriven && form.fuel && form.color;
      case 2: return photos.length >= 1;
      case 3: return form.price;
      default: return true;
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-luxury-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Listing Submitted!</h2>
          <p className="text-luxury-muted mb-8">
            Your car listing has been submitted for review. Our team will verify the details and approve it within 24 hours.
          </p>
          <a href="/" className="btn-gold inline-block">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="section-subtitle mb-2">List Your Car</p>
          <h1 className="section-title text-white">
            Sell Your <span className="gold-gradient-text">Luxury Car</span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  i <= step ? 'text-gold-400' : 'text-luxury-muted'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    i < step
                      ? 'border-gold-400 bg-gold-400 text-luxury-black'
                      : i === step
                      ? 'border-gold-400 text-gold-400'
                      : 'border-luxury-border text-luxury-muted'
                  }`}
                >
                  {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className="text-xs font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-px mx-2 ${i < step ? 'bg-gold-400' : 'bg-luxury-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-luxury p-8"
          >
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Car Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Brand *</label>
                    <select value={form.brand} onChange={(e) => updateForm('brand', e.target.value)} className="input-luxury">
                      <option value="">Select Brand</option>
                      {brands.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Model *</label>
                    <input type="text" placeholder="e.g. 911 GT3" value={form.model} onChange={(e) => updateForm('model', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Year *</label>
                    <select value={form.year} onChange={(e) => updateForm('year', e.target.value)} className="input-luxury">
                      <option value="">Select Year</option>
                      {Array.from({ length: 15 }, (_, i) => 2025 - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Variant</label>
                    <input type="text" placeholder="e.g. RS, Competition" value={form.variant} onChange={(e) => updateForm('variant', e.target.value)} className="input-luxury" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Condition & Specs</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">KM Driven *</label>
                    <input type="number" placeholder="e.g. 5000" value={form.kmDriven} onChange={(e) => updateForm('kmDriven', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Color *</label>
                    <input type="text" placeholder="e.g. Rosso Corsa" value={form.color} onChange={(e) => updateForm('color', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Fuel Type</label>
                    <select value={form.fuel} onChange={(e) => updateForm('fuel', e.target.value)} className="input-luxury">
                      <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Transmission</label>
                    <select value={form.transmission} onChange={(e) => updateForm('transmission', e.target.value)} className="input-luxury">
                      <option>Automatic</option><option>Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Number of Owners</label>
                    <select value={form.owners} onChange={(e) => updateForm('owners', e.target.value)} className="input-luxury">
                      <option value="1">1st Owner</option><option value="2">2nd Owner</option><option value="3">3rd Owner</option><option value="4">4+ Owners</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Upload Photos</h2>
                <p className="text-sm text-luxury-muted">Add at least 1 photo of your car. High-quality photos attract more buyers.</p>
                <div
                  className="border-2 border-dashed border-luxury-border rounded-sm p-12 text-center hover:border-gold-400/30 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  <Upload className="w-12 h-12 text-luxury-muted mx-auto mb-4" />
                  <p className="text-white font-medium mb-1">Drag & drop photos here</p>
                  <p className="text-sm text-luxury-muted">or click to browse (up to 10 photos)</p>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {photos.map((photo, i) => (
                      <div key={i} className="relative aspect-square rounded-sm overflow-hidden group">
                        <img src={photo.preview} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Set Price & Description</h2>
                <div>
                  <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Asking Price (₹) *</label>
                  <input type="number" placeholder="e.g. 35000000" value={form.price} onChange={(e) => updateForm('price', e.target.value)} className="input-luxury text-2xl font-display font-bold" />
                </div>
                <div>
                  <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Description</label>
                  <textarea rows={5} placeholder="Describe your car's condition, features, and history..." value={form.description} onChange={(e) => updateForm('description', e.target.value)} className="input-luxury resize-none" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-white">Contact Details & Submit</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Full Name</label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={(e) => updateForm('name', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Email</label>
                    <input type="email" placeholder="you@email.com" value={form.email} onChange={(e) => updateForm('email', e.target.value)} className="input-luxury" />
                  </div>
                  <div>
                    <label className="text-xs text-luxury-muted uppercase tracking-wider block mb-2">Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} className="input-luxury" />
                  </div>
                </div>
                {/* Summary */}
                <div className="bg-luxury-dark border border-luxury-border rounded-sm p-6 mt-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Listing Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-luxury-muted">Car</span><span className="text-white">{form.brand} {form.model} {form.year}</span></div>
                    <div className="flex justify-between"><span className="text-luxury-muted">KM Driven</span><span className="text-white">{form.kmDriven} km</span></div>
                    <div className="flex justify-between"><span className="text-luxury-muted">Color</span><span className="text-white">{form.color}</span></div>
                    <div className="flex justify-between pt-2 border-t border-luxury-border"><span className="text-luxury-muted font-medium">Price</span><span className="text-gold-400 font-bold text-lg">₹{Number(form.price).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-luxury-border">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  step === 0 ? 'text-luxury-border cursor-not-allowed' : 'text-luxury-muted hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canNext()}
                  className={`flex items-center gap-2 transition-all ${canNext() ? 'btn-gold' : 'bg-luxury-border text-luxury-muted cursor-not-allowed px-6 py-3 rounded-sm text-sm'}`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-gold flex items-center gap-2">
                  <Send className="w-4 h-4" /> Submit Listing
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
