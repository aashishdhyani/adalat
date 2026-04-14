"use client";

import { useState } from "react";

type Props = {
  role: string;
  content: string;
  color: string;               
  onTalkMore?: () => void;
  sprite?: React.ReactNode;
  accentColor?: string;
  cardBg?: string;
  cardBorder?: string;
};

export default function CharacterCard({
  role,
  content,
  onTalkMore,
  sprite,
  accentColor  = "#6b4c28",
  cardBg       = "#fdf6e4",
  cardBorder   = "#c8b090",
}: Props) {
  const [expanded,     setExpanded]     = useState(false);
  const [chatOpen,     setChatOpen]     = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "user"|"ai"; text: string }[]>([]);
  const [chatInput,    setChatInput]    = useState("");

  const preview = content
    ? content.slice(0, 180) + (content.length > 180 ? "..." : "")
    : "";

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { from: "user", text: chatInput },
      { from: "ai",   text: `[Connect followUp API for: "${chatInput}"]` },
    ]);
    setChatInput("");
  };

  /* ── Empty / loading card ─────────────────────────────────────── */
  if (!content) {
    return (
      <div style={{
        background: cardBg,
        border: `2px solid ${cardBorder}`,
        borderRadius: 8,
        padding: 16,
        boxShadow: `4px 4px 0 ${cardBorder}`,
        opacity: 0.65,
        fontFamily: "'Press Start 2P', monospace",
        position: "relative",
        overflow: "hidden",
      }}>
        <PixelPattern />
        {sprite && <div style={{ display:"flex", justifyContent:"center", marginBottom:10, filter:"grayscale(1) opacity(0.5)" }}>{sprite}</div>}
        <div style={{ fontSize:8, color:"#a09070", marginBottom:8 }}>{role}</div>
        <div style={{
          border:"2px dashed #d0c0a0", borderRadius:6,
          padding:"14px 10px", textAlign:"center",
          fontSize:7, color:"#c0b090",
        }}>AWAITING CASE...</div>
      </div>
    );
  }

  /* ── Active card ──────────────────────────────────────────────── */
  return (
    <div style={{
      background: cardBg,
      border: `2px solid ${cardBorder}`,
      borderRadius: 8,
      boxShadow: `4px 4px 0 ${cardBorder}`,
      fontFamily: "'Press Start 2P', monospace",
      position: "relative",
      overflow: "hidden",
      animation: "cardIn 0.3s ease",
    }}>
      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .chat-msg-user { align-self:flex-end; }
        .chat-msg-ai   { align-self:flex-start; }
        .chat-input-wrap input::placeholder { color:#a09070; }
      `}</style>

      <PixelPattern />

      <div style={{ position:"relative", zIndex:1, padding:16 }}>

        {/* Role badge + bubble icon */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{
            background: accentColor,
            border: "2px solid rgba(0,0,0,0.15)",
            borderRadius: 4,
            padding: "5px 10px",
            fontSize: 8,
            color: "#fdf6e4",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
          }}>{role}</div>

          <div style={{
            marginLeft:"auto",
            background:"#e8b020",
            border:"2px solid rgba(0,0,0,0.15)",
            borderRadius:"50%",
            width:26, height:26,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13,
            boxShadow:"2px 2px 0 rgba(0,0,0,0.12)",
            flexShrink:0,
          }}>💬</div>
        </div>

        {/* Sprite */}
        {sprite && (
          <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
            {sprite}
          </div>
        )}

        {/* Content bubble */}
        <div style={{
          background:"rgba(44,26,8,0.06)",
          border:"2px solid rgba(44,26,8,0.10)",
          borderRadius:8,
          padding:"12px 12px",
          fontSize:12,
          color:"#2c1a08",
          lineHeight:1.8,
          whiteSpace:"pre-wrap",
          fontFamily:"system-ui, sans-serif",
          fontWeight:400,
        }}>
          {expanded ? content : preview}
        </div>

        {/* Action buttons */}
        <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
          <button
            className="pbtn"
            onClick={() => setExpanded(!expanded)}
            style={{
              background:"rgba(44,26,8,0.08)",
              color:"#2c1a08",
              border:"2px solid rgba(44,26,8,0.2)",
              borderRadius:4,
              padding:"5px 10px",
              fontSize:7,
              boxShadow:"2px 2px 0 rgba(44,26,8,0.15)",
              fontFamily:"'Press Start 2P',monospace",
            }}
          >{expanded ? "▲ LESS" : "▼ READ ALL"}</button>

          {onTalkMore && (
            <button
              className="pbtn"
              onClick={onTalkMore}
              style={{
                background:"var(--gold-lt, #e8b020)",
                color:"#2c1a08",
                border:"2px solid rgba(44,26,8,0.2)",
                borderRadius:4,
                padding:"5px 10px",
                fontSize:7,
                boxShadow:"2px 2px 0 rgba(44,26,8,0.2)",
                fontFamily:"'Press Start 2P',monospace",
              }}
            >💬 TALK MORE</button>
          )}

          <button
            className="pbtn"
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              background: chatOpen ? accentColor : "transparent",
              color: chatOpen ? "#fdf6e4" : accentColor,
              border:`2px solid ${accentColor}`,
              borderRadius:4,
              padding:"5px 10px",
              fontSize:7,
              boxShadow:"2px 2px 0 rgba(44,26,8,0.15)",
              fontFamily:"'Press Start 2P',monospace",
            }}
          >{chatOpen ? "✕ CLOSE" : "💬 CHAT"}</button>
        </div>

        {/* ── EXPAND CHAT PANEL ── */}
        {chatOpen && (
          <div style={{
            marginTop:12,
            background:"rgba(44,26,8,0.05)",
            border:"2px solid rgba(44,26,8,0.12)",
            borderRadius:8,
            overflow:"hidden",
          }}>
            {/* Message list */}
            <div style={{
              maxHeight:200, overflowY:"auto",
              padding:10,
              display:"flex", flexDirection:"column", gap:8,
            }}>
              {chatMessages.length === 0 ? (
                <div style={{
                  textAlign:"center", fontSize:7,
                  color:"#a09070", padding:"14px 0",
                  fontFamily:"'Press Start 2P',monospace",
                }}>ASK THIS CHARACTER ANYTHING...</div>
              ) : chatMessages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background: m.from === "user" ? accentColor : "rgba(44,26,8,0.08)",
                  color: m.from === "user" ? "#fdf6e4" : "#2c1a08",
                  border:"2px solid rgba(44,26,8,0.12)",
                  borderRadius:6,
                  padding:"6px 10px",
                  maxWidth:"82%",
                  fontSize:12,
                  lineHeight:1.6,
                  fontFamily:"system-ui,sans-serif",
                }}>{m.text}</div>
              ))}
            </div>

            {/* Chat input */}
            <div className="chat-input-wrap" style={{
              display:"flex",
              borderTop:"2px solid rgba(44,26,8,0.10)",
            }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                placeholder="Ask a follow-up..."
                style={{
                  flex:1,
                  background:"transparent",
                  border:"none",
                  padding:"8px 12px",
                  color:"#2c1a08",
                  fontSize:12,
                  fontFamily:"system-ui,sans-serif",
                  outline:"none",
                }}
              />
              <button
                onClick={sendChat}
                style={{
                  background:accentColor,
                  border:"none",
                  borderLeft:"2px solid rgba(44,26,8,0.1)",
                  padding:"8px 14px",
                  color:"#fdf6e4",
                  fontFamily:"'Press Start 2P',monospace",
                  fontSize:7,
                  cursor:"pointer",
                }}
              >SEND ▶</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Subtle pixel dot texture overlay ── */
function PixelPattern() {
  return (
    <div style={{
      position:"absolute", inset:0,
      backgroundImage:"radial-gradient(circle, rgba(44,26,8,0.045) 1px, transparent 1px)",
      backgroundSize:"8px 8px",
      pointerEvents:"none", zIndex:0,
    }}/>
  );
}