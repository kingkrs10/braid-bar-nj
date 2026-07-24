'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Coffee, Users, Printer, Calendar, Sun, Music, Mail, Clock } from 'lucide-react';
import { werkspaceInfo } from '@/lib/data';

export function WerkSpaceSection() {
  const iconMap: Record<string, React.ReactNode> = {
    'High-speed WiFi & power outlets at every seat': <Wifi className="w-4 h-4 text-terracotta" />,
    'Complimentary coffee & tea bar': <Coffee className="w-4 h-4 text-terracotta" />,
    'Private meeting room (reservable)': <Users className="w-4 h-4 text-terracotta" />,
    'Printing & scanning station': <Printer className="w-4 h-4 text-terracotta" />,
    'Community events & networking mixers': <Calendar className="w-4 h-4 text-terracotta" />,
    'Golden hour natural lighting': <Sun className="w-4 h-4 text-terracotta" />,
    'Curated playlist vibes': <Music className="w-4 h-4 text-terracotta" />,
    'Mail & package receiving': <Mail className="w-4 h-4 text-terracotta" />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
      {/* Intro Hero area */}
      <div className="text-center">
        <span className="text-terracotta font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.3em] mb-3 block">
          {werkspaceInfo.tagline}
        </span>
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-espresso mb-4">
          {werkspaceInfo.title}
        </h2>
        <p className="text-espresso/70 text-base max-w-3xl mx-auto leading-relaxed font-light">
          {werkspaceInfo.description}
        </p>
      </div>

      {/* Grid of features & details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Amenities Column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h3 className="text-lg font-[family-name:var(--font-display)] font-bold text-espresso border-b border-espresso/10 pb-2">
            Creative Amenities
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {werkspaceInfo.features.map((feat) => (
              <motion.div
                key={feat}
                variants={itemVariants}
                className="p-4 flex items-start gap-3 bg-white border border-espresso/10 rounded-xl shadow-sm"
              >
                <div className="p-2 bg-clay-rose/10 rounded-lg flex-shrink-0">
                  {iconMap[feat] || <SparkleIcon />}
                </div>
                <span className="text-xs font-medium text-espresso/80 leading-snug font-light">
                  {feat}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Operating Hours & Inquiries column */}
        <div className="flex flex-col gap-6">
          {/* Hours Card */}
          <div className="p-6 flex flex-col gap-4 bg-white border border-espresso/10 rounded-xl shadow-sm">
            <h3 className="text-base font-[family-name:var(--font-display)] font-bold text-espresso border-b border-espresso/10 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-terracotta" />
              <span>Studio Hours</span>
            </h3>
            <div className="flex flex-col gap-3 text-xs text-espresso/80">
              <div className="flex justify-between">
                <span className="font-light text-espresso/50">Weekdays</span>
                <span className="font-semibold">{werkspaceInfo.hours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-light text-espresso/50">Saturdays</span>
                <span className="font-semibold">{werkspaceInfo.hours.saturday}</span>
              </div>
              <div className="flex justify-between text-terracotta">
                <span className="font-medium">Sundays</span>
                <span className="font-semibold">{werkspaceInfo.hours.sunday}</span>
              </div>
            </div>
          </div>

          {/* Inquiry / Connect Card */}
          <div className="p-6 flex flex-col gap-4 bg-espresso text-cream border border-transparent rounded-xl shadow-sm">
            <h3 className="text-base font-[family-name:var(--font-display)] font-bold text-accent-gold border-b border-cream/10 pb-2">
              Inquire About Space
            </h3>
            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Interested in reserving a desk, booking a content creation slot, or hosting a creative natural hair academy workshop? Get in touch.
            </p>
            <a
              href={`mailto:${werkspaceInfo.contact.email}?subject=WerkSpace%20Inquiry`}
              className="mt-2 bg-terracotta hover:bg-clay-rose text-cream font-semibold py-3 rounded-lg text-center text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
            >
              Email to Inquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
export default WerkSpaceSection;
