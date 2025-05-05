import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tweet } from "react-tweet";
import React from "react";

function Widgets() {
  return (
    <div className="mt-2 px-2">
      {/* Search */}
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter..."
          className="flex-1 outline-none bg-transparent"
        />
      </div>

      <Tweet id="1683920951807971329" />
    </div>
  );
}

export default Widgets;
