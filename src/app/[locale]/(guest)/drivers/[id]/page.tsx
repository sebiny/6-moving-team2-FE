"use client";

import React, { useEffect, useState } from "react";
import DriverReviews from "../../../../../components/driver/DriverReviews";
import DriverInfo from "./_components/DriverInfo";
import ShareDriver from "../../../../../components/ShareDriver";
import RequestEstimate from "./_components/RequestEstimate";
import Service from "../../../../../components/Service";
import BottomNav from "./_components/BottomNav";
import OrangeBackground from "@/components/OrangeBackground";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { driverService } from "@/lib/api/api-driver";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { useKakaoShare } from "@/hooks/useKakaoShare";

function DriverDetailPage() {
  const t = useTranslations("FindDriver");
  const { id } = useParams();
  const { user } = useAuth();
  const driverId = id as string;
  const [favorite, setFavorite] = useState<boolean>(false);

  const driverUrl = `https://www.moving-2.click/drivers/${driverId}`;
  const shareToKakao = useKakaoShare();

  const { data: driver, isPending } = useQuery<DriverType | null>({
    queryKey: ["driver", driverId, user],
    queryFn: () =>
      user ? driverService.getDriverDetailCookie(driverId) : driverService.getDriverDetailDefault(driverId)
  });

  useEffect(() => {
    if (driver?.isFavorite !== undefined) {
      setFavorite(driver.isFavorite);
    }
  }, [driver]);

  if (isPending)
    return (
      <div className="flex flex-col items-center">
        <OrangeBackground />
        <LoadingLottie text="기사님 정보를 불러오고 있어요!!" />
      </div>
    );

  if (!driver) return <div>기사님 정보를 불러올 수 없습니다</div>;

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `${driver.nickname} 기사님`,
      description: "무빙에서 이 기사님을 추천합니다!",
      imageUrl: driver.profileImage
        ? `https://www.moving-2.click${driver.profileImage}`
        : "https://www.moving-2.click/assets/images/img_profile.svg",
      link: { mobileWebUrl: driverUrl, webUrl: driverUrl },
      buttons: [
        {
          title: "기사님 보러가기",
          link: { mobileWebUrl: driverUrl, webUrl: driverUrl }
        }
      ]
    });
  };

  // Facebook 공유
  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(driverUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-col items-center">
      <OrangeBackground />
      <div className="flex w-full justify-center gap-[116px]">
        <div className="mx-5 w-full max-w-[742px] md:mx-18">
          <DriverInfo driver={driver} />
          <Service services={driver.moveType} serviceAreas={driver.serviceAreas} />
          <div className="mb-8 lg:hidden">
            <div className="border-line-100 border-b"></div>
            <ShareDriver
              text={t("driverPage.wannaRecommend?")}
              onKakaoShare={handleKakaoShare}
              onFacebookShare={handleFacebookShare}
            />
            <div className="border-line-100 mt-8 border-b"></div>
          </div>
          <DriverReviews driver={driver} />
        </div>
        <div className="mt-[109px] hidden w-80 lg:block">
          <RequestEstimate
            nickname={driver.nickname}
            favorite={favorite}
            setFavorite={setFavorite}
            isDesignated={driver.isDesignated ?? false}
          />
          <ShareDriver
            text={t("driverPage.wannaRecommend?")}
            onKakaoShare={handleKakaoShare}
            onFacebookShare={handleFacebookShare}
          />
        </div>
      </div>
      <BottomNav favorite={favorite} setFavorite={setFavorite} isDesignated={driver.isDesignated ?? false} />
    </div>
  );
}

export default DriverDetailPage;
