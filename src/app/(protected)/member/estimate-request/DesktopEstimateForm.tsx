"use client";

import { useState } from "react";
import CalenderDropdown from "./_components/CalenderDropdown";
import MoveTypeCard from "./_components/MoveTypeCard";
import AddressCardModal from "./_components/AddressCardModal";
import Button from "@/components/Button";

const moveTypes = [
  { label: "소형이사", description: "원룸, 투룸, 20평대 미만" },
  { label: "가정이사", description: "쓰리룸, 20평대 이상" },
  { label: "사무실이사", description: "사무실, 상업공간" }
];

export default function DesktopEstimateForm() {
  const [selectedMoveType, setSelectedMoveType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [addressFrom, setAddressFrom] = useState<string>("");
  const [addressTo, setAddressTo] = useState<string>("");

  const handleMoveTypeSelect = (label: string) => {
    setSelectedMoveType((prev) => (prev === label ? null : label));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-100)]">
      {/* 컨테이너 */}
      <div className="lg: mx-auto mt-10 flex max-w-[700px] flex-col items-center rounded-[40px] bg-white px-10 pt-[79px] pb-12 lg:max-w-[894px] lg:px-[47px] lg:pt-[89px]">
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
                <button
                  type="button"
                  onClick={() => setShowModal("from")}
                  className="h-[54px] w-full rounded-xl border border-orange-400 px-6 py-4 text-start font-semibold text-orange-400"
                >
                  {addressFrom || "출발지 선택하기"}
                </button>
              </div>
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">도착지</p>
                <button
                  type="button"
                  onClick={() => setShowModal("to")}
                  className="h-[54px] w-full rounded-xl border border-orange-400 px-6 py-4 text-start font-semibold text-orange-400"
                >
                  {addressTo || "도착지 선택하기"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 태블릿 버튼 */}
        {/* TODO: 버튼 onClick 연결해야 함. */}
        <div className="mt-[57px] flex w-full justify-end lg:hidden">
          <Button text="견적 요청하기" type="orange" isDisabled={true} className="px-[51px]" />
        </div>
      </div>

      {/* PC 버튼*/}
      {/* TODO: 버튼 onClick 연결해야 함. */}
      <div className="hidden w-full justify-end lg:flex">
        <div className="absolute right-[60px] bottom-[50px]">
          <Button text="견적 요청하기" type="orange" isDisabled={true} className="px-[51px]" />
        </div>
      </div>

      {/* TODO: 주소 검색 후 선택하는 것까지 연결해야 함. */}
      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? "출발지 선택" : "도착지 선택"}
          onClose={() => setShowModal(null)}
          confirmLabel="선택 완료"
          onConfirm={() => setShowModal(null)}
          onChange={(value) => (showModal === "from" ? setAddressFrom(value) : setAddressTo(value))}
        />
      )}
    </div>
  );
}
