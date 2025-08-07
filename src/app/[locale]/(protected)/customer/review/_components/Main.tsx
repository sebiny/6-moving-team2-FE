import React, { useEffect, useState } from "react";
import WritableReviews from "./WritableReviews";
import MyReviews from "./MyReviews";
import ReviewModal from "./ReviewModal";

interface MainProps {
  selectedIdx: string;
  setSelectedIdx: (value: string) => void;
}

export default function Main({ selectedIdx, setSelectedIdx }: MainProps) {
  const [isModal, setIsModal] = useState(false);
  // 초기 마운트 시 localStorage에서 값 복원
  useEffect(() => {
    const savedIdx = localStorage.getItem("selectedTab");
    if (savedIdx) {
      setSelectedIdx(savedIdx);
    }
  }, []);

  // 탭이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedIdx);
  }, [selectedIdx]);

  return (
    <>
      <div className="bg-background-100 flex h-full w-full flex-col items-center gap-10 pt-10 pb-80 lg:gap-22 lg:pt-[54px]">
        {selectedIdx === "1" ? (
          <WritableReviews setIsModal={setIsModal} />
        ) : (
          <MyReviews setSelectedIdx={setSelectedIdx} />
        )}

        {isModal && <ReviewModal setIsModal={setIsModal} />}
      </div>
    </>
  );
}
