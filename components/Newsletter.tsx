'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast('Feelings wheel on its way! \u{1F308}');
    setEmail('');
  };

  return (
    <section className="newsletter-section section-layer">
      <div className="container">
        <motion.div
          className="newsletter-card glass"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Free Gift</div>
          <div className="section-title">Get your free <em>feelings wheel</em></div>
          <p className="section-sub">
            Join 8,000+ parents and receive our beautifully designed feelings wheel printable — plus weekly tips on
            raising emotionally intelligent children.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">Send it to me</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;


