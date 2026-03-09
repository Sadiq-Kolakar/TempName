import { useState, useMemo } from 'react';

export default function EMICalculator({ carPrice }) {
  const [loanPercent, setLoanPercent] = useState(80);
  const [interest, setInterest] = useState(8.5);
  const [tenure, setTenure] = useState(60);

  const loanAmount = (carPrice * loanPercent) / 100;
  const downPayment = carPrice - loanAmount;

  const emi = useMemo(() => {
    const r = interest / 12 / 100;
    const n = tenure;
    if (r === 0) return loanAmount / n;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interest, tenure]);

  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-luxury-dark border border-luxury-border rounded-sm p-6">
      <h3 className="font-display text-lg font-bold text-white mb-6">EMI Calculator</h3>

      {/* Loan Percentage */}
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">Loan Amount ({loanPercent}%)</label>
          <span className="text-sm font-semibold text-gold-400">{formatCurrency(loanAmount)}</span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          value={loanPercent}
          onChange={(e) => setLoanPercent(Number(e.target.value))}
          className="w-full h-1 bg-luxury-border rounded-full appearance-none cursor-pointer accent-gold-400"
        />
      </div>

      {/* Interest Rate */}
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">Interest Rate</label>
          <span className="text-sm font-semibold text-gold-400">{interest}%</span>
        </div>
        <input
          type="range"
          min="5"
          max="18"
          step="0.5"
          value={interest}
          onChange={(e) => setInterest(Number(e.target.value))}
          className="w-full h-1 bg-luxury-border rounded-full appearance-none cursor-pointer accent-gold-400"
        />
      </div>

      {/* Tenure */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">Tenure</label>
          <span className="text-sm font-semibold text-gold-400">{tenure} months</span>
        </div>
        <input
          type="range"
          min="12"
          max="84"
          step="6"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full h-1 bg-luxury-border rounded-full appearance-none cursor-pointer accent-gold-400"
        />
      </div>

      {/* EMI Result */}
      <div className="bg-luxury-card border border-gold-400/20 rounded-sm p-5 text-center mb-4">
        <p className="text-xs text-luxury-muted uppercase tracking-wider mb-1">Monthly EMI</p>
        <p className="font-display text-3xl font-bold gold-gradient-text">
          {formatCurrency(emi)}
        </p>
        <p className="text-xs text-luxury-muted mt-1">/month</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Down Payment</span>
          <span className="text-white font-medium">{formatCurrency(downPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Interest</span>
          <span className="text-white font-medium">{formatCurrency(totalInterest)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-luxury-border">
          <span className="text-gray-400 font-medium">Total Cost</span>
          <span className="text-gold-400 font-bold">{formatCurrency(totalPayable + downPayment)}</span>
        </div>
      </div>
    </div>
  );
}
