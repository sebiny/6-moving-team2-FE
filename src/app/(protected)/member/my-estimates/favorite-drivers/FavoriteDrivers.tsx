"use client";

import { drivers } from "@/constant/driverType";
import FavoriteDriversHeader from "./_components/FavoriteDriversHeader";
import DriverFindCard from "@/components/card/DriverFindCard";

export default function FavoriteDrivers() {
  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="sticky top-[5px] z-30 bg-white lg:top-[25px]">
        <FavoriteDriversHeader />
      </div>

      {/* 실제 내용 */}
      <div className="flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:px-70 lg:py-15">
        <div className="flex justify-between text-base">
          <span className="ml-3">전체선택(0/1)</span>
          <span className="mr-3">선택항목 삭제</span>
        </div>

        {drivers.map((driver) => (
          <DriverFindCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}
