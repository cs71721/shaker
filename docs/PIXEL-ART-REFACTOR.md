# Shaker v2: Pixel Art Refactor

## Overview

A complete UI redesign transforming Shaker into a pixel-art themed text message mixer with a card-based selection system and hashtag-driven UX.

---

## Design System

### Theme
- **Background**: Pure black (`#000`)
- **Text**: White (`#fff`)
- **Accent**: Pixel-art white borders
- **Font**: Silkscreen (Google Fonts)

### Card Dimensions
- **Aspect ratio**: 2.5 × 3.5 (standard poker card)
- **Suggested sizes**:
  - Small: 50px × 70px (for dense rows)
  - Medium: 70px × 98px (default)
  - Large: 100px × 140px (result display)

### Pixel Art Border Style
```css
/* 3px pixelated border effect */
border: 3px solid #fff;
border-image: url('/pixel-border.png') 3 stretch;
/* OR pure CSS approach */
box-shadow:
  0 0 0 3px #fff,
  3px 3px 0 3px #000,
  -3px -3px 0 3px #000;
```

---

## Phase 1: Foundation

### 1.1 Install Silkscreen Font
```tsx
// In layout.tsx or globals.css
@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');

font-family: 'Silkscreen', cursive;
```

### 1.2 New Layout Structure
```
┌─────────────────────────────────┐
│  [Recent & Popular Row]         │  ← New row
├─────────────────────────────────┤
│  [Vibes Cards Row]              │
│  [Texting Cards Row]            │
│  [Characters Cards Row]         │  ← Vertical scroll
│  [Christmas Cards Row]          │
│  [Brooklyn 99 Cards Row]        │
│  [Modern Family Cards Row]      │
│  [Shakespeare Cards Row]        │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────┬──────┐ │
│  │ Message input...    │ SEND │ │  ← Fixed at bottom
│  │ #chill #wednesday   │  ▶   │ │     Expands upward
│  └─────────────────────┴──────┘ │
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │  ← Safe area
└─────────────────────────────────┘
```

### 1.3 Input Box Behavior
- Fixed to bottom with `position: fixed`
- Respects safe area: `padding-bottom: env(safe-area-inset-bottom)`
- Expands upward as text grows (max 4 lines before scroll)
- Send button: pixel-art arrow or play icon
- Line 1: User's message
- Line 2+: Hashtags (auto-wrapped)

### 1.4 Files to Create/Modify
- [ ] `src/components/MixerV2.tsx` - New component
- [ ] `src/components/PixelCard.tsx` - Reusable card component
- [ ] `src/components/HashtagInput.tsx` - Input with hashtag parsing
- [ ] `src/styles/pixel.css` - Pixel art utilities
- [ ] `public/pixel-border.png` - 9-slice border image (optional)

---

## Phase 2: Card System

### 2.1 PixelCard Component
```tsx
interface PixelCardProps {
  id: string;
  name: string;
  emoji?: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
}
```

Visual structure:
```
┌─────────┐
│ ▓▓▓▓▓▓▓ │  ← Pixel border (3px)
│ ▓     ▓ │
│ ▓  🔥  ▓ │  ← Emoji or image
│ ▓     ▓ │
│ ▓ chill▓ │  ← Name
│ ▓▓▓▓▓▓▓ │
└─────────┘
```

### 2.2 Hashtag Selection System

**Adding ingredients:**
1. User taps card → `#cardname` appended to input
2. User manually types `#something`

**Parsing logic:**
```tsx
function parseHashtags(text: string): { message: string; tags: string[]; validIngredients: Ingredient[] } {
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex) || [];
  const tags = matches.map(m => m.slice(1).toLowerCase());

  // Fuzzy match against known ingredients
  const validIngredients = tags
    .map(tag => findBestMatch(tag, allIngredients))
    .filter(Boolean);

  // Remove hashtags from message
  const message = text.replace(hashtagRegex, '').trim();

  return { message, tags, validIngredients };
}

function findBestMatch(tag: string, ingredients: Ingredient[]): Ingredient | null {
  // Exact match
  const exact = ingredients.find(i => i.id === tag || i.name.toLowerCase() === tag);
  if (exact) return exact;

  // Fuzzy match (starts with, contains, Levenshtein distance < 2)
  const fuzzy = ingredients.find(i =>
    i.id.startsWith(tag) ||
    i.name.toLowerCase().startsWith(tag)
  );
  return fuzzy || null;
}
```

### 2.3 Autocomplete Dropdown
- Appears when user types `#`
- Filters as user types
- Shows matching cards with emoji
- Keyboard/touch navigation
- Max 5 suggestions visible

---

## Phase 3: Animations & Results

### 3.1 Loading State Transition
1. Cards fade out (0.3s ease-out)
2. Input box changes:
   - Background: `#1a1a1a` → `#0a0a0a`
   - Border: white → gray
   - Text: slightly dimmed
   - Send button: disabled state

