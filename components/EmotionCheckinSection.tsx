'use client';

import { motion } from 'framer-motion';
import EmotionCheckin from '@/components/EmotionCheckin';

const EmotionCheckinSection = () => {
  return (
    <section className="personalise-section section-layer">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 40 }}
        >
          <div className="section-eyebrow">Daily Practice</div>
          <div className="section-title">Daily Emotion Check-In</div>
          <p className="section-sub">
            Help children recognise and talk about their feelings with a quick daily check-in.
          </p>
        </motion.div>

        <EmotionCheckin />
      </div>
    </section>
  );
};

export default EmotionCheckinSection;

