"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import TweetBox from "./TweetBox";
import { Tweet } from "@/types/tweet.type";
import TweetComponent from "./TweetComponent";
import { fetchTweets } from "@/utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {
    try {
      const refreshToast = toast.loading("Refreshing...");
      const tweets = await fetchTweets();
      setTweets(tweets);
      toast.success("Feed Updated!", { id: refreshToast });
    } catch {
      toast.error("Failed to Update Feed!");
    }
  };

  return (
    <div className="col-span-7 lg:col-span-6 border-x flex flex-col max-h-screen overflow-scroll scrollbar-hide">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b sticky top-0 z-10 bg-white">
        <h1 className="text-xl font-bold">Home</h1>
        <ArrowPathIcon
          className="h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={handleRefresh}
        />
      </div>

      {/* Tweetbox - Fixed Height */}
      <div className="border-b">
        <TweetBox setTweets={setTweets} />
      </div>

      {/* Feed - Scrollable Area */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
