'use client';

import { useState, useEffect } from 'react';

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
  // Brooklyn 99
  jake: "Jake Peralta - immature detective, pop culture references, enthusiastic, 'cool cool cool cool'",
  amy: "Amy Santiago - type-A perfectionist, loves binders and rules, competitive, nervous rambling",
  holt: "Captain Holt - deadpan serious, formal speech, unexpectedly dramatic, dry humor",
  rosa: "Rosa Diaz - tough, blunt, scary, secretly soft, minimal words maximum impact",
  charles: "Charles Boyle - food obsessed, overly supportive, loyal to a fault, dramatic about friendship",
  gina: "Gina Linetti - self-absorbed, confident queen, dance references, thinks she's better than everyone",
  // Modern Family
  phil: "Phil Dunphy - dad jokes, thinks he's cool, 'cool dad' energy, puns, overly enthusiastic",
  gloria: "Gloria Pritchett - dramatic, passionate, fierce mama, Colombian flair, loud and loving",
  claire: "Claire Dunphy - stressed mom, competitive, control freak, wine energy",
  luke: "Luke Dunphy - lovably clueless, simple observations, accidentally profound",
  mitch: "Mitchell Pritchett - anxious, overthinking, dramatic gasps, neurotic but loving",
  cam: "Cam Tucker - theatrical, emotional, football references, dramatic entrances, sensitive",
  // Shakespeare
  romeo: "Romeo - dramatic romantic, poetic declarations of love, impulsive, 'but soft!' energy",
  juliet: "Juliet - passionate, youthful intensity, romantic defiance, balcony speech vibes",
  hamlet: "Hamlet - existential angst, overthinking everything, 'to be or not to be', brooding indecision",
  ladymacbeth: "Lady Macbeth - ambitious, persuasive, dark determination, 'out damn spot' guilt",
  puck: "Puck - mischievous trickster, playful chaos, 'what fools these mortals be'",
  mercutio: "Mercutio - witty, sarcastic, dramatic flair, 'a plague on both your houses'",
  // texting contexts
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

interface Ingredient {
  id: string;
  emoji: string;
  name: string;
  section: string;
}

