"use client";
import React from "react";
import LikedDriverInfo from "./LikedDriverInfo";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { favoriteService } from "@/lib/api/api-favorite";
import { useTranslations } from "next-intl";
import LikedDriverInfoSkeleton from "./LikedDriverInfoSkeleton";

function LikedDrivers() {
  const t = useTranslations("FindDriver");
  const { data: drivers, isPending } = useQuery<DriverType[] | null>({
    queryKey: ["drivers"],
    queryFn: () => favoriteService.favoriteDrivers(1, 3)
  });
  if (isPending)
    return (
      <div>
        <p className="mb-4 text-xl font-semibold">{t("LikedDrivers")}</p>
        <LikedDriverInfoSkeleton />
      </div>
    );
  if (!drivers)
    return (
      <div>
        <p className="mb-4 text-xl font-semibold">{t("LikedDrivers")}</p>
        <p>{t("noDrivers")}</p>
      </div>
    );
  return (
    <div>
      <p className="mb-4 text-xl font-semibold">{t("LikedDrivers")}</p>
      <div className="flex flex-col gap-4">
        {drivers.map((driver) => (
          <LikedDriverInfo key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}

export default LikedDrivers;
