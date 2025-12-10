'use client';

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// DATA
// ============================================================================

const voiceDescriptions: Record<string, string> = {
  chill: "super relaxed and casual, no pressure vibes, lowercase energy",
  bold: "direct and confident, no fluff, gets to the point",
  spicy: "playful and dramatic, adds humor and flair, a bit chaotic",
  flowy: "gentle and meandering, soft and thoughtful, uses ellipses",
  emo: "sensitive and vulnerable, deep feelings, raw honesty",
  hype: "excited and energetic, uses caps, exclamation marks, positive chaos",
  sarcastic: "dry wit, ironic, deadpan humor, eye-roll energy",
  sweet: "warm and caring, genuine kindness, supportive",
  chaotic: "pure unhinged energy, random tangents, keyboard smash vibes",
  poetic: "deep and artsy, metaphors, slightly pretentious but beautiful",
  savage: "brutal honesty, no filter, mic drop energy",
  dramatic: "everything is a BIG DEAL, theatrical, over the top reactions",
  sleepy: "tired energy, low effort responses, wants to nap",
  petty: "passive-aggressive, holds grudges, subtle shade",
  unhinged: "completely unfiltered, zero impulse control, feral energy",
  cozy: "warm and soft, comforting, like a hug in text form",
  wednesday: "Wednesday Addams - deadpan, dark humor, unbothered, morbid wit",
  peeta: "Peeta from Hunger Games - earnest, heartfelt, loyal",
  hermione: "Hermione Granger - logical, articulate, slightly know-it-all",
  yoda: "Yoda - wise, inverted sentence structure, calm and cryptic",
  deadpool: "Deadpool - fourth-wall breaking, chaotic, absurdist humor",
  elsa: "Elsa - composed then vulnerable, regal but emotional",
  shrek: "Shrek - gruff exterior, surprisingly wise, self-deprecating, ogre references",
  taylor: "Taylor Swift - poetic, emotionally specific, vivid imagery",
  gandalf: "Gandalf - wise and dramatic, cryptic advice",
  dracula: "Dracula - formal old-fashioned, dramatic dark romance vibes",
  jesus: "Jesus - compassionate, wise, gentle but profound",
  batman: "Batman - brooding, intense, short declarative sentences",
  carson: "Carson the butler - formal, disapproving, proper, passive-aggressive dignity",
  dowager: "Dowager Countess Violet - sharp wit, cutting remarks, aristocratic shade",
  mary: "Lady Mary Crawley - elegant, cold, devastatingly composed, subtle cruelty",
  spongebob: "SpongeBob - absurdly optimistic, enthusiastic, naive but wholesome",
  stitch: "Stitch - chaotic destruction, broken English, surprisingly loving",
  moana: "Moana - determined, adventurous, stubborn but kind",
  bruno: "Bruno from Encanto - cryptic, mysterious, 'we don't talk about' vibes",
  barbie: "Barbie - optimistic, encouraging, believes in you, pink energy",
  ken: "Ken - himbo energy, 'I'm just Ken', earnest but clueless",
  gru: "Gru - villain with soft heart, dramatic declarations, minion dad energy",
  katniss: "Katniss - serious, protective, reluctant hero, blunt and guarded",
  jake: "Jake Peralta - immature detective, pop culture references, enthusiastic, 'cool cool cool cool'",
  amy: "Amy Santiago - type-A perfectionist, loves binders and rules, competitive, nervous rambling",
  holt: "Captain Holt - deadpan serious, formal speech, unexpectedly dramatic, dry humor",
  rosa: "Rosa Diaz - tough, blunt, scary, secretly soft, minimal words maximum impact",
  charles: "Charles Boyle - food obsessed, overly supportive, loyal to a fault, dramatic about friendship",
  gina: "Gina Linetti - self-absorbed, confident queen, dance references, thinks she's better than everyone",
  terry: "Terry Jeffords - speaks in third person, loves yogurt, protective dad energy, supportive",
  hitchcock: "Hitchcock - lazy, inappropriate, food obsessed, surprisingly insightful sometimes",
  scully: "Scully - Hitchcock's partner, sweet, oblivious, unexpectedly wholesome",
  kevin: "Kevin Cozner - academic, formal, dry wit like Holt, sophisticated references",
  dougjudy: "Doug Judy - smooth, charismatic, unreliable friend, 'Rosa Rosa Rosa'",
  pimento: "Adrian Pimento - unhinged, paranoid, intense, chaotic feral energy",
  phil: "Phil Dunphy - dad jokes, thinks he's cool, 'cool dad' energy, puns, overly enthusiastic",
  gloria: "Gloria Pritchett - dramatic, passionate, fierce mama, Colombian flair, loud and loving",
  claire: "Claire Dunphy - stressed mom, competitive, control freak, wine energy",
  luke: "Luke Dunphy - lovably clueless, simple observations, accidentally profound",
  mitch: "Mitchell Pritchett - anxious, overthinking, dramatic gasps, neurotic but loving",
  cam: "Cam Tucker - theatrical, emotional, football references, dramatic entrances, sensitive",
  jay: "Jay Pritchett - grumpy old man, sarcastic, secretly soft, tough love",
  haley: "Haley Dunphy - social media obsessed, surprisingly clever, shopping references",
  alex: "Alex Dunphy - genius, condescending, underappreciated, sarcastic intellectual",
  manny: "Manny Delgado - romantic old soul, pretentious, poetic, dramatic about love",
  lily: "Lily Tucker-Pritchett - savage, deadpan brutal honesty, sarcastic child",
  dylan: "Dylan Marshall - himbo energy, accidentally wise, sweet but clueless, guitar references",
  romeo: "Romeo - dramatic romantic, poetic declarations of love, impulsive, 'but soft!' energy",
  juliet: "Juliet - passionate, youthful intensity, romantic defiance, balcony speech vibes",
  hamlet: "Hamlet - existential angst, overthinking everything, 'to be or not to be', brooding indecision",
  ladymacbeth: "Lady Macbeth - ambitious, persuasive, dark determination, 'out damn spot' guilt",
  puck: "Puck - mischievous trickster, playful chaos, 'what fools these mortals be'",
  mercutio: "Mercutio - witty, sarcastic, dramatic flair, 'a plague on both your houses'",
  ophelia: "Ophelia - tragic, poetic, delicate, flowers and water imagery",
  macbeth: "Macbeth - ambitious, guilty, paranoid, 'is this a dagger' energy",
  falstaff: "Falstaff - jovial, witty, larger than life, loves food and drink",
  beatrice: "Beatrice - sharp-tongued, witty, proud, verbal sparring champion",
  benedick: "Benedick - sarcastic, proud, secretly romantic, witty banter",
  bottom: "Bottom - overconfident, theatrical, lovably oblivious, donkey transformation energy",
  santa: "Santa Claus - jolly, generous, 'ho ho ho', knows if you've been naughty or nice",
  grinch: "The Grinch - grumpy, cynical, heart growing three sizes, Mt. Crumpit energy",
  buddyelf: "Buddy the Elf - pure innocent joy, enthusiastic, 'SANTA!', loves syrup on everything",
  scrooge: "Ebenezer Scrooge - miserly then reformed, 'bah humbug' to generous, dramatic transformation",
  kevinmccallister: "Kevin McCallister - clever, resourceful, booby trap energy, 'keep the change ya filthy animal'",
  rudolph: "Rudolph - underdog, shiny nose pride, proves the haters wrong",
  jackskellington: "Jack Skellington - curious, dramatic, 'what's this?!', misguided but earnest",
  clarkgriswold: "Clark Griswold - stressed dad, overly optimistic, disaster-prone, 'hallelujah' moments",
  frosty: "Frosty - jolly happy soul, innocent, 'happy birthday!', melting anxiety",
  cindylou: "Cindy Lou Who - innocent, questioning, heart of gold, 'why are you taking our tree?'",
  snowmiser: "Snow Miser - dramatic, fabulous, 'I'm Mr. White Christmas', sibling rivalry",
  ralphie: "Ralphie Parker - obsessive, nostalgic, 'you'll shoot your eye out', decoder ring disappointment",
  newcrush: "texting a new crush - nervous, flirty, trying to be cool but overthinking everything",
  situationship: "texting a situationship - casual but loaded, reading into everything, playing it cool",
  partner: "texting your partner - comfortable, loving, can be weird and real",
  ex: "texting an ex - guarded, loaded subtext, emotionally complex, playing it cool",
  leftonread: "someone left you on read - desperate but trying to act unbothered, second-guessing yourself",
  bestie: "texting your bestie - unfiltered chaos, inside jokes, zero judgment",
  groupchat: "texting the group chat - performing for the audience, going for laughs",
  acquaintance: "texting an acquaintance - polite but distant, slightly formal",
  friendupset: "texting a friend you upset - apologetic, careful, trying to fix things",
  upsetfriend: "texting a friend who's upset with you - walking on eggshells, defensive but caring",
  friendmadatyou: "texting a friend who upset you - trying to stay calm, subtle disappointment, need to address it",
  mom: "texting mom - reassuring, patient, might need to explain memes",
  dad: "texting dad - direct, might get a thumbs up back, dad joke energy",
  parents: "texting both parents - formal-ish, keeping them in the loop, wholesome",
  sibling: "texting a sibling - roasting is love, chaos, no filter needed",
  grandparent: "texting grandparent - extra clear, patient, lots of love",
  kids: "texting kids - fun, encouraging, age-appropriate, parental but cool",
  teacher: "texting a teacher - respectful, formal, asking for help politely",
  boss: "texting your boss - professional but not stiff, clear and competent",
  coach: "texting your coach - respectful, showing commitment, brief and focused",
  someoneNew: "texting someone new - friendly, curious, finding common ground",
  onlinefriend: "texting an online friend - meme-fluent, parasocial comfort, very online",
  gamingbuddy: "texting gaming buddy - game references, planning sessions, trash talk",
  roommate: "texting a roommate - household logistics, passive-aggressive potential, casual",
  stranger: "texting a stranger - polite, explaining context, getting to the point"
};

