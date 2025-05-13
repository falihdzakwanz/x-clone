import { Tweet } from "@/types/tweet.type";

export const fetchTweets = async () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://x-clone.vercel.app" 
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/tweets`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tweets");
  }

  const data = await res.json();
  const tweets: Tweet[] = data.data;

  return tweets;
};
