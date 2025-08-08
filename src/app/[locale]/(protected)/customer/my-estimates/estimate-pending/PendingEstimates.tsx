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

  // 1) 서버 데이터 로딩 중이면 무조건 로딩
  if (isLoading) {
    return <LoadingLottie className="mt-30" />;
  }

  // 2) 요청 자체가 없으면 '요청 없음' UI
  if (!hasRequest) {
    return (
      <div className="mt-45 flex flex-col items-center justify-center gap-2 lg:mt-75">
        <img src="/assets/images/img_empty_car.svg" alt="견적요청 없음" width={250} height={250} className="mr-7" />
        <p className="text-center text-lg font-normal text-neutral-400">
          {tC("RequestYet?")}
          <br />
          {tC("RequestFirst")}
        </p>
      </div>
    );
  }

  // 3) 요청은 있지만 번역이 아직이면 계속 로딩 표시
  if (isTranslating) {
    return <LoadingLottie className="mt-30" />;
  }
  return (
    <div className="mt-11 md:mt-13 lg:mt-21">
      {/* 견적 요청이 있을 경우에만 헤더 렌더링 */}
      <EstimateSubHeader data={translatedRequestData!} />

      <div className="bg-background-200 grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-1 md:px-15 lg:mx-auto lg:max-w-[1400px] lg:grid-cols-2 lg:px-20 lg:py-20">
        {estimates.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-2">
            <img src="/assets/images/img_moving_car1.svg" alt="견적 없음" width={250} height={250} />
            <p className="text-center text-lg font-normal text-neutral-400">
              {tC("driverIsChecking")} <br />
              {tC("quoteWillSoon")}
            </p>
          </div>
        ) : (
          estimates.map((estimate) => (
            <PendingCard key={estimate.id} data={estimate} moveType={estimateRequest!.moveType} />
          ))
          //moveType이 넘어가는지 테스트-> 넘어감-> 한글로 넘어가서 card에서 동적 다국어 처리
        )}
      </div>
    </div>
  );
}
