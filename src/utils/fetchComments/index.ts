import { Comment } from "@/types/comment.type";

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?tweetId=${tweetId}`
  );

  const data = await res.json();
  const comments: Comment[] = data.data;

  return comments;
};
