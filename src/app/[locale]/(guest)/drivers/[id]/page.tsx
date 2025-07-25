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

function DriverDetailPage() {
  const t = useTranslations("FindDriver");
  const { id } = useParams();
  const { user } = useAuth();
  const driverId = id as string;
  const [favorite, setFavorite] = useState<boolean>(false);

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

  if (isPending) return <div>로딩중...</div>;
  if (!driver) return <div>기사님 정보를 불러올 수 없습니다</div>;

  return (
    <div className="flex flex-col items-center">
      <OrangeBackground />
      <div className="flex w-full justify-center gap-[116px]">
        <div className="mx-5 w-full max-w-[742px] md:mx-18">
          <DriverInfo driver={driver} />
          <Service services={driver.moveType} serviceAreas={driver.serviceAreas} />
          <div className="mb-8 lg:hidden">
            <div className="border-line-100 border-b"></div>
            <ShareDriver text={t("driverPage.wannaRecommend?")} />
            <div className="border-line-100 mt-8 border-b"></div>
          </div>
          <DriverReviews driver={driver} />
        </div>
        <div className="mt-[109px] hidden w-80 lg:block">
          <RequestEstimate favorite={favorite} setFavorite={setFavorite} isDesignated={driver.isDesignated ?? false} />
          <ShareDriver text={t("driverPage.wannaRecommend?")} />
        </div>
      </div>
      <BottomNav favorite={favorite} setFavorite={setFavorite} isDesignated={driver.isDesignated ?? false} />
    </div>
  );
}

export default DriverDetailPage;
