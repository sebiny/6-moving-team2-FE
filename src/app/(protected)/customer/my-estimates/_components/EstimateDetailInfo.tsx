"use client";

import React from "react";

interface EstimateInfoProps {
  requestDate: string;
  serviceType: string;
  moveDate: string;
  from: string;
  to: string;
}

export default function EstimateDetailInfo({ requestDate, serviceType, moveDate, from, to }: EstimateInfoProps) {
  const infoList = [
    { label: "견적 요청일", value: requestDate },
    { label: "서비스", value: serviceType },
    { label: "이용일", value: moveDate },
    { label: "출발지", value: from },
    { label: "도착지", value: to }
  ];

  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-xl font-semibold text-black">견적 정보</h2>

      <div className="flex flex-col gap-3 md:gap-5">
        {infoList.map((item) => (
          <div key={item.label} className="flex justify-between text-sm md:justify-start md:gap-12 md:text-base">
            <span className="text-gray-400 md:w-[100px]">{item.label}</span>
            <span className="text-right font-semibold text-black">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
