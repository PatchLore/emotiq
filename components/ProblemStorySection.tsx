'use client';

import { motion } from 'framer-motion';
import ProblemStoryForm from '@/components/ProblemStoryForm';

const ProblemStorySection = () => {
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
          <div className="section-eyebrow">Real-Life Parenting Moments</div>
          <div className="section-title">Solve Today&apos;s Problem With a Story</div>
          <p className="section-sub">
            Turn real-life parenting moments into gentle bedtime stories that teach emotional intelligence and
            resilience.
          </p>
        </motion.div>

        <ProblemStoryForm />
      </div>
    </section>
  );
};

export default ProblemStorySection;

