'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    icon: '\u{1F4DD}',
    title: 'Tell Us About Your Child',
    text: "Share their name, age, personality, and the emotion or challenge they're navigating right now.",
    iconClass: 'step-icon-a'
  },
  {
    num: '02',
    icon: '\u2728',
    title: 'We Craft Your Story',
    text: 'Our storytellers weave a personalised, emotionally rich tale with your child as the hero, delivered within 48 hours.',
    iconClass: 'step-icon-b'
  },
  {
    num: '03',
    icon: '\u{1F331}',
    title: 'Grow Together',
    text: 'Read together, work through the companion activity pack, and watch emotional confidence bloom naturally.',
    iconClass: 'step-icon-c'
  }
];

const HowItWorks = () => {
  return (
    <section className="how-section section-layer" id="how">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">How It Works</div>
          <div className="section-title">Simple, personal, <em>powerful</em></div>
          <p className="section-sub">Three steps to a story that speaks directly to your child&apos;s heart — and yours.</p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="step-card glass"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
            >
              <div className="step-num">{step.num}</div>
              <div className={`step-icon ${step.iconClass}`}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


