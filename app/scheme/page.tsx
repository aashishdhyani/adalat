"use client";

import { useEffect, useState, useRef } from "react";

/* ─── DESIGN TOKENS — same Adalat AI courtroom palette ───────────────────── */
const T = {
  bg:       '#f5efe0',
  wall:     '#ede4cc',
  wood:     '#6b4c28',
  woodLt:   '#9a7040',
  woodXlt:  '#c8b090',
  woodDark: '#3d2810',
  saffron:  '#d4700a',
  gold:     '#b8860b',
  goldLt:   '#e8b020',
  cream:    '#fdf6e4',
  text:     '#2c1a08',
  textMd:   '#5a3e1e',
  muted:    '#7a6040',
  green:    '#2d5a34',
  greenLt:  '#4a8a58',
  blue:     '#2a4a6a',
  blueLt:   '#4a7aaa',
};

const dots: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(44,26,8,0.045) 1px, transparent 1px)',
  backgroundSize:  '8px 8px',
};

/* Pixel dot overlay */
function Dots() {
  return <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', zIndex:0 }}/>;
}

export default function SchemePage() {
  /* ── All original logic — untouched ─────────────────────────────────── */
  const [query,   setQuery]   = useState("");
  const [posts,   setPosts]   = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [brief,   setBrief]   = useState<any>(null);

  /* new: per-scheme expand state */
  const [expanded, setExpanded] = useState<string | null>(null);

  const requestRef = useRef(false);

  const fetchFeed = async () => {
    const res  = await fetch("/api/scheme-feed", { cache: "no-store" });
    const json = await res.json();
    setPosts(json.data || []);
  };

  useEffect(() => { fetchFeed(); }, []);

  const search = async () => {
    if (!query.trim() || requestRef.current) return;
    requestRef.current = true;
    setLoading(true);
    await fetch("/api/scheme-ai", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ query }),
    });
    setQuery("");
    await fetchFeed();
    setLoading(false);
    requestRef.current = false;
  };

  const getBrief = async (scheme: any) => {
    const res  = await fetch("/api/scheme-brief", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name: scheme.name, description: scheme.description }),
    });
    const json = await res.json();
    setBrief(json.data);
  };

  const schemeKey  = (postIdx: number, schemeIdx: number) => `${postIdx}-${schemeIdx}`;
  const isExpanded = (k: string) => expanded === k;
  const toggle     = (k: string) => setExpanded(prev => prev === k ? null : k);

  return (
    <div style={{ minHeight:'100vh', background:T.bg, position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing:border-box; }
        @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideDown { from{opacity:0;max-height:0} to{opacity:1;max-height:500px} }
        @keyframes popIn     { from{opacity:0;transform:scale(0.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .pbtn { font-family:'Press Start 2P',monospace; cursor:pointer; transition:transform .08s,box-shadow .08s; }
        .pbtn:hover  { transform:translate(-1px,-1px); }
        .pbtn:active { transform:translate(1px,1px); box-shadow:none !important; }
        .scheme-card { transition:box-shadow .15s,transform .12s; }
        .scheme-card:hover { transform:translateY(-1px); box-shadow:6px 6px 0 ${T.woodXlt} !important; }
        input::placeholder { color:${T.muted}; }
        input:focus { outline:none; border-color:${T.woodLt} !important; }
        ::-webkit-scrollbar       { width:5px; background:${T.wall}; }
        ::-webkit-scrollbar-thumb { background:${T.wood}; border-radius:3px; }
      `}</style>

      {/* Page pixel dot texture */}
      <div style={{ position:'fixed', inset:0, ...dots, pointerEvents:'none', zIndex:0, opacity:0.5 }}/>

      <div style={{ position:'relative', zIndex:1 }}>

        {/* ── HUD BAR ── */}
        <div style={{
          background:   'rgba(44,26,8,0.94)',
          borderBottom: `3px solid ${T.gold}`,
          padding:      '7px 20px',
          display:      'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:     'wrap', gap:8,
        }}>
          <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:T.goldLt, textShadow:`2px 2px 0 ${T.wood}` }}>
            ⚖ ADALAT AI
          </span>
          <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.woodXlt, letterSpacing:2 }}>
            SARKARI YOJNAAYEIN
          </span>
          <div style={{ display:'flex', gap:3 }}>
            {[T.saffron, T.gold, T.greenLt].map((c,i) => (
              <div key={i} style={{ width:7, height:7, background:c, borderRadius:'50%', animation:`blink 1.4s ${i*0.4}s infinite` }}/>
            ))}
          </div>
        </div>

        {/* Shimmer accent line */}
        <div style={{
          height:4,
          background:`linear-gradient(90deg,${T.saffron},${T.goldLt},${T.woodLt},${T.goldLt},${T.saffron})`,
          backgroundSize:'200% 100%',
          animation:'shimmer 4s linear infinite',
        }}/>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth:960, margin:'0 auto', padding:'28px 20px 60px', animation:'fadeUp 0.4s ease' }}>

          {/* Page title */}
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{
              fontFamily:"'Press Start 2P',monospace",
              fontSize:'clamp(10px,2.2vw,16px)',
              color:T.text,
              textShadow:`2px 2px 0 ${T.goldLt}, 4px 4px 0 rgba(44,26,8,0.1)`,
              letterSpacing:1, lineHeight:1.9, marginBottom:6,
            }}>🇮🇳 SMART SCHEME ASSISTANT</div>
            <p style={{ fontSize:13, color:T.muted, fontFamily:'system-ui,sans-serif' }}>
              Describe your situation · Find government schemes · Apply online
            </p>
          </div>

          {/* ── SEARCH BAR ── */}
          <div style={{
            background:T.cream, border:`2px solid ${T.woodXlt}`,
            borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
            padding:'16px 18px', marginBottom:28,
            position:'relative', overflow:'hidden',
          }}>
            <Dots/>
            <div style={{ position:'relative', zIndex:1, display:'flex', gap:10, flexWrap:'wrap' }}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && search()}
                placeholder="Describe your problem... (e.g. I am a farmer looking for crop insurance)"
                style={{
                  flex:1, minWidth:180,
                  background:T.wall, border:`2px solid ${T.woodXlt}`,
                  borderRadius:6, padding:'10px 13px',
                  color:T.text, fontFamily:'system-ui,sans-serif', fontSize:13,
                }}
              />
              <button
                className="pbtn"
                onClick={search}
                disabled={loading || !query.trim()}
                style={{
                  background:   (loading||!query.trim()) ? T.wall    : T.saffron,
                  color:        (loading||!query.trim()) ? T.muted   : '#fdf6e4',
                  border:       `2px solid ${(loading||!query.trim()) ? T.woodXlt : T.wood}`,
                  borderRadius: 6, padding:'10px 18px', fontSize:8,
                  boxShadow:    (loading||!query.trim()) ? 'none' : `3px 3px 0 ${T.wood}`,
                  cursor:       (loading||!query.trim()) ? 'not-allowed' : 'pointer',
                  display:'flex', alignItems:'center', gap:8,
                  whiteSpace:'nowrap', opacity:loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width:13, height:13, border:`2px solid rgba(255,255,255,0.3)`, borderTop:'2px solid #fdf6e4', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                    SEARCHING...
                  </>
                ) : '🔍 SEARCH'}
              </button>
            </div>
          </div>

          {/* ── EMPTY STATE ── */}
          {posts.length === 0 && (
            <div style={{
              background:T.cream, border:`2px solid ${T.woodXlt}`,
              borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
              padding:'36px 20px', textAlign:'center',
              position:'relative', overflow:'hidden',
            }}>
              <Dots/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontSize:32, marginBottom:12 }}>🇮🇳</div>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.muted, lineHeight:2.8 }}>
                  NO SCHEMES YET<br/>
                  <span style={{ fontSize:7, color:'#b0a078' }}>DESCRIBE YOUR PROBLEM ABOVE TO BEGIN</span>
                </div>
              </div>
            </div>
          )}

          {/* ── FEED ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {posts.map((post, i) => (
              <div
                key={i}
                style={{
                  background:T.cream, border:`2px solid ${T.woodXlt}`,
                  borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
                  overflow:'hidden', animation:`fadeUp 0.3s ${i*0.07}s both ease`,
                  position:'relative',
                }}
              >
                <Dots/>

                {/* Post header strip */}
                <div style={{
                  background:T.woodDark, padding:'8px 16px',
                  display:'flex', alignItems:'center', gap:8,
                  ...dots,
                }}>
                  <span style={{ fontSize:16 }}>🔍</span>
                  <div style={{ fontFamily:'system-ui,sans-serif', fontSize:13, fontWeight:600, color:T.goldLt, flex:1 }}>
                    {post.query}
                  </div>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.woodXlt }}>
                    {post.data?.length || 0} SCHEMES
                  </div>
                </div>

                {/* Scheme cards grid */}
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
                  gap:14, padding:'16px',
                  position:'relative', zIndex:1,
                }}>
                  {post.data?.map((scheme: any, j: number) => {
                    const key    = schemeKey(i, j);
                    const isOpen = isExpanded(key);
                    return (
                      <div
                        key={j}
                        className="scheme-card"
                        style={{
                          background:T.wall, border:`2px solid ${T.woodXlt}`,
                          borderRadius:8, boxShadow:`3px 3px 0 ${T.woodXlt}`,
                          overflow:'hidden', position:'relative',
                        }}
                      >
                        <Dots/>

                        {/* Scheme card header */}
                        <div style={{
                          background:`rgba(44,26,8,0.06)`,
                          borderBottom:`1.5px solid ${T.woodXlt}`,
                          padding:'6px 12px',
                          display:'flex', alignItems:'center', justifyContent:'space-between', gap:6,
                        }}>
                          {/* 🧠 Brief btn */}
                          <button
                            className="pbtn"
                            onClick={() => getBrief(scheme)}
                            style={{
                              background:T.goldLt, color:T.woodDark,
                              border:`2px solid rgba(44,26,8,0.2)`,
                              borderRadius:4, padding:'3px 8px', fontSize:7,
                              boxShadow:`2px 2px 0 rgba(44,26,8,0.2)`,
                              display:'flex', alignItems:'center', gap:4,
                            }}
                          >🧠 DETAIL</button>

                          {/* Expand/Close */}
                          <button
                            className="pbtn"
                            onClick={() => toggle(key)}
                            style={{
                              background:   isOpen ? T.saffron : 'transparent',
                              color:        isOpen ? '#fdf6e4' : T.muted,
                              border:       `2px solid ${isOpen ? T.wood : T.woodXlt}`,
                              borderRadius: 4, padding:'3px 8px', fontSize:7,
                              boxShadow:    isOpen ? `2px 2px 0 rgba(44,26,8,0.25)` : 'none',
                            }}
                          >{isOpen ? '▲ CLOSE' : '▼ MORE'}</button>
                        </div>

                        {/* Scheme body */}
                        <div style={{ padding:'12px 14px', position:'relative', zIndex:1 }}>

                          {/* Name */}
                          <h3 style={{
                            fontSize:13, fontWeight:700, color:T.text,
                            fontFamily:'system-ui,sans-serif',
                            marginBottom:6, lineHeight:1.4,
                          }}>{scheme.name}</h3>

                          {/* Benefit */}
                          {scheme.benefit && (
                            <div style={{
                              display:'inline-flex', alignItems:'center', gap:5,
                              background:'#f0f8f0', border:`1.5px solid #8abf90`,
                              borderRadius:4, padding:'3px 9px',
                              fontSize:11, color:T.green, fontFamily:'system-ui,sans-serif',
                              fontWeight:600, marginBottom:8,
                            }}>
                              ✅ {scheme.benefit}
                            </div>
                          )}

                          {/* Description preview */}
                          <p style={{
                            fontSize:12, color:T.muted,
                            fontFamily:'system-ui,sans-serif',
                            lineHeight:1.75, margin:'0 0 6px',
                          }}>
                            {isOpen ? scheme.description : scheme.description?.slice(0, 90)}
                            {!isOpen && (scheme.description?.length ?? 0) > 90 && (
                              <span style={{ color:T.saffron, fontFamily:"'Press Start 2P',monospace", fontSize:7 }}> …▼</span>
                            )}
                          </p>

                          {/* ── EXPANDED CONTENT ── */}
                          {isOpen && (
                            <div style={{ animation:'slideDown 0.25s ease', overflow:'hidden' }}>

                              {/* Why relevant */}
                              {scheme.whyRelevant && (
                                <div style={{
                                  background:'#f0f4f8', border:`1.5px solid #90b0d0`,
                                  borderRadius:6, padding:'9px 11px', marginBottom:8,
                                  position:'relative', overflow:'hidden',
                                }}>
                                  <Dots/>
                                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:6, color:T.blue, marginBottom:5 }}>WHY RELEVANT</div>
                                  <p style={{ fontSize:11, color:T.textMd, lineHeight:1.75, fontFamily:'system-ui,sans-serif', margin:0 }}>
                                    {scheme.whyRelevant}
                                  </p>
                                </div>
                              )}

                              {/* Apply link + close */}
                              <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginTop:6 }}>
                                {scheme.applyLink && (
                                  <a
                                    href={scheme.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display:'inline-flex', alignItems:'center', gap:5,
                                      background:T.green, color:'#fdf6e4',
                                      border:`2px solid rgba(44,26,8,0.2)`,
                                      borderRadius:6, padding:'6px 12px',
                                      fontFamily:"'Press Start 2P',monospace", fontSize:7,
                                      textDecoration:'none', boxShadow:`2px 2px 0 rgba(44,26,8,0.2)`,
                                    }}
                                  >🔗 APPLY NOW</a>
                                )}

                                <button
                                  className="pbtn"
                                  onClick={() => toggle(key)}
                                  style={{
                                    marginLeft:'auto',
                                    background:T.wall, color:T.muted,
                                    border:`2px solid ${T.woodXlt}`,
                                    borderRadius:6, padding:'6px 10px', fontSize:7,
                                    boxShadow:`2px 2px 0 ${T.woodXlt}`,
                                  }}
                                >▲ CLOSE</button>
                              </div>
                            </div>
                          )}

                          {/* Apply link (always visible when collapsed) */}
                          {!isOpen && scheme.applyLink && (
                            <a
                              href={scheme.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display:'inline-flex', alignItems:'center', gap:4,
                                color:T.blue, fontFamily:'system-ui,sans-serif',
                                fontSize:11, fontWeight:600,
                                textDecoration:'none',
                              }}
                            >↗ Apply</a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BRIEF / DETAIL MODAL ── */}
      {brief && (
        <div
          onClick={() => setBrief(null)}
          style={{
            position:'fixed', inset:0,
            background:'rgba(44,26,8,0.72)',
            display:'flex', alignItems:'center', justifyContent:'center',
            zIndex:999, padding:'20px 16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width:'100%', maxWidth:460, maxHeight:'85vh',
              display:'flex', flexDirection:'column',
              background:T.cream, border:`3px solid ${T.gold}`,
              borderRadius:12, boxShadow:`6px 6px 0 rgba(44,26,8,0.4)`,
              overflow:'hidden', animation:'popIn 0.22s ease',
            }}
          >
            {/* Shimmer top */}
            <div style={{
              height:4, flexShrink:0,
              background:`linear-gradient(90deg,${T.saffron},${T.goldLt},${T.woodLt},${T.goldLt},${T.saffron})`,
              backgroundSize:'200% 100%',
              animation:'shimmer 3s linear infinite',
            }}/>

            {/* Modal header */}
            <div style={{
              background:T.woodDark, padding:'10px 16px',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              flexShrink:0, ...dots,
            }}>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:T.goldLt }}>
                🧠 SCHEME DETAIL
              </div>
              <button
                className="pbtn"
                onClick={() => setBrief(null)}
                style={{
                  background:T.saffron, color:'#fdf6e4',
                  border:`2px solid ${T.wood}`, borderRadius:4,
                  padding:'4px 10px', fontSize:8,
                  boxShadow:`2px 2px 0 rgba(44,26,8,0.3)`,
                  display:'flex', alignItems:'center', gap:5,
                }}
              >✕ CLOSE</button>
            </div>

            {/* Modal body */}
            <div style={{ flex:1, overflowY:'auto', padding:'18px 20px 8px', position:'relative' }}>
              <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', zIndex:0 }}/>
              <div style={{
                background:T.wall, border:`2px solid ${T.woodXlt}`,
                borderRadius:8, padding:'13px 15px',
                position:'relative', zIndex:1,
              }}>
                <p style={{
                  fontSize:13, color:T.textMd, lineHeight:1.9,
                  whiteSpace:'pre-wrap', fontFamily:'system-ui,sans-serif', margin:0,
                }}>
                  {brief?.explanation || "No data"}
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div style={{
              borderTop:`2px solid ${T.woodXlt}`,
              padding:'11px 20px', background:T.cream,
              display:'flex', justifyContent:'space-between', alignItems:'center',
              flexShrink:0, position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
              <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.muted, position:'relative', zIndex:1 }}>
                ⚠ AI GUIDANCE ONLY
              </span>
              <button
                className="pbtn"
                onClick={() => setBrief(null)}
                style={{
                  background:T.wall, color:T.muted,
                  border:`2px solid ${T.woodXlt}`,
                  borderRadius:6, padding:'7px 14px', fontSize:7,
                  boxShadow:`2px 2px 0 ${T.woodXlt}`,
                  position:'relative', zIndex:1,
                }}
              >▲ CLOSE EXPANSION</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}