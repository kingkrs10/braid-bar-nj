'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function PopUpApplicationForm() {
  const [designerName, setDesignerName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productCategory, setProductCategory] = useState('clothing');
  const [socialMedia, setSocialMedia] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [pitch, setPitch] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designerName,
          brandName,
          email,
          phone,
          productCategory,
          socialMedia,
          portfolioUrl,
          pitch,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 text-center max-w-xl mx-auto flex flex-col items-center gap-6 mt-10"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-[family-name:var(--font-display)] font-bold text-espresso mb-2">
            Application Received!
          </h2>
          <p className="text-charcoal/70 text-sm leading-relaxed max-w-md mx-auto">
            Thank you for applying. We are thrilled to review your brand, {brandName}!
            Our team will reach out to you within 5 business days with details about our upcoming boutique pop-up schedules.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gold/10 rounded-2xl">
            <Sparkles className="w-6 h-6 text-gold-dark" />
          </div>
          <div>
            <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-espresso">
              Makers Pop-Up Application
            </h2>
            <p className="text-xs text-charcoal/50 mt-1">
              Apply for pop-up display space in West Orange, NJ to showcase your craft.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="designer-name" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Designer Name
              </label>
              <input
                id="designer-name"
                type="text"
                required
                value={designerName}
                onChange={(e) => setDesignerName(e.target.value)}
                placeholder="Jane Doe"
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="brand-name" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Brand/Business Name
              </label>
              <input
                id="brand-name"
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Luxe Label"
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="designer-email" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Email Address
              </label>
              <input
                id="designer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@luxelabel.com"
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="designer-phone" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Phone Number
              </label>
              <input
                id="designer-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-cat" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Product Category
              </label>
              <select
                id="product-cat"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              >
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="beauty">Beauty & Cosmetics</option>
                <option value="art">Art & Prints</option>
                <option value="other">Other Craft</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="social-media" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
                Instagram / Social Handle
              </label>
              <input
                id="social-media"
                type="text"
                required
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
                placeholder="@luxelabel"
                className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="portfolio-url" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
              Portfolio or Website URL (Optional)
            </label>
            <input
              id="portfolio-url"
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://luxelabel.com"
              className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brand-pitch" className="text-[10px] uppercase tracking-wider font-semibold text-espresso/60">
              Brand Pitch
            </label>
            <textarea
              id="brand-pitch"
              rows={4}
              required
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Tell us about your brand, what products you sell, and why you want to collaborate with us at Braid Bar NJ..."
              className="px-4 py-3 rounded-xl border border-espresso/10 bg-cream/20 text-espresso text-sm focus:outline-none focus:border-terracotta resize-none"
            />
          </div>

          <button
            type="submit"
            id="apply-submit-btn"
            disabled={isSubmitting}
            className="mt-2 bg-terracotta hover:bg-espresso text-cream font-medium py-4 rounded-xl transition-all cursor-pointer text-center text-xs uppercase tracking-wider disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
export default PopUpApplicationForm;
