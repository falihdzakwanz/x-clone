"use client";

import { Tweet } from "@/types/tweet.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Time from "./Time";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Comment } from "@/types/comment.type";
import { fetchComments } from "@/utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  tweet: Tweet;
}

const TweetComponent = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(tweet._id);
      setComments(comments);
    };

    refreshComments();
  }, [tweet._id]);

  const postComment = async () => {
    if (!input.trim() || !session) return;

    const loadingToast = toast.loading("Posting reply...");

    const commentData = {
      comment: input,
      tweetId: tweet._id,
      username: session.user?.name || "Anonymous",
      profileImg: session.user?.image || "https://links.papareact.com/gll",
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      toast.success("Reply posted!", { id: loadingToast });
      setCommentBoxVisible(false);
      setInput("");

      // Refresh comments
      const comments: Comment[] = await fetchComments(tweet._id);
      setComments(comments);
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply", { id: loadingToast });
    }
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment();
  }

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <Image
          src={tweet.profileImg}
          alt=""
          width={20}
          height={20}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p>

            <Time time={tweet._createdAt} />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <Image
              src={tweet.image}
              alt=""
              width={400}
              height={400}
              className="m-5 ml-0 mb-1 rounded-lg max-h-60 shadow-sm object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-3 text-sm text-gray-700">
        {/* Comment */}
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="group flex items-center cursor-pointer space-x-1"
        >
          <span className="p-1 rounded-full group-hover:bg-twitter/20 transition">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </span>
          <p className="group-hover:text-twitter transition">
            {comments.length}
          </p>
        </div>

        {/* Retweet */}
        <div className="group flex items-center cursor-pointer space-x-1">
          <span className="p-1 rounded-full group-hover:bg-green-200 transition">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </span>
          <p className="group-hover:text-green-600 transition">0</p>
        </div>

        {/* Like */}
        <div className="group flex items-center cursor-pointer space-x-1">
          <span className="p-1 rounded-full group-hover:bg-pink-200 transition">
            <HeartIcon className="h-5 w-5" />
          </span>
          <p className="group-hover:text-pink-500 transition">0</p>
        </div>

        {/* Views */}
        <div className="group flex items-center cursor-pointer space-x-1">
          <span className="p-1 rounded-full group-hover:bg-twitter/20 transition">
            <ChartBarIcon className="h-5 w-5" />
          </span>
          <p className="group-hover:text-twitter transition">
            {comments.length * 2}
          </p>
        </div>

        {/* Bookmark & Share */}
        <div className="flex space-x-4">
          <div className="group flex items-center cursor-pointer">
            <span className="p-1 rounded-full group-hover:bg-twitter/20 transition">
              <BookmarkIcon className="h-5 w-5" />
            </span>
          </div>
          <div className="group flex items-center cursor-pointer">
            <span className="p-1 rounded-full group-hover:bg-twitter/20 transition">
              <ArrowUpTrayIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      {/* Comments bar logic */}
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-2 flex space-x-3">
          <input
            type="text"
            placeholder="Post your reply"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-200"
          >
            Reply
          </button>
        </form>
      )}

      {comments.length > 0 && (
        <div className="my-2 max-h-44 space-y-3 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <Image
                src={comment.profileImg}
                alt=""
                width={30}
                height={30}
                className="h-7 w-7 object-cover rounded-full mt-2"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{comment.username.replace(/\s+/g, "").toLocaleLowerCase()}
                  </p>
                  <Time time={comment._createdAt} />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetComponent;
