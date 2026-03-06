'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const emotions = [
  { label: 'Happy', value: 'happy', emoji: '😀' },
  { label: 'Worried', value: 'worried', emoji: '😟' },
  { label: 'Angry', value: 'angry', emoji: '😡' },
  { label: 'Sad', value: 'sad', emoji: '😢' },
  { label: 'Tired', value: 'tired', emoji: '😴' },
  { label: 'Excited', value: 'excited', emoji: '🤩' }
];

const EmotionCheckin = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleClick = async (emotion: string) => {
    setSelected(emotion);
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/emotion-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotion })
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      const data: { response?: string } = await res.json();

      if (!data.response) {
        throw new Error('No response returned');
      }

      setResponse(data.response);
    } catch (error) {
      showToast('I had trouble responding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="personalise-section section-layer">
      <div className="container">
        <motion.div
          className="glass"
          style={{ borderRadius: 32, padding: '40px 32px' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Daily Check-In</div>
          <div className="section-title">How are you feeling today?</div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginTop: 24
            }}
          >
            {emotions.map((item) => {
              const isActive = selected === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleClick(item.value)}
                  className="glass"
                  style={{
                    borderRadius: 999,
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    border: isActive ? '1.5px solid rgba(155,111,212,0.6)' : '1px solid rgba(255,255,255,0.6)',
                    backgroundColor: isActive ? 'rgba(155,111,212,0.12)' : 'rgba(255,255,255,0.4)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#2a1a3e'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {loading && (
            <div
              style={{
                marginTop: 28,
                padding: '18px 20px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.9)',
                fontSize: '0.9rem',
                color: 'rgba(42,26,62,0.8)'
              }}
            >
              Thinking of something kind to say…
            </div>
          )}

          {response && !loading && (
            <motion.div
              className="glass"
              style={{
                marginTop: 28,
                padding: '22px 24px',
                borderRadius: 22
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#9b6fd4',
                  fontWeight: 500,
                  marginBottom: 8
                }}
              >
                ✦ A little note for you
              </div>
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: 'rgba(42,26,62,0.9)'
                }}
              >
                {response}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionCheckin;

