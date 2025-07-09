"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PendingEstimates from "./estimate-pending/page";
import PastEstimates from "./estimate-past/page";

export default function MyEstimatePage() {
  const [selectedIdx, setSelectedIdx] = useState("1");

  return (
    <div className="flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="sticky top-0 z-30 bg-white">
        <Header type="estimate" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>

      {/* 콘텐츠 */}
      <div className="bg-background-200 flex-1 overflow-auto">
        {selectedIdx === "1" && <PendingEstimates />}
        {selectedIdx === "2" && <PastEstimates />}
      </div>
    </div>
  );
}
