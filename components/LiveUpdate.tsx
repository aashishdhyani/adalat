"use client";

import { useState } from "react";

export default function LiveUpdates({ refreshFeed }: any) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    await fetch("/api/live", {
      method: "POST",
      body: JSON.stringify({ query })
    });

    setLoading(false);
    setQuery("");

    // 🔥 refresh feed after new post
    refreshFeed();
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search case..."
      />

      <button onClick={handleSearch}>
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
}