// Contextual verbs for loading animation
const ingredientVerbs: Record<string, string[]> = {
  chill: ['chilling', 'vibing', 'relaxing', 'lounging'],
  bold: ['asserting', 'declaring', 'commanding'],
  spicy: ['spicing', 'heating', 'sizzling', 'burning'],
  flowy: ['flowing', 'drifting', 'floating'],
  emo: ['feeling', 'processing', 'emoting'],
  hype: ['hyping', 'energizing', 'amplifying'],
  sarcastic: ['eye-rolling', 'deadpanning', 'quipping'],
  sweet: ['sweetening', 'warming', 'hugging'],
  chaotic: ['unraveling', 'spiraling', 'keyboard-smashing'],
  poetic: ['poeticizing', 'metaphoring', 'waxing'],
  savage: ['roasting', 'dragging', 'mic-dropping'],
  dramatic: ['dramatizing', 'gasping', 'fainting'],
  sleepy: ['yawning', 'dozing', 'napping'],
  petty: ['shading', 'side-eyeing', 'noting'],
  unhinged: ['unraveling', 'feral-posting', 'chaos-channeling'],
  cozy: ['cozy-ing', 'snuggling', 'wrapping'],
  wednesday: ['brooding', 'plotting', 'deadpanning'],
  yoda: ['meditating', 'levitating', 'backwards-speaking'],
  santa: ['ho-ho-hoing', 'gift-wrapping', 'list-checking'],
  grinch: ['grumbling', 'scheming', 'heart-growing'],
  // Add more as needed...
};

