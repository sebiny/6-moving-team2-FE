"use client";

import Image from "next/image";
import EstimateStatus from "@/components/chip/EstimateStatus";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Estimate } from "@/types/estimateType";
import { MoveType } from "@/constant/moveTypes";
import ChipRectangle from "@/components/chip/ChipRectangle";

interface Props {
  data: Estimate;
  moveType: MoveType;
}

export default function ReceivedEstimate({ data, moveType }: Props) {
  const t = useTranslations("MyEstimates");
  const router = useRouter();
  const { driver, comment, price, status, id, isDesignated } = data;

  // 라벨 목록 구성
  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const ClickDetail = () => {
    router.push(`/customer/my-estimates/estimate-past/${id}`);
  };

  return (
    <div className="w-full space-y-3 bg-white md:space-y-4">
      {/* 라벨 목록 */}
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

      {/* 소개 메시지 */}
      <div className="flex items-center justify-between">
        <p
          onClick={ClickDetail}
          className="cursor-pointer text-base font-semibold text-gray-800 hover:text-orange-400 hover:underline lg:text-xl"
        >
          {comment}
        </p>
        <div className="hidden md:block">
          <EstimateStatus status={status} />
        </div>
      </div>

      {/* 기사 프로필 */}
      <div className="flex items-center rounded-lg border border-gray-200 px-4 py-3">
        <Image
          src={driver.profileImage ?? "/assets/icons/ic_profile_bear.svg"}
          alt="기사 프로필"
          width={48}
          height={48}
          className="mr-3"
        />

        <div className="flex w-full flex-col">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between text-base font-medium">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_profileMark.svg" alt="기사 마크" width={16} height={16} />
              <span>
                {driver.authUser.name} {t("driver")}
              </span>
            </div>

            <div className="flex items-center">
              <Image src="/assets/icons/ic_like_empty.svg" alt="찜 아이콘" width={22} height={0} />
              <span>{driver.favoriteCount}</span>
            </div>
          </div>

          {/* 별점 및 상세 정보 */}
          <div className="mt-2 flex text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={16} height={16} />
              <span className="flex gap-0.5 font-medium text-black">{driver.avgRating?.toFixed(1) ?? "0.0"}</span>
              <span className="text-gray-400">({driver.reviewCount})</span>
            </div>
            <div className="mx-2 text-gray-300">|</div>
            <span>
              {t("experience")}{" "}
              <span className="font-medium text-black">
                {driver.career}
                {t("year")}
              </span>
            </span>
            <div className="mx-2 text-gray-300">|</div>
            <span>
              <span className="font-medium text-black">
                {driver.work}
                {t("count")}
              </span>{" "}
              {t("confirm")}
            </span>
          </div>
        </div>
      </div>

      {/* 견적가 (md 이상) */}
      <div className="hidden items-center justify-end text-2xl font-extrabold text-gray-900 md:flex">
        <span className="mr-2 text-base font-medium text-gray-500">{t("estimateCost")}</span>
        {price.toLocaleString()}원
      </div>

      {/* 견적 상태 및 가격 (sm) */}
      <div className="flex items-center justify-between py-2 md:hidden">
        <EstimateStatus status={status} />
        <div className="flex text-lg font-extrabold text-gray-900">
          <span className="mt-1 mr-2 text-sm font-normal text-gray-500">{t("estimateCost")}</span>
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
