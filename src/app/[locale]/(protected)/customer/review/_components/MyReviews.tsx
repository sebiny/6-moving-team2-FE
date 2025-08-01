import React, { useEffect, useState } from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations } from "next-intl";
import { getMyReviews } from "@/lib/api/api-review";
import { ko, enUS, ja } from "date-fns/locale";
import { format } from "date-fns";
import type { Locale } from "date-fns";
import { TranslateRegion } from "@/utills/TranslateFunction";
import NoMyReview from "./NoMyReview";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { MoveType } from "@/constant/moveTypes";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { useLocale } from "next-intl";
import { batchTranslate } from "../../../../../../utills/batchTranslate";
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
    isDesignated: boolean;
  };
};
type ReviewListResponse = {
  reviews: ReviewItem[];
  totalCount: number;
};
type TranslatedMeta = {
  content: string;
  fromRegion: string;
  toRegion: string;
  fromDistrict: string;
  toDistrict: string;
  moveDate: string;
  nickname: string;
  shortIntro: string;
};

const dateFnsLocales: Record<string, Locale> = {
  ko,
  en: enUS,
  ja
};
const formatDate = (isoString: string, currentLocale: string) => {
  const date = new Date(isoString);
  return format(date, "yyyy. MM. dd (EEE)", {
    locale: dateFnsLocales[currentLocale] || enUS
  });
};
const SIZE_CLASSES = {
  lg: ["lg:h-[338px] lg:w-[1120px] lg:p-10 lg:gap-5"],
  sm: ["w-[327px] h-[410px] py-6 px-5"],
  md: ["md:w-147 md:h-91 md:p-10"]
};
export default function MyReviews({ setSelectedIdx }: MyReviewsProps) {
  const t = useTranslations("Review");
  const [page, setPage] = useState(1); //임의로 추가
  const { isSm, isMd, isLg } = useMediaHook();

  //리액트쿼리로 리뷰 불러오기
  const { data, isLoading, isError } = useQuery<ReviewListResponse>({
    queryKey: ["reviews", page],
    queryFn: () => getMyReviews(page)
  });
  const totalCount = data?.totalCount ?? 0;
  const reviews = data?.reviews ?? [];

  //DeepL로 동적 다국어
  const locale = useLocale();
  const [translatedMeta, setTranslatedMeta] = useState<Record<string, TranslatedMeta>>({});
  const [translatedReviewIds, setTranslatedReviewIds] = useState<string[]>([]);

  useEffect(() => {
    const reviewIds = reviews.map((r) => r.id).sort();
    const translatedIdsSorted = [...translatedReviewIds].sort();
    const alreadyTranslated =
      reviewIds.length === translatedIdsSorted.length && reviewIds.every((id, idx) => id === translatedIdsSorted[idx]);

    if (!reviews.length || alreadyTranslated) return;

    const translateAllMeta = async () => {
      const allTranslatedMeta: Record<string, TranslatedMeta> = {};

      for (const review of reviews) {
        const { fromAddress, toAddress, moveDate } = review.request;
        const { nickname, shortIntro } = review.driver;

        const textMap = {
          content: review.content,
          fromRegion: locale === "ko" ? TranslateRegion(fromAddress.region) : fromAddress.region,
          toRegion: locale === "ko" ? TranslateRegion(toAddress.region) : toAddress.region,
          fromDistrict: fromAddress.district,
          toDistrict: toAddress.district,
          moveDate: formatDate(moveDate, locale),
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
      setTranslatedReviewIds(reviewIds);
    };

    translateAllMeta();
  }, [reviews, locale, translatedReviewIds]);

  if (isLoading) {
    return <LoadingLottie className="mt-30" text="내가 작성한 리뷰들을 불러오고 있어요!!" />;
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <div className="mt-30 flex h-full items-center justify-center">
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
              content: `${translatedMeta[review.id]?.fromRegion || fromAddress.region} ${translatedMeta[review.id]?.fromDistrict || fromAddress.district}`
            },
            {
              label: "to",
              content: `${translatedMeta[review.id]?.toRegion || fromAddress.region} ${translatedMeta[review.id]?.toDistrict || toAddress.district}`
            },
            {
              label: "date",
              content: formatDate(review.request.moveDate, locale)
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
                    {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
                  </div>
                )}

                <div className={clsx(isSm && !isMd && "justify-between", "flex md:gap-5")}>
                  {isLg && (
                    <Image
                      className="order-2 rounded-[12px]"
                      src={review.driver.profileImage ?? DriverImg}
                      alt="driverImg"
                      width={100}
                      height={100}
                    />
                  )}
                  {isMd && !isLg && (
                    <Image
                      className="rounded-[12px] md:order-1"
                      src={review.driver.profileImage ?? DriverImg}
                      alt="driverImg"
                      width={80}
                      height={80}
                    />
                  )}
                  {isSm && !isMd && (
                    <Image
                      className="order-2 rounded-[12px]"
                      src={review.driver.profileImage ?? DriverImg}
                      alt="driverImg"
                      width={50}
                      height={50}
                    />
                  )}

                  <div className="order-1 md:order-2 lg:pt-[10px]">
                    <div>
                      <div className={clsx(isMd && "flex gap-[6px]", isSm && !isMd && "flex flex-col gap-[4px]")}>
                        <Image src={DriverIcon} width={16} height={18} alt="driver_icon" />
                        <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                          {translatedMeta[review.id]?.nickname || nickname} {t("driver.title")}
                        </p>
                      </div>
                      {isMd && (
                        <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                          {translatedMeta[review.id]?.shortIntro || shortIntro}
                        </p>
                      )}
                    </div>
                    {isMd && <ChipRectangle moveType={request.moveType} size={isLg ? "md" : "sm"} className="mt-2" />}
                    {isMd && request.isDesignated && (
                      <ChipRectangle moveType="REQUEST" size={isLg ? "md" : "sm"} className="mt-2 ml-2" />
                    )}
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
                      {index == 2 && isSm && !isMd ? content.slice(0, -3) : content}
                    </p>
                  </div>
                ))}
              </div>
              <div className={clsx("flex flex-col gap-3")}>
                <StarIcon rating={rating} width={100} height={20} />
                <p className="text-black-400 min-w-[287px] font-[Pretendard] text-[16px] leading-[26px] font-medium md:text-[18px]">
                  {translatedMeta[review.id]?.content || content}
                </p>
              </div>
              {isSm && !isMd && (
                <div className="mt-auto flex justify-end">
                  <p className="pr-2 text-[12px] leading-[18px] text-gray-300">{t("review.date")}</p>
                  <p className="text-[12px] leading-[18px] text-gray-300">{moveDate}</p>
                </div>
              )}
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
