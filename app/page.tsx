"use client";

import { useState } from "react";
import Courtroom from "@/components/Courtroom";
import InputBox from "@/components/InputBox";
import Link from "next/link";
/* ─── TRUE PIXEL COURTROOM BACKGROUND ─────────────────────────────────────────
   Every element is pixel-art <rect>s — arched windows, stone walls, tiled
   floor, judge's bench, Ashoka Chakra. Warm saffron / cream / wood palette.
─────────────────────────────────────────────────────────────────────────────── */
function PixelCourtroomBG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        imageRendering: "pixelated",
      }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 320 240"
    >
      {/* Upper wall — warm ivory */}
      <rect x="0" y="0" width="320" height="145" fill="#f0e8d0" />

      {/* Brick texture rows */}
      {[0,14,28,42,56,70,84,98,112,126].map((y, ri) =>
        [0,38,76,114,152,190,228,266,304].map((x, ci) => (
          <rect key={`br${ri}${ci}`}
            x={ri % 2 === 0 ? x : x - 19}
            y={y} width="36" height="13"
            fill="none" stroke="#ddd0b0" strokeWidth="0.6" />
        ))
      )}

      {/* Left pillar */}
      <rect x="8"   y="0" width="20" height="145" fill="#ddd0b0" />
      <rect x="10"  y="0" width="3"  height="145" fill="#c8bca0" />
      <rect x="23"  y="0" width="3"  height="145" fill="#c8bca0" />
      <rect x="8"   y="0" width="20" height="4"   fill="#e8c060" />

      {/* Right pillar */}
      <rect x="292" y="0" width="20" height="145" fill="#ddd0b0" />
      <rect x="294" y="0" width="3"  height="145" fill="#c8bca0" />
      <rect x="307" y="0" width="3"  height="145" fill="#c8bca0" />
      <rect x="292" y="0" width="20" height="4"   fill="#e8c060" />

      {/* Left arched window */}
      <rect x="32"  y="10" width="48" height="55" fill="#c4dff0" />
      <rect x="32"  y="10" width="48" height="24" rx="24" fill="#c4dff0" />
      <rect x="30"  y="8"  width="52" height="59" fill="none" stroke="#c0b090" strokeWidth="2" />
      <rect x="55"  y="10" width="2"  height="55" fill="#b0a080" opacity="0.5" />
      <rect x="32"  y="34" width="48" height="2"  fill="#b0a080" opacity="0.5" />
      {/* Light ray */}
      <rect x="34"  y="12" width="10" height="51" fill="#e8f4ff" opacity="0.25" />

      {/* Right arched window */}
      <rect x="240" y="10" width="48" height="55" fill="#c4dff0" />
      <rect x="240" y="10" width="48" height="24" rx="24" fill="#c4dff0" />
      <rect x="238" y="8"  width="52" height="59" fill="none" stroke="#c0b090" strokeWidth="2" />
      <rect x="263" y="10" width="2"  height="55" fill="#b0a080" opacity="0.5" />
      <rect x="240" y="34" width="48" height="2"  fill="#b0a080" opacity="0.5" />
      <rect x="242" y="12" width="10" height="51" fill="#e8f4ff" opacity="0.25" />

      {/* Ashoka Chakra — centre wall */}
      <circle cx="160" cy="32" r="20" fill="none" stroke="#b8860b" strokeWidth="2.5" />
      <circle cx="160" cy="32" r="14" fill="none" stroke="#b8860b" strokeWidth="1.5" />
      <circle cx="160" cy="32" r="4"  fill="#b8860b" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
        const r = (deg * Math.PI) / 180;
        return (
          <line key={`sp${deg}`}
            x1={160 + Math.cos(r)*5}  y1={32 + Math.sin(r)*5}
            x2={160 + Math.cos(r)*13} y2={32 + Math.sin(r)*13}
            stroke="#b8860b" strokeWidth="1" />
        );
      })}

      {/* "ADALAT" plaque */}
      <rect x="118" y="54" width="84" height="14" fill="#b8860b" rx="2" />
      <rect x="120" y="56" width="80" height="10" fill="#d4a020" rx="1" />

      {/* Ceiling fan rod */}
      <rect x="158" y="0"  width="4"  height="18" fill="#a09080" />
      <rect x="153" y="16" width="14" height="5"  fill="#806848" rx="2" />
      {/* Fan blades (static pixel version) */}
      <rect x="125" y="15" width="28" height="6"  fill="#c0a878" rx="3" />
      <rect x="167" y="15" width="28" height="6"  fill="#c0a878" rx="3" />
      <rect x="157" y="0"  width="6"  height="28" fill="#c0a878" rx="3" />
      <rect x="157" y="0"  width="6"  height="28" fill="#c0a878" rx="3"
        style={{ transformOrigin: "160px 18px", transform: "rotate(90deg)" }} />

      {/* Dado / moulding rail */}
      <rect x="0"   y="102" width="320" height="7"  fill="#ccc0a0" />
      <rect x="0"   y="103" width="320" height="2"  fill="#e0d4b0" />
      <rect x="0"   y="107" width="320" height="1"  fill="#aca090" />

      {/* Floor — terracotta tiles */}
      <rect x="0" y="145" width="320" height="95" fill="#b87858" />
      {[145,160,175,190,205,220,235].map(y =>
        [0,30,60,90,120,150,180,210,240,270,300].map(x => (
          <rect key={`fl${x}${y}`}
            x={x+1} y={y+1} width="28" height="13"
            fill="#c08468" stroke="#a06848" strokeWidth="0.5" />
        ))
      )}
      {/* Tile highlights */}
      {[145,160,175,190,205,220,235].map(y =>
        [0,30,60,90,120,150,180,210,240,270,300].map(x => (
          <rect key={`fh${x}${y}`}
            x={x+2} y={y+2} width="7" height="3"
            fill="#d09878" opacity="0.4" />
        ))
      )}

      {/* Judge's raised dais */}
      <rect x="55"  y="109" width="210" height="18" fill="#6b4c28" />
      <rect x="57"  y="111" width="206" height="4"  fill="#9a7040" />
      <rect x="55"  y="109" width="210" height="2"  fill="#b08848" />

      {/* Judge bench top surface */}
      <rect x="72"  y="97"  width="176" height="16" fill="#5a3d1a" />
      <rect x="74"  y="99"  width="172" height="6"  fill="#7a5428" />
      <rect x="72"  y="97"  width="176" height="2"  fill="#9a7038" />
      {/* Bench legs */}
      <rect x="72"  y="97"  width="8"  height="16" fill="#482e10" />
      <rect x="240" y="97"  width="8"  height="16" fill="#482e10" />

      {/* Mic on bench */}
      <rect x="158" y="91"  width="4"  height="8"  fill="#888" />
      <rect x="155" y="87"  width="10" height="6"  rx="4" fill="#666" />
      <rect x="157" y="97"  width="6"  height="2"  fill="#555" />

      {/* Books on bench */}
      <rect x="82"  y="92"  width="7"  height="7"  fill="#8B0000" />
      <rect x="90"  y="93"  width="7"  height="6"  fill="#1a3a6a" />
      <rect x="98"  y="94"  width="6"  height="5"  fill="#2d5a2d" />
      <rect x="82"  y="98"  width="7"  height="1"  fill="#fff" opacity="0.3" />

      {/* Water jug */}
      <rect x="216" y="91"  width="8"  height="10" fill="#b8d4e8" rx="2" />
      <rect x="218" y="89"  width="4"  height="3"  fill="#90b8d0" rx="1" />

      {/* Left counsel bench */}
      <rect x="0"   y="132" width="52" height="8"  fill="#6b4c28" />
      <rect x="0"   y="133" width="52" height="3"  fill="#9a7040" />

      {/* Right counsel bench */}
      <rect x="268" y="132" width="52" height="8"  fill="#6b4c28" />
      <rect x="268" y="133" width="52" height="3"  fill="#9a7040" />

      {/* Gallery railing */}
      <rect x="0"   y="182" width="320" height="5" fill="#7c5c3a" />
      {Array.from({ length: 26 }).map((_, i) => (
        <rect key={`rail${i}`}
          x={i * 12 + 4} y="162" width="3" height="22"
          fill="#9a7a4a" />
      ))}

      {/* Indian flag strips on pillars */}
      {[8, 292].map(x => (
        <g key={`flag${x}`}>
          <rect x={x} y="0" width="20" height="4" fill="#FF9933" />
          <rect x={x} y="4" width="20" height="4" fill="#f8f4ec" />
          <rect x={x} y="8" width="20" height="4" fill="#138808" />
        </g>
      ))}

      {/* Ambient light shafts from windows */}
      <rect x="32"  y="65" width="48" height="180" fill="#fffbe0" opacity="0.06" />
      <rect x="240" y="65" width="48" height="180" fill="#fffbe0" opacity="0.06" />

      {/* Vignette */}
      <defs>
        <linearGradient id="vigL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1e1208" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e1208" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vigR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1e1208" stopOpacity="0" />
          <stop offset="100%" stopColor="#1e1208" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="vigB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e1208" stopOpacity="0" />
          <stop offset="100%" stopColor="#1e1208" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="0"   y="0" width="65"  height="240" fill="url(#vigL)" />
      <rect x="255" y="0" width="65"  height="240" fill="url(#vigR)" />
      <rect x="0"   y="160" width="320" height="80" fill="url(#vigB)" />
    </svg>
  );
}

