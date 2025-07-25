"use client";

import { usePendingEstimates } from "@/lib/api/api-myEstimate";
import EstimateSubHeader from "./_components/EstimateSubHeader";
import PendingCard from "./_components/PendingCard";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import dayjs from "dayjs";
import { formatAddress } from "@/utills/addressUtils";

export default function PendingEstimates() {
  const { data, isLoading } = usePendingEstimates();

  if (isLoading || !data) return <div className="mt-20 flex justify-center">로딩 중...</div>;

  const estimates = data?.estimates ?? []; // 견적서를 바로 못받을 수 있으니 처음은 빈배열
  const estimateRequest = data?.estimateRequest;

  // 견적 요청 작성 전, 대기 중인 견적 페이지를 어떻게 할지 생각해보기
  if (!estimateRequest) {
    return (
      <div className="mt-20 flex justify-center">
        <p className="text-gray-400">작성한 견적 요청이 없습니다.</p>
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
      <EstimateSubHeader data={requestData} />
      <div className="bg-background-200 grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-1 md:px-15 lg:grid-cols-2 lg:px-100 lg:py-20">
        {/* 피그마 보고 이미지 추가 */}
        {estimates.length === 0 ? (
          <p className="flex justify-center text-gray-400 lg:ml-120">아직 받은 견적이 없습니다.</p>
        ) : (
          estimates.map((estimate) => (
            <PendingCard key={estimate.id} data={estimate} moveType={estimateRequest.moveType} />
          ))
        )}
      </div>
    </div>
  );
}
