"use client";

import { useState } from "react";
import PendingEstimates from "./estimate-pending/page";
import PastEstimates from "./estimate-past/page";
import FavoriteDrivers from "./favorite-drivers/FavoriteDrivers";
import Header from "./_components/Header"; // pt 조절 수정되면 다시 공통으로 파일 주소 바꾸기

export default function MyEstimatePage() {
  const [selectedIdx, setSelectedIdx] = useState("1");

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <Header type="estimate" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="bg-background-200 flex-1">
        {selectedIdx === "1" && <PendingEstimates />}
        {selectedIdx === "2" && <PastEstimates />}
        {selectedIdx === "3" && <FavoriteDrivers />}
      </div>
    </div>
  );
}
