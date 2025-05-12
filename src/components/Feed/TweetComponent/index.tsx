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

interface Props {
  tweet: Tweet;
}

const TweetComponent = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(tweet._id);
      setComments(comments);
    };

    refreshComments();
  }, [tweet._id]);

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

      <div className="flex justify-between mt-5">
        <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <p>1</p>
        </div>
        <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
          <HeartIcon className="h-5 w-5" />
          <p>1</p>
        </div>
        <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
          <ChartBarIcon className="h-5 w-5" />
          <p>1</p>
        </div>
        <div className="flex gap-4">
          <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
            <BookmarkIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
            <ArrowUpTrayIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Comments bar logic */}
      {comments.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
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
