"use client";

export default function BriefPopup({ data, onClose }: any) {
  if (!data) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)" }}>
      <div style={{ background: "#111", padding: 20, margin: "100px auto", width: 400 }}>
        <h3>🧠 Full Case</h3>
        <p>{data.explanation}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}