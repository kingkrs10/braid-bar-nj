'use client';

import React, { useState, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronDown, ChevronUp, Calendar, User, ShoppingBag, Scissors, ArrowRight, MessageSquare, Plus, Check } from 'lucide-react';
import { useBookingStore } from '@/lib/store';
import { services, addons } from '@/lib/data';
import { formatPrice, formatDuration, getWhatsAppLink } from '@/lib/utils';
import { TimeSlotGrid } from './TimeSlotGrid';
import { Checkout } from './Checkout';

// Styled config for Calendar RDP
const calendarStyles = `
  .rdp {
    --rdp-color: #3C2415 !important;
    --rdp-background-color: #F4CFDD !important;
    margin: 0;
  }
  .rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:hover {
    background-color: #F2912E !important;
    color: white !important;
    font-weight: bold;
    border-radius: 8px;
    border: 2px border-espresso;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #F4CFDD !important;
    border-radius: 8px;
  }
`;

export function BookingFlow() {
  const {
    selectedService,
    selectedAddons,
    selectedDate,
    selectedTime,
    customerName,
    customerEmail,
    customerPhone,
    customerNotes,
    cancellationPolicyAgreed,
    step,
    isSubmitting,
    setService,
    toggleAddon,
    setDate,
    setTime,
    setCustomerInfo,
    setCancellationPolicyAgreed,
    setStep,
    resetBooking,
    getBookingTotal,
  } = useBookingStore();

  // Split name for Acuity matching
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hairColorPreference, setHairColorPreference] = useState('');

  // Service catalog category states
  const [expandedCategory, setExpandedCategory] = useState<string | null>('VIP Services');

  const categories = useMemo(() => {
    return Array.from(new Set(services.map((s) => s.category)));
  }, []);

  const handleServiceSelectInsideWidget = (srv: typeof services[0]) => {
    setService(srv);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date || null);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && customerEmail && customerPhone && cancellationPolicyAgreed) {
      // Save combined name to store
      setCustomerInfo({
        customerName: `${firstName} ${lastName}`,
        customerEmail,
        customerPhone,
        customerNotes: `Hair Color: ${hairColorPreference || 'Not specified'}. Notes: ${customerNotes}`,
      });
      setStep('checkout');
    }
  };

  // Build WhatsApp pre-filled confirmation link
  const whatsappUrl = selectedService && selectedDate && selectedTime
    ? getWhatsAppLink({
        serviceName: `${selectedService.name}${selectedAddons.length > 0 ? ` + Addons (${selectedAddons.map(a => a.name).join(', ')})` : ''}`,
        date: selectedDate.toLocaleDateString('en-US', { dateStyle: 'full' }),
        time: selectedTime,
        customerName: customerName || `${firstName} ${lastName}` || 'Valued Client',
      })
    : '#';

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return date < today || day === 0; // Close Sundays
  };

  const stepsList = [
    { key: 'service', label: 'Choose Service' },
    { key: 'datetime', label: 'Select Time' },
    { key: 'info', label: 'Your Details' },
    { key: 'checkout', label: 'Secure Deposit' },
  ];

  return (
    <div id="booking-flow" className="w-full max-w-4xl mx-auto px-4 py-8 relative scroll-mt-24">
      <style>{calendarStyles}</style>

      {/* Steps checklist bar */}
      {step !== 'confirmation' && (
        <div className="flex items-center justify-between mb-8 border-b-2 border-espresso pb-4 overflow-x-auto select-none no-scrollbar">
          {stepsList.map((item, idx) => {
            const currentIdx = stepsList.findIndex((s) => s.key === step);
            const isCompleted = idx < currentIdx;
            const isActive = item.key === step;
            return (
              <div key={item.key} className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`w-7 h-7 rounded-lg border-2 border-espresso flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-tangerine text-white shadow-[2px_2px_0px_0px_#3C2415]'
                      : isCompleted
                      ? 'bg-espresso text-cream'
                      : 'bg-white text-espresso/40'
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`text-xs uppercase tracking-widest font-black transition-all duration-300 ${
                    isActive ? 'text-espresso' : 'text-espresso/45'
                  }`}
                >
                  {item.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-espresso/40 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Step panels transitions */}
      <AnimatePresence mode="wait">
        
        {/* STEP 1: SELECT SERVICE & ADD-ONS */}
        {step === 'service' && (
          <motion.div
            key="step-service"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-3xl font-[family-name:var(--font-display)] font-black text-espresso mb-1">
                Choose Appointment
              </h2>
              <p className="text-sm font-semibold text-charcoal/60">
                Select your base styling service, then configure optional styling add-ons.
              </p>
            </div>

            {/* Check if service is selected inside the widget */}
            {!selectedService ? (
              <div className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-wider font-extrabold text-espresso/50 mb-2">Available Categories</p>
                
                {/* Accordion Categories Groupings */}
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => {
                    const isExpanded = expandedCategory === cat;
                    const catServices = services.filter((s) => s.category === cat);
                    
                    return (
                      <div key={cat} className="border-2 border-espresso rounded-2xl overflow-hidden bg-white shadow-[3px_3px_0px_0px_#3C2415]">
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                          className="w-full px-6 py-4 flex items-center justify-between bg-cream/15 font-[family-name:var(--font-display)] font-extrabold text-base text-espresso hover:bg-cream/40 transition-colors"
                        >
                          <span>{cat}</span>
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-white divide-y-2 divide-espresso/5 flex flex-col gap-4">
                            {catServices.map((srv) => (
                              <div key={srv.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="max-w-xl">
                                  <h4 className="font-extrabold text-espresso text-base mb-1">{srv.name}</h4>
                                  <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">{srv.description}</p>
                                  <div className="flex items-center gap-4 mt-2 text-[10px] uppercase tracking-wider font-bold text-espresso/50">
                                    <span>⏱ {formatDuration(srv.duration_min)}</span>
                                    <span>💵 {formatPrice(srv.price)}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleServiceSelectInsideWidget(srv)}
                                  className="self-start sm:self-center px-5 py-2 bg-espresso hover:bg-tangerine hover:text-white text-cream font-bold rounded-xl text-xs uppercase tracking-widest border-2 border-espresso transition-all shadow-sm"
                                >
                                  Select
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Active service display banner */}
                <div className="p-6 bg-baby-pink/35 border-2 border-espresso rounded-2xl flex items-center justify-between flex-wrap gap-4 shadow-[4px_4px_0px_0px_#3C2415]">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-black text-poppy bg-white border border-espresso px-2.5 py-0.5 rounded-full">Active Selection</span>
                    <h3 className="text-2xl font-black text-espresso mt-2">{selectedService.name}</h3>
                    <p className="text-xs font-bold text-charcoal/70 mt-1">Duration: {formatDuration(selectedService.duration_min)}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-espresso font-black text-2xl">{formatPrice(selectedService.price)}</p>
                    <button
                      onClick={() => setService(null)}
                      className="text-[10px] font-bold text-poppy hover:underline cursor-pointer mt-1 uppercase tracking-wider"
                    >
                      Change service
                    </button>
                  </div>
                </div>

                {/* Add-ons list section */}
                <div className="flex flex-col gap-4 mt-2">
                  <h4 className="text-sm uppercase tracking-wider font-extrabold text-espresso/70">Available Add-ons</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addons.map((add) => {
                      const isSelected = selectedAddons.some((a) => a.id === add.id);
                      return (
                        <div
                          key={add.id}
                          onClick={() => toggleAddon(add)}
                          className={`p-4 rounded-2xl border-2 border-espresso transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${
                            isSelected
                              ? 'bg-espresso text-cream shadow-[3px_3px_0px_0px_#3C2415]'
                              : 'bg-white hover:bg-baby-pink/15'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-extrabold">{add.name}</span>
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-tangerine' : 'text-charcoal/45'}`}>
                              +{formatDuration(add.duration_min)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-black ${isSelected ? 'text-tangerine' : 'text-espresso'}`}>
                              +{formatPrice(add.price)}
                            </span>
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 border-espresso ${
                              isSelected ? 'bg-tangerine text-white' : 'bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[4]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Forward Navigation bar */}
                <div className="flex justify-between items-center border-t-2 border-espresso/10 pt-6 mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-charcoal/50 font-bold uppercase tracking-wider">Total Est. Cost</span>
                    <span className="text-2xl font-black text-espresso">{formatPrice(getBookingTotal())}</span>
                  </div>
                  <button
                    onClick={() => setStep('datetime')}
                    className="bg-tangerine hover:bg-poppy text-white border-2 border-espresso font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#3C2415]"
                  >
                    <span>Choose Time</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 2: SELECT DATE & TIME */}
        {step === 'datetime' && (
          <motion.div
            key="step-datetime"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('service')}
                className="p-2 hover:bg-cream border-2 border-transparent hover:border-espresso rounded-xl transition-colors cursor-pointer"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-5 h-5 text-espresso" />
              </button>
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-display)] font-black text-espresso mb-1">
                  Choose Date & Time
                </h2>
                <p className="text-sm font-semibold text-charcoal/60">
                  Select an available date on the calendar below to view start times.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4">
              <div className="bg-white p-4 flex justify-center border-2 border-espresso rounded-2xl shadow-[4px_4px_0px_0px_#3C2415]">
                <DayPicker
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                />
              </div>

              {selectedDate ? (
                <div className="bg-white p-6 border-2 border-espresso rounded-2xl shadow-[4px_4px_0px_0px_#3C2415]">
                  <p className="text-xs uppercase tracking-wider font-extrabold text-poppy mb-4">
                    Date: {selectedDate.toLocaleDateString('en-US', { dateStyle: 'full' })}
                  </p>
                  <TimeSlotGrid
                    date={selectedDate}
                    selectedTime={selectedTime}
                    onSelectTime={(time) => setTime(time)}
                  />
                  
                  {selectedTime && (
                    <button
                      onClick={() => setStep('info')}
                      className="w-full mt-6 bg-tangerine hover:bg-poppy text-white border-2 border-espresso font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#3C2415]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white p-10 text-center flex flex-col items-center justify-center border-2 border-dashed border-espresso/20 rounded-2xl">
                  <Calendar className="w-10 h-10 text-poppy mb-3 animate-bounce" />
                  <p className="text-espresso font-extrabold text-base">Select a Date</p>
                  <p className="text-xs text-charcoal/50 mt-1 font-semibold">Please select an available booking day on the calendar.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 3: CUSTOM INTAKE FORM */}
        {step === 'info' && (
          <motion.div
            key="step-info"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('datetime')}
                className="p-2 hover:bg-cream border-2 border-transparent hover:border-espresso rounded-xl transition-colors cursor-pointer"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-5 h-5 text-espresso" />
              </button>
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-display)] font-black text-espresso mb-1">
                  Your Information
                </h2>
                <p className="text-sm font-semibold text-charcoal/60">
                  Please fill out the contact and salon intake details to complete reservation.
                </p>
              </div>
            </div>

            <form onSubmit={handleInfoSubmit} className="bg-white p-8 max-w-xl mx-auto w-full flex flex-col gap-5 mt-4 border-2 border-espresso rounded-2xl shadow-[4px_4px_0px_0px_#3C2415]">
              
              {/* First & Last Name separated */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-firstname" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                    First Name
                  </label>
                  <input
                    id="client-firstname"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-lastname" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                    Last Name
                  </label>
                  <input
                    id="client-lastname"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="client-phone" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                  Phone Number
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerInfo({ customerPhone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="client-email" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                  Email Address
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerInfo({ customerEmail: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso"
                />
              </div>

              {/* Custom intake field: Hair Color */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hair-color" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                  What color braiding hair would you prefer? (e.g. 1B, 2, 4, 27, 30, etc.)
                </label>
                <input
                  id="hair-color"
                  type="text"
                  value={hairColorPreference}
                  onChange={(e) => setHairColorPreference(e.target.value)}
                  placeholder="1B Natural Black"
                  className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso"
                />
              </div>

              {/* Custom intake field: Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hair-condition" className="text-[10px] uppercase tracking-widest font-black text-espresso/60">
                  Hair Condition & Length Notes (Optional)
                </label>
                <textarea
                  id="hair-condition"
                  rows={2}
                  value={customerNotes}
                  onChange={(e) => setCustomerInfo({ customerNotes: e.target.value })}
                  placeholder="Tell us about your hair texture or length..."
                  className="px-4 py-3 rounded-xl border-2 border-espresso/15 bg-cream/10 text-espresso text-xs font-semibold focus:outline-none focus:border-espresso resize-none"
                />
              </div>

              {/* Policy Agreement Checkbox */}
              <div className="flex items-start gap-3 mt-2">
                <input
                  id="agree-policies"
                  type="checkbox"
                  required
                  checked={cancellationPolicyAgreed}
                  onChange={(e) => setCancellationPolicyAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-espresso text-tangerine focus:ring-tangerine cursor-pointer mt-0.5"
                />
                <label htmlFor="agree-policies" className="text-[10px] font-bold text-charcoal/70 leading-relaxed cursor-pointer select-none">
                  Do you agree to the Salon Booking Policies? (Non-refundable deposit required, hair must arrive washed & blown-dry, no extra guests) <span className="text-poppy">*</span>
                </label>
              </div>

              <button
                type="submit"
                id="info-flow-btn"
                className="mt-4 bg-espresso hover:bg-tangerine hover:text-white text-cream font-bold py-4 rounded-xl border-2 border-espresso transition-all duration-200 text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#3C2415]"
              >
                Proceed to Checkout
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 4: PAYMENT / CHECKOUT */}
        {step === 'checkout' && (
          <motion.div
            key="step-checkout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('info')}
                className="p-2 hover:bg-cream border-2 border-transparent hover:border-espresso rounded-xl transition-colors cursor-pointer"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-5 h-5 text-espresso" />
              </button>
              <div>
                <h2 className="text-3xl font-[family-name:var(--font-display)] font-black text-espresso mb-1">
                  Secure Deposit
                </h2>
                <p className="text-sm font-semibold text-charcoal/60">
                  Confirm appointment by paying a secure deposit via Stripe.
                </p>
              </div>
            </div>

            <Checkout />
          </motion.div>
        )}

        {/* STEP 5: CONFIRMATION */}
        {step === 'confirmation' && (
          <motion.div
            key="step-confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 text-center max-w-xl mx-auto flex flex-col items-center gap-6 mt-10 border-2 border-espresso rounded-2xl shadow-[4px_4px_0px_0px_#3C2415]"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-espresso flex items-center justify-center text-emerald-600 shadow-[2px_2px_0px_0px_#3C2415]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h2 className="text-3xl font-[family-name:var(--font-display)] font-black text-espresso mb-2">
                Booking Secured!
              </h2>
              <p className="text-charcoal/80 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                Thank you, {customerName}. Your appointment has been confirmed. A non-refundable deposit was processed via Stripe.
              </p>
            </div>

            <div className="w-full bg-cream/10 border-2 border-espresso p-5 rounded-2xl flex flex-col gap-2.5 text-left text-xs font-bold text-espresso/80 mt-2">
              <p><strong>Style Service:</strong> {selectedService?.name}</p>
              {selectedAddons.length > 0 && (
                <p><strong>Add-ons:</strong> {selectedAddons.map(a => a.name).join(', ')}</p>
              )}
              <p><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
              <p><strong>Time Slot:</strong> {selectedTime}</p>
              <p><strong>Deposit Paid:</strong> {selectedService && formatPrice(selectedService.deposit_amount)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
              <button
                onClick={resetBooking}
                className="flex-grow bg-white text-espresso border-2 border-espresso py-4 rounded-xl font-bold hover:bg-baby-pink transition-all text-center text-xs uppercase tracking-widest"
              >
                Back to Menu
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow bg-emerald-600 border-2 border-espresso text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#3C2415]"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Text via WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default BookingFlow;
