"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LikeIcon from "@/components/icon/LikeIcon";
import OrangeBackground from "@/components/OrangeBackground";
import DriverSimpleInfo from "@/components/driver/DriverSimpleInfo";
import DriverReviews from "@/components/driver/DriverReviews";
import Service from "@/components/Service";
import EditButtons from "./_components/EditButtons";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { driverService } from "@/lib/api/api-driver";
import { useLocale, useTranslations } from "next-intl";
import LoadingLottie from "@/components/loading/LoadingAnimation";
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
      <div className="flex flex-col items-center" role="status" aria-live="polite" aria-busy="true">
        <OrangeBackground />
        <LoadingLottie text={t("loadingDriverInfo")} />
      </div>
    );
  if (!driver)
    return (
      <div className="flex flex-col items-center" role="alert" aria-live="assertive">
        <OrangeBackground />
        <div>{t("failedFetch")}</div>
      </div>
    );

  return (
    <main className="flex flex-col items-center" aria-label={t("driverMyPageMain")}>
      <header className="flex h-[54px] w-full max-w-300 items-center px-7 md:px-24 lg:h-24 lg:px-2">
        <h1 className="text-lg font-semibold lg:text-2xl">{t("mypage")}</h1>
      </header>

      <OrangeBackground subTitle={true} />

      <section
        className="flex w-full max-w-300 flex-col items-center px-5 md:px-18 lg:items-stretch lg:px-0"
        aria-label={t("driverInfoSection")}
      >
        <div className="mt-[43px] flex w-full flex-col justify-between md:max-w-205 lg:max-w-300 lg:flex-row">
          <div className="max-w-205">
            <div className="flex" role="region" aria-label={t("profileSection")}>
              <Image
                src={driver.profileImage ?? "/assets/images/img_profile.svg"}
                alt={`${driver.nickname} ${t("profileImageAlt")}`}
                width={80}
                height={85}
                className="h-[64px] w-[60px] rounded-xl object-cover object-center md:h-[85px] md:w-[80px]"
              />
              <div className="ml-3">
                <div className="mt-5 flex" role="heading" aria-level={2}>
                  <Image src="/assets/icons/ic_profileMark.svg" alt={t("profileIconAlt")} width={25} height={25} />
                  <p className="ml-1 text-2xl font-semibold">{driver.nickname}</p>
                </div>
                <div className="mt-2 flex" aria-label={t("favoriteCount")}>
                  <LikeIcon color="black" />
                  <p className="ml-1 text-gray-500">{driver.favoriteCount}</p>
                </div>
              </div>
            </div>
            <section aria-label={t("driverIntroduction")}>
              <p className="text-lg font-semibold">{translatedInfo.short}</p>
              <p className="mt-3 text-gray-500">{translatedInfo.detail}</p>
            </section>
          </div>
          <EditButtons aria-label={t("editButtons")} />
        </div>

        <div className="w-full max-w-205">
          <div className="border-line-100 my-8 border-b" />

          <section className="flex flex-col gap-4" aria-label={t("driverOverviewSection")}>
            <h2 className="text-black-400 text-xl font-semibold">{t("overview")}</h2>
            <DriverSimpleInfo
              type="my-page"
              career={driver.career}
              averageRating={driver.averageRating}
              work={driver.work}
            />
          </section>

          <Service services={driver.moveType} serviceAreas={driver.serviceAreas} aria-label={t("serviceInfoSection")} />
          <DriverReviews driver={driver} aria-label={t("reviewSection")} />
        </div>
      </section>
    </main>
  );
}

export default DriverMyPage;