### 3.2 "-ing" Verb Animation
Generate contextual verbs based on selected ingredients:
```tsx
const ingredientVerbs: Record<string, string[]> = {
  chill: ['chilling', 'vibing', 'relaxing'],
  spicy: ['spicing', 'heating', 'burning'],
  wednesday: ['brooding', 'plotting', 'deadpanning'],
  yoda: ['meditating', 'levitating', 'speaking backwards'],
  santa: ['ho-ho-hoing', 'gift-wrapping', 'chimney-sliding'],
  // ... etc
};
```

Animation display:
- Cycle through verbs (1.5s each)
- Fade transition between words
- Pixel-style text animation (optional: typewriter effect)

### 3.3 Selected Cards Carousel
- Show selected cards in a gentle horizontal float
- Subtle bob/sway animation
- Cards slightly overlap
- Semi-transparent to not distract

### 3.4 Result Card Display
```
┌─────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓  [XS] [S] [M] [L] [XL]    ▓ │  ← Size buttons
│ ▓                           ▓ │
│ ▓   "hey so about earlier   ▓ │
│ ▓    i was being dramatic   ▓ │  ← Result text
│ ▓    ur still my fav ngl"   ▓ │     (tap to copy)
│ ▓                           ▓ │
│ ▓    🔥 Wednesday           ▓ │  ← Selected cards
│ ▓                           ▓ │     (small, at bottom)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                 │
│      [share] [♡] [close]        │  ← Action icons
└─────────────────────────────────┘
```

---

## Phase 4: Polish

### 4.1 Recent & Popular Row
**Data structure:**
```tsx
interface UsageData {
  id: string;
  useCount: number;
  lastUsed: number; // timestamp
}
```

**Storage:** localStorage
- Track each ingredient use
- "Recent": last 8 unique ingredients used
- "Popular": top 8 by useCount (global or could be API-based later)

### 4.2 XL Size Option
Add to sizes array:
```tsx
const sizes = ['tiny', 'short', 'medium', 'long', 'xl'];
const sizeLabels = { tiny: 'XS', short: 'S', medium: 'M', long: 'L', xl: 'XL' };
```

Update prompt for XL: "60-80 words"

### 4.3 Share as Image
Using `html2canvas`:
```tsx
import html2canvas from 'html2canvas';

async function shareAsImage(cardElement: HTMLElement) {
  const canvas = await html2canvas(cardElement, {
    backgroundColor: '#000',
    scale: 2, // Retina quality
  });

  const blob = await new Promise<Blob>(resolve =>
    canvas.toBlob(blob => resolve(blob!), 'image/png')
  );

  if (navigator.share && navigator.canShare({ files: [new File([blob], 'shaker.png')] })) {
    await navigator.share({
      files: [new File([blob], 'shaker.png', { type: 'image/png' })],
    });
  } else {
    // Fallback: download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shaker.png';
    a.click();
  }
}
```

### 4.4 Like/Heart Feature
- Tap heart → fill animation
- Store liked results in localStorage
- Future: could show "your favorites" section

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Add Silkscreen font to project
- [ ] Create base pixel-art CSS utilities
- [ ] Build new layout structure with fixed bottom input
- [ ] Implement expanding textarea
- [ ] Add pixel-art send button
- [ ] Vertical scroll for card rows

### Phase 2: Card System
- [ ] Create PixelCard component
- [ ] Update all card rows to use PixelCard
- [ ] Implement hashtag input parsing
- [ ] Build autocomplete dropdown
- [ ] Handle fuzzy matching for typos
- [ ] Remove old selected ingredients display

### Phase 3: Animations & Results
- [ ] Loading state transitions
- [ ] "-ing" verb animation system
- [ ] Selected cards carousel during loading
- [ ] Result card with poker-card styling
- [ ] Size selector in card header
- [ ] Ingredient pills at card bottom
- [ ] Action buttons (share, heart, close)

### Phase 4: Polish
- [ ] Recent ingredients row (localStorage)
- [ ] Popular ingredients row
- [ ] XL size option
- [ ] Share as image (html2canvas)
- [ ] Heart/like functionality
- [ ] Haptic feedback updates
- [ ] Edge case handling
- [ ] Performance optimization

---

## Open Questions

1. **Card images**: Should all cards eventually have pixel-art images, or keep emoji for some?
2. **Sound effects**: Add optional 8-bit sounds for interactions?
3. **Easter eggs**: Hidden card combinations with special effects?
4. **Keyboard shortcuts**: Power user features for desktop?

---

## Dependencies to Add

```bash
npm install html2canvas
# Silkscreen font via Google Fonts (no npm package needed)
```

---

*Last updated: December 2024*
