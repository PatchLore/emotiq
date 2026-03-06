'use client';

import { FormEvent, useState } from 'react';
import { useToast } from '@/context/ToastContext';

const ProblemStoryForm = () => {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [problem, setProblem] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);

  const { showToast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = childName.trim();
    const numericAge = Number(age);

    if (!trimmedName) {
      showToast("Please enter your child's name 💛");
      return;
    }

    if (!age || Number.isNaN(numericAge) || numericAge <= 0) {
      showToast('Please enter a valid age 📏');
      return;
    }

    if (!problem.trim()) {
      showToast('Tell us about the problem today 📝');
      return;
    }

    if (!goal.trim()) {
      showToast('Share the lesson you want to teach 🌱');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/problem-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: trimmedName,
          age: numericAge,
          problem,
          goal
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data: { title?: string; story?: string } = await response.json();

      if (!data.title || !data.story) {
        throw new Error('Incomplete story returned');
      }

      setTitle(data.title);
      setStory(data.story);
    } catch (error) {
      showToast('Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  };

  const saveAsPDF = () => {
    if (!story) return;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    doc.setFillColor(254, 246, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(201, 184, 245);
    doc.rect(0, 0, pageWidth, 18, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('EmotiIQ', margin, 12);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Stories that teach hearts to feel', pageWidth - margin, 12, { align: 'right' });

    const lines = story.split('\n').filter((line) => line.trim() !== '');
    const pdfTitle = title || lines[0] || 'Your Problem-Solving Story';
    const body = (title ? lines : lines.slice(1)).join('\n');

    doc.setTextColor(42, 26, 62);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(pdfTitle, maxWidth);
    doc.text(titleLines, pageWidth / 2, 36, { align: 'center' });

    doc.setDrawColor(201, 184, 245);
    doc.setLineWidth(0.5);
    doc.line(margin, 46, pageWidth - margin, 46);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(155, 111, 212);
    const nameForSubtitle = childName.trim() || 'your child';
    doc.text(`A personalised story for ${nameForSubtitle}`, pageWidth / 2, 53, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(42, 26, 62);

    const bodyLines = doc.splitTextToSize(body, maxWidth);
    let y = 63;

    bodyLines.forEach((line: string) => {
      if (y > pageHeight - 25) {
        doc.addPage();

        doc.setFillColor(254, 246, 255);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        doc.setFillColor(201, 184, 245);
        doc.rect(0, 0, pageWidth, 18, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('EmotiIQ', margin, 12);

        y = 28;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(42, 26, 62);
      }
      doc.text(line, margin, y);
      y += 6.5;
    });

    doc.setFontSize(8);
    doc.setTextColor(155, 111, 212);
    doc.setFont('helvetica', 'italic');
    doc.text('Made with ♡ by EmotiIQ — emotiq.co', pageWidth / 2, pageHeight - 10, { align: 'center' });

    const fileName = `${(childName.trim() || 'child').replace(/\s+/g, '-')}-problem-story-emotiq.pdf`;
    doc.save(fileName);
  };

  const handleCopy = () => {
    if (!story) return;

    navigator.clipboard
      .writeText(`${title ? `${title}\n\n` : ''}${story}`)
      .then(() => showToast('Story copied! 📋'))
      .catch(() => showToast('Unable to copy, please try again'));
  };

  const handleCreateAnother = () => {
    setTitle(null);
    setStory(null);
    setProblem('');
    setGoal('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadAloud = () => {
    if (!story) return;

    const text = `${title ? `${title}\n\n` : ''}${story}`;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Read aloud is not supported in this browser');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="personalise-section section-layer">
      <div className="container">
        <div className="form-wrapper glass">
          <div className="section-eyebrow">Real-Life Problem Solving</div>
          <div className="section-title">
            Turn today&apos;s <em>problem</em> into a story
          </div>
          <p className="section-sub">
            Share what happened and the lesson you&apos;d love your child to take away. We&apos;ll craft a gentle story
            they can grow from.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="problemChildName">Child&apos;s Name</label>
                <input
                  id="problemChildName"
                  type="text"
                  placeholder="e.g. Maya"
                  value={childName}
                  onChange={(event) => setChildName(event.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="problemAge">Age</label>
                <input
                  id="problemAge"
                  type="number"
                  min={1}
                  max={16}
                  placeholder="e.g. 8"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </div>

              <div className="field-group full">
                <label htmlFor="problemToday">Problem today</label>
                <textarea
                  id="problemToday"
                  placeholder="My child got upset when they lost a football game."
                  value={problem}
                  onChange={(event) => setProblem(event.target.value)}
                />
              </div>

              <div className="field-group full">
                <label htmlFor="problemGoal">Lesson goal</label>
                <input
                  id="problemGoal"
                  type="text"
                  placeholder="learn how to stay calm when losing"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                />
              </div>
            </div>

            <div className="form-submit">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Crafting story…' : 'Generate Story'}
              </button>
            </div>
          </form>
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
              Crafting {childName.trim() || "your child's"} problem-solving story…
            </p>
            <p style={{ color: 'rgba(42,26,62,0.6)', fontSize: '0.9rem' }}>This takes about 15 seconds</p>
          </div>
        )}

        {story && title && !loading && (
          <div
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
                ✦ Problem-Solving Story
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
                {title}
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
              {story}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopy}
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
                📋 Copy
              </button>
              <button
                type="button"
                onClick={handleCreateAnother}
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
                onClick={saveAsPDF}
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
              <button
                type="button"
                onClick={handleReadAloud}
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
                🔊 Read Aloud
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemStoryForm;

