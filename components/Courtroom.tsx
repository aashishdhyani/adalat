import CharacterCard from "./CharacterCard";

/* ─── PIXEL SPRITES ─────────────────────────────────────────────────────────── */

const JudgeSVG = () => (
  <svg width="60" height="76" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Wig */}
    <rect x="12" y="4"  width="40" height="20" rx="4" fill="#F0EAD8"/>
    <rect x="8"  y="10" width="8"  height="18" rx="3" fill="#F0EAD8"/>
    <rect x="48" y="10" width="8"  height="18" rx="3" fill="#F0EAD8"/>
    <rect x="14" y="18" width="36" height="7"  rx="2" fill="#DDD4BC"/>
    {/* Face */}
    <rect x="16" y="22" width="32" height="26" rx="6" fill="#E8A870"/>
    {/* Eyes */}
    <rect x="22" y="30" width="6" height="5" rx="2" fill="#3a2010"/>
    <rect x="36" y="30" width="6" height="5" rx="2" fill="#3a2010"/>
    {/* Brows — stern */}
    <rect x="21" y="27" width="8" height="2" rx="1" fill="#6a4828"/>
    <rect x="35" y="27" width="8" height="2" rx="1" fill="#6a4828"/>
    {/* Mustache */}
    <rect x="24" y="38" width="16" height="4" rx="2" fill="#6a4828"/>
    {/* Robe */}
    <rect x="8"  y="48" width="48" height="30" rx="4" fill="#2c2c2c"/>
    {/* White collar bands */}
    <rect x="24" y="48" width="7"  height="10" rx="1" fill="#F0EAD8"/>
    <rect x="33" y="48" width="7"  height="10" rx="1" fill="#F0EAD8"/>
    {/* Gavel */}
    <rect x="44" y="54" width="14" height="5" rx="2" fill="#E8A870"/>
    <rect x="54" y="48" width="5"  height="14" rx="2" fill="#8B5A2B"/>
    <rect x="50" y="44" width="12" height="5" rx="2" fill="#A06830"/>
  </svg>
);

const DefenderSVG = () => (
  <svg width="60" height="76" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair */}
    <rect x="14" y="4"  width="36" height="13" rx="6" fill="#2a1a0a"/>
    {/* Face */}
    <rect x="16" y="14" width="32" height="26" rx="6" fill="#CC8855"/>
    {/* Eyes */}
    <rect x="22" y="22" width="6" height="5" rx="2" fill="#2a1a0a"/>
    <rect x="36" y="22" width="6" height="5" rx="2" fill="#2a1a0a"/>
    {/* Smile */}
    <rect x="24" y="34" width="16" height="3" rx="2" fill="#A86840"/>
    {/* Green suit */}
    <rect x="8"  y="44" width="48" height="34" rx="4" fill="#2d5a34"/>
    {/* Suit lapels */}
    <rect x="22" y="44" width="8"  height="14" rx="2" fill="#F0EAD8"/>
    <rect x="34" y="44" width="8"  height="14" rx="2" fill="#F0EAD8"/>
    {/* Shield emblem */}
    <rect x="26" y="58" width="12" height="14" rx="3" fill="#4a8a58"/>
    <rect x="29" y="61" width="6"  height="8"  rx="1" fill="#2d5a34"/>
    <rect x="26" y="64" width="12" height="3"  rx="1" fill="#2d5a34"/>
    {/* Briefcase */}
    <rect x="4"  y="58" width="14" height="10" rx="2" fill="#8B5A2B"/>
    <rect x="7"  y="55" width="8"  height="5"  rx="2" fill="#8B5A2B"/>
    <rect x="6"  y="62" width="12" height="1"  fill="#d4a020"/>
  </svg>
);

