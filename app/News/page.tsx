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
};

const dots: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(44,26,8,0.045) 1px, transparent 1px)',
  backgroundSize:  '8px 8px',
};

export default function Home() {
  /* ── All original logic — untouched ─────────────────────────────────── */
  const [query,    setQuery]   = useState("");
  const [posts,    setPosts]   = useState<any[]>([]);
  const [brief,    setBrief]   = useState<any>(null);
  const [loading,  setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const requestRef = useRef(false);

  const fetchFeed = async () => {
    try {
      const res  = await fetch("/api/feed", { cache: "no-store" });
      const json = await res.json();
      console.log("FEED:", json);
      setPosts(json.data || []);
    } catch (err) {
      console.error("Feed error:", err);
    }
  };

  useEffect(() => { fetchFeed(); }, []);

  const handleSearch = async () => {
    if (!query.trim() || requestRef.current) return;
    requestRef.current = true;
    setLoading(true);
    try {
      await fetch("/api/live", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ query }),
      });
      setQuery("");
      await fetchFeed();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    requestRef.current = false;
  };

  const getBrief = async (post: any) => {
    try {
      console.log("CLICKED:", post);
      const res  = await fetch("/api/brief", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ title: post?.data?.title, summary: post?.data?.summary }),
      });
      const json = await res.json();
      console.log("BRIEF:", json);
      if (json?.data) setBrief(json.data);
    } catch (err) {
      console.error("Brief error:", err);
    }
  };

  const toggleExpand = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => (prev === i ? null : i));
  };

  return (
    <div style={{ minHeight:'100vh', background:T.bg, position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing:border-box; }
        @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideDown { from{opacity:0;max-height:0} to{opacity:1;max-height:600px} }
        @keyframes popIn     { from{opacity:0;transform:scale(0.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .pbtn { font-family:'Press Start 2P',monospace; cursor:pointer; transition:transform .08s,box-shadow .08s; }
        .pbtn:hover  { transform:translate(-1px,-1px); }
        .pbtn:active { transform:translate(1px,1px); box-shadow:none !important; }
        .feed-card   { transition:box-shadow .15s,transform .12s; }
        .feed-card:hover { transform:translateY(-1px); box-shadow:6px 6px 0 ${T.woodXlt} !important; }
        input::placeholder { color:${T.muted}; }
        input:focus { outline:none; border-color:${T.woodLt} !important; }
        ::-webkit-scrollbar       { width:5px; background:${T.wall}; }
        ::-webkit-scrollbar-thumb { background:${T.wood}; border-radius:3px; }
      `}</style>

      {/* Page pixel dot texture */}
      <div style={{ position:'fixed', inset:0, ...dots, pointerEvents:'none', zIndex:0, opacity:0.5 }}/>

      <div style={{ position:'relative', zIndex:1 }}>

       

        {/* Shimmer accent line */}
        <div style={{
          height:4,
          background:`linear-gradient(90deg,${T.saffron},${T.goldLt},${T.woodLt},${T.goldLt},${T.saffron})`,
          backgroundSize:'200% 100%',
          animation:'shimmer 4s linear infinite',
        }}/>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth:800, margin:'0 auto', padding:'28px 20px 60px', animation:'fadeUp 0.4s ease' }}>

          {/* Page title */}
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{
              fontFamily:"'Press Start 2P',monospace",
              fontSize:'clamp(10px,2.2vw,16px)',
              color:T.text,
              textShadow:`2px 2px 0 ${T.goldLt}, 4px 4px 0 rgba(44,26,8,0.1)`,
              letterSpacing:1, lineHeight:1.9, marginBottom:6,
            }}>Live News</div>
            <p style={{ fontSize:13, color:T.muted, fontFamily:'system-ui,sans-serif' }}>
              Search cases · Read verdicts · Stay informed
            </p>
          </div>

          {/* ── SEARCH BAR ── */}
          <div style={{
            background:T.cream, border:`2px solid ${T.woodXlt}`,
            borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
            padding:'16px 18px', marginBottom:28,
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
            <div style={{ position:'relative', zIndex:1, display:'flex', gap:10, flexWrap:'wrap' }}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search case... (e.g. Kesavananda Bharati)"
                style={{
                  flex:1, minWidth:180,
                  background:T.wall, border:`2px solid ${T.woodXlt}`,
                  borderRadius:6, padding:'10px 13px',
                  color:T.text, fontFamily:'system-ui,sans-serif', fontSize:13,
                }}
              />
              <button
                className="pbtn"
                onClick={handleSearch}
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
                    LOADING...
                  </>
                ) : '🔍 SEARCH'}
              </button>
            </div>
          </div>

          {/* ── FEED HEADER ── */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{ flex:1, height:3, background:T.woodLt }}/>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:T.woodDark, border:`2px solid ${T.gold}`,
              borderRadius:6, padding:'6px 14px',
              fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.goldLt,
              boxShadow:`3px 3px 0 rgba(44,26,8,0.25)`, ...dots, whiteSpace:'nowrap',
            }}>
              📡 LIVE FEED
              <div style={{ width:7, height:7, borderRadius:'50%', background:T.saffron, animation:'blink 1.2s infinite' }}/>
            </div>
            <div style={{ flex:1, height:3, background:`linear-gradient(90deg,${T.woodLt},${T.goldLt},${T.woodLt})`, backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
          </div>

          {/* ── EMPTY STATE ── */}
          {posts.length === 0 && (
            <div style={{
              background:T.cream, border:`2px solid ${T.woodXlt}`,
              borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
              padding:'32px 20px', textAlign:'center',
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontSize:28, marginBottom:10 }}>📡</div>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.muted, lineHeight:2.8 }}>
                  NO POSTS YET<br/>
                  <span style={{ fontSize:7, color:'#b0a078' }}>SEARCH A CASE ABOVE TO BEGIN</span>
                </div>
              </div>
            </div>
          )}

          {/* ── FEED CARDS ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {posts.map((post, i) => {
              const isOpen = expanded === i;
              return (
                <div
                  key={i}
                  className="feed-card"
                  style={{
                    background:T.cream, border:`2px solid ${T.woodXlt}`,
                    borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
                    overflow:'hidden',
                    animation:`fadeUp 0.3s ${i*0.06}s both ease`,
                    position:'relative',
                  }}
                >
                  <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', zIndex:0 }}/>

                  {/* Card header strip */}
                  <div style={{
                    background:T.woodDark, padding:'7px 14px',
                    display:'flex', alignItems:'center',
                    justifyContent:'space-between', gap:8, flexWrap:'wrap',
                    ...dots,
                  }}>
                    <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.goldLt }}>
                      #{String(i+1).padStart(2,'0')}
                    </div>
                    {post?.createdAt && (
                      <div style={{ fontFamily:'system-ui,sans-serif', fontSize:10, color:T.woodXlt, flex:1, textAlign:'center' }}>
                        🕐 {new Date(post.createdAt).toLocaleString()}
                      </div>
                    )}
                    <div style={{ display:'flex', gap:6 }}>
                      <button
                        className="pbtn"
                        onClick={e => { e.stopPropagation(); getBrief(post); }}
                        title="Get AI brief"
                        style={{
                          background:T.goldLt, color:T.woodDark,
                          border:`2px solid rgba(44,26,8,0.2)`,
                          borderRadius:4, padding:'4px 9px', fontSize:8,
                          boxShadow:`2px 2px 0 rgba(44,26,8,0.2)`,
                          display:'flex', alignItems:'center', gap:4,
                        }}
                      >🧠 BRIEF</button>

                      <button
                        className="pbtn"
                        onClick={e => toggleExpand(i, e)}
                        style={{
                          background:   isOpen ? T.saffron : 'rgba(253,246,228,0.1)',
                          color:        '#fdf6e4',
                          border:       `2px solid ${isOpen ? T.wood : T.woodXlt}`,
                          borderRadius: 4, padding:'4px 9px', fontSize:8,
                          boxShadow:    isOpen ? `2px 2px 0 rgba(44,26,8,0.3)` : 'none',
                        }}
                      >{isOpen ? '▲ CLOSE' : '▼ EXPAND'}</button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding:'14px 16px', position:'relative', zIndex:1 }}>

                    <h3 style={{
                      fontSize:14, fontWeight:700, color:T.text,
                      fontFamily:'system-ui,sans-serif',
                      marginBottom:8, lineHeight:1.5,
                      display:'flex', alignItems:'flex-start', gap:8,
                    }}>
                      <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.saffron, marginTop:2, flexShrink:0 }}>▶</span>
                      {post?.data?.title}
                    </h3>

                    <p style={{ fontSize:12, color:T.muted, fontFamily:'system-ui,sans-serif', lineHeight:1.75, margin:0 }}>
                      {post?.data?.summary?.slice(0,120)}
                      {(post?.data?.summary?.length??0) > 120 && (
                        <span style={{ color:T.saffron, fontFamily:"'Press Start 2P',monospace", fontSize:7 }}>
                          {' '}{isOpen ? '' : '…▼'}
                        </span>
                      )}
                    </p>

                    {/* Expanded section */}
                    {isOpen && (
                      <div style={{ animation:'slideDown 0.3s ease', overflow:'hidden' }} onClick={e => e.stopPropagation()}>
                        {/* Mini railing */}
                        <div style={{ display:'flex', alignItems:'center', margin:'12px 0 14px' }}>
                          <div style={{ flex:1, height:2, background:T.woodXlt }}/>
                          {Array.from({length:7}).map((_,j) => (
                            <div key={j} style={{ width:3, height:12, background:T.woodLt, borderLeft:`1px solid ${T.wood}`, borderRight:`1px solid ${T.wood}`, marginRight:6, flexShrink:0 }}/>
                          ))}
                          <div style={{ flex:1, height:2, background:T.woodXlt }}/>
                        </div>

                        {post?.data?.summary && (
                          <div style={{ background:T.wall, border:`2px solid ${T.woodXlt}`, borderRadius:7, padding:'10px 13px', marginBottom:10, position:'relative', overflow:'hidden' }}>
                            <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
                            <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.wood, marginBottom:6 }}>📝 SUMMARY</div>
                            <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{post.data.summary}</p>
                          </div>
                        )}

                        {post?.data?.verdict && (
                          <div style={{ background:'#f0f8f0', border:`2px solid #8abf90`, borderRadius:7, padding:'10px 13px', marginBottom:10, position:'relative', overflow:'hidden' }}>
                            <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
                            <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.green, marginBottom:6 }}>⚖ VERDICT</div>
                            <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{post.data.verdict}</p>
                          </div>
                        )}

                        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginTop:6 }}>
                          {post?.data?.source && (
                            <a href={post.data.source} target="_blank" rel="noopener noreferrer"
                              style={{
                                display:'inline-flex', alignItems:'center', gap:5,
                                background:T.blue, color:'#fdf6e4',
                                border:`2px solid rgba(44,26,8,0.2)`,
                                borderRadius:6, padding:'7px 13px',
                                fontFamily:"'Press Start 2P',monospace", fontSize:7,
                                textDecoration:'none', boxShadow:`3px 3px 0 rgba(44,26,8,0.2)`,
                              }}
                            >🔗 SOURCE</a>
                          )}
                          <button
                            className="pbtn"
                            onClick={e => toggleExpand(i, e)}
                            style={{
                              marginLeft:'auto',
                              background:T.wall, color:T.muted,
                              border:`2px solid ${T.woodXlt}`,
                              borderRadius:6, padding:'7px 12px', fontSize:7,
                              boxShadow:`2px 2px 0 ${T.woodXlt}`,
                            }}
                          >▲ CLOSE</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BRIEF MODAL ── */}
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
            <div style={{ height:4, flexShrink:0, background:`linear-gradient(90deg,${T.saffron},${T.goldLt},${T.woodLt},${T.goldLt},${T.saffron})`, backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>
            <div style={{ background:T.woodDark, padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, ...dots }}>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:T.goldLt }}>🧠 FULL EXPLANATION</div>
              <button className="pbtn" onClick={() => setBrief(null)}
                style={{ background:T.saffron, color:'#fdf6e4', border:`2px solid ${T.wood}`, borderRadius:4, padding:'4px 10px', fontSize:8, boxShadow:`2px 2px 0 rgba(44,26,8,0.3)`, display:'flex', alignItems:'center', gap:5 }}
              >✕ CLOSE</button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'18px 20px 8px', position:'relative' }}>
              <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', zIndex:0 }}/>
              <div style={{ background:T.wall, border:`2px solid ${T.woodXlt}`, borderRadius:8, padding:'13px 15px', position:'relative', zIndex:1 }}>
                <p style={{ fontSize:13, color:T.textMd, lineHeight:1.9, whiteSpace:'pre-wrap', fontFamily:'system-ui,sans-serif', margin:0 }}>
                  {brief?.explanation || "No data"}
                </p>
              </div>
            </div>
            <div style={{ borderTop:`2px solid ${T.woodXlt}`, padding:'11px 20px', background:T.cream, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none' }}/>
              <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.muted, position:'relative', zIndex:1 }}>⚠ AI GUIDANCE ONLY</span>
              <button className="pbtn" onClick={() => setBrief(null)}
                style={{ background:T.wall, color:T.muted, border:`2px solid ${T.woodXlt}`, borderRadius:6, padding:'7px 14px', fontSize:7, boxShadow:`2px 2px 0 ${T.woodXlt}`, position:'relative', zIndex:1 }}
              >▲ CLOSE EXPANSION</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}