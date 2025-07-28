"use client";

import { useEffect, useState } from "react";
import PendingEstimates from "./estimate-pending/page";
import PastEstimates from "./estimate-past/page";
import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";

export default function MyEstimatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") ?? "pending"; // 기본은 pending
  const [selectedIdx, setSelectedIdx] = useState("1");

  useEffect(() => {
    if (tab === "past") setSelectedIdx("2");
    else setSelectedIdx("1");
  }, [tab]);

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    const nextTab = idx === "2" ? "past" : "pending";
    router.replace(`/customer/my-estimates?tab=${nextTab}`);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <Header type="estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="bg-background-200 flex-1">
        {selectedIdx === "1" && <PendingEstimates />}
        {selectedIdx === "2" && <PastEstimates />}
      </div>
    </div>
  );
}
