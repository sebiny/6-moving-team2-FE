import React from "react";
import Pagination from "@/components/Pagination";
import Reviews from "./Reviews";
import MyReviews from "./MyReviews";

interface MainProps {
  selectedIdx: string;
}

export default function Main({ selectedIdx }: MainProps) {
  return (
    <>
      <div className="bg-background-100 flex h-screen w-full flex-col items-center gap-16 pt-[54px]">
        {selectedIdx === "1" ? <Reviews /> : <MyReviews />}
        <Pagination />
      </div>
    </>
  );
}
