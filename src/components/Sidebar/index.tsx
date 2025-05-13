"use client";

import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CircleStackIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { FaXTwitter } from "react-icons/fa6";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function Sidebar() {
  const { data: session } = useSession();

  const handleLogin = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <div className="col-span-3 flex flex-col items-center px-4 md:items-start">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex max-w-fit items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-full cursor-pointer transition-all group">
          <FaXTwitter size={32} />
        </div>

        {/* Menu Items */}
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={EnvelopeIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={CircleStackIcon} title="Lists" />
        <SidebarRow
          onClick={handleLogin}
          Icon={UserIcon}
          title={session ? "Sign Out" : "Sign In"}
        />
        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />

        {/* Tombol Post */}
        <button className="mt-4 bg-black text-white w-full py-3 px-2 rounded-full font-bold text-sm lg:text-lg hover:bg-black/80 transition hidden lg:inline flex-1">
          Post
        </button>
      </div>

      {/* Bottom User Profile */}
      {session?.user && (
        <div className="flex items-center space-x-3 mb-4 p-4 rounded-full hover:bg-gray-100 cursor-pointer mt-8 transition">
          <Image
            src={session.user.image ?? "/default-profile.png"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
   
          <div className="hidden lg:flex flex-col text-sm">
            <span className="font-semibold">{session.user.name ?? "User"}</span>
            <span className="text-gray-500">
              @
              {session.user.name?.replace(/\s+/g, "").toLowerCase() ??
                "username"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
