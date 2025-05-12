"use client"

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

function Sidebar() {
  const { data: session } = useSession();

  const handleLogin = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  }

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <div className="flex max-w-fit items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-full cursor-pointer transition-all group">
        <FaXTwitter size={32} />
      </div>
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CircleStackIcon} title="Lists" />
      <SidebarRow onClick={handleLogin} Icon={UserIcon} title={session ? "Sign Out" : "Sign In"} />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default Sidebar;
