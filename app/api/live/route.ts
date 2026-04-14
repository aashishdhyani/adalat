import clientPromise from "@/lib/mongodb";
import { askAI } from "@/lib/openrouter";
import { searchNews } from "@/lib/search";

export async function POST(req: Request) {
  const { query } = await req.json();

  const normalized = query.toLowerCase().trim();

  const client = await clientPromise;
  const db = client.db("adalat");

  // 🔍 CHECK CACHE
  const existing = await db.collection("posts").findOne({
    query: normalized
  });

  if (existing) {
    return Response.json({ data: existing.data });
  }

  // 🔎 REAL SEARCH
  const searchData = await searchNews(query);

  const context = searchData.results
    ?.map((r: any) => `${r.title}: ${r.content}`)
    .join("\n\n");

  // 🧠 AI GENERATION
  const prompt = `
Using this info:

${context}

Create JSON:
{
  "title": "${query}",
  "summary": "",
  "verdict": "",
  "why": "",
  "lastUpdated": "recent",
  "source": "${searchData.results?.[0]?.url || "#"}"
}
`;

  const aiRes = await askAI(prompt);

  let parsed;

  try {
    parsed = JSON.parse(aiRes);
  } catch {
    parsed = {
      title: query,
      summary: context,
      lastUpdated: "recent"
    };
  }

  // 💾 SAVE
  await db.collection("posts").insertOne({
    query: normalized,
    data: parsed,
    createdAt: new Date()
  });

  return Response.json({ data: parsed });
}