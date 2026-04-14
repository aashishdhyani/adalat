import clientPromise from "@/lib/mongodb";
import { askAI } from "@/lib/openrouter";

export async function POST(req: Request) {
  const { name, description } = await req.json();

  const client = await clientPromise;
  const db = client.db("adalat");

  const existing = await db.collection("schemeBriefs").findOne({ name });

  if (existing) {
    return Response.json({ data: existing.data });
  }

  const prompt = `
Explain this government scheme in simple terms:

Name: ${name}
Description: ${description}

Explain:
- What it actually does
- Who should apply
- Real benefit
- Step-by-step how to apply
`;

  const aiRes = await askAI(prompt);

  const data = { explanation: aiRes };

  await db.collection("schemeBriefs").insertOne({
    name,
    data,
    createdAt: new Date()
  });

  return Response.json({ data });
}