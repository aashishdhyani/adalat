import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { query } = await req.json();

  const normalized = query.toLowerCase().trim();

  const client = await clientPromise;
  const db = client.db("adalat");

  // ✅ STEP 1: CHECK DATABASE FIRST
  const existing = await db.collection("schemes").findOne({
    query: normalized
  });

  if (existing) {
    console.log("✅ FROM DB:", normalized);
    return NextResponse.json(existing.data);
  }

  console.log("🔥 API CALL:", normalized);

  // 🧠 AI PROMPT
  const prompt = `
You are a government schemes data generator.

User query: ${query}

Return ONLY a valid JSON array.

Each item MUST be a REAL Indian government scheme.

Format:
[
  {
    "id": 1,
    "name": "PM-KISAN",
    "category": "farmer",
    "income": "low",
    "state": "all",
    "benefit": "₹6000 per year",
    "description": "Financial support for farmers",
    "eligibility": "Small and marginal farmers",
    "applyLink": "https://pmkisan.gov.in/"
  }
]
`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }]
        })
      }
    );

    const data = await response.json();

    let content = data?.choices?.[0]?.message?.content || "[]";

    // 🔥 CLEAN JSON
    const start = content.indexOf("[");
    const end = content.lastIndexOf("]");
    if (start !== -1 && end !== -1) {
      content = content.slice(start, end + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = [];
    }

    // ✅ STEP 2: SAVE IN DB
    await db.collection("schemes").insertOne({
      query: normalized,
      data: parsed,
      createdAt: new Date()
    });

    return NextResponse.json(parsed);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI failed" });
  }
}