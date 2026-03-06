'use client';

import { motion } from 'framer-motion';
import EmotionStoryForm from '@/components/EmotionStoryForm';

const EmotionStorySection = () => {
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
          <div className="section-eyebrow">Real-Life Feelings</div>
          <div className="section-title">Create a Story From Today&apos;s Emotion</div>
          <p className="section-sub">
            Turn real-life feelings into calming bedtime stories that help children understand and process emotions.
          </p>
        </motion.div>

        <EmotionStoryForm />
      </div>
    </section>
  );
};

export default EmotionStorySection;

