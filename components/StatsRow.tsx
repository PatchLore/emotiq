'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '2,400+', color: '#9b6fd4', label: 'Personalised stories delivered' },
  { value: '98%', color: '#c0516e', label: 'Parents report positive change' },
  { value: '12', color: '#2d8a62', label: 'Core emotions explored' },
  { value: '50+', color: '#2272a0', label: 'Printable activity packs' }
];

const StatsRow = () => {
  return (
    <section className="section-layer">
      <div className="container">
        <div className="stats-row">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card glass"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="stat-num" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRow;


