import React, { useState } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const triggerConfetti = () => {
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '9999';
    el.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
    el.style.top = `${50 + (Math.random() - 0.5) * 20}%`;
    el.style.width = '7px';
    el.style.height = '7px';
    el.style.backgroundColor = ['#e8a62a', '#005a36', '#102a43', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 350}px, ${(Math.random() - 0.5) * 250 + 100}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    }, 20);
    setTimeout(() => el.remove(), 1300);
  }
};

export const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    phone: '',
    category: 'Prospective Student / Parent',
    preferredDate: '2026-08-28',
    preferredTime: '11:00 AM - 12:00 PM',
    purpose: '',
    department: 'Vice Chancellor Secretariat'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#071b2d] text-[#e8a62a] flex items-center justify-center font-bold shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#0f766e] uppercase tracking-wider">
                Executive Secretariat • UAF
              </span>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-900">
                Schedule Appointment with Vice Chancellor
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Prof. Dr. Zulfiqar Ali — Vice Chancellor, UAF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif-heading text-2xl font-bold text-stone-900">
                Appointment Request Submitted!
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Your request to meet the Vice Chancellor has been routed to the <strong>Staff Officer to Vice Chancellor (SO to VC)</strong>.
                You will receive an official confirmation SMS & Email with your security gate pass token.
              </p>
              <div className="bg-stone-100 py-2 px-4 rounded-xl font-mono text-sm font-bold text-[#071b2d] inline-block border border-stone-300">
                VC-APP-2026-{Math.floor(1000 + Math.random() * 9000)}
              </div>
            </div>

            <div className="bg-[#f7f5f0] p-4 rounded-2xl border border-stone-200 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Visitor Name:</span>
                <span className="font-bold text-stone-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Requested Date & Time:</span>
                <span className="font-bold text-[#0f766e]">{formData.preferredDate} ({formData.preferredTime})</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Designation / Category:</span>
                <span className="font-bold text-stone-800">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Venue:</span>
                <span className="font-bold text-stone-900">Vice Chancellor Executive Chamber, Syndicate Hall, UAF</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#071b2d] hover:bg-[#102a43] text-[#e8a62a] font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="bg-[#f5f8fa] p-3 rounded-2xl border border-[#e5eaee] text-stone-700 space-y-1">
              <span className="font-bold text-[#102a43] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0f766e]" />
                <span>Protocol & Visiting Schedule Notice</span>
              </span>
              <p className="text-[11px] text-stone-500">
                Official meetings are scheduled Tuesday & Thursday (11:00 AM - 01:00 PM). Please ensure your CNIC/Passport details are accurate for security gate clearance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Tariq Mahmood"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">CNIC / Passport Number *</label>
                <input
                  type="text"
                  required
                  placeholder="33100-xxxxxxx-x"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 3xx xxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Visitor Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                >
                  <option value="Prospective Student / Parent">Prospective Student / Parent</option>
                  <option value="Faculty / Academic Researcher">Faculty / Academic Researcher</option>
                  <option value="Farmer / Agricultural Delegation">Farmer / Agricultural Delegation</option>
                  <option value="Industry / Corporate Partner">Industry / Corporate Partner</option>
                  <option value="Alumni / Foreign Diplomat">Alumni / Foreign Diplomat</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Purpose of Meeting / Agenda *</label>
              <textarea
                required
                rows={3}
                placeholder="Briefly state the topic of discussion, academic consultation, or research collaboration..."
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#071b2d] hover:bg-[#102a43] text-[#e8a62a] font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Submit Appointment Request</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
