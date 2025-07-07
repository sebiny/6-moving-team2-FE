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

export default function ExamplePendingPage() {
  return (
    <>
      {/* <EstimateSubHeader data={mockEstimateInfo} /> */}
      <div className="bg-background-200 grid gap-8 py-50 sm:grid-cols-1 sm:px-5 md:grid-cols-1 md:px-15 md:py-30 lg:grid-cols-2 lg:px-100">
        {pendingData.map((item) => (
          <PendingCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
