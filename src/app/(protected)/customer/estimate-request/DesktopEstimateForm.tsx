"use client";

import { useState } from "react";
import CalenderDropdown from "./_components/dropdown/CalenderDropdown";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { AddressSummary } from "@/utills/AddressMapper";
import { Address } from "@/types/Address";

const moveTypes = [
  { label: "소형이사", description: "원룸, 투룸, 20평대 미만" },
  { label: "가정이사", description: "쓰리룸, 20평대 이상" },
  { label: "사무실이사", description: "사무실, 상업공간" }
];

export default function DesktopEstimateForm() {
  const [selectedMoveType, setSelectedMoveType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);

  const handleMoveTypeSelect = (label: string) => {
    setSelectedMoveType((prev) => (prev === label ? null : label));
  };

  const isFormValid = selectedMoveType !== null && selectedDate !== null && addressFrom !== null && addressTo !== null;

  return (
    <div className="bg-background-100 min-h-screen">
      {/* 컨테이너 */}
      <div className="lg: mx-auto mt-[91px] flex max-w-[700px] flex-col items-center rounded-[40px] bg-white px-10 pt-[79px] pb-12 lg:mt-32 lg:max-w-[894px] lg:px-[47px] lg:pt-[89px]">
        {/* 타이틀 */}
        <div className="flex flex-col gap-2 text-center lg:gap-4">
          <h1 className="text-2xl font-bold">이사 유형, 예정일과 지역을 선택해주세요</h1>
          <p className="text-[var(--color-gray-400)]">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
        </div>
        {/* 콘텐츠 */}
        <div className="mt-16 lg:mt-20">
          {/* 이사 유형 */}
          <div className="lg mb-12 flex flex-col gap-2">
            <p className="text-lg font-bold">이사 유형</p>
            <div className="flex flex-row gap-3 lg:gap-4">
              {moveTypes.map(({ label, description }) => (
                <MoveTypeCard
                  key={label}
                  label={label}
                  description={description}
                  selected={selectedMoveType === label}
                  onClick={() => handleMoveTypeSelect(label)}
                />
              ))}
            </div>
          </div>
          {/* 이사 예정일 */}
          <div className="mb-16 flex justify-between">
            <label className="text-lg font-bold">이사 예정일</label>
            <CalenderDropdown date={selectedDate} onChange={setSelectedDate} />
          </div>
          {/* 이사 지역 */}
          <div className="flex justify-between lg:mb-[59px]">
            <label className="text-lg font-bold">이사 지역</label>
            <div className="flex w-100 flex-col gap-[30px] lg:w-[520px] lg:flex-row lg:gap-4">
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">출발지</p>
                <Button
                  text={addressFrom ? AddressSummary(addressFrom.roadAddress) : "출발지 선택하기"}
                  type="white-orange"
                  onClick={() => setShowModal("from")}
                  className="h-[54px] w-100 justify-start truncate overflow-hidden rounded-xl px-6 py-4 whitespace-nowrap lg:w-[252px]"
                />
              </div>
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">도착지</p>
                <Button
                  text={addressTo ? AddressSummary(addressTo.roadAddress) : "도착지 선택하기"}
                  type="white-orange"
                  onClick={() => setShowModal("to")}
                  className="h-[54px] w-100 justify-start truncate overflow-hidden rounded-xl px-6 py-4 whitespace-nowrap lg:w-[252px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 태블릿 버튼 */}
        {/* TODO: 견적 요청 연결해야 함. */}
        <div className="mt-[57px] flex w-full justify-end lg:hidden">
          <Button
            text="견적 요청하기"
            type="orange"
            isDisabled={!isFormValid}
            className="px-[51px]"
            onClick={() => alert("견적 요청 성공!")}
          />
        </div>
      </div>

      {/* PC 버튼 */}
      {/* TODO: 견적 요청 연결해야 함. */}
      <div className="hidden lg:block">
        <div className="mx-20 mt-10 mb-[50px] hidden justify-end lg:flex">
          <Button
            text="견적 요청하기"
            type="orange"
            isDisabled={!isFormValid}
            className="px-[51px]"
            onClick={() => alert("견적 요청 성공!")}
          />
        </div>
      </div>

      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? "출발지 선택" : "도착지 선택"}
          confirmLabel="선택 완료"
          onClose={() => setShowModal(null)}
          onConfirm={(value: Address) => {
            if (showModal === "from") setAddressFrom(value);
            if (showModal === "to") setAddressTo(value);
            setShowModal(null);
          }}
          onChange={() => {}}
          selectedAddress={showModal === "from" ? addressFrom : addressTo}
        />
      )}
    </div>
  );
}
