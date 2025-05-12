import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { Comment } from "@/types/comment.type";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tweetId = searchParams.get("tweetId");

    if (!tweetId) {
      return NextResponse.json(
        { error: "Tweet ID is required" },
        { status: 400 }
      );
    }

    const commentQuery = groq`
        *[_type == "comment" && references(*[_type == "tweet" && _id == $tweetId]._id)] {
        _id,
            ...
        } | order(_createdAt desc)
    `;

    const comments: Comment[] = await client.fetch(commentQuery, {
        tweetId
    });

    return NextResponse.json({ data: comments }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comments ", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
