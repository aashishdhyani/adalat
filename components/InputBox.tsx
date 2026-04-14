"use client";

import { useState, useRef } from "react";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  onSubmit: () => void;
};

const EXAMPLES = [
  "Online fraud of ₹50,000",
  "Domestic violence by husband",
  "Landlord not returning deposit",
  "Cheque bounce by a friend",
  "Employer not paying salary",
  "Cyber stalking on Instagram",
  "Property dispute with neighbour",
  "Consumer complaint against brand",
];

export default function InputBox({ query, setQuery, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (ex: string) => {
    setQuery(ex);
    setOpen(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <>
      {/* ── Quick examples drawer ── */}
      {open && (
        <div style={{
          position:"fixed",
          bottom:70, left:0, right:0,
          zIndex:99,
          background:"rgba(44,26,8,0.97)",
          borderTop:"3px solid #b08848",
          padding:"14px 16px 12px",
        }}>
          <div style={{
            fontFamily:"'Press Start 2P',monospace",
            fontSize:8, color:"#e8b020",
            marginBottom:10, letterSpacing:2,
          }}>★ QUICK CASE EXAMPLES ★</div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {EXAMPLES.map(ex => (
              <button
                key={ex}
                onClick={() => pick(ex)}
                style={{
                  background:"#3a2a14",
                  color:"#e8d0a0",
                  border:"2px solid #6b4c28",
                  borderRadius:4,
                  padding:"6px 10px",
                  fontSize:11,
                  cursor:"pointer",
                  boxShadow:"2px 2px 0 #2c1a08",
                  fontFamily:"system-ui,sans-serif",
                  lineHeight:1.4,
                  transition:"background 0.1s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background="#6b4c28")}
                onMouseLeave={e => (e.currentTarget.style.background="#3a2a14")}
              >{ex}</button>
            ))}
          </div>

          <div style={{
            fontSize:7, color:"rgba(255,255,255,0.25)",
            marginTop:10, fontFamily:"'Press Start 2P',monospace",
          }}>CLICK AN EXAMPLE OR TYPE YOUR OWN BELOW</div>
        </div>
      )}

      {/* ── Pixel brick strip ── */}
      <div style={{
        position:"fixed",
        bottom:68, left:0, right:0,
        height:4, zIndex:100,
        display:"flex", overflow:"hidden",
      }}>
        {Array.from({length:80}).map((_,i) => (
          <div key={i} style={{
            flex:"none", width:28, height:4,
            background: i%2===0 ? "#7c5c3a" : "#6b4c28",
            borderRight:"1px solid #2c1a08",
          }}/>
        ))}
      </div>

      {/* ── Main input bar ── */}
      <div style={{
        position:"fixed",
        bottom:0, left:0, right:0,
        zIndex:100,
        background:"rgba(44,26,8,0.97)",
        borderTop:"3px solid #b08848",
        padding:"9px 12px",
        display:"flex", gap:8, alignItems:"center",
      }}>

        {/* 🎮 examples toggle */}
        <button
          onClick={() => setOpen(!open)}
          title="Quick examples"
          style={{
            background: open ? "#b08848" : "#3a2a14",
            color: open ? "#2c1a08" : "#e8b020",
            border:"2px solid #b08848",
            borderRadius:6,
            width:38, height:38,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16,
            cursor:"pointer",
            flexShrink:0,
            boxShadow:"2px 2px 0 #2c1a08",
            transition:"all 0.1s",
          }}
        >🎮</button>

        {/* Input */}
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSubmit()}
          placeholder="Describe your case... (e.g. online fraud, property dispute)"
          style={{
            flex:1,
            background:"#3a2a14",
            border:"2px solid #b08848",
            borderRadius:6,
            padding:"9px 13px",
            color:"#fdf6e4",
            fontFamily:"system-ui,sans-serif",
            fontSize:13,
            outline:"none",
            minWidth:0,
          }}
        />

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={!query.trim()}
          style={{
            background: query.trim() ? "#b08848" : "#4a3420",
            color: query.trim() ? "#2c1a08" : "#7a6040",
            border:"2px solid #2c1a08",
            borderRadius:6,
            padding:"9px 14px",
            fontFamily:"'Press Start 2P',monospace",
            fontSize:8,
            fontWeight:"bold",
            cursor: query.trim() ? "pointer" : "not-allowed",
            boxShadow: query.trim() ? "3px 3px 0 #2c1a08" : "none",
            whiteSpace:"nowrap",
            flexShrink:0,
            transition:"all 0.12s",
          }}
        >⚖️ FILE CASE</button>

      </div>
    </>
  );
}