"use client";

import { drivers } from "@/constant/driverType";
import DriverFindCard from "@/components/card/DriverFindCard";
import SubHeader from "../_components/SubHeader";
import { useState } from "react";
import CustomCheckbox from "@/components/button/CustomCheckbox";

export default function FavoriteDrivers() {
  const [checkedList, setCheckedList] = useState<boolean[]>(drivers.map(() => false));

  // 전체 선택 여부
  const isAllChecked = checkedList.every(Boolean);

  // 전체 선택 토글
  const toggleAll = (value: boolean) => {
    setCheckedList(drivers.map(() => value));
  };

  // 개별(DriverFindCard) 체크 변경 함수
  const handleChange = (index: number, value: boolean) => {
    setCheckedList((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <SubHeader title="찜한 기사님" />
      </div>

      {/* 실제 내용 */}
      <div className="mt-13 flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:mt-15 lg:px-100 lg:py-15">
        <div className="flex justify-between">
          <div className="flex">
            <CustomCheckbox checked={isAllChecked} onChange={(val) => toggleAll(val)} shape="square" />
            <div className="mt-1.5">
              전체선택({checkedList.filter(Boolean).length}/{drivers.length})
            </div>
          </div>
          <div className="mt-1.5 mr-2.5">선택항목 삭제</div>
        </div>

        {drivers.map((driver, index) => (
          <DriverFindCard
            key={driver.id}
            driver={driver}
            isFavoritePage={true}
            checked={checkedList[index]}
            onCheckChange={(val) => handleChange(index, val)}
          />
        ))}
      </div>
    </div>
  );
}
