import clientPromise from "@/lib/mongodb";
import { askAI } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { title, summary } = await req.json();

    console.log("BRIEF API HIT:", title);

    const client = await clientPromise;
    const db = client.db("adalat");

    const existing = await db.collection("briefs").findOne({ title });

    if (existing) {
      return Response.json({ data: existing.data });
    }

    const prompt = `
Explain this case clearly:

Title: ${title}
Summary: ${summary}

Explain:
- What happened
- Why it happened
- Verdict
- Full story
`;

    const aiRes = await askAI(prompt);

    const data = { explanation: aiRes };

    await db.collection("briefs").insertOne({
      title,
      data,
      createdAt: new Date()
    });

    return Response.json({ data });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error" }, { status: 500 });
  }
}