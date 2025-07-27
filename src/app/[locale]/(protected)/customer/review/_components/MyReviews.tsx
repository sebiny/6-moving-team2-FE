import React, { useState } from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations } from "next-intl";
import { deleteMyReview, getMyReviews } from "@/lib/api/api-review";
import { ko } from "date-fns/locale";

import { format } from "date-fns";
import { TranslateRegion } from "@/utills/TranslateFunction";
import NoMyReview from "./NoMyReview";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import { MoveType } from "@/constant/moveTypes";
interface MyReviewsProps {
  setSelectedIdx: (value: string) => void;
}

type Address = {
  region: string;
  district: string;
};

type ReviewItem = {
  id: string;
  content: string;
  rating: number;
  driver: {
    nickname: string;
    profileImage: string | null;
    shortIntro: string;
    averageRating: number;
  };
  request: {
    moveDate: string;
    moveType: MoveType;
    fromAddress: Address;
    toAddress: Address;
  };
};
type ReviewListResponse = {
  reviews: ReviewItem[];
  totalCount: number;
};
export default function MyReviews({ setSelectedIdx }: MyReviewsProps) {
  const t = useTranslations("Review");
  const [page, setPage] = useState(1); //임의로 추가

  const SIZE_CLASSES = {
    lg: ["lg:h-[338px] lg:w-[1120px] lg:p-10 lg:gap-5"],
    sm: ["w-[327px] h-[410px] py-6 px-5"],
    md: ["md:w-147 md:h-91 md:p-10"]
  };
  const { isSm, isMd, isLg } = useMediaHook();
  const { data, isLoading, isError } = useQuery<ReviewListResponse>({
    queryKey: ["reviews", page],
    queryFn: () => getMyReviews(page)
  });

  const totalCount = data?.totalCount ?? 0;
  const reviews = data?.reviews ?? [];
  console.log(data);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <NoMyReview setSelectedIdx={setSelectedIdx} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        {reviews.map((review) => {
          const { content, rating, driver, request } = review;
          const { nickname, shortIntro } = driver;
          const { fromAddress, toAddress } = request;
          const moveDate = format(new Date(request.moveDate), "yyyy. MM. dd");
          const moveDetails = [
            {
              label: "from",
              content: `${TranslateRegion(fromAddress.region)} ${fromAddress.district}`
            },
            {
              label: "to",
              content: `${TranslateRegion(fromAddress.region)} ${toAddress.district}`
            },
            {
              label: "date",
              content: formatDate(review.request.moveDate)
            }
          ];
          return (
            <div
              key={review.id}
              className={clsx(
                ...SIZE_CLASSES.lg,
                ...SIZE_CLASSES.md,
                ...SIZE_CLASSES.sm,
                "border-line-100 mx-auto flex flex-col gap-4 self-stretch rounded-[20px] border-[0.5px] bg-gray-50 md:gap-5"
              )}
            >
              <div className={clsx("flex flex-col", isSm && !isMd && "border-line-100 border-b pb-4")}>
                {isSm && !isMd && (
                  <div className="mb-3 flex gap-2">
                    <ChipRectangle moveType={request.moveType} size="sm" />
                  </div>
                )}

                <div className={clsx(isSm && !isMd && "justify-between", "flex md:gap-5")}>
                  <Image
                    className={clsx(
                      isLg ? "h-[100px] w-[100px]" : isMd ? "h-[80px] w-[80px]" : "h-[50x] w-[50px]",
                      "order-2 rounded-[12px] md:order-1"
                    )}
                    src={DriverImg}
                    alt="driverImg"
                  />
                  <div className="order-1 md:order-2 lg:pt-[10px]">
                    <div>
                      <div className={clsx(isMd && "flex gap-[6px]", isSm && !isMd && "flex flex-col gap-[4px]")}>
                        <Image src={DriverIcon} width={16} height={18} alt="driver_icon" />
                        <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                          {nickname} {t("driver.title")}
                        </p>
                      </div>
                      {isMd && (
                        <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                          {shortIntro}
                        </p>
                      )}
                    </div>
                    {isMd && <ChipRectangle moveType={request.moveType} size={isLg ? "md" : "sm"} className="mt-2" />}
                  </div>
                </div>
              </div>
              <div className={clsx("flex gap-5", isSm && !isMd && "border-line-100 border-b pb-4")}>
                {moveDetails.map(({ label, content }, index) => (
                  <div className={clsx(index == 1 && "md:border-line-100 md:border-x md:px-5")}>
                    <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">
                      {t(`moveDetails.${label}`)}
                    </p>
                    <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">
                      {index == 2 && isSm && !isMd ? content.slice(0, -3) : content}
                    </p>
                  </div>
                ))}
              </div>
              <div className={clsx("flex flex-col gap-3")}>
                <StarIcon rating={rating} width={100} height={20} />
                <p className="text-black-400 min-w-[287px] font-[Pretendard] text-[16px] leading-[26px] font-medium md:text-[18px]">
                  {content}
                </p>
              </div>
              {isSm && !isMd && (
                <div className="mt-auto flex justify-end">
                  <p className="pr-2 text-[12px] leading-[18px] text-gray-300">{t("review.date")}</p>
                  <p className="text-[12px] leading-[18px] text-gray-300">{moveDate}</p>
                </div>
              )}
              <Button
                text="삭제"
                type="orange"
                onClick={async () => {
                  try {
                    await deleteMyReview(review.id);
                    alert("리뷰 삭제");
                  } catch (err) {
                    alert("삭제 실패");
                  }
                }}
              />
            </div>
          );
        })}
        <div className="mt-10">
          <Pagination currentPage={page} setCurrentPage={setPage} totalReviews={totalCount} />
        </div>
      </div>
    </div>
  );
}
