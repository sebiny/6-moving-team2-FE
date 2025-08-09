"use client";

import { useState } from "react";
import FilterDropdown from "@/components/dropdown/FilterDropdown";
import EstimateDetail from "./_components/EstimateDetail";
import ReceivedEstimate from "./_components/ReceivedEstimate";
import { useTranslations } from "next-intl";
import { usePastEstimates } from "@/lib/api/api-myEstimate";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import dayjs from "dayjs";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import "dayjs/locale/ko";

export default function PastEstimates() {
  const t = useTranslations("MyEstimates");
  const tC = useTranslations("Common");
  const { data, isLoading } = usePastEstimates();
  const [selectedService, setSelectedService] = useState(t("total"));

  dayjs.locale("ko");

  if (isLoading) {
    return (
      <main className="mt-30">
        <LoadingLottie className="mt-30" role="status" aria-live="polite" />
      </main>
    );
  }

  if (data && data.length === 0) {
    return (
      <main className="md:bg-background-200 mt-11 bg-white md:mt-22 lg:mt-75">
        <section
          aria-labelledby="past-empty-heading"
          className="col-span-full flex flex-col items-center justify-center gap-2 py-20"
        >
          <h1 id="past-empty-heading" className="sr-only">
            받았던 견적 없음
          </h1>
          <img src="/assets/images/img_empty_review.svg" alt="" width={250} height={250} aria-hidden="true" />
          <p className="text-center text-lg font-normal text-neutral-400">
            {tC("noRequest")}
            <br />
            {tC("confirmReq")}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="md:bg-background-200 mt-11 bg-white md:mt-22 lg:mt-35" id="main-content" role="main">
      {data?.map((group, index) => {
        const groupTitleId = `past-group-${group.estimateRequest.id}-heading`;
        return (
          <section key={group.estimateRequest.id} aria-labelledby={groupTitleId}>
            {/* 그룹 간 구분선 */}
            {index !== 0 && <hr className="h-1.5 w-full border-0 bg-zinc-100 md:hidden" />}

            <div className="px-6 py-10 md:mx-15 md:my-5 md:rounded-xl md:bg-white md:p-8 md:shadow-md lg:mx-auto lg:my-10 lg:flex lg:max-w-[1200px] lg:gap-13 lg:px-10 lg:py-13">
              {/* 좌측 요약 패널 */}
              <aside className="lg:w-[280px] lg:flex-shrink-0" aria-label="요청 요약">
                {/* 그룹 제목은 시각적으로 숨기고 스크린리더용으로만 */}
                <h2 id={groupTitleId} className="sr-only">
                  {getMoveTypeLabel(group.estimateRequest.moveType)} —{" "}
                  {dayjs(group.estimateRequest.moveDate).format("YYYY년 MM월 DD일(ddd)")}
                </h2>

                {/* EstimateDetail 내부를 dl/dt/dd 구조로 리팩 권장 */}
                <EstimateDetail
                  moveType={getMoveTypeLabel(group.estimateRequest.moveType)}
                  startAddress={formatStreetAddress(group.estimateRequest.fromAddress)}
                  endAddress={formatStreetAddress(group.estimateRequest.toAddress)}
                  date={dayjs(group.estimateRequest.moveDate).format("YYYY년 MM월 DD일(ddd)")}
                  createdDate={dayjs(group.estimateRequest.requestDate).format("YY. MM. DD.")}
                />
              </aside>

              {/* 세로 구분선 */}
              <div className="hidden lg:block lg:w-px lg:bg-gray-100" aria-hidden="true" />

              {/* 우측 목록 + 필터 */}
              <section className="mt-15 flex flex-col gap-6 lg:mt-0 lg:flex-1" aria-labelledby={`${groupTitleId}-list`}>
                <header className="flex flex-col gap-4">
                  <h3 id={`${groupTitleId}-list`} className="text-xl font-bold text-gray-900">
                    {t("list")} <span className="font-semibold text-orange-400">{group.estimates.length}</span>
                  </h3>
                  {/* FilterDropdown: 가능하면 native select. 커스텀이면 combobox/listbox 패턴 준수 */}
                  <FilterDropdown
                    translator={(key) => key}
                    label={t("total")}
                    options={[t("total"), t("confirmed")]}
                    selected={selectedService}
                    onSelect={setSelectedService}
                    type="service"
                  />
                </header>

                {/* 견적 카드 목록 */}
                <ul className="flex flex-col gap-6" role="list" aria-label="받았던 견적 카드 목록">
                  {group.estimates
                    .filter((estimate) => (selectedService === t("confirmed") ? estimate.status === "ACCEPTED" : true))
                    .map((estimate) => (
                      <li key={estimate.id} className="list-none">
                        {/* ReceivedEstimate 루트를 article로 리팩 권장 */}
                        <ReceivedEstimate data={estimate} moveType={group.estimateRequest.moveType} />
                      </li>
                    ))}
                </ul>
              </section>
            </div>

            {index !== data.length - 1 && <hr className="h-1.5 w-full border-0 bg-zinc-100 md:hidden" />}
          </section>
        );
      })}
    </main>
  );
}
