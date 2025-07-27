import React, { useEffect, useState } from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import arrow from "/public/assets/icons/ic_arrow.svg";
import DriverImg from "/public/assets/images/img_profile.svg";
import ReviewWrite from "./ReviewWrite";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations } from "next-intl";
import { getWritableReviews } from "@/lib/api/api-review";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TranslateRegion } from "@/utills/TranslateFunction";
import { MoveType } from "@/constant/moveTypes";

interface Props {
  setIsValid: (value: boolean) => void;
  setRating: (value: number) => void;
  setContent: (value: string) => void;
  setEstimateRequestId: (id: string) => void;
  setDriverId: (id: string) => void;
}

type ReviewItem = {
  id: string;
  moveType: MoveType;
  moveDate: string;
  fromAddress: { region: string; district: string };
  toAddress: { region: string; district: string };
  estimates: {
    price: number;
    driver: {
      nickname: string;
      shortIntro: string;
      profileImage: string | null;
    };
  }[];
};

export default function ModalContent({ setIsValid, setRating, setContent, setDriverId, setEstimateRequestId }: Props) {
  const { isSm, isLg } = useMediaHook();
  const [review, setReview] = useState<ReviewItem | null>(null);
  const t = useTranslations("Review");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getWritableReviews(); // page 파라미터 생략 가능
        const first = data?.reviewableEstimates?.[0]; // 첫 번째 리뷰만 선택
        console.log("🔥 첫 번째 리뷰:", first);

        if (first) {
          setEstimateRequestId(first.id);
          setDriverId(first.estimates[0].driver.id);
          setReview(first);
        }
      } catch (error) {
        console.error("리뷰 가져오기 실패", error);
      }
    }
    fetchReviews();
  }, []);

  const moveDetails = review
    ? [
        {
          label: "from",
          content: `${TranslateRegion(review.fromAddress.region)} ${review.fromAddress.district}`,
          isArrow: true
        },
        {
          label: "to",
          content: `${TranslateRegion(review.toAddress.region)} ${review.toAddress.district}`,
          isArrow: false
        },
        {
          label: "date",
          content: format(new Date(review.moveDate), "yyyy년 MM월 dd일 (EEE)", { locale: ko }),
          isArrow: false
        }
      ]
    : [];

  return (
    <div className="flex flex-col gap-7 self-stretch lg:gap-8">
      {review && (
        <div>
          <div className="flex gap-3">
            <ChipRectangle moveType={review.moveType} size={!isLg && isSm ? "sm" : "md"} />
          </div>

          <div className="border-line-100 flex justify-between border-b pt-[14px] pb-3 lg:py-4">
            <div>
              {!isLg && isSm && <Image src={DriverIcon} width={15} height={18} alt="driver_icon" />}
              {isLg && <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />}
              <p className="text-black-300 text-4 leading-[26px] font-semibold lg:text-[18px]">
                {review.estimates[0].driver.nickname}
                {t("driver.title")}
              </p>
            </div>
            <Image src={DriverImg} width={50} height={50} alt="driver_img" />
          </div>

          <div className="border-line-100 flex border-b py-3 lg:py-4">
            {moveDetails.map(({ label, content, isArrow }, index) => (
              <div key={label} className={clsx("flex items-center", index === 2 && "ml-auto lg:ml-10")}>
                <div>
                  <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">
                    {t(`moveDetails.${label}`)}
                  </p>
                  <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">{content}</p>
                </div>
                {isArrow && <Image src={arrow} height={23} alt="arrow" className="mx-3 w-3 lg:w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
      <ReviewWrite setIsValid={setIsValid} setRating={setRating} setContent={setContent} />
    </div>
  );
}