const allIngredients: Ingredient[] = [
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
  { id: 'wednesday', emoji: '🗡️', name: 'Wednesday', section: 'characters' },
  { id: 'peeta', emoji: '🍞', name: 'Peeta', section: 'characters' },
  { id: 'hermione', emoji: '📚', name: 'Hermione', section: 'characters' },
  { id: 'yoda', emoji: '💚', name: 'Yoda', section: 'characters' },
  { id: 'deadpool', emoji: '💀', name: 'Deadpool', section: 'characters' },
  { id: 'elsa', emoji: '❄️', name: 'Elsa', section: 'characters' },
  { id: 'shrek', emoji: '👹', name: 'Shrek', section: 'characters' },
  { id: 'taylor', emoji: '💜', name: 'Taylor', section: 'characters' },
  { id: 'gandalf', emoji: '🧙', name: 'Gandalf', section: 'characters' },
  { id: 'dracula', emoji: '🧛', name: 'Dracula', section: 'characters' },
  { id: 'jesus', emoji: '✝️', name: 'Jesus', section: 'characters' },
  { id: 'batman', emoji: '🦇', name: 'Batman', section: 'characters' },
  { id: 'carson', emoji: '🎩', name: 'Carson', section: 'characters' },
  { id: 'dowager', emoji: '👑', name: 'Dowager', section: 'characters' },
  { id: 'mary', emoji: '🥀', name: 'Lady Mary', section: 'characters' },
  { id: 'spongebob', emoji: '🧽', name: 'SpongeBob', section: 'characters' },
  { id: 'stitch', emoji: '👽', name: 'Stitch', section: 'characters' },
  { id: 'moana', emoji: '🌺', name: 'Moana', section: 'characters' },
  { id: 'bruno', emoji: '🔮', name: 'Bruno', section: 'characters' },
  { id: 'barbie', emoji: '💖', name: 'Barbie', section: 'characters' },
  { id: 'ken', emoji: '🩷', name: 'Ken', section: 'characters' },
  { id: 'gru', emoji: '🦹', name: 'Gru', section: 'characters' },
  { id: 'katniss', emoji: '🏹', name: 'Katniss', section: 'characters' },
  // Brooklyn 99
  { id: 'jake', emoji: '🚔', name: 'Jake', section: 'brooklyn99' },
  { id: 'amy', emoji: '📋', name: 'Amy', section: 'brooklyn99' },
  { id: 'holt', emoji: '🎖️', name: 'Holt', section: 'brooklyn99' },
  { id: 'rosa', emoji: '🖤', name: 'Rosa', section: 'brooklyn99' },
  { id: 'charles', emoji: '🍝', name: 'Charles', section: 'brooklyn99' },
  { id: 'gina', emoji: '💃', name: 'Gina', section: 'brooklyn99' },
  // Modern Family
  { id: 'phil', emoji: '👔', name: 'Phil', section: 'modernfamily' },
  { id: 'gloria', emoji: '💋', name: 'Gloria', section: 'modernfamily' },
  { id: 'claire', emoji: '🍷', name: 'Claire', section: 'modernfamily' },
  { id: 'luke', emoji: '🎮', name: 'Luke', section: 'modernfamily' },
  { id: 'mitch', emoji: '😰', name: 'Mitch', section: 'modernfamily' },
  { id: 'cam', emoji: '🏈', name: 'Cam', section: 'modernfamily' },
  // Shakespeare
  { id: 'romeo', emoji: '🌹', name: 'Romeo', section: 'shakespeare' },
  { id: 'juliet', emoji: '💕', name: 'Juliet', section: 'shakespeare' },
  { id: 'hamlet', emoji: '💀', name: 'Hamlet', section: 'shakespeare' },
  { id: 'ladymacbeth', emoji: '🗡️', name: 'Lady Macbeth', section: 'shakespeare' },
  { id: 'puck', emoji: '🧚', name: 'Puck', section: 'shakespeare' },
  { id: 'mercutio', emoji: '⚔️', name: 'Mercutio', section: 'shakespeare' },
  // texting - kid-friendly first, romantic at the end
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
  { id: 'friendmadatyou', emoji: '😤', name: 'I\'m mad', section: 'texting' },
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

export default function Mixer() {
  const [situation, setSituation] = useState('');
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [results, setResults] = useState<{ tiny: string; short: string; medium: string; long: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<'tiny' | 'short' | 'medium' | 'long'>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Generate contextual loading messages based on selected ingredients
  const getLoadingMessages = () => {
    const messages: string[] = [];
    const characters = selected.filter(s => s.section === 'characters');
    const vibesSelected = selected.filter(s => s.section === 'vibes');
    const textingSelected = selected.filter(s => s.section === 'texting');

    // Add character-specific messages
    characters.forEach(c => {
      messages.push(`channeling ${c.name}...`);
    });

    // Add vibe-specific messages
    vibesSelected.forEach(v => {
      messages.push(`adding ${v.name} energy...`);
    });

    // Add texting context messages
    textingSelected.forEach(t => {
      messages.push(`preparing for ${t.name}...`);
    });

    // Add generic fun messages
    messages.push('shaking things up...');
    messages.push('brewing the perfect text...');
    messages.push('consulting the vibes...');
    messages.push('mixing ingredients...');

    return messages;
  };

  // Rotate through loading messages
  useEffect(() => {
    if (!isLoading) {
      setLoadingMsgIndex(0);
      return;
    }

    const messages = getLoadingMessages();
    const interval = setInterval(() => {
      setLoadingMsgIndex(prev => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading, selected]);

  const vibes = allIngredients.filter(i => i.section === 'vibes');
  const characters = allIngredients.filter(i => i.section === 'characters');
  const texting = allIngredients.filter(i => i.section === 'texting');
  const brooklyn99 = allIngredients.filter(i => i.section === 'brooklyn99');
  const modernfamily = allIngredients.filter(i => i.section === 'modernfamily');
  const shakespeare = allIngredients.filter(i => i.section === 'shakespeare');

  const toggleIngredient = (item: Ingredient) => {
    const exists = selected.find(s => s.id === item.id);
    if (exists) {
      setSelected(selected.filter(s => s.id !== item.id));
    } else if (selected.length < 3) {
      setSelected([...selected, item]);
    }
  };

  const doShake = async () => {
    if (!situation.trim() || selected.length === 0) return;

    // Trigger shake animation
    setIsShaking(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsShaking(false);

    setIsLoading(true);
    setShowResult(true);
    setResults(null);

    // Separate texting context (who) from styles (how)
    const textingContext = selected.find(i => i.section === 'texting');
    const styles = selected.filter(i => i.section !== 'texting');
    const styleList = styles.map(i => voiceDescriptions[i.id]).join(' + ');

    const prompt = `Write 4 versions of a text message at different lengths.

What to say: "${situation}"${textingContext ? `
Texting: ${voiceDescriptions[textingContext.id]}` : ''}${styles.length > 0 ? `
Style: ${styleList}` : ''}

Output valid JSON with exactly this format:
{"tiny":"5-8 words max","short":"10-15 words","medium":"20-30 words","long":"40-50 words"}

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

      // Parse JSON response - extract JSON from response if wrapped in extra text
      try {
        let jsonText = data.text;
        // Find JSON object in the response (in case Claude adds extra text)
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonText = jsonMatch[0];
        }
        const parsed = JSON.parse(jsonText);
        if (parsed.tiny && parsed.short && parsed.medium && parsed.long) {
          setResults(parsed);
        } else {
          // JSON parsed but missing fields - use original text
          setResults({ tiny: data.text, short: data.text, medium: data.text, long: data.text });
        }
      } catch {
        // Fallback: use the text as-is for all sizes
        console.log('JSON parse failed, raw text:', data.text);
        setResults({ tiny: data.text, short: data.text, medium: data.text, long: data.text });
      }
    } catch {
      setResults({ tiny: "couldn't mix that one", short: "couldn't mix that one, shake again?", medium: "couldn't mix that one, shake again?", long: "couldn't mix that one, shake again?" });
    }

    setIsLoading(false);
  };

  const currentResult = results?.[selectedSize] || '';

  const copyResult = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(currentResult);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowResult(false);
      }, 800);
    } catch {}
  };

  const shareResult = async () => {
    if (!currentResult) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: currentResult });
        setShowResult(false);
      } catch {}
    } else {
      copyResult();
    }
  };

  const sizes: Array<'tiny' | 'short' | 'medium' | 'long'> = ['tiny', 'short', 'medium', 'long'];
  const sizeLabels = { tiny: 'XS', short: 'S', medium: 'M', long: 'L' };
  const sizeHeights = { tiny: 80, short: 120, medium: 180, long: 280 };

  const isReady = situation.trim() && selected.length > 0;

  return (
    <div style={{ height: '100dvh', background: '#000', color: '#fff', padding: 16, paddingBottom: 'calc(16px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>

      <textarea
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        placeholder="what do you need to say?"
        rows={2}
        style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 16, padding: 14, color: '#fff', fontSize: 16, resize: 'none', outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16, minHeight: 36, flexWrap: 'wrap' }}>
        {selected.length === 0 ? (
          <span style={{ color: '#666', fontSize: 14 }}>tap ingredients to mix</span>
        ) : (
          selected.map(item => (
            <span key={item.id} style={{ background: '#2a2a2a', borderRadius: 20, padding: '6px 12px', fontSize: 14 }}>
              {item.emoji} {item.name}
            </span>
          ))
        )}
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>vibes</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {vibes.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888' }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>texting</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {texting.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>characters</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {characters.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Brooklyn 99</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {brooklyn99.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Modern Family</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {modernfamily.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Shakespeare</span>
            <span style={{ color: '#444', fontSize: 10 }}>scroll →</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
              {shakespeare.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  style={{
                    width: 88, height: 88, flexShrink: 0, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', border: selected.find(s => s.id === item.id) ? '2px solid #fff' : '2px solid transparent', background: selected.find(s => s.id === item.id) ? '#2a2a2a' : '#1a1a1a', transition: 'all 0.15s'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{item.name}</span>
                </button>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 4, width: 40, background: 'linear-gradient(to right, transparent, #000)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      <button
        onClick={doShake}
        disabled={!isReady || isShaking}
        style={{
          margin: '0 auto', padding: '14px 44px', borderRadius: 30, fontSize: 16, fontWeight: 600, letterSpacing: 1, cursor: isReady ? 'pointer' : 'not-allowed', background: isReady ? '#fff' : '#333', color: isReady ? '#000' : '#666', border: 'none', transition: 'all 0.15s', animation: isShaking ? 'shake 0.5s ease-in-out' : 'none'
        }}
      >
        SHAKE
      </button>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-8px) rotate(-5deg); }
          20% { transform: translateX(8px) rotate(5deg); }
          30% { transform: translateX(-8px) rotate(-5deg); }
          40% { transform: translateX(8px) rotate(5deg); }
          50% { transform: translateX(-6px) rotate(-3deg); }
          60% { transform: translateX(6px) rotate(3deg); }
          70% { transform: translateX(-4px) rotate(-2deg); }
          80% { transform: translateX(4px) rotate(2deg); }
          90% { transform: translateX(-2px) rotate(-1deg); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {showResult && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', maxWidth: 320 }}>

            <div style={{ display: 'flex', gap: 6, fontSize: 24 }}>
              {selected.map((item, i) => (
                <span key={item.id}>{item.emoji}{i < selected.length - 1 ? ' +' : ''}</span>
              ))}
            </div>

            {!isLoading && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: selectedSize === size ? '2px solid #fff' : '2px solid #333',
                      background: selectedSize === size ? '#fff' : '#1a1a1a',
                      color: selectedSize === size ? '#000' : '#666',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {sizeLabels[size]}
                  </button>
                ))}
              </div>
            )}

            <div
              onClick={!isLoading ? copyResult : undefined}
              style={{
                background: '#1a1a1a',
                borderRadius: 20,
                padding: 24,
                width: '100%',
                minHeight: sizeHeights[selectedSize],
                textAlign: 'center',
                cursor: isLoading ? 'default' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'min-height 0.3s ease'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <span style={{
                    fontSize: 48,
                    display: 'inline-block',
                    animation: 'gentleRock 1.2s ease-in-out infinite',
                    transformOrigin: 'bottom center'
                  }}>🍸</span>
                  <span style={{
                    color: '#888',
                    fontSize: 14,
                    fontStyle: 'italic',
                    minHeight: 20,
                    transition: 'opacity 0.3s ease'
                  }} key={loadingMsgIndex}>
                    {getLoadingMessages()[loadingMsgIndex % getLoadingMessages().length]}
                  </span>
                  <style>{`
                    @keyframes gentleRock {
                      0%, 100% { transform: rotate(-8deg); }
                      50% { transform: rotate(8deg); }
                    }
                  `}</style>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: selectedSize === 'long' ? 16 : 18, lineHeight: 1.5, margin: 0 }}>&quot;{currentResult}&quot;</p>
                  <p style={{ color: '#666', fontSize: 12, marginTop: 12 }}>tap to copy</p>
                </div>
              )}
            </div>

            {!isLoading && (
              <div style={{ display: 'flex', gap: 24 }}>
                <button onClick={shareResult} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>share</button>
                <button onClick={doShake} style={{ background: 'none', border: 'none', color: '#666', fontSize: 14, cursor: 'pointer' }}>shake again</button>
                <button onClick={() => setShowResult(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: 14, cursor: 'pointer' }}>close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {copied && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', color: '#000', padding: '16px 32px', borderRadius: 16, fontSize: 18, fontWeight: 600, zIndex: 200 }}>
          ✓ copied
        </div>
      )}
    </div>
  );
}
