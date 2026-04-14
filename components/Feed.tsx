"use client";

import { useEffect, useState } from "react";
import BriefPopup from "./BriefPopup";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [brief, setBrief] = useState<any>(null);

  const fetchFeed = async () => {
    const res = await fetch("/api/feed");
    const json = await res.json();
    setPosts(json.data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const getBrief = async (post: any) => {
    const res = await fetch("/api/brief", {
      method: "POST",
      body: JSON.stringify({
        title: post.data.title,
        summary: post.data.summary
      })
    });

    const json = await res.json();
    setBrief(json.data);
  };

  return (
    <div style={{ marginTop: 20 }}>

      {posts.map((post, i) => (
        <div key={i} style={{
          border: "2px solid gold",
          padding: 12,
          marginBottom: 12
        }}>
          {/* 🧠 */}
          <button onClick={() => getBrief(post)}>🧠</button>

          <h3>{post.data.title}</h3>

          <p>{post.data.summary}</p>

          <p>{post.data.verdict}</p>

          <a href={post.data.source}>Source</a>
        </div>
      ))}

      <BriefPopup data={brief} onClose={() => setBrief(null)} />
    </div>
  );
}