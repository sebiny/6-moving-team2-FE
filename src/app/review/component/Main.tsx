import React from "react";
import Pagination from "@/components/Pagination";
import Reviews from "./Reviews";

export default function Main() {
  return (
    <>
      <div className="bg-background-100 flex h-screen w-full flex-col items-center gap-16 pt-[54px]">
        <Reviews />
        <Pagination />
      </div>
    </>
  );
}
