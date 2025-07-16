"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType } from "@/constant/moveTypes";
import Image from "next/image";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import Button from "@/components/Button";

const korToMoveTypeMap: Record<string, MoveType> = {
  소형이사: "SMALL",
  가정이사: "HOME",
  사무실이사: "OFFICE",
  지정견적요청: "REQUEST",
  "지정 견적 요청": "REQUEST"
};

// 더미 데이터 (실제로는 API에서 가져올 데이터)
const dummyEstimateDetail = {
  id: "1",
  moveType: "소형이사",
  isDesignated: true,
  customerName: "김인서",
  fromAddress: "서울시 중구",
  toAddress: "경기도 수원시",
  moveDate: "2024년 07월 01일 (월)",
  estimateAmount: "180,000원",
  status: "completed",
  createdAt: "2024년 06월 25일",
  completedAt: "2024년 07월 01일",
  details: {
    distance: "45km",
    items: ["가전제품", "가구", "의류", "도서"],
    specialRequirements: "피아노 이사 포함",
    notes: "고객님께서 직접 포장하신 상태로 이사 진행"
  }
};

export default function EstimateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const estimateId = params.id as string;

  const [selectedIdx, setSelectedIdx] = React.useState("1");

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    if (idx === "1") {
      router.push("/driver/my-estimates/sent");
    } else if (idx === "2") {
      router.push("/driver/my-estimates/rejected");
    }
  };

  const moveTypeKey: MoveType = korToMoveTypeMap[dummyEstimateDetail.moveType] ?? "SMALL";

  return (
    <>
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex min-h-screen justify-center bg-neutral-50 px-4 py-10 pt-25">
        <div className="w-full max-w-4xl">
          {/* 헤더 */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Image src="/assets/icons/ic_chevron_left.svg" alt="뒤로가기" width={20} height={20} />
              <span>뒤로가기</span>
            </button>
            <h1 className="text-2xl font-bold text-neutral-800">견적 상세보기</h1>
          </div>

          {/* 견적 카드 */}
          <div className="mb-8 rounded-[20px] bg-white p-8 shadow-[-2px_-2px_10px_rgba(220,220,220,0.20),2px_2px_10px_rgba(220,220,220,0.20)] outline-[0.5px] outline-offset-[-0.5px] outline-zinc-100">
            {/* 상단 */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-2">
                <ChipRectangle moveType={moveTypeKey} size="sm" />
                {dummyEstimateDetail.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
                <ChipConfirmed />
              </div>
              <div className="text-sm text-gray-500">견적 ID: {estimateId}</div>
            </div>

            {/* 고객 정보 */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-neutral-800">고객 정보</h2>
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="text-lg font-semibold text-neutral-800">{dummyEstimateDetail.customerName} 고객님</div>
              </div>
            </div>

            {/* 이사 정보 */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-neutral-800">이사 정보</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="text-sm text-zinc-500">출발지</div>
                    <div className="text-base font-semibold text-neutral-900">{dummyEstimateDetail.fromAddress}</div>
                  </div>
                  <div className="relative h-5 w-4">
                    <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-zinc-500">도착지</div>
                    <div className="text-base font-semibold text-neutral-900">{dummyEstimateDetail.toAddress}</div>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-zinc-500">이사일</div>
                    <div className="text-base font-semibold text-neutral-900">{dummyEstimateDetail.moveDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">거리</div>
                    <div className="text-base font-semibold text-neutral-900">
                      {dummyEstimateDetail.details.distance}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 견적 금액 */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-neutral-800">견적 금액</h2>
              <div className="rounded-lg bg-orange-50 p-4">
                <div className="text-2xl font-bold text-orange-500">{dummyEstimateDetail.estimateAmount}</div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-neutral-800">상세 정보</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-zinc-500">이사 품목</div>
                  <div className="flex flex-wrap gap-2">
                    {dummyEstimateDetail.details.items.map((item, index) => (
                      <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm text-zinc-500">특별 요청사항</div>
                  <div className="text-base text-neutral-900">{dummyEstimateDetail.details.specialRequirements}</div>
                </div>
                <div>
                  <div className="mb-2 text-sm text-zinc-500">비고</div>
                  <div className="text-base text-neutral-900">{dummyEstimateDetail.details.notes}</div>
                </div>
              </div>
            </div>

            {/* 완료 정보 */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-neutral-800">완료 정보</h2>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-2 text-lg font-semibold text-green-600">이사 완료</div>
                <div className="text-sm text-green-600">완료일: {dummyEstimateDetail.completedAt}</div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-center gap-4">
            <Button
              text="목록으로 돌아가기"
              type="white-gray"
              className="w-48"
              onClick={() => router.push("/driver/my-estimates/sent")}
            />
            <Button text="견적 수정" type="orange" className="w-48" />
          </div>
        </div>
      </div>
    </>
  );
}
