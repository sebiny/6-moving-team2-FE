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

  return (
    <aside className="mt-[290px] ml-[54px] hidden lg:block" aria-label={t("LikedDrivers")} role="complementary">
      <h2 className="mb-4 text-xl font-semibold">{t("LikedDrivers")}</h2>

      {isPending ? (
        <LikedDriverInfoSkeleton />
      ) : !drivers ? (
        <p>{t("noDrivers")}</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {drivers.map((driver) => (
            <li key={driver.id}>
              <LikedDriverInfo driver={driver} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default LikedDrivers;
