"use client";

import { useState } from "react";
import FilterDropdown from "@/components/dropdown/FilterDropdown";
import EstimateDetail from "./_components/EstimateDetail";
import ReceivedEstimate from "./_components/ReceivedEstimate";
import { receivedEstimateData } from "./_components/ReceivedEstimateData";

export default function PastEstimates() {
  const [selectedService, setSelectedService] = useState("");

  return (
    <main className="md:bg-background-200 mt-11 bg-white md:mt-22 lg:mt-35">
      {receivedEstimateData.map((group, index) => (
        <div key={group.id}>
          {/* 그룹 간 회색 구분선 (첫 그룹 제외) */}
          {index !== 0 && <div className="h-1.5 w-full bg-zinc-100 md:hidden" />}

          {/* 견적 전체 카드 컨테이너 */}
          <div className="px-6 py-10 md:mx-15 md:my-5 md:rounded-xl md:bg-white md:p-8 md:shadow-md lg:mx-100 lg:my-10 lg:flex lg:min-h-screen lg:gap-15 lg:px-10 lg:py-13">
            {/* 좌측 - 견적 정보 (lg 이상에서 좌측 고정 너비) */}
            <div className="lg:w-[280px] lg:flex-shrink-0">
              <EstimateDetail
                moveType={group.moveType}
                startAddress={group.startAddress}
                endAddress={group.endAddress}
                date={group.date}
                createdDate={group.createdDate}
              />
            </div>

            {/* 구분선 (lg 이상에서만 보임) */}
            <div className="hidden lg:block lg:w-px lg:bg-gray-100" />

            {/* 우측 - 견적 목록 및 필터 */}
            <div className="mt-15 flex flex-col gap-6 lg:mt-0 lg:flex-1">
              {/* 목록 상단 - 제목 + 필터 */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 text-xl font-bold text-gray-900">
                  견적서 목록 <span className="font-semibold text-orange-400">{group.estimates.length}</span>
                </div>
                <FilterDropdown
                  label="전체"
                  options={["전체", "확정견적"]}
                  selected={selectedService}
                  onSelect={setSelectedService}
                />
              </div>

              {/* 견적 카드들 */}
              <div className="flex flex-col gap-6">
                {group.estimates.map((estimate) => (
                  <ReceivedEstimate key={estimate.id} data={estimate} />
                ))}
              </div>
            </div>
          </div>

          {/* 마지막 그룹 뒤는 구분선 없음 */}
          {index !== receivedEstimateData.length - 1 && <div className="h-1.5 w-full bg-zinc-100 md:hidden" />}
        </div>
      ))}
    </main>
  );
}
