"use client";

import EstimateSubHeader from "./_components/EstimateSubHeader";
import PendingCard from "./_components/PendingCard";
import { pendingData } from "./_components/PendingData";

const mockEstimateInfo = {
  label: "소형이사",
  requestDate: "2024년 6월 24일",
  from: "서울시 중구",
  to: "경기도 수원시",
  date: "2024년 07월 01일 (월)"
};

export default function PendingEstimates() {
  return (
    <>
      <EstimateSubHeader data={mockEstimateInfo} />
      <div className="bg-background-200 grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-1 md:px-15 lg:grid-cols-2 lg:px-100 lg:py-30">
        {pendingData.map((item) => (
          <PendingCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
