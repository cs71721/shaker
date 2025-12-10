'use client';

import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

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

// Rotating placeholder prompts for input
const placeholderPrompts = [
  "tell them you're running late...",
  "cancel plans without being weird...",
  "apologize but like, not too much...",
  "ask to hang without sounding desperate...",
  "respond to 'we need to talk'...",
  "say happy birthday but make it funny...",
  "tell mom you'll be home late...",
  "react to their story...",
  "text back after leaving them on read...",
  "confess you forgot their name...",
  "ask for the homework...",
  "explain why you ghosted...",
  "say thanks but make it not boring...",
  "decline the invite nicely...",
  "ask if they're mad at you...",
  "start a convo with your crush...",
];

// Contextual verbs for loading animation
const ingredientVerbs: Record<string, string[]> = {
  // Vibes
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
  // Characters
  wednesday: ['brooding', 'plotting', 'deadpanning'],
  peeta: ['baking', 'bread-making', 'pining'],
  hermione: ['researching', 'studying', 'wand-waving'],
  yoda: ['meditating', 'levitating', 'backwards-speaking'],
  deadpool: ['fourth-wall-breaking', 'regenerating', 'quipping'],
  elsa: ['letting-it-go', 'freezing', 'thawing'],
  shrek: ['onion-layering', 'swamp-dwelling', 'ogre-ing'],
  taylor: ['eras-touring', 'songwriting', 're-recording'],
  gandalf: ['wizard-ing', 'shall-not-passing', 'pipe-smoking'],
  dracula: ['blood-thirsting', 'cape-swirling', 'bat-transforming'],
  jesus: ['blessing', 'forgiving', 'miracle-working'],
  batman: ['brooding', 'justice-ing', 'graveling'],
  carson: ['butlering', 'disapproving', 'silver-polishing'],
  dowager: ['judging', 'quipping', 'eyebrow-raising'],
  mary: ['ice-queening', 'devastating', 'composing'],
  spongebob: ['jellyfishing', 'flipping', 'ready-ing'],
  stitch: ['ohana-ing', 'destroying', 'adorable-ing'],
  moana: ['wayfinding', 'ocean-calling', 'restoring'],
  bruno: ['prophesying', 'hiding', 'we-dont-talking'],
  barbie: ['pink-ing', 'dreaming', 'encouraging'],
  ken: ['kenough-ing', 'beach-ing', 'himbo-ing'],
  gru: ['villain-ing', 'minion-dadding', 'soft-hearting'],
  katniss: ['volunteering', 'surviving', 'arrow-notching'],
  // Brooklyn 99
  jake: ['cool-cool-cooling', 'detecting', 'die-hard-quoting'],
  amy: ['binder-organizing', 'rule-following', 'nervous-rambling'],
  holt: ['deadpanning', 'formal-speaking', 'corgis-loving'],
  rosa: ['intimidating', 'mysterious-ing', 'knife-throwing'],
  charles: ['foodie-ing', 'nikolaj-correcting', 'jake-supporting'],
  gina: ['dance-reigning', 'self-crowning', 'peasant-judging'],
  terry: ['terry-ing', 'yogurt-loving', 'dad-protecting'],
  hitchcock: ['snacking', 'gross-ing', 'oversharing'],
  scully: ['wholesome-ing', 'kelly-mentioning', 'naive-ing'],
  kevin: ['academia-ing', 'sophisticated-ing', 'dry-witting'],
  dougjudy: ['crooning', 'escaping', 'rosa-serenading'],
  pimento: ['paranoid-ing', 'feral-ing', 'intensity-ing'],
  // Modern Family
  phil: ['dad-joking', 'cool-dadding', 'trampolining'],
  gloria: ['colombian-ing', 'yelling', 'fierce-loving'],
  claire: ['controlling', 'wine-momming', 'stressed-ing'],
  luke: ['clueless-ing', 'accidentally-wising', 'couch-ing'],
  mitch: ['overthinking', 'gasping', 'neurotic-ing'],
  cam: ['theatrical-ing', 'clowning', 'football-referencing'],
  jay: ['grumpy-oldmanning', 'tough-loving', 'closet-selling'],
  haley: ['influencing', 'selfie-ing', 'shopping'],
  alex: ['genius-ing', 'condescending', 'underappreciated-ing'],
  manny: ['romancing', 'poetry-ing', 'espresso-ing'],
  lily: ['savage-ing', 'deadpan-childing', 'eye-rolling'],
  dylan: ['himbo-ing', 'guitar-strumming', 'wholesome-ing'],
  // Shakespeare
  romeo: ['swooning', 'balcony-climbing', 'dramatic-loving'],
  juliet: ['star-crossing', 'defying', 'potion-drinking'],
  hamlet: ['soliloquizing', 'to-be-or-not-being', 'avenging'],
  ladymacbeth: ['scheming', 'spot-damning', 'ambition-ing'],
  puck: ['mischief-making', 'fool-mocking', 'forest-flying'],
  mercutio: ['punning', 'queen-mab-ing', 'plague-cursing'],
  ophelia: ['flower-gathering', 'tragic-ing', 'mad-singing'],
  macbeth: ['dagger-seeing', 'tyrant-ing', 'prophecy-fearing'],
  falstaff: ['feasting', 'tavern-ing', 'coward-ing'],
  beatrice: ['verbal-sparring', 'wit-sharpening', 'disdaining'],
  benedick: ['bachelor-ing', 'bantering', 'eavesdropping'],
  bottom: ['acting', 'ass-transforming', 'dream-weaving'],
  // Christmas
  santa: ['ho-ho-hoing', 'gift-wrapping', 'list-checking'],
  grinch: ['grumbling', 'scheming', 'heart-growing'],
  buddyelf: ['singing', 'syrup-pouring', 'santa-screaming'],
  scrooge: ['humbug-ing', 'ghost-touring', 'reforming'],
  kevinmccallister: ['trap-setting', 'aftershave-screaming', 'home-defending'],
  rudolph: ['nose-glowing', 'misfit-befriending', 'fog-guiding'],
  jackskellington: ['whats-this-ing', 'pumpkin-kinging', 'christmas-discovering'],
  clarkgriswold: ['light-stringing', 'rant-ing', 'griswold-ing'],
  frosty: ['happy-birthday-ing', 'magic-hatting', 'melt-worrying'],
  cindylou: ['questioning', 'innocenting', 'heart-having'],
  snowmiser: ['freezing', 'sibling-rivaling', 'fabulous-ing'],
  ralphie: ['bb-gun-wanting', 'decoder-ring-ing', 'leg-lamp-admiring'],
  // Texting contexts
  bestie: ['unfiltering', 'chaos-sharing', 'tea-spilling'],
  groupchat: ['performing', 'meme-dropping', 'laughing'],
  sibling: ['roasting', 'annoying', 'love-hating'],
  mom: ['reassuring', 'patient-explaining', 'emoji-teaching'],
  dad: ['thumbs-upping', 'dad-joking', 'proud-dadding'],
  parents: ['updating', 'wholesome-ing', 'loop-keeping'],
  grandparent: ['CAPS-LOCKING', 'love-sharing', 'slow-typing'],
  teacher: ['respecting', 'help-asking', 'deadline-extending'],
  coach: ['committing', 'respecting', 'brief-ing'],
  gamingbuddy: ['trash-talking', 'lobby-queueing', 'rage-quitting'],
  onlinefriend: ['meme-fluenting', 'parasocial-comforting', 'very-online-ing'],
  friendupset: ['apologizing', 'careful-wording', 'fix-attempting'],
  upsetfriend: ['eggshell-walking', 'defensive-caring', 'space-giving'],
  friendmadatyou: ['calm-staying', 'disappointed-addressing', 'boundary-setting'],
  acquaintance: ['polite-distancing', 'small-talking', 'professional-friendly-ing'],
  someoneNew: ['friendly-curious-ing', 'common-ground-finding', 'cool-playing'],
  leftonread: ['unbothered-acting', 'second-guessing', 'desperate-hiding'],
  roommate: ['logistic-ing', 'passive-aggressive-noting', 'casual-texting'],
  kids: ['encouraging', 'age-appropriate-ing', 'fun-parenting'],
  boss: ['professional-but-not-stiff-ing', 'competent-ing', 'clear-communicating'],
  stranger: ['polite-contextualizing', 'point-getting', 'brief-explaining'],
  newcrush: ['flirty-nervous-ing', 'cool-trying', 'overthinking'],
  situationship: ['casual-loaded-ing', 'reading-into-everything', 'cool-playing'],
  partner: ['comfortable-weird-ing', 'real-being', 'loving'],
  ex: ['guarded-subtexting', 'emotionally-complex-ing', 'cool-playing'],
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

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
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

  // Levenshtein distance match (for typos) - only for tags >= 3 chars
  if (normalizedTag.length >= 3) {
    const fuzzyMatch = allIngredients.find(i =>
      levenshtein(i.id, normalizedTag) <= 2 ||
      levenshtein(i.name.toLowerCase(), normalizedTag) <= 2
    );
    if (fuzzyMatch) return fuzzyMatch;
  }

  return null;
}

