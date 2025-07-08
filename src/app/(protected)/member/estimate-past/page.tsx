"use client";

import FilterDropdown from "@/components/dropdown/FilterDropdown";
import EstimateDetail from "./_components/EstimateDetail";
import ReceivedEstimate from "./_components/ReceivedEstimate";
import { receivedEstimateData } from "./_components/ReceivedEstimateData";
import { useState } from "react";

export default function EstimateExamplePage() {
  const [selectedService, setSelectedService] = useState("");
  return (
    <main className="md:bg-background-200">
      <div className="px-6 py-6 md:m-15 md:rounded-xl md:bg-white md:p-8 md:shadow-md lg:mx-100 lg:flex lg:min-h-screen lg:gap-15 lg:p-13">
        {/* 좌측 - 견적 상세 정보 */}
        <div className="lg:w-[340px] lg:flex-shrink-0">
          <EstimateDetail
            moveType="사무실 이사"
            startAddress="서울 중구 삼일대로 343"
            endAddress="서울 강남구 선릉로 428"
            date="2024년 07월 01일 (월)"
            createdDate="24. 06. 24."
          />
        </div>
        {/* 구분선 (lg 이상에서만 보임) */}
        <div className="hidden lg:block lg:w-px lg:bg-gray-100" />

        {/* 우측 - 견적서 목록 */}
        <div className="mt-5 flex flex-col gap-7 lg:mt-0 lg:flex-1">
          {/* 목록 상단: 제목 + 필터 */}
          <div className="mb-3 flex flex-col gap-5">
            <div className="text-xl font-bold text-gray-900">
              견적서 목록 <span className="text-orange-400">4</span>
              {/* 4 - 데이터 연결시 변수로 바꾸기 */}
            </div>
            <FilterDropdown
              label="전체"
              options={["전체", "확정견적"]}
              selected={selectedService}
              onSelect={setSelectedService}
            />
          </div>

          {/* 견적 목록들 */}
          {receivedEstimateData.map((estimate) => (
            <ReceivedEstimate key={estimate.id} data={estimate} />
          ))}
        </div>
      </div>
    </main>
  );
}
