'use client';

import { useState } from 'react';

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
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const vibes = allIngredients.filter(i => i.section === 'vibes');
  const characters = allIngredients.filter(i => i.section === 'characters');
  const texting = allIngredients.filter(i => i.section === 'texting');

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
    setResult('');

    const voiceList = selected.map(i => `- ${i.name}: ${voiceDescriptions[i.id]}`).join('\n');

    const prompt = `Transform this into a short text message (under 25 words).

What I need to say: "${situation}"

Style(s) to use:
${voiceList}

${selected.length > 1 ? 'Blend these styles creatively into ONE message.' : ''}

Output ONLY the message text. No quotes. Be creative, funny, and authentic - something a teen would actually send.`;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      setResult(data.text || data.error || "couldn't mix that one, shake again?");
    } catch {
      setResult("couldn't mix that one, shake again?");
    }

    setIsLoading(false);
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowResult(false);
      }, 800);
    } catch {}
  };

  const shareResult = async () => {
    if (!result) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: result });
        setShowResult(false);
      } catch {}
    } else {
      copyResult();
    }
  };

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

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
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

            <div
              onClick={!isLoading ? copyResult : undefined}
              style={{ background: '#1a1a1a', borderRadius: 20, padding: 24, width: '100%', textAlign: 'center', cursor: isLoading ? 'default' : 'pointer' }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {selected.map((item) => (
                      <span key={item.id} style={{ fontSize: 28, animation: 'bounce 0.6s infinite alternate' }}>{item.emoji}</span>
                    ))}
                  </div>
                  <span style={{ color: '#666', fontSize: 14 }}>mixing...</span>
                  <style>{`@keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-8px); } }`}</style>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 18, lineHeight: 1.5, margin: 0 }}>&quot;{result}&quot;</p>
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
