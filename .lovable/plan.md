

## Plan: Hero Section — Reduce Overlay & Shrink Tagline

### Changes in `src/components/HeroSection.tsx`

1. **Reduce dark overlay** from `bg-warm-brown/70` to `bg-warm-brown/10` — making the pickle video fully visible
2. **Shrink the tagline text** above the CTA ("Hyderabadi chicken pickle, made without preservatives...") from `text-lg md:text-xl` to `text-xs md:text-sm` so it's subtle and doesn't compete with the video
3. Also reduce its bottom margin so it sits tighter above the CTA button

No other sections or files affected.