export default function Home() {
  const [query, setQuery]   = useState("");
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query) return;
    setLoading(true);
    const res  = await fetch("/api/court", { method: "POST", body: JSON.stringify({ query }) });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const talkMore = async (role: string) => {
    const res  = await fetch("/api/court", { method: "POST", body: JSON.stringify({ query, followUp: role }) });
    const data = await res.json();
    setResult((prev: any) => ({ ...prev, [role]: prev[role] + "\n\n" + data[role] }));
  };

  return (
    <div className="min-h-screen" style={{ position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        :root {
          --wood:       #6b4c28;
          --wood-lt:    #9a7040;
          --saffron:    #d4700a;
          --gold:       #b8860b;
          --gold-lt:    #e8b020;
          --cream:      #fdf6e4;
          --wall:       #ede4cc;
          --text:       #2c1a08;
          --muted:      #7a6040;
          --slate:      #3a4a5a;
          --green:      #2d5a34;
          --green-lt:   #4a8a58;
          --red:        #803030;
          --red-lt:     #b05050;
          --shadow:     rgba(44,26,8,0.18);
        }

        * { box-sizing: border-box; }

        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes sweep  { 0%{width:4%} 85%{width:88%} 100%{width:88%} }
        @keyframes popIn  {
          0%   { opacity:0; transform:translateY(8px) scale(0.97); }
          100% { opacity:1; transform:translateY(0)   scale(1); }
        }

        ::-webkit-scrollbar        { width:6px; background:#ede4cc; }
        ::-webkit-scrollbar-thumb  { background:#6b4c28; border-radius:3px; }

        .pbtn {
          font-family:'Press Start 2P',monospace;
          cursor:pointer;
          transition:transform .08s, box-shadow .08s;
          image-rendering:pixelated;
        }
        .pbtn:hover  { transform:translate(-1px,-1px); }
        .pbtn:active { transform:translate(1px,1px); box-shadow:none !important; }
      `}</style>

      {/* Pixel background */}
      <PixelCourtroomBG />

      {/* Glass content layer */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(253,246,228,0.86)",
        minHeight: "100vh",
        backdropFilter: "blur(0px)",
      }}>

        




       

        {/* ── TITLE ── */}
        {/* 🔥 NAVIGATION BUTTONS */}
<div style={{
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "10px",
  flexWrap: "wrap"
}}>
  
  <Link href="/Laws">
    <button className="pbtn" style={{
      background: "var(--wood)",
      color: "#fff",
      padding: "6px 12px",
      border: "2px solid var(--text)",
      borderRadius: "4px"
    }}>
      ⚖ Laws
    </button>
  </Link>

  <Link href="/scheme">
    <button className="pbtn" style={{
      background: "var(--green)",
      color: "#fff",
      padding: "6px 12px",
      border: "2px solid var(--text)",
      borderRadius: "4px"
    }}>
      💰 Schemes
    </button>
  </Link>

  <Link href="/News">
    <button className="pbtn" style={{
      background: "var(--slate)",
      color: "#fff",
      padding: "6px 12px",
      border: "2px solid var(--text)",
      borderRadius: "4px"
    }}>
      📰 News
    </button>
  </Link>

</div>
        <div style={{ textAlign:"center", padding:"18px 16px 6px" }}>
          <div style={{
            fontFamily:"'Press Start 2P',monospace",
            fontSize:"clamp(13px,3.5vw,22px)",
            color:"var(--text)",
            textShadow:"2px 2px 0 var(--gold-lt), 4px 4px 0 var(--shadow)",
            letterSpacing:2, marginBottom:6,
          }}>⚖ ADALAT AI</div>
          <div style={{
            fontFamily:"'Press Start 2P',monospace",
            fontSize:"clamp(6px,1.8vw,9px)",
            color:"var(--saffron)", letterSpacing:3,
          }}>INDIAN LEGAL COURTROOM</div>
        </div>

        {/* ── LAW TAGS ── */}
        <div style={{
          display:"flex", justifyContent:"center",
          flexWrap:"wrap", gap:6, padding:"8px 16px 10px",
        }}>
          {["IPC","CrPC","BNSS 2023","POCSO","IT ACT","CPC","RTI"].map(tag => (
            <div key={tag} className="pbtn" style={{
              background:"var(--wood)", border:"2px solid var(--text)",
              borderRadius:3, padding:"4px 9px",
              fontFamily:"'Press Start 2P',monospace",
              fontSize:7, color:"#fdf0d0",
              boxShadow:"2px 2px 0 var(--text)",
            }}>{tag}</div>
          ))}
        </div>

        {/* ── DISCLAIMER ── */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <div style={{
            background:"rgba(128,48,48,0.08)",
            border:"2px solid var(--red-lt)", borderRadius:4,
            padding:"4px 14px",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:7, color:"var(--red)",
          }}>⚠ AI GUIDANCE ONLY — NOT LEGAL ADVICE</div>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div style={{ padding:"0 16px 14px", maxWidth:880, margin:"0 auto" }}>
            <div style={{
              fontFamily:"'Press Start 2P',monospace",
              fontSize:8, color:"var(--wood)",
              textAlign:"center", marginBottom:7,
              animation:"blink 1s infinite",
            }}>⚖ PROCESSING YOUR CASE...</div>
            <div style={{
              background:"var(--wall)", border:"2px solid var(--wood)",
              borderRadius:4, height:14, overflow:"hidden",
            }}>
              <div style={{
                height:"100%", background:"var(--gold)",
                animation:"sweep 2.5s ease-out forwards", borderRadius:2,
              }}/>
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!result?.judge && !loading && (
          <div style={{
            textAlign:"center", padding:"26px 20px",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:8, color:"var(--muted)", lineHeight:3,
          }}>
            <div style={{ fontSize:30, marginBottom:10 }}>🏛</div>
            ENTER YOUR CASE BELOW<br/>TO BEGIN THE TRIAL<br/>
            <span style={{ fontSize:7, color:"#b0a078" }}>
              PRESS 🎮 FOR QUICK EXAMPLES
            </span>
          </div>
        )}

        {/* ── COURTROOM ── */}
        <div style={{ maxWidth:880, margin:"0 auto", paddingBottom:120 }}>
          <Courtroom result={result} talkMore={talkMore} />
        </div>
      </div>

      <InputBox query={query} setQuery={setQuery} onSubmit={handleSubmit} />
    </div>
  );
}