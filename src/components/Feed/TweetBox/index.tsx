"use client";

import { Tweet, TweetBody } from "@/types/tweet.type";
import { fetchTweets } from "@/utils/fetchTweets";
import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  GlobeAsiaAustraliaIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const { data: session } = useSession();

  const postTweet = async () => {
    if (!input.trim() || !session) return;

    setIsPosting(true);
    const loadingToast = toast.loading("Posting tweet...");

    try {
      const tweetBody: TweetBody = {
        text: input,
        username: session.user?.name || "Anonymous",
        profileImg: session.user?.image || "https://links.papareact.com/gll",
      };

      const response = await fetch("/api/tweets", {
        body: JSON.stringify(tweetBody),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to post tweet");
      }

      const newTweets = await fetchTweets();
      setTweets(newTweets);
      setInput("");
      toast.success("Tweet posted successfully!", { id: loadingToast });
    } catch (error) {
      console.error("Error posting tweet:", error);
      toast.error("Failed to post tweet", { id: loadingToast });
    } finally {
      setIsPosting(false);
    }
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    postTweet();
  };

  return (
    <div className="flex space-x-2 px-5 py-2">
      <Image
        className="mt-2 h-10 w-10 object-cover rounded-full"
        src={session?.user.image || "https://links.papareact.com/gll"}
        alt="User profile"
        width={50}
        height={50}
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening?"
            className="h-16 w-full text-xl outline-none placeholder:text-xl placeholder:text-gray-500"
            disabled={isPosting}
          />

          {/* Everyone can reply */}
          <div className="text-sm text-twitter font-semibold mt-2 mb-3 flex items-center space-x-1 cursor-pointer hover:bg-twitter/10 transition-colors duration-200 max-w-fit p-1 px-2 rounded-full">
            <GlobeAsiaAustraliaIcon className="h-5 w-5 "/>
            <span>Everyone can reply</span>
          </div>

          <div className="border-b border-gray-300 mb-2" />

          <div className="flex items-center">
            {/* Icons */}
            <div className="flex flex-1 space-x-1 text-twitter">
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150 cursor-pointer">
                <PhotoIcon className="h-5 w-5 font-bold" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150 cursor-pointer">
                <GifIcon className="h-5 w-5 font-bold" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150 cursor-pointer">
                <FaceSmileIcon className="h-5 w-5 font-bold" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150 cursor-pointer">
                <CalendarIcon className="h-5 w-5 font-bold" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150 cursor-pointer">
                <MapPinIcon className="h-5 w-5 font-bold" />
              </div>
            </div>

            {/* Tweet Button */}
            <button
              onClick={handleSubmit}
              disabled={!input || !session || isPosting}
              className="bg-black text-white px-5 py-2 rounded-full font-bold disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
