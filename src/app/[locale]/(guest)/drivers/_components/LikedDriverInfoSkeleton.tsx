import React from "react";

function LikedDriverInfoSkeleton() {
  return (
    <div className="border-line-100 w-[330px] animate-pulse rounded-2xl border px-7 py-6 shadow-sm">
      <div className="flex gap-2">
        <div className="h-6 w-12 rounded-full bg-gray-200" />
        <div className="h-6 w-12 rounded-full bg-gray-200" />
      </div>
      <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 flex gap-5">
        <div className="h-[50px] w-[50px] rounded-xl bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
          <div className="flex gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-3 w-12 rounded bg-gray-200" />
            </div>
            <div className="h-[14px] w-[1px] bg-gray-200" />
            <div className="flex items-center gap-1">
              <div className="h-3 w-12 rounded bg-gray-200" />
            </div>
            <div className="h-[14px] w-[1px] bg-gray-200" />
            <div className="flex items-center gap-1">
              <div className="h-3 w-14 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedDriverInfoSkeleton;
