"use client";

import { usePendingEstimates } from "@/lib/api/api-myEstimate";
import EstimateSubHeader from "./_components/EstimateSubHeader";
import PendingCard from "./_components/PendingCard";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import dayjs from "dayjs";
import { formatAddress } from "@/utills/addressUtils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { batchTranslate } from "@/utills/batchTranslate";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import "dayjs/locale/ko";

type RequestData = {
  label: string;
  requestDate: string;
  from: string;
  to: string;
  date: string;
};
export default function PendingEstimates() {
  dayjs.locale("ko");

  const { data, isLoading } = usePendingEstimates();
  const tC = useTranslations("Common");
  const locale = useLocale();

  const estimates = data?.estimates ?? [];
  const estimateRequest = data?.estimateRequest;

  const [translatedRequestData, setTranslatedRequestData] = useState<RequestData | null>(null);

  // 요청이 변할 때마다 번역 데이터 초기화
  useEffect(() => {
    setTranslatedRequestData(null);
  }, [estimateRequest?.id, locale]);

  // 번역 실행
  useEffect(() => {
    if (!estimateRequest) return;

    const translate = async () => {
      const textMap = {
        label: getMoveTypeLabel(estimateRequest.moveType),
        requestDate: dayjs(estimateRequest.requestDate).format("YYYY년 M월 D일"),
        from: formatAddress(estimateRequest.fromAddress),
        to: formatAddress(estimateRequest.toAddress),
        date: dayjs(estimateRequest.moveDate).format("YYYY년 MM월 DD일 (ddd)")
      };
      const result = await batchTranslate(textMap, locale);
      setTranslatedRequestData(result);
    };

    translate();
  }, [estimateRequest, locale]);

  const hasRequest = !!estimateRequest;
  const isTranslating = hasRequest && !translatedRequestData;

  // 1) 서버 데이터 로딩 중
  if (isLoading) {
    return (
      <main id="main-content" role="main" aria-busy="true" className="mt-30">
        <LoadingLottie className="mt-30" aria-live="polite" role="status" />
      </main>
    );
  }

  // 2) 요청 없음
  if (!hasRequest) {
    return (
      <main id="main-content" role="main" className="mt-45 lg:mt-75">
        <section aria-labelledby="no-request-title" className="flex flex-col items-center justify-center gap-2">
          <h1 id="no-request-title" className="sr-only">
            대기 중인 견적 요청이 없습니다
          </h1>

          <figure aria-describedby="no-request-desc">
            <img
              src="/assets/images/img_empty_car.svg"
              alt=""
              width={250}
              height={250}
              className="mr-7"
              aria-hidden="true"
            />
            <figcaption id="no-request-desc" className="text-center text-lg font-normal text-neutral-400">
              {tC("RequestYet?")}
              <br />
              {tC("RequestFirst")}
            </figcaption>
          </figure>
        </section>
      </main>
    );
  }

  // 3) 번역 중
  if (isTranslating) {
    return (
      <main id="main-content" role="main" aria-busy="true" className="mt-30">
        <LoadingLottie className="mt-30" aria-live="polite" role="status" />
      </main>
    );
  }

  // 4) 정상 렌더
  return (
    <main id="main-content" role="main" className="mt-11 md:mt-13 lg:mt-21">
      {/* 페이지 헤더: 현재 활성 요청의 요약 */}
      <header aria-labelledby="pending-estimates-heading" className="mb-4">
        <h1 id="pending-estimates-heading" className="sr-only">
          대기 중인 견적 리스트
        </h1>
        <EstimateSubHeader data={translatedRequestData!} />
      </header>

      {/* 견적 카드 리스트 영역 */}
      <section
        aria-labelledby="pending-list-heading"
        className="bg-background-200 px-5 py-10 md:px-15 lg:mx-auto lg:max-w-[1400px] lg:px-20 lg:py-20"
      >
        <h2 id="pending-list-heading" className="sr-only">
          기사님들이 보낸 견적 목록
        </h2>

        {estimates.length === 0 ? (
          <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-2">
            <img src="/assets/images/img_moving_car1.svg" alt="" width={250} height={250} aria-hidden="true" />
            <p className="text-center text-lg font-normal text-neutral-400">
              {tC("driverIsChecking")} <br />
              {tC("quoteWillSoon")}
            </p>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2"
            role="list"
            aria-label="대기 중인 견적 카드 목록"
          >
            {estimates.map((estimate) => (
              <li key={estimate.id} className="list-none">
                <PendingCard data={estimate} moveType={estimateRequest!.moveType} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
