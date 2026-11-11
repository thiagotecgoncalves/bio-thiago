import React from 'react';
import { motion } from 'motion/react';
import { STATS_ITEMS } from '../../data/landingData';

export const ProofStats: React.FC = () => {
  return (
    <div className="w-full border-t border-slate-200/90 bg-[#FBFBFC]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3.5 sm:py-4 lg:py-4.5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {STATS_ITEMS.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex flex-col justify-center"
          >
            <p
              className={`font-display text-base sm:text-xl xl:text-2xl font-extrabold font-mono tabular-nums whitespace-nowrap ${
                stat.highlight ? 'text-[#f3c742]' : 'text-[#0B1623]'
              }`}
            >
              {stat.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-600 leading-snug">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
