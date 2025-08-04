"use client";
import DriverSimpleInfo from "@/components/driver/DriverSimpleInfo";
import DriverReviews from "@/components/driver/DriverReviews";
import LikeIcon from "@/components/icon/LikeIcon";
import OrangeBackground from "@/components/OrangeBackground";
import Service from "@/components/Service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditButtons from "./_components/EditButtons";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { driverService } from "@/lib/api/api-driver";
import { useLocale, useTranslations } from "next-intl";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { batchTranslate } from "@/utills/batchTranslate";

function DriverMyPage() {
  const t = useTranslations("DriverMypage");
  const locale = useLocale();
  const [translatedInfo, setTranslatedInfo] = useState({ short: "", detail: "" });
  const { user } = useAuth();
  const driverId = user?.driverId as string;

  const { data: driver, isPending } = useQuery<DriverType | null>({
    queryKey: ["driver", driverId],
    queryFn: () => driverService.getDriverDetailCookie(driverId)
  });
  useEffect(() => {
    const translatedTexts = async () => {
      if (!driver) return;
      try {
        const result = await batchTranslate(
          {
            short: driver.shortIntro ?? "",
            detail: driver.detailIntro ?? ""
          },
          locale
        );
        setTranslatedInfo({ short: result.short, detail: result.detail });
      } catch (e) {
        console.warn("번역 실패");
      }
    };
    translatedTexts();
  }, [driver, locale]);

  if (isPending)
    return (
      <div className="flex flex-col items-center">
        <OrangeBackground />
        <LoadingLottie text={t("loadingDriverInfo")} />
      </div>
    );
  if (!driver)
    return (
      <div className="flex flex-col items-center">
        <OrangeBackground />
        <div>{t("failedFetch")}</div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[54px] w-full max-w-300 items-center px-7 md:px-24 lg:h-24 lg:px-2">
        <div className="text-lg font-semibold lg:text-2xl">{t("mypage")}</div>
      </div>
      <OrangeBackground subTitle={true} />
      <div className="flex w-full max-w-300 flex-col items-center px-5 md:px-18 lg:items-stretch lg:px-0">
        <div className="mt-[43px] flex w-full flex-col justify-between md:max-w-205 lg:max-w-300 lg:flex-row">
          <div className="max-w-205">
            <div className="flex">
              <Image src="/assets/images/img_profile.svg" alt="프로필" width={80} height={85} />
              <div className="ml-3">
                <div className="mt-5 flex">
                  <Image src="/assets/icons/ic_profileMark.svg" alt="프로필" width={25} height={25} />
                  <p className="ml-1 text-2xl font-semibold">{driver.nickname}</p>
                </div>
                <div className="mt-2 flex">
                  <LikeIcon color="black" />
                  <p className="text-gray-500">{driver.favoriteCount}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">{translatedInfo.short}</p>
              <p className="mt-3 text-gray-500">{translatedInfo.detail}</p>
            </div>
          </div>
          <EditButtons />
        </div>
        <div className="w-full max-w-205">
          <div className="border-line-100 my-8 border-b"></div>

          <div className="flex flex-col gap-4">
            <p className="text-black-400 text-xl font-semibold">{t("overview")}</p>
            <DriverSimpleInfo
              type="my-page"
              career={driver.career}
              averageRating={driver.averageRating}
              work={driver.work}
            />
          </div>
          <Service services={driver.moveType} serviceAreas={driver.serviceAreas} />
          <DriverReviews driver={driver} />
        </div>
      </div>
    </div>
  );
}

export default DriverMyPage;
