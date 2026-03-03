'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    avatarClass: 'tcard-av-a',
    avatar: '\u{1F469}',
    quote:
      '"My son asked me to read his story every night for two weeks. He started saying \'I\'m feeling wobbly inside\' — I was in tears."',
    name: 'Sarah M.',
    role: 'Mum of two, London'
  },
  {
    avatarClass: 'tcard-av-b',
    avatar: '\u{1F468}',
    quote:
      '"The anxiety kit helped us navigate the start of Year 1. The breathing cards live on our fridge. Absolute game-changer."',
    name: 'James T.',
    role: 'Dad of three, Manchester'
  },
  {
    avatarClass: 'tcard-av-c',
    avatar: '\u{1F469}',
    quote:
      '"I bought the emotion puppets on a whim. Now my daughter puts on little shows for us every Sunday — and she\'s talking about her feelings so much more."',
    name: 'Priya R.',
    role: 'Mum of one, Bristol'
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section section-layer">
      <div className="container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '10px' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Parent Stories</div>
          <div className="section-title">Loved by <em>families</em></div>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="tcard glass"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
            >
              <div className="stars">{`\u2605\u2605\u2605\u2605\u2605`}</div>
              <div className="tcard-quote">{testimonial.quote}</div>
              <div className="tcard-author">
                <div className={`tcard-avatar ${testimonial.avatarClass}`}>{testimonial.avatar}</div>
                <div>
                  <div className="tcard-name">{testimonial.name}</div>
                  <div className="tcard-role">{testimonial.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


