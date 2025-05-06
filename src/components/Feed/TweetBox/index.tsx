"use client";

import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";

function TweetBox() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex space-x-2 p-5">
      <Image
        className="mt-4 h-14 w-14 object-cover rounded-full"
        src={"https://links.papareact.com/gll"}
        alt=""
        width={10}
        height={10}
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />

          <div className="flex items-center">
            {/* Icons */}
            <div className="flex flex-1 space-x-1 text-twitter">
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150">
                <PhotoIcon className="h-5 w-5 font-bold cursor-pointer" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150">
                <GifIcon className="h-5 w-5 font-bold cursor pointer" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150">
                <FaceSmileIcon className="h-5 w-5 font-bold cursor-pointer" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150">
                <CalendarIcon className="h-5 w-5 font-bold cursor-pointer" />
              </div>
              <div className="w-10 h-10 hover:bg-twitter/10 rounded-full flex items-center justify-center transition-colors ease-out duration-150">
                <MapPinIcon className="h-5 w-5 font-bold cursor-pointer" />
              </div>
            </div>

            {/* Tweet Button */}
            <button
              disabled={!input}
              className="bg-twitter text-white px-5 py-2 rounded-full font-bold disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
