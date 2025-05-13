import { Comment } from "@/types/comment.type";

export const fetchComments = async (tweetId: string) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL!;

  const res = await fetch(`${baseUrl}/api/comments?tweetId=${tweetId}`);

  const data = await res.json();
  const comments: Comment[] = data.data;

  return comments;
};
