"use client";

import React from "react";
import DriverReviews from "../../../../components/driver/DriverReviews";
import DriverInfo from "./_components/DriverInfo";
import ShareDriver from "../../../../components/ShareDriver";
import RequestEstimate from "./_components/RequestEstimate";
import Service from "../../../../components/Service";
import BottomNav from "./_components/BottomButton";
import OrangeBackground from "@/components/OrangeBackground";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { driverService } from "@/lib/api/api-driver";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

function DriverDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const driverId = id as string;
  const { data: driver, isPending } = useQuery<DriverType | null>({
    queryKey: ["driver", driverId],
    queryFn: () =>
      user ? driverService.getDriverDetailCookie(driverId) : driverService.getDriverDetailDefault(driverId)
  });
  if (!driver) {
    return <div>로딩중...</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <OrangeBackground />
      <div className="flex w-full justify-center gap-[116px]">
        <div className="mx-5 w-full max-w-[742px] md:mx-18">
          <DriverInfo driver={driver} />
          <Service services={driver.moveType} regions={driver.serviceAreas} />
          <div className="mb-8 lg:hidden">
            <div className="border-line-100 border-b"></div>
            <ShareDriver text="나만 알기엔 아쉬운 기사님인가요?" />
            <div className="border-line-100 mt-8 border-b"></div>
          </div>
          <DriverReviews driver={driver} />
        </div>
        <div className="mt-[109px] hidden w-80 lg:block">
          <RequestEstimate userFavorite={driver.isFavorite} />
          <ShareDriver text="나만 알기엔 아쉬운 기사님인가요?" />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default DriverDetailPage;
