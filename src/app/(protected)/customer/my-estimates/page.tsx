"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PendingEstimates from "./estimate-pending/page";
import PastEstimates from "./estimate-past/page";
import FavoriteDrivers from "../../member/my-estimates/favorite-drivers/FavoriteDrivers";

export default function MyEstimatePage() {
  const [selectedIdx, setSelectedIdx] = useState("1");

  return (
    <div className="flex min-h-screen flex-col">
      {/* 스티키 헤더 (찜한 기사님 제외) */}
      {selectedIdx !== "3" && (
        <div className="sticky top-[20px] z-30 bg-white">
          <Header type="estimate" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
        </div>
      )}

      {/* 콘텐츠 영역 */}
      <div className="bg-background-200 flex-1 overflow-auto">
        {selectedIdx === "1" && <PendingEstimates />}
        {selectedIdx === "2" && <PastEstimates />}
        {selectedIdx === "3" && <FavoriteDrivers />}
      </div>
    </div>
  );
}
