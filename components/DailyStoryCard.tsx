'use client';

import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useToast } from '@/context/ToastContext';

type DailyStoryResponse = {
  theme: string;
  title: string;
  story: string;
};

const DailyStoryCard = () => {
  const [data, setData] = useState<DailyStoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch('/api/daily-story');
        if (!res.ok) {
          throw new Error('Failed to load daily story');
        }
        const json: DailyStoryResponse = await res.json();
        setData(json);
      } catch (err) {
        setError('Unable to load tonight’s story. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []);

  const saveAsPDF = () => {
    if (!data) return;

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
    doc.text('Daily bedtime story', pageWidth - margin, 12, { align: 'right' });

    const title = data.title || 'Today’s Story';
    const body = data.story;

    doc.setTextColor(42, 26, 62);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(title, maxWidth);
    doc.text(titleLines, pageWidth / 2, 36, { align: 'center' });

    doc.setDrawColor(201, 184, 245);
    doc.setLineWidth(0.5);
    doc.line(margin, 46, pageWidth - margin, 46);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(155, 111, 212);
    doc.text(`Today's theme: ${data.theme}`, pageWidth / 2, 53, { align: 'center' });

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

    const fileName = `daily-story-${data.theme.replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName);
  };

  const handleReadAloud = () => {
    if (!data) return;

    const text = `${data.title}\n\n${data.story}`;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Read aloud is not supported in this browser');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (!cardRef.current || !data) return;

    const { title, theme } = data;

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: "Tonight's EmotiIQ Story",
          text: `${title} — Theme: ${theme}`,
          url: window.location.href
        });
        return;
      } catch (error) {
        // If user cancels or share fails, silently fall back to image download
      }
    }

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `emotiq-tonights-story-${theme.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      showToast('Unable to generate share image, please try again');
    }
  };

  const getPreview = () => {
    if (!data) return '';
    const story = data.story.trim();
    if (!story) return '';

    const sentences = story.split(/(?<=[.?!])\s+/);
    const firstTwo = sentences.slice(0, 2).join(' ');
    return firstTwo;
  };

  return (
    <div
      style={{
        maxWidth: 780,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12
      }}
    >
      <div
        ref={cardRef}
        className="glass"
        style={{
          borderRadius: 28,
          padding: '24px 22px 18px',
          maxWidth: 420,
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                alignSelf: 'flex-start',
                padding: '4px 12px',
                borderRadius: 999,
                background: 'rgba(201,184,245,0.22)',
                border: '1px solid rgba(201,184,245,0.6)',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#7a4fc9',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Tonight&apos;s EmotiIQ Story 🌙
            </span>
            <span
              style={{
                fontSize: '0.86rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9b6fd4',
                fontWeight: 600
              }}
            >
              Tonight&apos;s Story
            </span>
          </div>

          {data && (
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(201,184,245,0.25)',
                border: '1px solid rgba(201,184,245,0.6)',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#7a4fc9',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              {data.theme}
            </span>
          )}
        </div>

        {loading && <p style={{ fontSize: '0.9rem', color: 'rgba(42,26,62,0.7)' }}>Loading tonight&apos;s story…</p>}

        {error && !loading && (
          <p style={{ fontSize: '0.9rem', color: '#c0516e' }}>
            {error}
          </p>
        )}

        {data && !loading && !error && (
          <>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond',
                fontSize: '1.6rem',
                fontWeight: 600,
                color: '#2a1a3e',
                margin: '12px 0 8px'
              }}
            >
              {data.title}
            </h3>

            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'rgba(42,26,62,0.85)',
                marginBottom: 10
              }}
            >
              {getPreview()}
            </p>

            <p
              style={{
                fontSize: '0.8rem',
                color: 'rgba(42,26,62,0.6)',
                marginTop: 8
              }}
            >
              Generated with EmotiIQ
            </p>
          </>
        )}
      </div>

      {data && !loading && !error && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 4
          }}
        >
          <button
            type="button"
            onClick={() => setShowFull((prev) => !prev)}
            style={{
              padding: '10px 22px',
              borderRadius: 50,
              border: '1.5px solid rgba(155,111,212,0.35)',
              background: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#7a4fc9'
            }}
          >
            {showFull ? 'Hide Story' : 'Read Story'}
          </button>

          <button
            type="button"
            onClick={saveAsPDF}
            style={{
              padding: '10px 22px',
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
            💜 Save PDF
          </button>

          <button
            type="button"
            onClick={handleReadAloud}
            style={{
              padding: '10px 22px',
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

          <button
            type="button"
            onClick={handleShare}
            style={{
              padding: '10px 22px',
              borderRadius: 50,
              border: '1.5px solid rgba(155,111,212,0.35)',
              background: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#7a4fc9'
            }}
          >
            📸 Share Tonight&apos;s Story
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyStoryCard;

