'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const emotionOptions = [
  '\u{1F630} Anxiety',
  '\u{1F624} Anger',
  '\u{1F622} Sadness',
  '\u{1F628} Fear',
  '\u{1F612} Jealousy',
  '\u{1F614} Loneliness',
  '\u{1F917} Empathy',
  '\u{1F4AA} Confidence',
  '\u{1F31F} Gratitude',
  '\u{1F91D} Friendship'
];

const PersonaliseForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [favouriteThing, setFavouriteThing] = useState('');
  const [friendOrPet, setFriendOrPet] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((item) => item !== emotion) : [...prev, emotion]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      showToast("Please enter your child's name \u{1F49B}");
      return;
    }

    if (!age) {
      showToast('Please select an age range \u{1F4D6}');
      return;
    }

    if (!selectedEmotions.length) {
      showToast('Pick at least one emotion \u2728');
      return;
    }

    const childName = name.trim();
    const primaryEmotion = selectedEmotions[0] ?? '';

    setLoading(true);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName,
          age,
          favouriteThing,
          emotion: primaryEmotion,
          emotions: selectedEmotions,
          notes,
          friend: friendOrPet
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data: { story?: string } = await response.json();

      if (!data.story) {
        throw new Error('No story returned');
      }

      setStory(data.story);

      window.setTimeout(() => {
        document.getElementById('story-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      showToast('Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="personalise-section section-layer" id="personalise">
      <div className="container">
        <motion.div
          className="form-wrapper glass"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-eyebrow">Personalised Stories</div>
          <div className="section-title">Create <em>their</em> story</div>
          <p className="section-sub">
            Every detail you share helps us craft a story that feels like it was written just for them — because it
            was.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="childName">Child&apos;s Name</label>
                <input
                  id="childName"
                  type="text"
                  placeholder="e.g. Sophia"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="childAge">Age</label>
                <select id="childAge" value={age} onChange={(event) => setAge(event.target.value)}>
                  <option value="">Select age range</option>
                  <option>3–5 years</option>
                  <option>6–8 years</option>
                  <option>9–12 years</option>
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="favouriteThing">Favourite Thing</label>
                <input
                  id="favouriteThing"
                  type="text"
                  placeholder="e.g. dragons, ballet, football"
                  value={favouriteThing}
                  onChange={(event) => setFavouriteThing(event.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="friendOrPet">Best Friend or Pet (optional)</label>
                <input
                  id="friendOrPet"
                  type="text"
                  placeholder="e.g. Max the dog"
                  value={friendOrPet}
                  onChange={(event) => setFriendOrPet(event.target.value)}
                />
              </div>

              <div className="field-group full">
                <label>Which emotion would you like to explore?</label>
                <div className="emotion-picker">
                  {emotionOptions.map((emotion) => {
                    const active = selectedEmotions.includes(emotion);

                    return (
                      <button
                        key={emotion}
                        type="button"
                        className={`epick${active ? ' active' : ''}`}
                        onClick={() => toggleEmotion(emotion)}
                      >
                        {emotion}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="field-group full">
                <label htmlFor="extraNotes">Anything else we should know?</label>
                <textarea
                  id="extraNotes"
                  placeholder="e.g. She's just started a new school and is nervous about making friends…"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>
            </div>

            <div className="form-submit">
              <button type="submit" className="btn-submit">{`\u2726 Create My Personalised Story`}</button>
            </div>
          </form>
        </motion.div>
      </div>

      {loading && (
        <div
          className="glass"
          style={{
            maxWidth: 780,
            margin: '24px auto 0',
            borderRadius: 32,
            padding: '48px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✨</div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: '1.5rem',
              color: '#2a1a3e',
              marginBottom: 8
            }}
          >
            Crafting {name || "your child's"} story…
          </p>
          <p style={{ color: 'rgba(42,26,62,0.6)', fontSize: '0.9rem' }}>This takes about 15 seconds</p>
        </div>
      )}

      {story && !loading && (
        <div
          id="story-result"
          className="glass"
          style={{
            maxWidth: 780,
            margin: '24px auto 0',
            borderRadius: 32,
            padding: '48px'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#9b6fd4',
                fontWeight: 500
              }}
            >
              ✦ Your Personalised Story
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond',
                fontSize: '2rem',
                fontWeight: 600,
                color: '#2a1a3e',
                marginTop: 8,
                lineHeight: 1.2
              }}
            >
              {story.split('\n')[0]}
            </h2>
          </div>

          <div
            style={{
              fontFamily: 'DM Sans',
              fontSize: '0.95rem',
              lineHeight: 1.85,
              color: 'rgba(42,26,62,0.8)',
              whiteSpace: 'pre-wrap'
            }}
          >
            {story
              .split('\n')
              .slice(1)
              .join('\n')
              .replace(/\[PAUSE\]/g, ' ')}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() =>
                navigator.clipboard
                  .writeText(story)
                  .then(() => showToast('Story copied! 📋'))
                  .catch(() => showToast('Unable to copy, please try again'))
              }
              style={{
                padding: '12px 24px',
                borderRadius: 50,
                border: '1.5px solid rgba(155,111,212,0.35)',
                background: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: '#7a4fc9'
              }}
            >
              📋 Copy Story
            </button>
            <button
              type="button"
              onClick={() => {
                setStory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                padding: '12px 24px',
                borderRadius: 50,
                border: '1.5px solid rgba(155,111,212,0.35)',
                background: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: '#7a4fc9'
              }}
            >
              ✦ Create Another
            </button>
            <button
              type="button"
              style={{
                padding: '12px 24px',
                borderRadius: 50,
                border: 'none',
                background: 'linear-gradient(135deg, #c9b8f5, #9b6fd4)',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: 'white',
                boxShadow: '0 4px 18px rgba(155,111,212,0.35)'
              }}
            >
              💜 Save as PDF
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonaliseForm;


