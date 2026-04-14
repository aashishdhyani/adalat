import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("adalat");

    const posts = await db
      .collection("schemes")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(
      { data: posts },
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (err) {
    console.error(err);
    return Response.json({ data: [] });
  }
}