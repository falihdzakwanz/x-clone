import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { Comment, CommentBody } from "@/types/comment.type";

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
          _createdAt,
          comment,
          profileImg,
          username,
          ...
        } | order(_createdAt asc)
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

export async function POST(request: NextRequest) {
  try {
    const data: CommentBody = await request.json();

    if (
      !data.comment ||
      typeof data.comment !== "string" ||
      data.comment.trim().length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          message: "Comment is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    if (!data.username || typeof data.username !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          message: "Username is required",
        },
        { status: 400 }
      );
    }

    const mutations = {
      mutations: [
        {
          create: {
            _type: "comment",
            comment: data.comment.trim(),
            username: data.username.trim(),
            profileImg: data.profileImg?.trim(),
            tweet: {
              _type: "reference",
              _ref: data.tweetId
            }
          },
        },
      ],
    };

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

    const result = await fetch(apiEndpoint, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();

    if (!result.ok) {
      const errorMessage =
        json.message || json.error?.description || "Failed to create comment";
      return NextResponse.json(
        {
          success: false,
          error: "Sanity API Error",
          message: errorMessage,
        },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: json,
        message: "Comment created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to post comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}