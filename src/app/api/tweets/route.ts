import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { groq } from "next-sanity";
import { Tweet, TweetBody } from "@/types/tweet.type";

export async function GET() {
  try {
    const feedQuery = groq`
        *[_type == "tweet" && blockTweet != true]{
        _id,
        ...
        } | order(_createdAt desc)
    `;

    const tweets: Tweet[] = await client.fetch(feedQuery);

    return NextResponse.json(
      {
        success: true,
        data: tweets,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to fetch tweets ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tweets",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: TweetBody = await request.json();

    if (
      !data.text ||
      typeof data.text !== "string" ||
      data.text.trim().length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          message: "Tweet text is required and must be a non-empty string",
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
            _type: "tweet",
            text: data.text.trim(),
            username: data.username.trim(),
            blockTweet: false,
            profileImg: data.profileImg?.trim(),
            image: data.image?.trim(),
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
        json.message || json.error?.description || "Failed to create tweet";
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
        message: "Tweet created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to post tweet:", error);
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
