"use client";

import Image from "next/image";
import Button from "@/components/Button";
import EstimateStatus from "@/components/chip/EstimateStatus";
import { useRouter } from "next/navigation";
import { MoveType } from "@/constant/moveTypes";
import { Estimate } from "@/types/estimateType";
import { useAcceptEstimate } from "@/lib/api/api-myEstimate";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { useState } from "react";
import AlertModal from "@/components/common-modal/AlertModal";

interface Props {
  data: Estimate;
  moveType: MoveType;
}

export default function PendingCard({ data, moveType }: Props) {
  const { driver, comment, price, status, id, isDesignated } = data;

  const router = useRouter();

  // 라벨 목록 구성
  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const { mutate: acceptEstimate } = useAcceptEstimate();

  const ClickDetail = () => {
    router.push(`/customer/my-estimates/estimate-pending/${id}`);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white shadow-lg sm:p-5 md:px-8 md:py-6 lg:px-10 lg:py-8">
      {/* 라벨 + 상태 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          {/* sm 이하 */}
          <div className="flex gap-2 md:hidden">
            {labels.map((label) => (
              <ChipRectangle key={label} moveType={label} size="sm" />
            ))}
          </div>

          {/* md 이상 */}
          <div className="hidden gap-2 md:flex">
            {labels.map((label) => (
              <ChipRectangle key={label} moveType={label} size="md" />
            ))}
          </div>
        </div>
        <EstimateStatus status={status} />
      </div>

      {/* 소개 메시지 */}
      <p className="mt-4 font-semibold text-gray-800 sm:text-[16px] lg:text-[19px]">{comment}</p>

      {/* 기사 프로필 */}
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <Image
          src={driver.profileImage ?? "/assets/icons/ic_profile_bear.svg"}
          alt="기사 프로필"
          width={50}
          height={50}
        />

        {/* 기사 정보 영역 */}
        <div className="flex-1 space-y-2">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between font-medium">
            {/* 기사 이름 */}
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_profileMark.svg" alt="기사 마크" width={16} height={16} />
              <span>{driver.authUser.name} 기사님</span>
            </div>

            {/* 좋아요 */}
            <div className="flex items-center text-base font-normal text-gray-500">
              <Image src="/assets/icons/ic_like_red.svg" alt="찜" width={23} height={23} />
              <span className="ml-1">{driver.favoriteCount}</span>
            </div>
          </div>

          {/* 평점/경력/확정 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={16} height={16} />
              <span className="flex gap-0.5">
                <span className="font-medium text-black">{driver.avgRating ? driver.avgRating.toFixed(1) : "0.0"}</span>
                ({driver.reviewCount})
              </span>
            </div>
            <span className="text-gray-100">|</span>
            <span>
              경력 <span className="font-medium text-black">{driver.career}년</span>
            </span>
            <span className="text-gray-100">|</span>
            <span>
              <span className="font-medium text-black">{driver.work}건</span> 확정
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-7 border-t border-gray-100" />

      {/* 가격 */}
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-700">견적 금액</span>
        <span className="text-[24px] font-bold text-gray-900">{price.toLocaleString()}원</span>
      </div>

      {/* 버튼 - 반응형 대응 */}
      <div className="mt-10 flex w-full flex-col gap-3 md:flex-row md:gap-3">
        {/* 견적 확정하기 버튼 */}
        <div className="order-1 w-full md:order-2 md:w-1/2">
          <Button
            type="orange"
            text="견적 확정하기"
            onClick={() =>
              acceptEstimate(id, {
                onSuccess: (data) => {
                  setShowModal(true);
                },
                onError: (error: any) => {
                  alert(error.message || "견적 확정 중 오류가 발생했습니다.");
                }
              })
            }
          />
        </div>

        {showModal && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
            <AlertModal
              type="handleClick"
              message="견적이 확정되었습니다!"
              buttonText="받았던 견적 보러가기"
              onClose={() => setShowModal(false)}
              onConfirm={() => router.push("/customer/my-estimates?tab=past")}
            />
          </div>
        )}

        {/* 상세보기 버튼 */}
        <div className="order-2 w-full md:order-1 md:w-1/2">
          <Button type="white-orange" text="상세보기" onClick={ClickDetail} />
        </div>
      </div>
    </div>
  );
}