interface Ingredient {
  id: string;
  emoji: string;
  name: string;
  section: string;
  image?: string;
}

const allIngredients: Ingredient[] = [
  // Vibes
  { id: 'chill', emoji: '☁️', name: 'chill', section: 'vibes' },
  { id: 'bold', emoji: '⚡', name: 'bold', section: 'vibes' },
  { id: 'spicy', emoji: '🔥', name: 'spicy', section: 'vibes' },
  { id: 'flowy', emoji: '🌊', name: 'flowy', section: 'vibes' },
  { id: 'emo', emoji: '🖤', name: 'emo', section: 'vibes' },
  { id: 'hype', emoji: '✨', name: 'hype', section: 'vibes' },
  { id: 'sarcastic', emoji: '🙄', name: 'sarcastic', section: 'vibes' },
  { id: 'sweet', emoji: '🍯', name: 'sweet', section: 'vibes' },
  { id: 'chaotic', emoji: '🌀', name: 'chaotic', section: 'vibes' },
  { id: 'poetic', emoji: '🪶', name: 'poetic', section: 'vibes' },
  { id: 'savage', emoji: '💅', name: 'savage', section: 'vibes' },
  { id: 'dramatic', emoji: '🎭', name: 'dramatic', section: 'vibes' },
  { id: 'sleepy', emoji: '😴', name: 'sleepy', section: 'vibes' },
  { id: 'petty', emoji: '🐸', name: 'petty', section: 'vibes' },
  { id: 'unhinged', emoji: '🤪', name: 'unhinged', section: 'vibes' },
  { id: 'cozy', emoji: '🧸', name: 'cozy', section: 'vibes' },
  // Characters
  { id: 'wednesday', emoji: '🗡️', name: 'Wednesday', section: 'characters', image: '/characters/wednesday.png' },
  { id: 'peeta', emoji: '🍞', name: 'Peeta', section: 'characters', image: '/characters/peeta.png' },
  { id: 'hermione', emoji: '📚', name: 'Hermione', section: 'characters', image: '/characters/hermione.png' },
  { id: 'yoda', emoji: '💚', name: 'Yoda', section: 'characters', image: '/characters/yoda.png' },
  { id: 'deadpool', emoji: '💀', name: 'Deadpool', section: 'characters', image: '/characters/deadpool.png' },
  { id: 'elsa', emoji: '❄️', name: 'Elsa', section: 'characters', image: '/characters/elsa.png' },
  { id: 'shrek', emoji: '👹', name: 'Shrek', section: 'characters', image: '/characters/shrek.png' },
  { id: 'taylor', emoji: '💜', name: 'Taylor', section: 'characters', image: '/characters/taylor.png' },
  { id: 'gandalf', emoji: '🧙', name: 'Gandalf', section: 'characters', image: '/characters/gandalf.png' },
  { id: 'dracula', emoji: '🧛', name: 'Dracula', section: 'characters', image: '/characters/dracula.png' },
  { id: 'jesus', emoji: '✝️', name: 'Jesus', section: 'characters', image: '/characters/jesus.png' },
  { id: 'batman', emoji: '🦇', name: 'Batman', section: 'characters', image: '/characters/batman.png' },
  { id: 'carson', emoji: '🎩', name: 'Carson', section: 'characters' },
  { id: 'dowager', emoji: '👑', name: 'Dowager', section: 'characters' },
  { id: 'mary', emoji: '🥀', name: 'Lady Mary', section: 'characters' },
  { id: 'spongebob', emoji: '🧽', name: 'SpongeBob', section: 'characters', image: '/characters/spongebob.png' },
  { id: 'stitch', emoji: '👽', name: 'Stitch', section: 'characters', image: '/characters/stitch.png' },
  { id: 'moana', emoji: '🌺', name: 'Moana', section: 'characters', image: '/characters/moana.png' },
  { id: 'bruno', emoji: '🔮', name: 'Bruno', section: 'characters', image: '/characters/bruno.png' },
  { id: 'barbie', emoji: '💖', name: 'Barbie', section: 'characters', image: '/characters/barbie.png' },
  { id: 'ken', emoji: '🩷', name: 'Ken', section: 'characters', image: '/characters/ken.png' },
  { id: 'gru', emoji: '🦹', name: 'Gru', section: 'characters', image: '/characters/gru.png' },
  { id: 'katniss', emoji: '🏹', name: 'Katniss', section: 'characters', image: '/characters/katniss.png' },
  // Brooklyn 99
  { id: 'jake', emoji: '🚔', name: 'Jake', section: 'brooklyn99' },
  { id: 'amy', emoji: '📋', name: 'Amy', section: 'brooklyn99' },
  { id: 'holt', emoji: '🎖️', name: 'Holt', section: 'brooklyn99' },
  { id: 'rosa', emoji: '🖤', name: 'Rosa', section: 'brooklyn99' },
  { id: 'charles', emoji: '🍝', name: 'Charles', section: 'brooklyn99' },
  { id: 'gina', emoji: '💃', name: 'Gina', section: 'brooklyn99' },
  { id: 'terry', emoji: '💪', name: 'Terry', section: 'brooklyn99' },
  { id: 'hitchcock', emoji: '🍕', name: 'Hitchcock', section: 'brooklyn99' },
  { id: 'scully', emoji: '🥤', name: 'Scully', section: 'brooklyn99' },
  { id: 'kevin', emoji: '🎓', name: 'Kevin', section: 'brooklyn99' },
  { id: 'dougjudy', emoji: '🎤', name: 'Doug Judy', section: 'brooklyn99' },
  { id: 'pimento', emoji: '🔪', name: 'Pimento', section: 'brooklyn99' },
  // Modern Family
  { id: 'phil', emoji: '👔', name: 'Phil', section: 'modernfamily' },
  { id: 'gloria', emoji: '💋', name: 'Gloria', section: 'modernfamily' },
  { id: 'claire', emoji: '🍷', name: 'Claire', section: 'modernfamily' },
  { id: 'luke', emoji: '🎮', name: 'Luke', section: 'modernfamily' },
  { id: 'mitch', emoji: '😰', name: 'Mitch', section: 'modernfamily' },
  { id: 'cam', emoji: '🏈', name: 'Cam', section: 'modernfamily' },
  { id: 'jay', emoji: '🛋️', name: 'Jay', section: 'modernfamily' },
  { id: 'haley', emoji: '📱', name: 'Haley', section: 'modernfamily' },
  { id: 'alex', emoji: '🎓', name: 'Alex', section: 'modernfamily' },
  { id: 'manny', emoji: '🎭', name: 'Manny', section: 'modernfamily' },
  { id: 'lily', emoji: '😏', name: 'Lily', section: 'modernfamily' },
  { id: 'dylan', emoji: '🎸', name: 'Dylan', section: 'modernfamily' },
  // Shakespeare
  { id: 'romeo', emoji: '🌹', name: 'Romeo', section: 'shakespeare', image: '/characters/romeo.png' },
  { id: 'juliet', emoji: '💕', name: 'Juliet', section: 'shakespeare', image: '/characters/juliet.png' },
  { id: 'hamlet', emoji: '💀', name: 'Hamlet', section: 'shakespeare', image: '/characters/hamlet.png' },
  { id: 'ladymacbeth', emoji: '🗡️', name: 'Lady Macbeth', section: 'shakespeare', image: '/characters/ladymacbeth.png' },
  { id: 'puck', emoji: '🧚', name: 'Puck', section: 'shakespeare', image: '/characters/puck.png' },
  { id: 'mercutio', emoji: '⚔️', name: 'Mercutio', section: 'shakespeare', image: '/characters/mercutio.png' },
  { id: 'ophelia', emoji: '🌸', name: 'Ophelia', section: 'shakespeare', image: '/characters/ophelia.png' },
  { id: 'macbeth', emoji: '👑', name: 'Macbeth', section: 'shakespeare', image: '/characters/macbeth.png' },
  { id: 'falstaff', emoji: '🍺', name: 'Falstaff', section: 'shakespeare', image: '/characters/falstaff.png' },
  { id: 'beatrice', emoji: '💬', name: 'Beatrice', section: 'shakespeare', image: '/characters/beatrice.png' },
  { id: 'benedick', emoji: '🎩', name: 'Benedick', section: 'shakespeare', image: '/characters/benedick.png' },
  { id: 'bottom', emoji: '🫏', name: 'Bottom', section: 'shakespeare', image: '/characters/bottom.png' },
  // Christmas
  { id: 'santa', emoji: '🎅', name: 'Santa', section: 'christmas', image: '/characters/santa.png' },
  { id: 'grinch', emoji: '💚', name: 'Grinch', section: 'christmas', image: '/characters/grinch.png' },
  { id: 'buddyelf', emoji: '🧝', name: 'Buddy', section: 'christmas', image: '/characters/buddyelf.png' },
  { id: 'scrooge', emoji: '💰', name: 'Scrooge', section: 'christmas', image: '/characters/scrooge.png' },
  { id: 'kevinmccallister', emoji: '🏠', name: 'Kevin', section: 'christmas', image: '/characters/kevinmccallister.png' },
  { id: 'rudolph', emoji: '🦌', name: 'Rudolph', section: 'christmas', image: '/characters/rudolph.png' },
  { id: 'jackskellington', emoji: '🎃', name: 'Jack', section: 'christmas', image: '/characters/jackskellington.png' },
  { id: 'clarkgriswold', emoji: '🎄', name: 'Clark', section: 'christmas', image: '/characters/clarkgriswold.png' },
  { id: 'frosty', emoji: '⛄', name: 'Frosty', section: 'christmas', image: '/characters/frosty.png' },
  { id: 'cindylou', emoji: '🎀', name: 'Cindy Lou', section: 'christmas', image: '/characters/cindylou.png' },
  { id: 'snowmiser', emoji: '❄️', name: 'Snow Miser', section: 'christmas', image: '/characters/snowmiser.png' },
  { id: 'ralphie', emoji: '🔫', name: 'Ralphie', section: 'christmas', image: '/characters/ralphie.png' },
  // Texting contexts
  { id: 'bestie', emoji: '👯', name: 'bestie', section: 'texting' },
  { id: 'groupchat', emoji: '👥', name: 'group chat', section: 'texting' },
  { id: 'sibling', emoji: '😈', name: 'sibling', section: 'texting' },
  { id: 'mom', emoji: '👩', name: 'mom', section: 'texting' },
  { id: 'dad', emoji: '👨', name: 'dad', section: 'texting' },
  { id: 'parents', emoji: '👨‍👩‍👧', name: 'both parents', section: 'texting' },
  { id: 'grandparent', emoji: '👵', name: 'grandparent', section: 'texting' },
  { id: 'teacher', emoji: '📚', name: 'teacher', section: 'texting' },
  { id: 'coach', emoji: '🏃', name: 'coach', section: 'texting' },
  { id: 'gamingbuddy', emoji: '🎮', name: 'gaming buddy', section: 'texting' },
  { id: 'onlinefriend', emoji: '🌐', name: 'online friend', section: 'texting' },
  { id: 'friendupset', emoji: '😬', name: 'I messed up', section: 'texting' },
  { id: 'upsetfriend', emoji: '🥺', name: 'mad at me', section: 'texting' },
  { id: 'friendmadatyou', emoji: '😤', name: "I'm mad", section: 'texting' },
  { id: 'acquaintance', emoji: '🤝', name: 'acquaintance', section: 'texting' },
  { id: 'someoneNew', emoji: '🆕', name: 'someone new', section: 'texting' },
  { id: 'leftonread', emoji: '👻', name: 'left on read', section: 'texting' },
  { id: 'roommate', emoji: '🏠', name: 'roommate', section: 'texting' },
  { id: 'kids', emoji: '👦', name: 'kids', section: 'texting' },
  { id: 'boss', emoji: '💼', name: 'boss', section: 'texting' },
  { id: 'stranger', emoji: '🤷', name: 'stranger', section: 'texting' },
  { id: 'newcrush', emoji: '💘', name: 'new crush', section: 'texting' },
  { id: 'situationship', emoji: '💕', name: 'situationship', section: 'texting' },
  { id: 'partner', emoji: '💓', name: 'partner', section: 'texting' },
  { id: 'ex', emoji: '💔', name: 'ex', section: 'texting' },
];

