# Shaker v2: Pixel Art Refactor

## Overview

A complete UI redesign transforming Shaker into a pixel-art themed text message mixer with a card-based selection system and hashtag-driven UX.

---

## Design System

### Theme
- **Background**: Pure black (`#000`)
- **Text**: White (`#fff`)
- **Accent**: White borders with rounded corners (12-16px radius)
- **Font**: VT323 (Google Fonts) - more readable than Silkscreen

### Card Dimensions
- **Aspect ratio**: 2.5 × 3.5 (standard poker card)
- **Actual sizes** (updated):
  - Small: 60px × 84px (autocomplete, loading animation)
  - Medium: 80px × 112px (default in rows)
  - Large: 110px × 154px (result display)

### Border Style
```css
/* Rounded corners instead of pixelated edges */
border: 2px solid #444;
border-radius: 12px;

/* Selected state */
border: 3px solid #fff;
```

---

## Phase 1: Foundation ✅ COMPLETE

### 1.1 VT323 Font (changed from Silkscreen)
```tsx
// In layout.tsx
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />

// Usage
fontFamily: "'VT323', monospace"
```

### 1.2 New Layout Structure ✅
```
┌─────────────────────────────────┐
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
│  │ Message input...    │  ▶   │ │  ← Fixed at bottom
│  │ #chill #wednesday   │      │ │     Expands upward
│  └─────────────────────┴──────┘ │
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │  ← Safe area
└─────────────────────────────────┘
```

### 1.3 Input Box Behavior ✅
- Fixed to bottom with `position: fixed`
- Respects safe area: `padding-bottom: env(safe-area-inset-bottom)`
- Expands upward as text grows (max 120px)
- Send button: ▶ play icon
- Hashtags inline with message

### 1.4 Files Created ✅
- ✅ `src/components/MixerV2.tsx` - New component (all-in-one)
- ✅ `src/app/layout.tsx` - VT323 font added
- ✅ `src/app/page.tsx` - Updated to use MixerV2

---

## Phase 2: Card System ✅ COMPLETE

### 2.1 PixelCard Component ✅
Inline in MixerV2.tsx with sizes: sm, md, lg

### 2.2 Hashtag Selection System ✅

**Adding ingredients:**
1. User taps card → `#cardname` appended to input ✅
2. User manually types `#something` ✅

**Parsing with Levenshtein fuzzy matching:**
```tsx
// Implemented in MixerV2.tsx
function levenshtein(a: string, b: string): number { ... }
function findBestMatch(tag: string): Ingredient | null { ... }
function parseHashtags(text: string): { message, tags, validIngredients } { ... }
```

### 2.3 Autocomplete Dropdown ✅
- Appears when user types `#`
- Filters as user types with scoring system:
  - Exact match (score 0)
  - Starts with (score 10-15)
  - Contains (score 30-35)
  - Levenshtein ≤2 (score 50-70)
- Shows emoji/image, hashtag ID, and name
- Keyboard navigation: Arrow Up/Down, Enter, Tab, Escape
- Touch/click selection
- Max 5 suggestions visible

---

## Phase 3: Animations & Results ✅ MOSTLY COMPLETE

### 3.1 Loading State Transition ✅
1. Cards fade out (0.3s ease-out)
2. Input box changes:
   - Background: `#111` → `#0a0a0a`
   - Border: `#444` → `#222`
   - Text: dimmed
   - Send button: disabled state

### 3.2 "-ing" Verb Animation ✅
```tsx
const ingredientVerbs: Record<string, string[]> = {
  chill: ['chilling', 'vibing', 'relaxing', 'lounging'],
  spicy: ['spicing', 'heating', 'sizzling', 'burning'],
  wednesday: ['brooding', 'plotting', 'deadpanning'],
  // ... ~20 ingredients have custom verbs
};
```
- Cycles through verbs (1.2s each)
- Falls back to: 'mixing', 'shaking', 'brewing', 'crafting', 'conjuring'

### 3.3 Selected Cards Carousel ✅
- Shows selected cards with float animation during loading
- Staggered animation delays
- Uses PixelCard sm size

