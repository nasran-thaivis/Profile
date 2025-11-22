import { NextResponse } from "next/server";

// Placeholder database helper.
// Replace these with your real DB client calls (Supabase, MongoDB, Firebase, etc.).
const DB = {
  async getReviews() {
    // Example: return await client.collection('reviews').find({}).sort({ timestamp: -1 }).toArray();
    // Fallback: return an empty array so GET works without a database configured.
    return [];
  },
  async createReview(payload) {
    // Example: insert into DB and return the created document with id/timestamp.
    // const res = await client.collection('reviews').insertOne(payload);
    // return { id: res.insertedId.toString(), ...payload };
    return { id: Date.now().toString(), ...payload };
  },
};

export async function GET() {
  try {
    const reviews = await DB.getReviews();
    return NextResponse.json(reviews);
  } catch (err) {
    console.error("GET /api/reviews error", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reviewerName, rating, comment } = body || {};
    if (!reviewerName || !comment || typeof rating !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const payload = {
      reviewerName,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    const created = await DB.createReview(payload);
    return NextResponse.json({ ok: true, review: created }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews error", err);
    return NextResponse.json({ error: err?.message || "Failed to create review" }, { status: 500 });
  }
}