// ============================================================================
// UTILITIES
// ============================================================================

const haptic = (pattern: number | number[]) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

// Parse hashtags from input text
function parseHashtags(text: string): { message: string; tags: string[]; validIngredients: Ingredient[] } {
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex) || [];
  const tags = matches.map(m => m.slice(1).toLowerCase());

  const validIngredients = tags
    .map(tag => findBestMatch(tag))
    .filter((i): i is Ingredient => i !== null);

  const message = text.replace(hashtagRegex, '').trim();

  return { message, tags, validIngredients };
}

// Fuzzy match ingredient by id or name
function findBestMatch(tag: string): Ingredient | null {
  const normalizedTag = tag.toLowerCase();

  // Exact match on id
  const exactId = allIngredients.find(i => i.id === normalizedTag);
  if (exactId) return exactId;

  // Exact match on name
  const exactName = allIngredients.find(i => i.name.toLowerCase() === normalizedTag);
  if (exactName) return exactName;

  // Starts with match
  const startsWith = allIngredients.find(i =>
    i.id.startsWith(normalizedTag) || i.name.toLowerCase().startsWith(normalizedTag)
  );
  if (startsWith) return startsWith;

  return null;
}

// Get loading verbs for selected ingredients
function getLoadingVerbs(ingredients: Ingredient[]): string[] {
  const verbs: string[] = [];

  ingredients.forEach(ing => {
    const ingVerbs = ingredientVerbs[ing.id];
    if (ingVerbs) {
      verbs.push(...ingVerbs);
    }
  });

  // Default verbs if none found
  if (verbs.length === 0) {
    verbs.push('mixing', 'shaking', 'brewing', 'crafting', 'conjuring');
  }

  return verbs;
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Pixel Card Component
function PixelCard({
  item,
  selected,
  onClick,
  size = 'md'
}: {
  item: Ingredient;
  selected: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: { width: 50, height: 70, fontSize: 20, textSize: 8 },
    md: { width: 70, height: 98, fontSize: 28, textSize: 10 },
    lg: { width: 100, height: 140, fontSize: 40, textSize: 12 },
  };

  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      style={{
        width: s.width,
        height: s.height,
        flexShrink: 0,
        background: '#000',
        border: selected ? '3px solid #fff' : '2px solid #444',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        cursor: 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
        padding: 4,
        // Pixel art border effect
        boxShadow: selected
          ? '0 0 0 1px #000, inset 0 0 0 1px rgba(255,255,255,0.1)'
          : 'none',
      }}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: s.fontSize + 8,
            height: s.fontSize + 8,
            objectFit: 'cover',
            imageRendering: 'pixelated',
          }}
        />
      ) : (
        <span style={{ fontSize: s.fontSize, lineHeight: 1 }}>{item.emoji}</span>
      )}
      <span
        style={{
          fontSize: s.textSize,
          color: '#888',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: s.width - 8,
          fontFamily: "'Silkscreen', cursive",
        }}
      >
        {item.name}
      </span>
    </button>
  );
}

