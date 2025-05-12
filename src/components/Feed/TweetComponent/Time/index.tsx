"use client";

import React from "react";
import TimeAgo from "react-timeago";

const Time = ({ time }: { time: string }) => {
  return (
    <div className="text-sm text-gray-500">
      <TimeAgo date={time} />
    </div>
  );
};

export default Time;
