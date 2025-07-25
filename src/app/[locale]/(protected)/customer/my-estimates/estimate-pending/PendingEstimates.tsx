"use client";

import { usePendingEstimates } from "@/lib/api/api-myEstimate";
import EstimateSubHeader from "./_components/EstimateSubHeader";
import PendingCard from "./_components/PendingCard";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import dayjs from "dayjs";
import { formatAddress } from "@/utills/addressUtils";

export default function PendingEstimates() {
  const { data, isLoading } = usePendingEstimates();

  if (isLoading || !data) return <div className="mt-120 flex justify-center">로딩 중...</div>;

  const estimates = data?.estimates ?? []; // 견적서를 바로 못받을 수 있으니 처음은 빈배열
  const estimateRequest = data?.estimateRequest;

  // 견적 요청이 없는 경우 → 다른 이미지 + 안내 문구
  if (!estimateRequest) {
    return (
      <div className="mt-45 flex flex-col items-center justify-center gap-2 lg:mt-75">
        <img src="/assets/images/img_empty_car.svg" alt="견적요청 없음" width={250} height={250} className="mr-7" />
        <p className="text-center text-lg font-normal text-neutral-400">
          아직 견적 요청 안하셨나요?
          <br />
          견적 요청 먼저 작성해주세요!
        </p>
      </div>
    );
  }

  // 견적 요청 건 데이터 연결
  const requestData = {
    label: getMoveTypeLabel(estimateRequest.moveType),
    requestDate: dayjs(estimateRequest.requestDate).format("YYYY년 M월 D일"),
    from: formatAddress(estimateRequest.fromAddress),
    to: formatAddress(estimateRequest.toAddress),
    date: dayjs(estimateRequest.moveDate).format("YYYY년 MM월 DD일")
  };

  return (
    <div className="mt-11 md:mt-13 lg:mt-21">
      {/* 견적 요청이 있을 경우에만 헤더 렌더링 */}
      <EstimateSubHeader data={requestData} />

      <div className="bg-background-200 grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-1 md:px-15 lg:grid-cols-2 lg:px-100 lg:py-20">
        {estimates.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-2">
            <img src="/assets/images/img_moving_car1.svg" alt="견적 없음" width={250} height={250} />
            <p className="text-center text-lg font-normal text-neutral-400">
              기사님들이 열심히 확인 중이에요
              <br />곧 견적이 도착할 거예요!
            </p>
          </div>
        ) : (
          estimates.map((estimate) => (
            <PendingCard key={estimate.id} data={estimate} moveType={estimateRequest.moveType} />
          ))
        )}
      </div>
    </div>
  );
}
