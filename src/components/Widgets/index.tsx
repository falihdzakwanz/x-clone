"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const trending = [
  { title: "#CharlotteTilburyxFreen", posts: "18.7K posts" },
  { title: "SAROCHA BA PILLOW TALK CUSHION", posts: "25.4K posts" },
  { title: "Panas", posts: "12.4K posts" },
  { title: "Dyandra", posts: "1,440 posts" },
];

const whoToFollow = [
  {
    name: "Aurelia V",
    username: "@senjatanuklir",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1846199815564414977/Xe8J8YxO_400x400.jpg",
  },
  {
    name: "bernadya",
    username: "@bearnotber",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1804964268242337792/jRA_qVKP_400x400.jpg",
  },
  {
    name: "Sammy Notaslimboy",
    username: "@NOTASLIMBOY",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1847471837183397888/jc7iIO88_400x400.jpg",
  },
];

const footerLinks = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "More",
];

function Widgets() {
  return (
    <aside className="mt-2 px-2 col-span-3 hidden lg:block space-y-6 text-sm text-gray-700 max-h-screen overflow-auto scrollbar-hide ml-4">
      {/* Search */}
      <div className="bg-white flex-1 sticky top-0 z-10 mt-2">
        <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Twitter..."
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>
      
      {/* Subscribe Box */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <h2 className="font-bold text-lg">Subscribe to Premium</h2>
        <p className="mt-1 text-gray-600 text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button className="mt-3 bg-twitter text-white px-4 py-2 rounded-full text-sm font-semibold">
          Subscribe
        </button>
      </div>
      {/* Trending Section */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl flex-1">
        <h2 className="font-bold text-lg mb-2">Trending now</h2>
        <p className="text-xs text-gray-500 mb-2">Trending in Indonesia</p>
        {trending.map((item, index) => (
          <div
            key={index}
            className="py-2 hover:bg-gray-200 px-2 rounded-md cursor-pointer"
          >
            <p className="font-semibold">{item.title}</p>
            <p className="text-xs text-gray-500">{item.posts}</p>
          </div>
        ))}
        <button className="text-blue-500 text-sm mt-2">Show more</button>
      </div>
      {/* Who to follow */}

      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <h2 className="font-bold text-lg mb-2">Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div
            key={index}
            className="py-2 flex justify-between items-center hover:bg-gray-200 px-2 rounded-md cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.username}</p>
              </div>
            </div>
            <button className="bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
              Follow
            </button>
          </div>
        ))}
        <button className="text-blue-500 text-sm mt-2">Show more</button>
      </div>
      {/* Footer Links */}
      <div className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1 py-5">
        {footerLinks.map((link, index) => (
          <a key={index} href="#" className="hover:underline">
            {link}
          </a>
        ))}
        <span className="block w-full mt-2">&copy; 2025 X Corp.</span>
      </div>
    </aside>
  );
}

export default Widgets;
