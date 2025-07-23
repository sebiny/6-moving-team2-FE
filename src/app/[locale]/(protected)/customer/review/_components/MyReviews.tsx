import React from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
import { moveDetails } from "@/constant/moveDetails";
import useMediaHook from "@/hooks/useMediaHook";
import { useTranslations } from "next-intl";
export default function MyReviews() {
  const t = useTranslations("Review");
  const driverName = "김코드";
  const driverDescription = "이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.";

  const SIZE_CLASSES = {
    lg: ["lg:h-[338px] lg:w-[1120px] lg:p-10 lg:gap-5"],
    sm: ["w-[327px] h-[410px] py-6 px-5"],
    md: ["md:w-147 md:h-91 md:p-10"]
  };
  const { isSm, isMd, isLg } = useMediaHook();

  return (
    <div>
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((box) => (
          <div
            key={box}
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
                  <ChipRectangle moveType="SMALL" size="sm" />
                  <ChipRectangle moveType="REQUEST" size="sm" />
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
                        {t("driver.title", { name: driverName })}
                      </p>
                    </div>
                    {isMd && (
                      <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                        {t("driver.description", { description: driverDescription })}
                      </p>
                    )}
                  </div>
                  {isMd && <ChipRectangle moveType="SMALL" size={isLg ? "md" : "sm"} className="mt-2" />}
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
              <StarIcon width={100} height={20} />
              <p className="text-black-400 min-w-[287px] font-[Pretendard] text-[16px] leading-[26px] font-medium md:text-[18px]">
                처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸
                이사는 믿고 맡기세요! :) 곧 이사 앞두고 있는 지인분께 추천드릴 예정입니다!
              </p>
            </div>
            {isSm && !isMd && (
              <div className="flex justify-end">
                <p className="pr-2 text-[12px] leading-[18px] text-gray-300">{t("review.date")}</p>
                <p className="text-[12px] leading-[18px] text-gray-300">2024. 07. 02</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
