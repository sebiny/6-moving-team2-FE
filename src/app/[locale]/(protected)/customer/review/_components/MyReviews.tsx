import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations, useLocale } from "next-intl";
import { deleteMyReview, getMyReviews } from "@/lib/api/api-review";
import { ko, enUS, ja } from "date-fns/locale";
import { format, type Locale } from "date-fns";
import { TranslateRegion } from "@/utills/TranslateFunction";
import NoMyReview from "./NoMyReview";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { batchTranslate } from "@/utills/batchTranslate";
import type { ReviewListResponse, TranslatedMeta } from "@/types/reviewType";
import Button from "@/components/Button";
interface MyReviewsProps {
  setSelectedIdx: (value: string) => void;
}
export default function MyReviews({ setSelectedIdx }: MyReviewsProps) {
  const t = useTranslations("Review");
  const tC = useTranslations("Common");
  const [page, setPage] = useState(1); //임의로 추가
  const { isSm, isMd, isLg } = useMediaHook();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };
  //리액트쿼리로 리뷰 불러오기
  const { data, isLoading, isError } = useQuery<ReviewListResponse>({
    queryKey: ["reviews", page],
    queryFn: () => getMyReviews(page),
    staleTime: 1000 * 60 * 5
  });
  const totalCount = data?.totalCount ?? 0;
  const reviews = data?.reviews ?? [];
  //DeepL로 동적 다국어
  const locale = useLocale();
  const [translatedMeta, setTranslatedMeta] = useState<Record<string, TranslatedMeta>>({});

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    const translateInfo = async () => {
      const allTranslatedMeta: Record<string, TranslatedMeta> = {};

      for (const review of reviews) {
        const { fromAddress, toAddress, moveDate } = review.request;
        const { nickname, shortIntro } = review.driver;
        const textMap = {
          content: review.content,
          fromRegion: fromAddress.region,
          toRegion: toAddress.region,
          fromDistrict: fromAddress.district,
          toDistrict: toAddress.district,
          moveDate: formatDate(moveDate),
          nickname,
          shortIntro
        };

        try {
          const translated = await batchTranslate(textMap, locale);
          allTranslatedMeta[review.id] = translated;
        } catch {
          allTranslatedMeta[review.id] = textMap;
        }
      }
      setTranslatedMeta(allTranslatedMeta);
    };

    translateInfo();
  }, [reviews, locale]);

  if (isLoading) {
    return <LoadingLottie className="mt-30" text={tC("myReviewLoading")} />;
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <div className="mt-30 flex h-full items-center justify-center">
        <NoMyReview setSelectedIdx={setSelectedIdx} />
      </div>
    );
  }
  return (
    <section aria-labelledby="my-reviews-heading">
      <h2 id="my-reviews-heading" className="sr-only">
        {t("myReviewListTitle")}
      </h2>
      <div className="flex flex-col items-center gap-5">
        {reviews.map((review) => {
          const { content, rating, driver, request } = review;
          const { shortIntro } = driver;
          const moveDetails = [
            {
              label: "from",
              content:
                locale === "ko"
                  ? `${TranslateRegion(request.fromAddress.region)} ${request.fromAddress.district}`
                  : `${translatedMeta[review.id]?.fromRegion || request.fromAddress.region} ${translatedMeta[review.id]?.fromDistrict || request.fromAddress.district}`
            },
            {
              label: "to",
              content:
                locale === "ko"
                  ? `${TranslateRegion(request.toAddress.region)} ${request.toAddress.district}`
                  : `${translatedMeta[review.id]?.toRegion || request.toAddress.region} ${translatedMeta[review.id]?.toDistrict || request.toAddress.district}`
            },
            {
              label: "date",
              content: locale === "ko" ? formatDate(request.moveDate) : translatedMeta[review.id]?.moveDate
            }
          ];

          return (
            <div
              key={review.id}
              className={clsx(
                "lg:h-auto lg:w-[1120px] lg:gap-5 lg:p-10",
                "h-auto w-[327px] px-5 py-6",
                "md:h-auto md:w-147 md:p-10",
                "border-line-100 mx-auto flex flex-col gap-4 self-stretch rounded-[20px] border-[0.5px] bg-gray-50 md:gap-5"
              )}
            >
              <div className={clsx("flex flex-col", isSm && !isMd && "border-line-100 border-b pb-4")}>
                {isSm && !isMd && (
                  <div className="mb-3 flex gap-2" role="group" aria-label="이사 유형 및 지정 기사 여부">
                    <ChipRectangle moveType={request.moveType} size="sm" />
                    {request.estimates[0].isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
                  </div>
                )}

                <div className={clsx(isSm && !isMd && "justify-between", "flex md:gap-5")}>
                  {isLg && (
                    <Image
                      className="order-2 rounded-[12px]"
                      src={review.driver.profileImage ?? "/assets/images/img_profile.svg"}
                      alt={`기사님 프로필 사진: ${driver.nickname}`}
                      width={100}
                      height={100}
                    />
                  )}
                  {isMd && !isLg && (
                    <Image
                      className="rounded-[12px] md:order-1"
                      src={review.driver.profileImage ?? "/assets/images/img_profile.svg"}
                      alt=""
                      aria-hidden="true"
                      width={80}
                      height={80}
                    />
                  )}
                  {isSm && !isMd && (
                    <Image
                      className="order-2 rounded-[12px]"
                      src={review.driver.profileImage ?? "/assets/images/img_profile.svg"}
                      alt={`기사님 프로필 사진: ${driver.nickname}`}
                      width={50}
                      height={50}
                    />
                  )}

                  <div className="order-1 md:order-2 lg:pt-[10px]">
                    <div>
                      <div className={clsx(isMd && "flex gap-[6px]", isSm && !isMd && "flex flex-col gap-[4px]")}>
                        <Image src="/assets/icons/ic_driver.svg" width={16} height={18} alt="" aria-hidden="true" />
                        <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                          {driver.nickname} {t("driver.title")}
                        </p>
                      </div>
                      {isMd && (
                        <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                          {translatedMeta[review.id]?.shortIntro || shortIntro}
                        </p>
                      )}
                    </div>
                    <div role="group" aria-label="이사 유형 및 지정 기사 여부">
                      {isMd && <ChipRectangle moveType={request.moveType} size={isLg ? "md" : "sm"} className="mt-2" />}
                      {isMd && request.estimates[0].isDesignated && (
                        <ChipRectangle moveType="REQUEST" size={isLg ? "md" : "sm"} className="mt-2 ml-2" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={clsx("flex gap-5", isSm && !isMd && "border-line-100 border-b pb-4")}>
                {moveDetails.map(({ label, content }, index) => (
                  <div key={label} className={clsx(index == 1 && "md:border-line-100 md:border-x md:px-5")}>
                    <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">
                      {t(`moveDetails.${label}`)}
                    </p>
                    <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">
                      {index === 2 && isSm && !isMd && content ? content.slice(0, -3) : content || ""}
                    </p>
                  </div>
                ))}
              </div>
              <div className={clsx("flex flex-col gap-3")}>
                <StarIcon rating={rating} width={100} height={20} aria-label={`별점 ${rating}`} />
                <p className="text-black-400 min-w-[287px] font-[Pretendard] text-[16px] leading-[26px] font-medium md:text-[18px]">
                  {translatedMeta[review.id]?.content || content}
                </p>
              </div>
              {isSm && !isMd && (
                <div className="mt-auto flex justify-end">
                  <p className="pr-2 text-[12px] leading-[18px] text-gray-300">{t("review.date")}</p>
                  <p className="text-[12px] leading-[18px] text-gray-300">{translatedMeta[review.id]?.moveDate}</p>
                </div>
              )}
              <Button
                text="삭제"
                type="orange"
                onClick={async () => {
                  try {
                    await deleteMyReview(review.id);
                    alert("리뷰 삭제 완료");
                    // 가능하면 삭제 후 목록 새로고침 또는 상태 업데이트 필요
                  } catch (err) {
                    console.error(err);
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
    </section>
  );
}
