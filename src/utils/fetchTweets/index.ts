import { Tweet } from "@/types/tweet.type";

export const fetchTweets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tweets`);

  const data = await res.json();
  const tweets: Tweet[] = data.data;

  return tweets;
};