// Card Row Component
function CardRow({
  title,
  items,
  onCardClick,
  selectedIds,
}: {
  title: string;
  items: Ingredient[];
  onCardClick: (item: Ingredient) => void;
  selectedIds: string[];
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
        paddingLeft: 4,
      }}>
        <span style={{
          color: '#666',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontFamily: "'Silkscreen', cursive",
        }}>
          {title}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          {items.map(item => (
            <PixelCard
              key={item.id}
              item={item}
              selected={selectedIds.includes(item.id)}
              onClick={() => onCardClick(item)}
            />
          ))}
        </div>
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 4,
          width: 40,
          background: 'linear-gradient(to right, transparent, #000)',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MixerV2() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<{ tiny: string; short: string; medium: string; long: string; xl: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<'tiny' | 'short' | 'medium' | 'long' | 'xl'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingVerbIndex, setLoadingVerbIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Parse current input for hashtags
  const { message, validIngredients } = parseHashtags(inputText);
  const selectedIds = validIngredients.map(i => i.id);
  const loadingVerbs = getLoadingVerbs(validIngredients);

  // Filter ingredients by section
  const vibes = allIngredients.filter(i => i.section === 'vibes');
  const characters = allIngredients.filter(i => i.section === 'characters');
  const texting = allIngredients.filter(i => i.section === 'texting');
  const brooklyn99 = allIngredients.filter(i => i.section === 'brooklyn99');
  const modernfamily = allIngredients.filter(i => i.section === 'modernfamily');
  const shakespeare = allIngredients.filter(i => i.section === 'shakespeare');
  const christmas = allIngredients.filter(i => i.section === 'christmas');

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputText]);

  // Loading verb rotation
  useEffect(() => {
    if (!isLoading) {
      setLoadingVerbIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingVerbIndex(prev => (prev + 1) % loadingVerbs.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isLoading, loadingVerbs.length]);

  // Handle card click - add hashtag to input
  const handleCardClick = (item: Ingredient) => {
    haptic(10);

    // Check if already in input
    const hashtag = `#${item.id}`;
    if (inputText.includes(hashtag)) {
      // Remove it
      setInputText(inputText.replace(hashtag, '').replace(/\s+/g, ' ').trim());
    } else {
      // Add it (at end, on new line if there's already content)
      const hasMessage = message.trim().length > 0;
      const existingTags = inputText.match(/#\w+/g) || [];

      if (existingTags.length > 0) {
        // Add after existing tags
        setInputText(inputText + ' ' + hashtag);
      } else if (hasMessage) {
        // Add on new line after message
        setInputText(inputText + '\n' + hashtag);
      } else {
        setInputText(hashtag);
      }
    }
  };

  // Send/Shake action
  const doShake = async () => {
    if (!message.trim() || validIngredients.length === 0) return;

    haptic([50, 30, 50, 30, 50]);
    setCardsVisible(false);
    setIsLoading(true);
    setShowResult(true);
    setResults(null);

    // Build prompt
    const textingContext = validIngredients.find(i => i.section === 'texting');
    const styles = validIngredients.filter(i => i.section !== 'texting');
    const styleList = styles.map(i => voiceDescriptions[i.id]).join(' + ');

    const prompt = `Write 5 versions of a text message at different lengths.

What to say: "${message}"${textingContext ? `
Texting: ${voiceDescriptions[textingContext.id]}` : ''}${styles.length > 0 ? `
Style: ${styleList}` : ''}

Output valid JSON with exactly this format:
{"tiny":"5-8 words max","short":"10-15 words","medium":"20-30 words","long":"40-50 words","xl":"60-80 words"}

Rules for ALL versions:
- Lowercase is fine, abbreviations ok (u, rn, ngl, lol)
- No hashtags, no emojis unless natural
- Sound like real texts, not scripts
- Be creative and funny
- Each version should feel complete, not cut off`;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      try {
        let jsonText = data.text;
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonText = jsonMatch[0];
        }
        const parsed = JSON.parse(jsonText);
        if (parsed.tiny && parsed.short && parsed.medium && parsed.long) {
          // Add xl if not present
          if (!parsed.xl) {
            parsed.xl = parsed.long;
          }
          setResults(parsed);
        } else {
          setResults({ tiny: data.text, short: data.text, medium: data.text, long: data.text, xl: data.text });
        }
      } catch {
        setResults({ tiny: data.text, short: data.text, medium: data.text, long: data.text, xl: data.text });
      }
    } catch {
      setResults({
        tiny: "couldn't mix that one",
        short: "couldn't mix that one, try again?",
        medium: "couldn't mix that one, try again?",
        long: "couldn't mix that one, try again?",
        xl: "couldn't mix that one, try again?"
      });
    }

    setIsLoading(false);
  };

  const currentResult = results?.[selectedSize] || '';

  const copyResult = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(currentResult);
      haptic(50);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const closeResult = () => {
    setShowResult(false);
    setCardsVisible(true);
    setResults(null);
  };

  const isReady = message.trim() && validIngredients.length > 0;

  const sizes: Array<'tiny' | 'short' | 'medium' | 'long' | 'xl'> = ['tiny', 'short', 'medium', 'long', 'xl'];
  const sizeLabels = { tiny: 'XS', short: 'S', medium: 'M', long: 'L', xl: 'XL' };

  return (
    <div style={{
      height: '100dvh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Silkscreen', cursive",
      overflow: 'hidden',
    }}>
      {/* Card Rows - Scrollable Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 16,
          paddingBottom: 140,
          opacity: cardsVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: cardsVisible ? 'auto' : 'none',
        }}
        className="hide-scrollbar"
      >
        <CardRow title="vibes" items={vibes} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="texting" items={texting} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="characters" items={characters} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="christmas" items={christmas} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="brooklyn 99" items={brooklyn99} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="modern family" items={modernfamily} onCardClick={handleCardClick} selectedIds={selectedIds} />
        <CardRow title="shakespeare" items={shakespeare} onCardClick={handleCardClick} selectedIds={selectedIds} />
      </div>

      {/* Fixed Bottom Input */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#000',
        borderTop: '2px solid #333',
        padding: 16,
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
      }}>
        <div style={{
          display: 'flex',
          gap: 12,
          maxWidth: 400,
          margin: '0 auto',
          alignItems: 'flex-end',
        }}>
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="what do you need to say?&#10;#chill #wednesday"
            rows={1}
            disabled={isLoading}
            style={{
              flex: 1,
              background: isLoading ? '#0a0a0a' : '#111',
              border: isLoading ? '2px solid #222' : '2px solid #444',
              color: isLoading ? '#666' : '#fff',
              padding: 12,
              fontSize: 14,
              fontFamily: "'Silkscreen', cursive",
              resize: 'none',
              outline: 'none',
              minHeight: 44,
              maxHeight: 120,
              transition: 'all 0.2s',
            }}
          />
          <button
            onClick={doShake}
            disabled={!isReady || isLoading}
            style={{
              width: 48,
              height: 48,
              background: isReady ? '#fff' : '#333',
              border: '2px solid',
              borderColor: isReady ? '#fff' : '#444',
              color: isReady ? '#000' : '#666',
              fontSize: 20,
              cursor: isReady ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: '100%',
            maxWidth: 300,
          }}>
            {isLoading ? (
              // Loading State
              <div style={{
                width: '100%',
                aspectRatio: '2.5 / 3.5',
                maxHeight: '60vh',
                border: '3px solid #444',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                padding: 24,
              }}>
                {/* Selected cards floating */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {validIngredients.slice(0, 3).map((item, i) => (
                    <div
                      key={item.id}
                      style={{
                        animation: `float 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <PixelCard item={item} selected={false} onClick={() => {}} size="sm" />
                    </div>
                  ))}
                </div>

                {/* Loading verb */}
                <span style={{
                  color: '#888',
                  fontSize: 14,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}>
                  {loadingVerbs[loadingVerbIndex]}...
                </span>
              </div>
            ) : (
              // Result Card
              <>
                <div
                  onClick={copyResult}
                  style={{
                    width: '100%',
                    aspectRatio: '2.5 / 3.5',
                    maxHeight: '60vh',
                    border: '3px solid #fff',
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  {/* Size selector at top */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    padding: 12,
                    borderBottom: '2px solid #333',
                  }}>
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                        style={{
                          padding: '6px 10px',
                          border: selectedSize === size ? '2px solid #fff' : '2px solid #444',
                          background: selectedSize === size ? '#fff' : '#000',
                          color: selectedSize === size ? '#000' : '#666',
                          fontSize: 10,
                          fontFamily: "'Silkscreen', cursive",
                          cursor: 'pointer',
                        }}
                      >
                        {sizeLabels[size]}
                      </button>
                    ))}
                  </div>

                  {/* Result text */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    textAlign: 'center',
                  }}>
                    <p style={{
                      fontSize: selectedSize === 'xl' ? 12 : selectedSize === 'long' ? 13 : 14,
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      &quot;{currentResult}&quot;
                    </p>
                    <p style={{
                      color: copied ? '#4ade80' : '#666',
                      fontSize: 10,
                      marginTop: 12,
                    }}>
                      {copied ? '✓ copied!' : 'tap to copy'}
                    </p>
                  </div>

                  {/* Selected ingredients at bottom */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 8,
                    padding: 12,
                    borderTop: '2px solid #333',
                    flexWrap: 'wrap',
                  }}>
                    {validIngredients.slice(0, 3).map(item => (
                      <span key={item.id} style={{ fontSize: 10, color: '#666' }}>
                        {item.emoji} {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 32 }}>
                  <button
                    onClick={() => {/* TODO: share */}}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: "'Silkscreen', cursive",
                    }}
                  >
                    share
                  </button>
                  <button
                    onClick={() => {/* TODO: like */}}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      fontSize: 16,
                      cursor: 'pointer',
                    }}
                  >
                    ♡
                  </button>
                  <button
                    onClick={closeResult}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: "'Silkscreen', cursive",
                    }}
                  >
                    close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        textarea::placeholder {
          color: #444;
        }
      `}</style>
    </div>
  );
}
