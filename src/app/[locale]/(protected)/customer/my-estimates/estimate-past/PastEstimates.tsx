"use client";

import { use, useState } from "react";
import FilterDropdown from "@/components/dropdown/FilterDropdown";
import EstimateDetail from "./_components/EstimateDetail";
import ReceivedEstimate from "./_components/ReceivedEstimate";
import { useTranslations } from "next-intl";
import { usePastEstimates } from "@/lib/api/api-myEstimate";
import { SinglePastEstimateType } from "@/types/estimateType";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import dayjs from "dayjs";

export default function PastEstimates() {
  const t = useTranslations("MyEstimates");
  const { data, isLoading } = usePastEstimates();
  const [selectedService, setSelectedService] = useState("WHOLE");

  if (isLoading) {
    return <div className="mt-20 flex justify-center">로딩 중...</div>;
  }

  if (!data) {
    return (
      <div className="mt-20 flex justify-center">
        <p className="text-gray-400">받았던 견적이 없습니다.</p>
      </div>
    );
  }

  return (
    <main className="md:bg-background-200 mt-11 bg-white md:mt-22 lg:mt-35">
      {data.map((group: SinglePastEstimateType, index) => (
        <div key={group.estimateRequest.id}>
          {/* 그룹 간 회색 구분선 (첫 그룹 제외) */}
          {index !== 0 && <div className="h-1.5 w-full bg-zinc-100 md:hidden" />}

          {/* 견적 전체 카드 컨테이너 */}
          <div className="px-6 py-10 md:mx-15 md:my-5 md:rounded-xl md:bg-white md:p-8 md:shadow-md lg:mx-100 lg:my-10 lg:flex lg:gap-13 lg:px-10 lg:py-13">
            {/* 좌측 - 견적 정보 (lg 이상에서 좌측 고정 너비) */}
            <div className="lg:w-[280px] lg:flex-shrink-0">
              <EstimateDetail
                moveType={getMoveTypeLabel(group.estimateRequest.moveType)}
                startAddress={formatStreetAddress(group.estimateRequest.fromAddress)}
                endAddress={formatStreetAddress(group.estimateRequest.toAddress)}
                date={dayjs(group.estimateRequest.moveDate).format("YYYY년 MM월 DD일")}
                createdDate={dayjs(group.estimateRequest.requestDate).format("YYYY년 MM월 DD일")}
              />
            </div>

            {/* 구분선 (lg 이상에서만 보임) */}
            <div className="hidden lg:block lg:w-px lg:bg-gray-100" />

            {/* 우측 - 견적 목록 및 필터 */}
            <div className="mt-15 flex flex-col gap-6 lg:mt-0 lg:flex-1">
              {/* 목록 상단 - 제목 + 필터 */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 text-xl font-bold text-gray-900">
                  {t("list")} <span className="font-semibold text-orange-400">{group.estimates.length}</span>
                </div>
                <FilterDropdown
                  translator={(key) => key} // Assuming a simple translator function for now
                  label={t("total")}
                  options={[t("total"), t("confirmed")]}
                  selected={selectedService}
                  onSelect={setSelectedService}
                  type="service"
                />
              </div>

              {/* 견적 카드들 */}
              <div className="flex flex-col gap-6">
                {group.estimates
                  .filter((estimate) => {
                    if (selectedService === "ESTIMATE") return estimate.status === "ACCEPTED";
                    return true; // "WHOLE" 또는 ""일 경우 전체 표시
                  })
                  .map((estimate) => (
                    <ReceivedEstimate key={estimate.id} data={estimate} moveType={group.estimateRequest.moveType} />
                  ))}
              </div>
            </div>
          </div>

          {/* 마지막 그룹 뒤는 구분선 없음 */}
          {index !== data.length - 1 && <div className="h-1.5 w-full bg-zinc-100 md:hidden" />}
        </div>
      ))}
    </main>
  );
}
