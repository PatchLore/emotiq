# emotiq
Emotional intelligence platform for children — personalised AI stories, printable activity downloads &amp; crafts. Built with Next.js 14, OpenAI GPT-4o &amp; Vercel.
# EmotiIQ 🌈

**Stories that teach hearts to feel.**

EmotiIQ is an emotional intelligence platform for children. Parents get 
personalised AI-generated stories, printable activity packs, craft kits, 
and conversation tools — all designed to help children understand and 
navigate their emotions.

---

## Products

- **Personalised Stories** — AI-crafted bedtime stories where the child 
  is the hero, exploring a specific emotion
- **Activity Downloads** — Printable feelings wheels, emotion puppets, 
  conversation cards, colouring packs
- **StoryBuddy** — Instant AI story generator with audio narration (60 seconds)
- **Subscription** — Monthly story + activity pack delivery

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom glassmorphism design system
- **Animations:** Framer Motion
- **AI:** OpenAI GPT-4o (story generation)
- **TTS:** Kokoro (audio narration)
- **Email:** Resend
- **Payments:** Stripe (coming soon)
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Resend API key (for email delivery)

### Install
```bash
git clone https://github.com/yourusername/emotiiq.git
cd emotiiq
npm install
```

### Environment Variables

Create a `.env.local` file in the root:
```bash
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
```

### Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
npm start
```

---

## Project Structure
```
/app
  layout.tsx          # Fonts, metadata, providers
  page.tsx            # Main landing page
  globals.css         # Design system, glass utility, animations
  /api
    /generate-story   # OpenAI story generation endpoint

/components
  AnimatedBackground  # Fixed blob + gradient background
  Navbar              # Fixed nav with scroll behaviour
  HeroSection         # Hero with story preview card
  StatsRow            # Key stats
  HowItWorks          # 3-step process
  ProductsGrid        # Digital downloads shop
  PersonaliseForm     # Story generation form + result display
  Testimonials        # Parent reviews
  Pricing             # Plans (Starter / Family / Bundle)
  Newsletter          # Email capture + free feelings wheel
  Footer

/context
  ToastContext        # Global toast notification state

/public
  storybuddy.html     # StoryBuddy standalone app
```

---

## Roadmap

- [x] Landing page with glassmorphism design
- [x] Personalised story generation (OpenAI GPT-4o)
- [x] Story result display with copy/create again
- [x] Vercel deployment
- [ ] PDF generation + download
- [ ] Email delivery via Resend
- [ ] Stripe payments (one-time + subscription)
- [ ] StoryBuddy audio narration integration
- [ ] User accounts + story history
- [ ] School/therapist bulk plans

---

## Design System

Glassmorphism UI with animated blob background.

| Token | Value |
|---|---|
| Rose | `#f4a7b9` |
| Lavender | `#c9b8f5` |
| Sky | `#93d5f0` |
| Mint | `#a8e6cf` |
| Peach | `#f7c59f` |
| Text | `#2a1a3e` |
| Display font | Cormorant Garamond |
| Body font | DM Sans |

---

## License

Private — all rights reserved. Not open source.

---

*Made with ♡ for growing hearts.*
