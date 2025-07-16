"use client";

import { drivers } from "@/constant/constant";
import DriverFindCard from "@/components/card/DriverFindCard";
import SubHeader from "../_components/SubHeader";

export default function FavoriteDrivers() {
  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <SubHeader title="찜한 기사님" />
      </div>

      {/* 실제 내용 */}
      <div className="mt-13 flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:mt-15 lg:px-70 lg:py-15">
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
