'use client';

import { motion } from 'framer-motion';
import DailyStoryCard from '@/components/DailyStoryCard';

const DailyStorySection = () => {
  return (
    <section className="personalise-section section-layer">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 32 }}
        >
          <div className="section-eyebrow">Bedtime Ritual</div>
          <div className="section-title">Tonight&apos;s Story</div>
        </motion.div>

        <DailyStoryCard />
      </div>
    </section>
  );
};

export default DailyStorySection;

