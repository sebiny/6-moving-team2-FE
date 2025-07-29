import React from "react";

function DriverFindCardSkeleton() {
  return (
    <div className="border-line-100 relative animate-pulse rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex gap-2">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="h-6 w-16 rounded-lg bg-gray-200" />
        ))}
      </div>

      <div className="mt-3 flex gap-5 overflow-hidden">
        <div className="hidden h-[134px] w-[134px] flex-shrink-0 rounded-md bg-gray-200 md:block" />
        <div className="w-full space-y-3">
          <div className="h-6 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="border-line-100 mt-4 border-b md:hidden"></div>
          <div className="relative mt-5 flex gap-2">
            <div className="h-[50px] w-[50px] rounded-lg bg-gray-200 md:hidden" />
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
                <div className="flex items-center justify-center gap-1 md:hidden">
                  <div className="h-5 w-5 rounded-full bg-gray-200" />
                  <div className="h-4 w-6 rounded bg-gray-200" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-10 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-[1px] bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-[1px] bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden items-center gap-2 md:flex">
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverFindCardSkeleton;