// Get autocomplete suggestions for partial hashtag
function getAutocompleteSuggestions(partial: string, limit = 5): Ingredient[] {
  if (!partial || partial.length === 0) return [];

  const normalizedPartial = partial.toLowerCase();

  // Score each ingredient
  const scored = allIngredients.map(item => {
    const id = item.id.toLowerCase();
    const name = item.name.toLowerCase();

    let score = 100; // Lower is better

    // Exact match
    if (id === normalizedPartial || name === normalizedPartial) {
      score = 0;
    }
    // Starts with
    else if (id.startsWith(normalizedPartial)) {
      score = 10;
    }
    else if (name.startsWith(normalizedPartial)) {
      score = 15;
    }
    // Contains
    else if (id.includes(normalizedPartial)) {
      score = 30;
    }
    else if (name.includes(normalizedPartial)) {
      score = 35;
    }
    // Levenshtein for typos
    else {
      const idDist = levenshtein(id, normalizedPartial);
      const nameDist = levenshtein(name, normalizedPartial);
      const minDist = Math.min(idDist, nameDist);
      if (minDist <= 2) {
        score = 50 + minDist * 10;
      }
    }

    return { item, score };
  });

  return scored
    .filter(s => s.score < 100)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(s => s.item);
}

// Get current hashtag being typed (if any)
function getCurrentHashtag(text: string, cursorPosition: number): { partial: string; start: number; end: number } | null {
  // Find the hashtag at cursor position
  const beforeCursor = text.slice(0, cursorPosition);
  const afterCursor = text.slice(cursorPosition);

  // Find last # before cursor
  const hashIndex = beforeCursor.lastIndexOf('#');
  if (hashIndex === -1) return null;

  // Get text between # and cursor
  const partialBeforeCursor = beforeCursor.slice(hashIndex + 1);

  // Check if we're still in the hashtag (no spaces between # and cursor)
  if (/\s/.test(partialBeforeCursor)) return null;

  // Get rest of hashtag after cursor (until space or end)
  const afterMatch = afterCursor.match(/^(\w*)/);
  const partialAfterCursor = afterMatch ? afterMatch[1] : '';

  return {
    partial: partialBeforeCursor + partialAfterCursor,
    start: hashIndex,
    end: cursorPosition + partialAfterCursor.length,
  };
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
    sm: { width: 66, height: 92, fontSize: 26, textSize: 11 },
    md: { width: 88, height: 123, fontSize: 36, textSize: 13 },
    lg: { width: 120, height: 168, fontSize: 48, textSize: 15 },
  };

  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      className="pixel-card"
      style={{
        width: s.width,
        height: s.height,
        flexShrink: 0,
        background: '#000',
        border: selected ? '3px solid #fff' : '2px solid #444',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        cursor: 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
        padding: 4,
        boxShadow: selected ? '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)' : 'none',
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
          fontFamily: "'VT323', monospace",
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
    <div className="card-row" style={{ marginBottom: 12, opacity: 0 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
        paddingLeft: 4,
      }}>
        <span style={{
          color: '#666',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontFamily: "'VT323', monospace",
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

// localStorage keys
const RECENT_STORAGE_KEY = 'shaker-recent-ingredients';
const FAVORITES_STORAGE_KEY = 'shaker-favorites';

interface FavoriteResult {
  id: string;
  text: string;
  ingredientIds: string[];
  timestamp: number;
}

export default function MixerV2() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<{ tiny: string; short: string; medium: string; long: string; xl: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<'tiny' | 'short' | 'medium' | 'long' | 'xl'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingVerbIndex, setLoadingVerbIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const [recentIngredientIds, setRecentIngredientIds] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [placeholder] = useState(() =>
    placeholderPrompts[Math.floor(Math.random() * placeholderPrompts.length)]
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  // Load recent ingredients from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentIngredientIds(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save recent ingredients to localStorage
  const trackIngredientUsage = (ingredients: Ingredient[]) => {
    const newIds = ingredients.map(i => i.id);
    setRecentIngredientIds(prev => {
      // Add new ingredients at the start, remove duplicates, keep last 8
      const updated = [...new Set([...newIds, ...prev])].slice(0, 8);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore localStorage errors
      }
      return updated;
    });
  };

  // Get recent ingredients as Ingredient objects
  const recentIngredients = recentIngredientIds
    .map(id => allIngredients.find(i => i.id === id))
    .filter((i): i is Ingredient => i !== undefined);

  // Toggle like for current result
  const toggleLike = () => {
    if (!results) return;

    haptic(50);

    const currentText = results[selectedSize];
    const ingredientIds = validIngredients.map(i => i.id);

    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const favorites: FavoriteResult[] = stored ? JSON.parse(stored) : [];

      if (isLiked) {
        // Remove from favorites (match by text)
        const updated = favorites.filter(f => f.text !== currentText);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
        setIsLiked(false);
      } else {
        // Add to favorites
        const newFavorite: FavoriteResult = {
          id: Date.now().toString(),
          text: currentText,
          ingredientIds,
          timestamp: Date.now(),
        };
        const updated = [newFavorite, ...favorites].slice(0, 50); // Keep last 50
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
        setIsLiked(true);
      }
    } catch {
      // Ignore localStorage errors
      setIsLiked(!isLiked);
    }
  };

  // Parse current input for hashtags
  const { message, validIngredients } = parseHashtags(inputText);
  const selectedIds = validIngredients.map(i => i.id);
  const loadingVerbs = getLoadingVerbs(validIngredients);

  // Autocomplete logic
  const currentHashtag = getCurrentHashtag(inputText, cursorPosition);
  const autocompleteSuggestions = currentHashtag
    ? getAutocompleteSuggestions(currentHashtag.partial)
    : [];
  const showAutocomplete = autocompleteSuggestions.length > 0;

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

  // Reset autocomplete index when suggestions change
  useEffect(() => {
    setAutocompleteIndex(0);
  }, [autocompleteSuggestions.length]);

  // Handle autocomplete selection
  const selectAutocomplete = (item: Ingredient) => {
    if (!currentHashtag) return;

    haptic(10);

    // Replace the partial hashtag with the full one
    const before = inputText.slice(0, currentHashtag.start);
    const after = inputText.slice(currentHashtag.end);
    const newText = before + '#' + item.id + ' ' + after;

    setInputText(newText.replace(/\s+/g, ' '));

    // Move cursor after the inserted hashtag
    const newCursorPos = currentHashtag.start + item.id.length + 2;
    setCursorPosition(newCursorPos);

    // Focus textarea and set cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // Handle keyboard for autocomplete
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showAutocomplete) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAutocompleteIndex(prev =>
        prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setAutocompleteIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && autocompleteSuggestions[autocompleteIndex]) {
      e.preventDefault();
      selectAutocomplete(autocompleteSuggestions[autocompleteIndex]);
    } else if (e.key === 'Escape') {
      // Clear autocomplete by moving cursor
      setCursorPosition(0);
    } else if (e.key === 'Tab' && autocompleteSuggestions[0]) {
      e.preventDefault();
      selectAutocomplete(autocompleteSuggestions[0]);
    }
  };

  // Handle input change with cursor tracking
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Handle cursor movement
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setCursorPosition(target.selectionStart || 0);
  };

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
    trackIngredientUsage(validIngredients);
    setCardsVisible(false);
    setIsLoading(true);
    setShowResult(true);
    setResults(null);
    setIsLiked(false);

    // Build prompt
    const textingContext = validIngredients.find(i => i.section === 'texting');
    const styles = validIngredients.filter(i => i.section !== 'texting');
    const styleList = styles.map(i => voiceDescriptions[i.id]).join(' + ');

    const prompt = `You're a genius at writing text messages that are funny, unexpected, and sound like real teens texting. Write 5 versions of a text at different lengths.

What to say: "${message}"${textingContext ? `
Texting: ${voiceDescriptions[textingContext.id]}` : ''}${styles.length > 0 ? `
Style: ${styleList}` : ''}

EXAMPLES OF GREAT OUTPUTS:

Example 1 - "apologize for being late" with #chill #bestie:
{"tiny":"my bad lol omw","short":"ok so i'm late but like in my defense time is fake","medium":"ngl i lost track of time but i'm literally leaving rn, save me a seat and pretend i've been there the whole time","long":"ok so hear me out. i was ABOUT to leave on time but then i got distracted and now i'm running like 15 min late. this is so on brand for me honestly. start without me i'll slide in like nothing happened","xl":"bestie i need you to act normal when i walk in late because i'm going to pretend i've been there the whole time. i genuinely don't know what happened to the last hour but i'm leaving NOW. also if anyone asks i was stuck in traffic even though i live 5 mins away. cover for me and i'll buy you food later"}

Example 2 - "say happy birthday" with #spicy #dramatic:
{"tiny":"SCREAM it's ur day","short":"happy birthday to the only person who matters (me at ur party)","medium":"HAPPY BIRTHDAY honestly can't believe you're aging while i stay exactly the same. anyway this is your day so i guess i'll let you have the spotlight for once","long":"HAPPY BIRTHDAY to someone who is FINALLY catching up to my level of wisdom and maturity. jk you'll never reach this but i admire the effort. seriously though have the best day, you deserve all the chaos and cake","xl":"okay so today is YOUR day which is honestly so weird because usually every day is about me but fine i'll let you have this one. HAPPY BIRTHDAY you absolute icon. i hope you get everything you want and more, and if you don't, i'll simply cause a scene until you do. that's my gift to you. love you forever even when you're old and crusty"}

VOCAB YOU CAN USE: ngl, lowkey, highkey, fr fr, no cap, slay, its giving, understood the assignment, main character, ate that, rent free, living in my head, its the ___ for me, not me doing ___, im deceased, help, screaming, crying, throwing up, real, valid, based, unhinged, feral, bestie, girlie, bestie, bruh, pls, rn, omw, wyd, idk, tbh, imo, lowkey obsessed, the way i ___, me when ___, not you ___, literally same, felt that, big mood, vibe check, the audacity, how dare, ur honor

RULES:
- Sound like actual texts teens send, not AI writing
- Be creative and surprising - avoid obvious/boring responses
- Humor > formal correctness
- Lowercase is natural, abbreviations encouraged
- Each version should feel complete and different, not just longer
- Capture the ENERGY of the style, not just the words
- Make it something they'd actually screenshot and share

Output valid JSON only:
{"tiny":"5-8 words","short":"10-15 words","medium":"20-30 words","long":"40-50 words","xl":"60-80 words"}`;

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

  const shareAsImage = async () => {
    if (!resultCardRef.current) return;

    haptic(50);

    try {
      // Capture the result card as canvas
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#000',
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });

      if (!blob) return;

      // Create file for sharing
      const file = new File([blob], 'shaker-message.png', { type: 'image/png' });

      // Check if Web Share API is available with files
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Shaker Message',
          text: currentResult,
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'shaker-message.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
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
      fontFamily: "'VT323', monospace",
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
        {recentIngredients.length > 0 && (
          <CardRow title="recent" items={recentIngredients} onCardClick={handleCardClick} selectedIds={selectedIds} />
        )}
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
          position: 'relative',
        }}>
          {/* Autocomplete Dropdown */}
          {showAutocomplete && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 60,
              marginBottom: 8,
              background: '#111',
              border: '2px solid #444',
              borderRadius: 12,
              overflow: 'hidden',
              zIndex: 50,
            }}>
              {autocompleteSuggestions.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => selectAutocomplete(item)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    background: index === autocompleteIndex ? '#2a2a2a' : 'transparent',
                    border: 'none',
                    borderBottom: index < autocompleteSuggestions.length - 1 ? '1px solid #333' : 'none',
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: "'VT323', monospace",
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={() => setAutocompleteIndex(index)}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 24, height: 24, borderRadius: 4, objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  )}
                  <span style={{ flex: 1 }}>#{item.id}</span>
                  <span style={{ color: '#666', fontSize: 12 }}>{item.name}</span>
                </button>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}
            onClick={handleSelect}
            placeholder={placeholder}
            rows={2}
            disabled={isLoading}
            style={{
              flex: 1,
              background: isLoading ? '#0a0a0a' : '#111',
              border: isLoading ? '2px solid #222' : '2px solid #444',
              borderRadius: 12,
              color: isLoading ? '#666' : '#fff',
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              fontSize: 16,
              fontFamily: "'VT323', monospace",
              resize: 'none',
              outline: 'none',
              minHeight: 64,
              maxHeight: 120,
              transition: 'all 0.2s',
              lineHeight: 1.4,
            }}
          />
          <button
            onClick={doShake}
            disabled={!isReady || isLoading}
            className={isReady && !isLoading ? 'send-button-pulse' : ''}
            style={{
              width: 48,
              height: 48,
              background: isReady ? '#fff' : '#333',
              border: '2px solid',
              borderColor: isReady ? '#fff' : '#444',
              borderRadius: 12,
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
                borderRadius: 16,
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
                  ref={resultCardRef}
                  onClick={copyResult}
                  className="result-card-animate"
                  style={{
                    width: '100%',
                    aspectRatio: '2.5 / 3.5',
                    maxHeight: '60vh',
                    border: '3px solid #fff',
                    borderRadius: 16,
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {/* Size selector at top */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    padding: 12,
                    borderBottom: '2px solid #333',
                    flexShrink: 0,
                  }}>
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                        style={{
                          padding: '6px 10px',
                          border: selectedSize === size ? '2px solid #fff' : '2px solid #444',
                          borderRadius: 8,
                          background: selectedSize === size ? '#fff' : '#000',
                          color: selectedSize === size ? '#000' : '#666',
                          fontSize: 14,
                          fontFamily: "'VT323', monospace",
                          cursor: 'pointer',
                        }}
                      >
                        {sizeLabels[size]}
                      </button>
                    ))}
                  </div>

                  {/* Result text - scrollable for long content */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: (selectedSize === 'xl' || selectedSize === 'long') ? 'flex-start' : 'center',
                    alignItems: 'center',
                    padding: 20,
                    paddingTop: (selectedSize === 'xl' || selectedSize === 'long') ? 24 : 20,
                    textAlign: 'center',
                    overflowY: 'auto',
                    minHeight: 0,
                  }}>
                    <p style={{
                      fontSize: 16,
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      &quot;{currentResult}&quot;
                    </p>
                    <p style={{
                      color: copied ? '#4ade80' : '#666',
                      fontSize: 12,
                      marginTop: 16,
                      flexShrink: 0,
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
                    flexShrink: 0,
                  }}>
                    {validIngredients.slice(0, 3).map(item => (
                      <span key={item.id} style={{ fontSize: 12, color: '#666' }}>
                        {item.emoji} {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons - pixel-art style */}
                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    onClick={shareAsImage}
                    className="pixel-card"
                    style={{
                      background: '#111',
                      border: '2px solid #444',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 20,
                      padding: '8px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    ↗
                  </button>
                  <button
                    onClick={doShake}
                    className="pixel-card"
                    style={{
                      background: '#111',
                      border: '2px solid #444',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 20,
                      padding: '8px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    ↻
                  </button>
                  <button
                    onClick={toggleLike}
                    className={`pixel-card ${isLiked ? 'heart-liked' : ''}`}
                    style={{
                      background: '#111',
                      border: isLiked ? '2px solid #ff6b6b' : '2px solid #444',
                      borderRadius: 8,
                      color: isLiked ? '#ff6b6b' : '#888',
                      fontSize: 20,
                      padding: '8px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isLiked ? '♥' : '♡'}
                  </button>
                  <button
                    onClick={closeResult}
                    className="pixel-card"
                    style={{
                      background: '#111',
                      border: '2px solid #444',
                      borderRadius: 8,
                      color: '#666',
                      fontSize: 20,
                      padding: '8px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines" aria-hidden="true" />

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes popIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        .pixel-card:active {
          transform: scale(0.95) !important;
        }

        .result-card-animate {
          animation: popIn 0.3s ease-out forwards;
        }

        .send-button-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes heartPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .heart-liked {
          animation: heartPop 0.3s ease-out;
        }

        .crt-scanlines {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1000;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03) 0px,
            rgba(0, 0, 0, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
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

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-row {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }

        .card-row:nth-child(1) { animation-delay: 0s; }
        .card-row:nth-child(2) { animation-delay: 0.05s; }
        .card-row:nth-child(3) { animation-delay: 0.1s; }
        .card-row:nth-child(4) { animation-delay: 0.15s; }
        .card-row:nth-child(5) { animation-delay: 0.2s; }
        .card-row:nth-child(6) { animation-delay: 0.25s; }
        .card-row:nth-child(7) { animation-delay: 0.3s; }
        .card-row:nth-child(8) { animation-delay: 0.35s; }
        .card-row:nth-child(9) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
