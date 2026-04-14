import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("adalat");

  const posts = await db
    .collection("liveCases") 
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(
    { data: posts },
    { headers: { "Cache-Control": "no-store" } }
  );
}