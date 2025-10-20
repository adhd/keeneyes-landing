# Keeneyes Landing Page

Landing page for Keeneyes - Never lose the thread.

## Quick Start

```bash
cd keeneyes-landing
npm run dev
```

Then open http://localhost:8000

## Design Philosophy

### Core Approach
- **Visual storytelling over text**: Show the problem through floating, scattered information fragments
- **Interactive demonstration**: Working search bar that connects information visually
- **Recognition-based messaging**: Lead with moments users have experienced
- **Aggressive filtering**: Multiple touchpoints to exclude wrong users
- **Authentic tone**: Sounds like someone who built this for themselves

### Key Visual Elements
- **Information Chaos Visualization**: Floating fragments representing scattered calls, notes, screenshots
- **Interactive Search Demo**: Real-time search that shows connections forming between information
- **Before/After Split Screen**: Visual contrast between scattered vs connected knowledge
- **Scenario Cards**: Specific use cases (founder, community manager, consultant) with visual examples
- **Connection Animations**: SVG lines and highlights that appear when searching

### Strategic Principles
- **Filter aggressively**: Better 100 perfect users than 10K confused ones
- **Show don't tell**: Working demos over feature descriptions
- **Address real anxiety**: Professional credibility concerns, not just productivity
- **Authentic positioning**: Built by someone who had this exact problem

## Key Features

### Navigation
- Fixed navbar with backdrop blur
- Smooth scroll to sections
- Hide/show on scroll for mobile

### Hero Section
- Animated search bar demonstration
- Gradient text effects
- Staggered animation entrance
- Floating connection line effects

### Demo Section
- Three-step explanation with hover effects
- Terminal-style code examples
- Progressive disclosure

### Interactions
- ⌘K keyboard shortcut highlights search demo
- Hover effects on all interactive elements
- Subtle sparkle effects for ambiance
- Responsive button animations

## Structure

```
keeneyes-landing/
├── index.html          # Main page structure
├── styles.css          # Custom animations and effects
├── script.js           # Interactions and dynamic content
├── package.json        # Simple dev server setup
└── README.md           # This file
```

## Customization

### Colors
The keen color palette is defined in Tailwind config:
- `keen-50` to `keen-950` (cyan/teal spectrum)
- `slate-custom-850/950` for deep backgrounds

### Animations
All custom animations in `styles.css`:
- `fade-in`, `slide-up` for entrance effects
- `scan`, `pulse-subtle` for ongoing effects
- `typing` for search demo

### Content
Easy to modify:
- Search queries in `script.js` > `searchQueries` array
- Section content in `index.html`
- Timing/delays in CSS animation properties

## Next Steps

### Ready for:
- Content updates (copy, examples, CTAs)
- Additional sections (pricing, testimonials, FAQ)
- Form integration for early access
- Analytics tracking
- SEO optimization

### Architecture supports:
- Component swapping (modular CSS classes)
- Build process integration
- Framework migration if needed
- A/B testing different sections

## Performance

- Minimal dependencies (just Tailwind CDN)
- Optimized animations (GPU-accelerated transforms)
- Responsive images (when added)
- Accessibility considerations (reduced motion, focus states)

Built with startup speed and sophistication in mind. 🎯