"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import RejectedCardList from "./_components/RejectedCardList";
import { Request } from "@/types/request";

// 더미 데이터 예시
const dummyRejectedEstimates: Request[] = [
  {
    id: "1",
    moveType: "소형이사",
    isDesignated: true,
    customerName: "김민서",
    fromAddress: "서울시 중구",
    toAddress: "경기도 수원시",
    moveDate: "2024년 07월 01일 (월)",
    createdAt: "2024.08.26"
  },
  {
    id: "2",
    moveType: "가정이사",
    isDesignated: true,
    customerName: "이현지",
    fromAddress: "서울시 강남구",
    toAddress: "인천광역시 남동구",
    moveDate: "2024년 07월 05일 (금)",
    createdAt: "2024.08.27"
  }
];

export default function RejectedPage() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에 따라 selectedIdx 초기값 설정
  const currentTab = pathname.split("/").pop(); // 'sent' or 'rejected'
  const [selectedIdx, setSelectedIdx] = useState(currentTab ?? "rejected");

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    router.push(`/driver/my-estimates/${idx}`);
  };

  return (
    <>
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex min-h-screen justify-center bg-neutral-50 px-4 py-10 pt-25">
        <div className="flex flex-col gap-6">
          <RejectedCardList requests={dummyRejectedEstimates} />
        </div>
      </div>
    </>
  );
}
