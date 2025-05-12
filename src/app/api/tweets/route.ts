import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { Tweet } from "@/types/tweet.type";

export async function GET() {
  try {
    const feedQuery = groq`
        *[_type == "tweet" && blockTweet != true]{
        _id,
        ...
        } | order(createdAt desc)
    `;

    const tweets: Tweet[] = await client.fetch(feedQuery);

    return NextResponse.json({ data: tweets }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tweets ", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}
