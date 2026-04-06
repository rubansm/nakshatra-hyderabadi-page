

## Plan: Replace Hero Background Video with Uploaded GIF

### What changes
Replace the `<video>` element in `HeroSection.tsx` with an `<img>` tag using the uploaded GIF as the background.

### Steps

1. **Copy the GIF** to `public/hero-bg.gif`
2. **Update `src/components/HeroSection.tsx`** — Replace the `<video>` block with an `<img src="/hero-bg.gif">` tag, keeping the same `w-full h-full object-cover` styling and gradient overlay.

