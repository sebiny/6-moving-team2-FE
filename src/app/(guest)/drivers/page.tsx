import React from "react";
import DriverSimpleInfo from "./_components/DriverSimpleInfo";
import Image from "next/image";
import LikedDrivers from "./_components/LikedDrivers";

function DriversPage() {
  const drivers = [{ id: 1 }];
  return (
    <div className="flex justify-center">
      <div className="w-205">
        <p className="my-8 text-3xl font-semibold">기사님 찾기</p>
        <div className="bg-background-200 relative flex h-16 items-center rounded-2xl">
          <Image className="absolute left-6" src="/assets/icons/ic_search.svg" alt="검색" width={30} height={30} />
          <input className="absolute left-14 w-180" placeholder="텍스트를 입력해주세요." />
        </div>
        <div className="my-[38px] flex justify-between">
          <div className="flex gap-8">
            <div></div>
            <p className="text-gray-300">초기화</p>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-5">
          {drivers.map((driver) => (
            <DriverSimpleInfo key={driver.id} />
          ))}
        </div>
      </div>
      <div className="mt-[260px] ml-[54px]">
        <LikedDrivers />
      </div>
    </div>
  );
}

export default DriversPage;
