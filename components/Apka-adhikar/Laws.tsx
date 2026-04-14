'use client';

import React, { useState } from 'react';

import articlesJSON    from './Rules/Articles/Articles.json';
import surakshaJSON    from './Rules/bhartiya-nagrink-suraksa-sanhita/BhartiyaNagrikSuraksaSanhita.json';
import nyayJSON        from './Rules/bhartiya-nayy-sanhita/BhartiyaNayySanhita.json';
import ipcJSON         from './Rules/IPC/ipc.json';
import personalLawJSON from './Rules/personal-law/personalLaw.json';
import specialActsJSON from './Rules/special-acts/SpecialActs.json';
import taxLawJSON      from './Rules/tax-laws/taxAndLaw.json';

/* ─── DESIGN TOKENS ────────────────────────────────────────────────────────── */
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
  red:      '#803030',
  blue:     '#2a4a6a',
  purple:   '#4a3070',
  teal:     '#1e5a52',
  indigo:   '#2a3a6a',
  amber:    '#6a4010',
};

const dots: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, rgba(44,26,8,0.045) 1px, transparent 1px)',
  backgroundSize:  '8px 8px',
};

/* Per-section accent config */
const ACCENTS: Record<string, { accent: string; card: string; bdr: string; label: string; icon: string }> = {
  articles: { accent:T.purple,  card:'#f4f0f8', bdr:'#c0b0d8', label:'Constitution of India',            icon:'📜' },
  suraksha: { accent:T.blue,    card:'#f0f4f8', bdr:'#90b0d0', label:'Nagarik Suraksha Sanhita',         icon:'🛡️' },
  nyay:     { accent:T.green,   card:'#f0f8f0', bdr:'#8abf90', label:'Bhartiya Nyay Sanhita',            icon:'⚖️' },
  ipc:      { accent:T.red,     card:'#fdf0f0', bdr:'#d09090', label:'IPC — Indian Penal Code',          icon:'🔴' },
  personal: { accent:T.indigo,  card:'#f0f2f8', bdr:'#9090d0', label:'Personal Laws',                    icon:'🕌' },
  special:  { accent:T.amber,   card:'#fdf4ec', bdr:'#d0a870', label:'Special Acts',                     icon:'📋' },
  tax:      { accent:T.teal,    card:'#f0f6f4', bdr:'#90c8c0', label:'Tax & Administrative Laws',        icon:'🧾' },
};

const ITEMS_PER_PAGE = 2;

/* Pixel dot overlay */
function Dots() {
  return <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', zIndex:0 }}/>;
}

/* Section pixel-font badge */
function SectionBadge({ children, color = T.wood }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display:'inline-block',
      background:   color,
      border:       '2px solid rgba(44,26,8,0.18)',
      borderRadius: 4,
      padding:      '4px 10px',
      fontFamily:   "'Press Start 2P', monospace",
      fontSize:     8,
      color:        '#fdf6e4',
      boxShadow:    '2px 2px 0 rgba(44,26,8,0.18)',
      marginBottom: 12,
      letterSpacing: 0.5,
    }}>{children}</div>
  );
}

/* Inner sub-card */
function SubCard({ children, bg = T.wall, bdr = T.woodXlt }: { children: React.ReactNode; bg?: string; bdr?: string }) {
  return (
    <div style={{
      background:   bg,
      border:       `1.5px solid ${bdr}`,
      borderRadius: 7,
      padding:      '12px 14px',
      marginBottom: 10,
      position:     'relative',
      overflow:     'hidden',
    }}>
      <Dots/>
      <div style={{ position:'relative', zIndex:1 }}>{children}</div>
    </div>
  );
}

/* ── PAGINATION ──────────────────────────────────────────────────────────────  */
function PageBar({
  page, hasNext, onPrev, onNext,
}: { page:number; hasNext:boolean; onPrev:()=>void; onNext:()=>void }) {
  const btn = (label: React.ReactNode, onClick: ()=>void, disabled: boolean, active=false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily:   "'Press Start 2P', monospace",
        fontSize:     8,
        padding:      '7px 12px',
        borderRadius: 4,
        background:   active ? T.wood : disabled ? 'transparent' : T.wall,
        color:        active ? '#fdf6e4' : disabled ? T.muted : T.text,
        border:       `2px solid ${active ? T.wood : T.woodXlt}`,
        boxShadow:    active ? `2px 2px 0 rgba(44,26,8,0.2)` : 'none',
        cursor:       disabled ? 'not-allowed' : 'pointer',
        opacity:      disabled ? 0.45 : 1,
        display:      'flex', alignItems:'center', gap:4,
      }}
    >{label}</button>
  );

  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:22, flexWrap:'wrap' }}>
      {btn('◀ PREV', onPrev, page === 1)}
      <div style={{
        fontFamily:   "'Press Start 2P', monospace",
        fontSize:     8,
        color:        T.muted,
        padding:      '7px 14px',
        background:   T.wall,
        border:       `2px solid ${T.woodXlt}`,
        borderRadius: 4,
      }}>PAGE {page}</div>
      {btn('NEXT ▶', onNext, !hasNext)}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────  */
