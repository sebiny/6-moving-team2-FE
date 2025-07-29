import React from "react";

function DriverReviewSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6 py-6">
      <div>
        <div className="flex items-center gap-[14px]">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="border-line-200 h-4 w-[1px] border-l" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="mt-2 h-5 w-[100px] rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-[80%] rounded bg-gray-200" />
        <div className="h-4 w-[60%] rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default DriverReviewSkeleton;