### 3.4 Result Card Display ✅
- Poker card aspect ratio (2.5 × 3.5)
- Size selector at top (XS, S, M, L, XL)
- Scrollable content area for XL
- Selected ingredients shown at bottom
- Action buttons: share, ♡, close

---

## Phase 4: Polish 🔄 PARTIAL

### 4.1 Recent & Popular Row ❌ NOT STARTED
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
- "Popular": top 8 by useCount

### 4.2 XL Size Option ✅
```tsx
const sizes = ['tiny', 'short', 'medium', 'long', 'xl'];
const sizeLabels = { tiny: 'XS', short: 'S', medium: 'M', long: 'L', xl: 'XL' };
```
Prompt updated for XL: "60-80 words"

### 4.3 Share as Image ✅ COMPLETE
Uses `html2canvas` to capture result card:
```tsx
const shareAsImage = async () => {
  const canvas = await html2canvas(resultCardRef.current, {
    backgroundColor: '#000',
    scale: 2,
  });
  // Web Share API with file, or fallback to download
};
```

### 4.4 Like/Heart Feature ✅ COMPLETE
- Tap heart → toggle ♡ ↔ ♥ with pop animation
- Store liked results in localStorage (up to 50)
- Red color (#ff6b6b) when liked
- Future: could show "your favorites" section

### 4.5 Haptic Feedback ✅
Already implemented from v1:
- Card tap: 10ms
- Send button: pattern [50, 30, 50, 30, 50]
- Copy success: 50ms

---

## Implementation Checklist

### Phase 1: Foundation ✅
- [x] Add VT323 font to project
- [x] Build new layout structure with fixed bottom input
- [x] Implement expanding textarea
- [x] Add send button with ▶ icon
- [x] Vertical scroll for card rows
- [x] Rounded corners on all elements

### Phase 2: Card System ✅
- [x] Create PixelCard component
- [x] Update all card rows to use PixelCard
- [x] Implement hashtag input parsing
- [x] Build autocomplete dropdown
- [x] Handle fuzzy matching with Levenshtein
- [x] Keyboard navigation (arrows, enter, tab, escape)
- [x] Touch/click selection

### Phase 3: Animations & Results ✅
- [x] Loading state transitions (cards fade)
- [x] "-ing" verb animation system
- [x] Selected cards float animation during loading
- [x] Result card with poker-card styling
- [x] Size selector in card header (XS-XL)
- [x] Scrollable content for long text
- [x] Ingredient pills at card bottom
- [x] Action button placeholders (share, heart, close)

### Phase 4: Polish ✅ MOSTLY COMPLETE
- [x] **Recent ingredients row** (localStorage tracking) ✅
- [ ] **Popular ingredients row** (usage analytics)
- [x] **Share as image** (html2canvas integration) ✅
- [x] **Heart/like functionality** (localStorage + animation) ✅
- [x] Haptic feedback (carried from v1)
- [x] Edge case handling (fuzzy matching)
- [x] **All ingredient verbs** (100+ custom "-ing" verbs) ✅

---

## Outstanding Work

### Priority 1: Core Features
1. ~~**Recent & Popular Row**~~ ✅ Recent row complete - Track usage in localStorage, show recent ingredients at top
2. ~~**Share as Image**~~ ✅ COMPLETE - Captures result card, shares via Web Share API or downloads

### Priority 2: Engagement
3. ~~**Like/Heart Feature**~~ ✅ COMPLETE - Toggle heart, pop animation, localStorage persistence

### Priority 3: Nice to Have
4. ~~**More ingredient verbs**~~ ✅ Added custom "-ing" verbs for all 100+ ingredients
5. **Pixel art images** - Create pixel art for Brooklyn 99, Modern Family characters
6. **Sound effects** - Optional 8-bit sounds for interactions

---

## Open Questions

1. **Card images**: Should all cards eventually have pixel-art images, or keep emoji for some?
2. **Sound effects**: Add optional 8-bit sounds for interactions?
3. **Easter eggs**: Hidden card combinations with special effects?
4. **Keyboard shortcuts**: Power user features for desktop?
5. **Analytics**: Track which ingredients are most popular globally?

---

## Dependencies

### Installed
- VT323 font (Google Fonts CDN)
- html2canvas (for share-as-image feature) ✅

---

*Last updated: December 2024*
