'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const plans = [
  {
    name: 'Starter',
    amount: '9',
    period: 'one-time',
    features: ['1 personalised story', "Parent's guide included", 'PDF delivery in 48hrs', '1 activity sheet'],
    buttonLabel: 'Get started',
    buttonClass: 'btn-plan btn-plan-outline',
    message: 'Redirecting to checkout… \u2728'
  },
  {
    name: 'Family',
    amount: '19',
    period: 'per month',
    featured: true,
    features: [
      '2 personalised stories/month',
      'Full activity pack each month',
      'Access to downloads library',
      'Priority 24hr delivery',
      'Monthly emotion theme'
    ],
    buttonLabel: 'Start free trial',
    buttonClass: 'btn-plan btn-plan-fill',
    message: 'Welcome to EmotiIQ Family! \u{1F31F}'
  },
  {
    name: 'Bundle',
    amount: '49',
    period: 'one-time',
    features: [
      '6 personalised stories',
      'Complete downloads vault',
      'Therapist-reviewed content',
      'Parent community access',
      'Printable certificate'
    ],
    buttonLabel: 'Get bundle',
    buttonClass: 'btn-plan btn-plan-outline',
    message: 'Redirecting to checkout… \u2728'
  }
];

const Pricing = () => {
  const { showToast } = useToast();

  return (
    <section className="pricing-section section-layer" id="pricing">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Simple Pricing</div>
          <div className="section-title">Every child <em>deserves</em> this</div>
          <p className="section-sub">
            Flexible options whether you want a one-off gift or an ongoing library of emotional tools.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`price-card glass${plan.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
            >
              {plan.featured && <div className="price-badge">Most Popular</div>}
              <div className="price-plan">{plan.name}</div>
              <div className="price-amount"><sup>£</sup>{plan.amount}</div>
              <div className="price-period">{plan.period}</div>
              <div className="price-divider" />
              <ul className="price-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button type="button" className={plan.buttonClass} onClick={() => showToast(plan.message)}>
                {plan.buttonLabel}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;


