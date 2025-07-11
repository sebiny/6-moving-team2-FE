import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import Reviews from "./Reviews";
import MyReviews from "./MyReviews";
import ReviewModal from "./ReviewModal";

interface MainProps {
  selectedIdx: string;
}

export default function Main({ selectedIdx }: MainProps) {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <div className="bg-background-100 flex h-full w-full flex-col items-center gap-16 pt-10 pb-20 lg:pt-[54px]">
        {selectedIdx === "1" ? <Reviews setIsModal={setIsModal} /> : <MyReviews />}
        <Pagination />
        {/* 리뷰 작성하기 버튼 클릭시 모달 띄우기 */}
        {isModal && <ReviewModal setIsModal={setIsModal} />}
      </div>
    </>
  );
}
