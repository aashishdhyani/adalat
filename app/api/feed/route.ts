import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("adalat");

    const posts = await db
      .collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    console.log("FEED POSTS:", posts);

    return Response.json(
      { data: posts },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("FEED API ERROR:", error);

    return Response.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}