const AttackerSVG = () => (
  <svg width="60" height="76" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hat brim */}
    <rect x="8"  y="8"  width="48" height="6"  rx="2" fill="#6a3820"/>
    {/* Hat body */}
    <rect x="14" y="4"  width="36" height="13" rx="4" fill="#8a4828"/>
    {/* Face — slightly darker, shifty */}
    <rect x="16" y="18" width="32" height="26" rx="6" fill="#C4956A"/>
    {/* Narrowed eyes */}
    <rect x="22" y="26" width="8"  height="4"  rx="2" fill="#2a1a0a"/>
    <rect x="34" y="26" width="8"  height="4"  rx="2" fill="#2a1a0a"/>
    {/* Smirk */}
    <rect x="30" y="37" width="12" height="3"  rx="2" fill="#9a7050"/>
    {/* Stubble */}
    <rect x="20" y="36" width="4"  height="5"  rx="1" fill="#9a7050" fillOpacity="0.4"/>
    <rect x="40" y="36" width="4"  height="5"  rx="1" fill="#9a7050" fillOpacity="0.4"/>
    {/* Dark suit */}
    <rect x="8"  y="46" width="48" height="32" rx="4" fill="#2a3a50"/>
    {/* Money bag */}
    <rect x="44" y="54" width="14" height="14" rx="6" fill="#d4a020"/>
    <rect x="48" y="50" width="6"  height="6"  rx="1" fill="#d4a020"/>
    {/* ₹ symbol approximation */}
    <rect x="49" y="57" width="6"  height="1"  fill="#8B5A2B"/>
    <rect x="49" y="59" width="4"  height="1"  fill="#8B5A2B"/>
    <rect x="50" y="57" width="1"  height="6"  fill="#8B5A2B"/>
    {/* Crossed arms */}
    <rect x="8"  y="55" width="18" height="7"  rx="4" fill="#C4956A"/>
    <rect x="10" y="57" width="12" height="5"  rx="3" fill="#2a3a50"/>
  </svg>
);

/* ─── COURTROOM ─────────────────────────────────────────────────────────────── */

export default function Courtroom({ result, talkMore }: any) {
  return (
    <div style={{ padding: "12px 16px 0", fontFamily: "'Press Start 2P', monospace" }}>

      {/* ── JUDGE SECTION ── */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
        <div style={{ width:"100%", maxWidth:520 }}>

          <div style={{
            textAlign:"center", fontSize:8, letterSpacing:4,
            color:"#8B5A2B", marginBottom:6,
          }}>★ HON&apos;BLE JUDGE ★</div>

          {/* Wood bench top */}
          <div style={{
            background:"#7c5c3a",
            border:"2px solid #2c1a08",
            borderRadius:"6px 6px 0 0",
            height:12, marginBottom:-2,
            backgroundImage:"repeating-linear-gradient(90deg,#6b4c28 0px,#6b4c28 36px,#7c5c3a 36px,#7c5c3a 72px)",
            boxShadow:"3px 0 0 #2c1a08,-3px 0 0 #2c1a08",
          }}/>

          <CharacterCard
            role="👨‍⚖️ JUDGE"
            content={result?.judge}
            color=""
            sprite={<JudgeSVG />}
            accentColor="#7c5c3a"
            cardBg="#fdf6e4"
            cardBorder="#c8b090"
            onTalkMore={() => talkMore("judge")}
          />
        </div>
      </div>

      {/* ── RAILING DIVIDER ── */}
      <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:20 }}>
        <div style={{ flex:1, height:3, background:"#9a7040" }}/>
        {Array.from({length:20}).map((_,i) => (
          <div key={i} style={{
            width:3, height:18, background:"#b08848",
            borderLeft:"1px solid #7a5030", borderRight:"1px solid #7a5030",
            marginRight:10,
          }}/>
        ))}
        <div style={{ flex:1, height:3, background:"#9a7040" }}/>
      </div>

      {/* ── DEFENDER + REALITY ── */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",
        gap:16,
      }}>

        {/* Defender */}
        <div>
          <div style={{
            textAlign:"center", fontSize:8, letterSpacing:3,
            color:"#2d5a34", marginBottom:6,
          }}>★ DEFENCE ★</div>
          <CharacterCard
            role="🛡️ DEFENDER"
            content={result?.defender}
            color=""
            sprite={<DefenderSVG />}
            accentColor="#2d5a34"
            cardBg="#f0f8f0"
            cardBorder="#8abf90"
            onTalkMore={() => talkMore("defender")}
          />
        </div>

        {/* Reality */}
        <div>
          <div style={{
            textAlign:"center", fontSize:8, letterSpacing:3,
            color:"#803030", marginBottom:6,
          }}>★ REALITY ★</div>
          <CharacterCard
            role="⚔️ REALITY"
            content={result?.attacker}
            color=""
            sprite={<AttackerSVG />}
            accentColor="#803030"
            cardBg="#fdf0f0"
            cardBorder="#d09090"
            onTalkMore={() => talkMore("attacker")}
          />
        </div>

      </div>
    </div>
  );
}