"use client";
import React from "react";
import LikedDriverInfo from "./LikedDriverInfo";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { favoriteService } from "@/lib/api/api-favorite";

function LikedDrivers() {
  // const drivers = [{ id: 1 }];
  const { data: drivers, isPending } = useQuery<DriverType[] | null>({
    queryKey: ["drivers"],
    queryFn: () => favoriteService.favoriteDrivers()
  });
  if (isPending) return <div>불러오는 중...</div>;
  if (!drivers) return <div>기사님을 불러올 수 없습니다</div>;
  return (
    <div>
      <p className="mb-4 text-xl font-semibold">찜한 기사님</p>
      <div>
        {drivers.map((driver) => (
          <LikedDriverInfo key={driver.id} />
        ))}
      </div>
    </div>
  );
}

export default LikedDrivers;
