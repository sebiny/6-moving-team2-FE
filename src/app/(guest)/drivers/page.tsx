import React from "react";
import DriverSimpleInfo from "./_components/DriverSimpleInfo";
import Image from "next/image";
import LikedDrivers from "./_components/LikedDrivers";
import SortDropdown from "@/components/dropdown/SortDropdown";
import FilterDropdown from "@/components/dropdown/FilterDropdown";
import Filters from "./_components/Filters";

function DriversPage() {
  const drivers = [{ id: 1 }];
  return (
    <div className="flex justify-center">
      <div className="mx-6 w-full max-w-205">
        <p className="my-8 hidden text-3xl font-semibold lg:block">기사님 찾기</p>
        <div className="bg-background-200 relative flex h-16 items-center rounded-2xl">
          <Image className="absolute left-6" src="/assets/icons/ic_search.svg" alt="검색" width={30} height={30} />
          <input className="absolute left-14 w-180" placeholder="텍스트를 입력해주세요." />
        </div>
        <div className="my-[38px] flex justify-between">
          <div className="flex items-center gap-8">
            <div>
              <Filters />
            </div>
            <p className="hidden text-gray-300 lg:block">초기화</p>
          </div>
          <SortDropdown sortings={["리뷰 많은순", "평점 높은순", "경력 높은순", "확정 많은순"]} value="리뷰 많은순" />
        </div>
        <div className="flex flex-col gap-5">
          {drivers.map((driver) => (
            <DriverSimpleInfo key={driver.id} />
          ))}
        </div>
      </div>
      <div className="mt-[260px] ml-[54px] hidden lg:block">
        <LikedDrivers />
      </div>
    </div>
  );
}

export default DriversPage;