export default function LawsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [page,     setPage]     = useState(1);

  /* ── All original logic — untouched ── */
  const lawFiles = {
    articles: articlesJSON?.constitution_of_india    || [],
    suraksha: surakshaJSON?.chapters                 || [],
    nyay:     nyayJSON?.chapters                     || [],
    ipc:      ipcJSON                                || [],
    personal: personalLawJSON?.personal_laws         || [],
    special:  specialActsJSON?.acts                  || [],
    tax:      taxLawJSON?.administrative_and_tax_laws || {},
  };

  const paginate = (data: any[]) =>
    data.slice((page-1)*ITEMS_PER_PAGE, page*ITEMS_PER_PAGE);

  const ac = selected ? ACCENTS[selected] : null;

  const renderData = () => {
    if (!selected) return null;
    const data = lawFiles[selected as keyof typeof lawFiles];

    /* ARTICLES */
    if (selected === 'articles') {
      return paginate(data as any[]).map((a:any, i:number) => (
        <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'18px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <Dots/>
          <div style={{ position:'relative', zIndex:1 }}>
            <SectionBadge color={ac!.accent}>Article {a.article_number}</SectionBadge>
            <h3 style={{ fontSize:15, fontWeight:700, color:T.text, fontFamily:'system-ui,sans-serif', marginBottom:8, lineHeight:1.5 }}>{a.article_name}</h3>
            <p style={{ fontSize:13, color:T.textMd, lineHeight:1.85, fontFamily:'system-ui,sans-serif', margin:0 }}>{a.original_text}</p>
          </div>
        </div>
      ));
    }

    /* SURAKSHA / NYAY */
    if (selected === 'suraksha' || selected === 'nyay') {
      return paginate(data as any[]).map((ch:any, i:number) => (
        <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'18px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <Dots/>
          <div style={{ position:'relative', zIndex:1 }}>
            <SectionBadge color={ac!.accent}>Chapter {ch.chapter_number}</SectionBadge>
            <h3 style={{ fontSize:15, fontWeight:700, color:T.text, fontFamily:'system-ui,sans-serif', marginBottom:12, lineHeight:1.5 }}>{ch.chapter_name}</h3>
            {ch.sections?.map((s:any, j:number) => (
              <SubCard key={j}>
                <div style={{ fontWeight:600, color:T.text, fontSize:13, marginBottom:5, fontFamily:'system-ui,sans-serif' }}>§{s.section_number} — {s.section_title}</div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{s.section_text}</p>
              </SubCard>
            ))}
          </div>
        </div>
      ));
    }

    /* IPC */
    if (selected === 'ipc') {
      return paginate(data as any[]).map((ch:any, i:number) => (
        <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'18px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <Dots/>
          <div style={{ position:'relative', zIndex:1 }}>
            <SectionBadge color={ac!.accent}>Chapter {ch.chapter}</SectionBadge>
            <h3 style={{ fontSize:15, fontWeight:700, color:T.text, fontFamily:'system-ui,sans-serif', marginBottom:12, lineHeight:1.5 }}>{ch.title}</h3>
            {ch.sections?.map((s:any, j:number) => (
              <SubCard key={j}>
                <div style={{ fontWeight:600, color:T.text, fontSize:13, marginBottom:5, fontFamily:'system-ui,sans-serif' }}>§{s.section} — {s.title}</div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{s.text}</p>
              </SubCard>
            ))}
          </div>
        </div>
      ));
    }

    /* PERSONAL */
    if (selected === 'personal') {
      return paginate(data as any[]).map((entry:any, i:number) => (
        <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'18px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <Dots/>
          <div style={{ position:'relative', zIndex:1 }}>
            <SectionBadge color={ac!.accent}>{entry.religion}</SectionBadge>
            {Object.entries(entry.laws).map(([topic, law]:any) => (
              <SubCard key={topic}>
                <div style={{ fontWeight:600, color:T.text, fontSize:13, marginBottom:5, fontFamily:'system-ui,sans-serif', textTransform:'capitalize' }}>{topic}</div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:'0 0 4px' }}><strong style={{ color:T.text }}>Act:</strong> {law.act_name}</p>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{law.description}</p>
              </SubCard>
            ))}
          </div>
        </div>
      ));
    }

    /* SPECIAL ACTS */
    if (selected === 'special') {
      return paginate(data as any[]).map((act:any, i:number) => (
        <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'18px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <Dots/>
          <div style={{ position:'relative', zIndex:1 }}>
            <SectionBadge color={ac!.accent}>{act.name}</SectionBadge>
            {act.prompt && <p style={{ fontSize:13, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', marginBottom:10 }}>{act.prompt}</p>}
            {act.details?.purpose && (
              <SubCard>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.amber, marginBottom:6 }}>PURPOSE</div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{act.details.purpose}</p>
              </SubCard>
            )}
          </div>
        </div>
      ));
    }

    /* TAX */
    if (selected === 'tax') {
      const admin = (data as any).administrative_laws || [];
      const tax   = (data as any).tax_laws || [];
      return (
        <>
          <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.teal, letterSpacing:2, marginBottom:12 }}>★ ADMINISTRATIVE LAWS</div>
          {paginate(admin).map((l:any, i:number) => (
            <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'14px 16px', marginBottom:12, position:'relative', overflow:'hidden' }}>
              <Dots/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:T.text, fontFamily:'system-ui,sans-serif', marginBottom:4 }}>{l.act_name} <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.muted }}>({l.year})</span></div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{l.purpose}</p>
              </div>
            </div>
          ))}
          <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:T.green, letterSpacing:2, margin:'18px 0 12px' }}>★ TAX LAWS</div>
          {paginate(tax).map((l:any, i:number) => (
            <div key={i} style={{ background:ac!.card, border:`2px solid ${ac!.bdr}`, borderRadius:10, boxShadow:`4px 4px 0 ${ac!.bdr}`, padding:'14px 16px', marginBottom:12, position:'relative', overflow:'hidden' }}>
              <Dots/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:T.text, fontFamily:'system-ui,sans-serif', marginBottom:4 }}>{l.act_name} <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.muted }}>({l.year})</span></div>
                <p style={{ fontSize:12, color:T.textMd, lineHeight:1.8, fontFamily:'system-ui,sans-serif', margin:0 }}>{l.purpose}</p>
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  /* Which array to check length for hasNext */
  const getDataLen = (): number => {
    if (!selected) return 0;
    const d = lawFiles[selected as keyof typeof lawFiles];
    if (selected === 'tax') return Math.max(
      ((d as any).administrative_laws || []).length,
      ((d as any).tax_laws || []).length,
    );
    return Array.isArray(d) ? d.length : 0;
  };

  const hasNext = page * ITEMS_PER_PAGE < getDataLen();

  return (
    <div style={{ minHeight:'100vh', background:T.bg, position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing:border-box; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .pbtn { font-family:'Press Start 2P',monospace; cursor:pointer; transition:transform .08s,box-shadow .08s; }
        .pbtn:hover  { transform:translate(-1px,-1px); }
        .pbtn:active { transform:translate(1px,1px); box-shadow:none !important; }
        .sidebar-btn { transition:background .12s, border-color .12s, box-shadow .12s; }
        ::-webkit-scrollbar       { width:5px; background:${T.wall}; }
        ::-webkit-scrollbar-thumb { background:${T.wood}; border-radius:3px; }
      `}</style>

      {/* Page dot texture */}
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
            LEGAL HUB
          </span>
          <div style={{ display:'flex', gap:3 }}>
            {[T.saffron, T.gold, T.greenLt].map((c,i) => (
              <div key={i} style={{ width:7, height:7, background:c, borderRadius:'50%', animation:`blink 1.4s ${i*0.4}s infinite` }}/>
            ))}
          </div>
        </div>

        {/* Shimmer line */}
        <div style={{
          height:4,
          background:`linear-gradient(90deg,${T.saffron},${T.goldLt},${T.woodLt},${T.goldLt},${T.saffron})`,
          backgroundSize:'200% 100%',
          animation:'shimmer 4s linear infinite',
        }}/>

        {/* ── LAYOUT ── */}
        <div style={{ display:'flex', minHeight:'calc(100vh - 58px)', alignItems:'stretch' }}>

          {/* ── SIDEBAR ── */}
          <div style={{
            width:        260,
            flexShrink:   0,
            background:   'rgba(253,246,228,0.96)',
            borderRight:  `3px solid ${T.woodXlt}`,
            boxShadow:    `4px 0 16px rgba(44,26,8,0.08)`,
            display:      'flex',
            flexDirection:'column',
            overflowY:    'auto',
          }}>
            {/* Sidebar header */}
            <div style={{
              background:   T.wood,
              borderBottom: `3px solid rgba(44,26,8,0.3)`,
              padding:      '12px 16px',
              ...dots,
            }}>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:T.goldLt, marginBottom:4 }}>⚖ LEGAL HUB</div>
              <div style={{ fontSize:11, color:T.woodXlt, fontFamily:'system-ui,sans-serif' }}>Select a law category</div>
            </div>

            {/* Nav buttons */}
            <div style={{ padding:'14px 12px', display:'flex', flexDirection:'column', gap:8, flex:1 }}>
              {Object.keys(lawFiles).map(key => {
                const a       = ACCENTS[key];
                const isActive= selected === key;
                return (
                  <button
                    key={key}
                    className="sidebar-btn"
                    onClick={() => { setSelected(key); setPage(1); }}
                    style={{
                      display:      'flex', alignItems:'center', gap:10,
                      background:   isActive ? a.accent : T.cream,
                      border:       `2px solid ${isActive ? a.accent : T.woodXlt}`,
                      borderRadius: 8,
                      padding:      '10px 12px',
                      cursor:       'pointer',
                      textAlign:    'left',
                      boxShadow:    isActive ? `3px 3px 0 rgba(44,26,8,0.2)` : `2px 2px 0 ${T.woodXlt}`,
                      position:     'relative', overflow:'hidden',
                    }}
                  >
                    <div style={{ position:'absolute', inset:0, ...dots, pointerEvents:'none', opacity:0.5 }}/>
                    <span style={{ fontSize:18, zIndex:1, flexShrink:0 }}>{a.icon}</span>
                    <div style={{ zIndex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:isActive ? '#fdf6e4' : T.text, fontFamily:'system-ui,sans-serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {a.label}
                      </div>
                      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:6, color:isActive ? 'rgba(255,255,255,0.65)' : T.muted, marginTop:2 }}>
                        {key.toUpperCase()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sidebar railing footer */}
            <div style={{ display:'flex', overflow:'hidden', height:6 }}>
              {Array.from({length:20}).map((_,i) => (
                <div key={i} style={{ flex:'none', width:26, height:6, background:i%2===0 ? T.wood : T.woodLt, borderRight:`1px solid ${T.woodDark}` }}/>
              ))}
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div style={{ flex:1, padding:'24px 28px 48px', overflowY:'auto' }}>

            {/* Sticky selected category header */}
            {selected && ac && (
              <div style={{
                position:'sticky', top:0, zIndex:5,
                background:'rgba(245,239,224,0.96)',
                borderBottom:`2px solid ${T.woodXlt}`,
                padding:'12px 0 10px',
                marginBottom:20,
                display:'flex', alignItems:'center', gap:12,
                backdropFilter:'blur(4px)',
                animation:'fadeUp 0.3s ease',
              }}>
                <div style={{
                  width:40, height:40, borderRadius:8,
                  background:ac.accent,
                  border:`2px solid rgba(44,26,8,0.18)`,
                  boxShadow:`3px 3px 0 rgba(44,26,8,0.18)`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:20, flexShrink:0,
                }}>{ac.icon}</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, color:T.text, fontFamily:'system-ui,sans-serif' }}>{ac.label}</div>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:T.muted, marginTop:2 }}>
                    PAGE {page}
                  </div>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!selected && (
              <div style={{
                display:'flex', flexDirection:'column', alignItems:'center',
                justifyContent:'center', padding:'60px 20px', textAlign:'center',
                background:T.cream, border:`2px solid ${T.woodXlt}`,
                borderRadius:10, boxShadow:`4px 4px 0 ${T.woodXlt}`,
                position:'relative', overflow:'hidden',
              }}>
                <Dots/>
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ fontSize:36, marginBottom:14 }}>🏛</div>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:T.muted, lineHeight:2.8 }}>
                    SELECT A LAW 👈<br/>
                    <span style={{ fontSize:7, color:'#b0a078' }}>CHOOSE A CATEGORY FROM THE SIDEBAR</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rendered law content */}
            <div style={{ animation:'fadeUp 0.3s ease' }}>
              {renderData()}
            </div>

            {/* Pagination */}
            {selected && (
              <PageBar
                page={page}
                hasNext={hasNext}
                onPrev={() => setPage(p => p-1)}
                onNext={() => setPage(p => p+1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}