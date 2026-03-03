'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const products = [
  {
    thumbClass: 'product-thumb-a',
    emoji: '\u{1F30A}',
    type: 'Activity Pack',
    name: 'Calm the Storm Anxiety Kit',
    desc: '12 printable cards, a feelings journal, and a breathing exercise poster.',
    price: '£6.99'
  },
  {
    thumbClass: 'product-thumb-b',
    emoji: '\u{1F3AD}',
    type: 'Craft Kit',
    name: 'Emotion Puppets Printable Set',
    desc: '8 emotion puppet templates for role-play storytelling at home.',
    price: '£4.99'
  },
  {
    thumbClass: 'product-thumb-c',
    emoji: '\u{1F31E}',
    type: 'Conversation Cards',
    name: 'Dinner Table Feeling Starters',
    desc: '30 conversation-starter cards designed to open up emotional chats.',
    price: '£5.99'
  },
  {
    thumbClass: 'product-thumb-d',
    emoji: '\u{1F308}',
    type: 'Colouring Pack',
    name: 'My Feelings World Colouring Book',
    desc: '20 beautifully illustrated pages, each themed around a different emotion.',
    price: '£3.99'
  },
  {
    thumbClass: 'product-thumb-e',
    emoji: '\u{1F4D6}',
    type: 'Story Pack',
    name: 'Big Changes Bundle (3 stories)',
    desc: 'Stories for starting school, new siblings, and moving home.',
    price: '£12.99'
  },
  {
    thumbClass: 'product-thumb-f',
    emoji: '\u{1F3C6}',
    type: 'Reward Chart',
    name: 'Emotional Milestones Chart',
    desc: 'Celebrate emotional growth — not just behaviour — with this beautiful tracker.',
    price: '£2.99'
  }
];

const ProductsGrid = () => {
  const { showToast } = useToast();

  return (
    <section className="products-section section-layer" id="shop">
      <div className="container">
        <motion.div
          className="products-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="section-eyebrow">Digital Downloads</div>
            <div className="section-title">Ready to <em>explore</em></div>
          </div>
          <button type="button" className="btn-secondary">View all →</button>
        </motion.div>

        <div className="products-grid">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              className="product-card glass"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.05 + index * 0.05 }}
            >
              <div className={`product-thumb ${product.thumbClass}`}>{product.emoji}</div>
              <div className="product-body">
                <div className="product-type">{product.type}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.desc}</div>
                <div className="product-footer">
                  <div className="product-price">{product.price}<span>PDF</span></div>
                  <button type="button" className="btn-buy" onClick={() => showToast('Added to cart! \u{1F6D2}')}>
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;


