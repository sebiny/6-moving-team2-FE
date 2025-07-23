import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import WritableReviews from "./WritableReviews";
import MyReviews from "./MyReviews";
import ReviewModal from "./ReviewModal";
import NoReview from "./NoReview";

interface MainProps {
  selectedIdx: string;
}

export default function Main({ selectedIdx }: MainProps) {
  const [isModal, setIsModal] = useState(false);
  const [page, setPage] = useState(1); //임의로 추가
  return (
    <>
      <div className="bg-background-100 flex h-full w-full flex-col items-center gap-10 pt-10 pb-20 lg:gap-22 lg:pt-[54px]">
        {selectedIdx === "1" ? <WritableReviews setIsModal={setIsModal} /> : <MyReviews />}
        <Pagination currentPage={page} setCurrentPage={setPage} />
        {isModal && <ReviewModal setIsModal={setIsModal} />}
      </div>
      {/* <div className="flex h-full items-center justify-center">
        <NoReview />
      </div> */}
    </>
  );
}
