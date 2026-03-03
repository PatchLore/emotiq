'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

const HeroSection = () => {
  return (
    <section className="hero section-layer">
      <div className="container">
        <div className="hero-inner">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} transition={{ duration: 0.8, ease: 'easeOut' }} className="hero-badge">
              {`${'\u2726'} Emotional Intelligence for Children`}
            </motion.div>
            <motion.h1 variants={item} transition={{ duration: 0.8, ease: 'easeOut' }}>
              Stories that <em>teach</em> hearts to feel
            </motion.h1>
            <motion.p variants={item} transition={{ duration: 0.8, ease: 'easeOut' }}>
              Personalised tales and beautifully crafted activity downloads to raise emotionally intelligent,
              resilient children — one story at a time.
            </motion.p>
            <motion.div variants={item} transition={{ duration: 0.8, ease: 'easeOut' }} className="hero-btns">
              <a href="#personalise" className="btn-primary">{`${'\u2726'} Create Your Story`}</a>
              <a href="#shop" className="btn-secondary">Browse Downloads →</a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="float-badge">
              <span className="icon">{'\u{1F48C}'}</span>
              New story ready for Ella!
            </div>
            <div className="hero-card-main glass">
              <div className="story-preview">
                <div className="story-meta">
                  <div className="story-avatar">{'\u{1F31F}'}</div>
                  <div className="story-meta-text">
                    <div className="name">Oliver&apos;s Adventure</div>
                    <div className="tag">Ages 5–7 · Personalised</div>
                  </div>
                </div>
                <div className="story-title">&quot;The Day Oliver Felt Angry at the Rain&quot;</div>
                <div className="story-excerpt">
                  Oliver loved sunny days more than anything. But when the clouds came, something big and hot rose
                  in his tummy — and that was okay…
                </div>
                <div className="emotion-tags">
                  <span className="etag etag-rose">Anger</span>
                  <span className="etag etag-lavender">Empathy</span>
                  <span className="etag etag-mint">Regulation</span>
                </div>
              </div>
              <div className="floating-cards">
                <div className="fcard">
                  <div className="icon">{'\u{1F4DA}'}</div>
                  <div className="val">2,400+</div>
                  <div className="label">Stories created</div>
                </div>
                <div className="fcard">
                  <div className="icon">{'\u{1F308}'}</div>
                  <div className="val">12</div>
                  <div className="label">Emotions covered</div>
                </div>
                <div className="fcard">
                  <div className="icon">{'\u2B50'}</div>
                  <div className="val">4.9</div>
                  <div className="label">Parent rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


