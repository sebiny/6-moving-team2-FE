"use client";

import { useState } from "react";
import MoveTypeCard from "./_components/MoveTypeCard";
import MobileDatePicker from "./_components/MobileDatePicker";
import AddressCardModal from "./_components/AddressCardModal";
import Button from "@/components/Button";
import { AddressSummary } from "@/utills/AddressSummary";

const moveTypes = [
  { label: "소형이사", description: "원룸, 투룸, 20평대 미만" },
  { label: "가정이사", description: "쓰리룸, 20평대 이상" },
  { label: "사무실이사", description: "사무실, 상업공간" }
];

export default function MobileEstimateForm() {
  const [step, setStep] = useState(1);
  const [moveType, setMoveType] = useState<string | null>(null);
  const [moveDate, setMoveDate] = useState<Date | null>(null);
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);

  const isValidStep1 = !!moveType;
  const isValidStep2 = !!moveDate;
  const isValidStep3 = !!addressFrom && !!addressTo;

  const stepList = [1, 2, 3];

  return (
    <main className="mt-[90px] min-h-screen justify-center bg-white px-6">
      {/* 단계 표시 */}
      <div className="mb-3 flex justify-center gap-2">
        {stepList.map((s) => (
          <div
            key={s}
            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
              step === s ? "bg-[var(--color-orange-400)] text-white" : "bg-background-200 text-gray-300"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* 1. 이사 유형 선택 */}
      {step === 1 && (
        <div className="flex flex-col items-center">
          {/* 타이틀 */}
          <div className="mb-4 flex flex-col text-center">
            <h2 className="text-xl font-bold">이사 유형을 선택해주세요</h2>
            <p className="text-sm text-gray-400">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
          </div>
          <div className="w-[327px]">
            {/* 이동 유형 카드 */}
            <div className="flex flex-col gap-4">
              {moveTypes.map(({ label, description }) => (
                <MoveTypeCard
                  key={label}
                  label={label}
                  description={description}
                  selected={moveType === label}
                  onClick={() => setMoveType(label)}
                />
              ))}
            </div>
            {/* 다음 버튼 */}
            <div className="mt-6 flex justify-end">
              <Button
                isDisabled={!isValidStep1}
                onClick={() => setStep(2)}
                text="다음"
                type="orange"
                className="w-[155.5px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. 이사 예정일 선택 */}
      {step === 2 && (
        <>
          {/* 타이틀 */}
          <div className="mb-[70px] flex flex-col text-center">
            <h2 className="text-xl font-bold">이사 예정일을 선택해주세요</h2>
            <p className="text-sm text-gray-400">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
          </div>
          {/* 달력 */}
          <div>
            <MobileDatePicker selectedDate={moveDate} onSelectDate={setMoveDate} />
          </div>
          {/* 이전, 다음 버튼 */}
          <div className="mt-32 flex justify-center gap-2">
            <Button type="white-orange" onClick={() => setStep(1)} text="이전" className="h-[54px] w-[158px]" />
            <Button
              isDisabled={!isValidStep2}
              onClick={() => setStep(3)}
              text="다음"
              type="orange"
              className="w-[155.5px]"
            />
          </div>
        </>
      )}

      {/* 3. 이사 지역 선택 */}
      {step === 3 && (
        <div className="flex flex-col items-center">
          {/* 타이틀 */}
          <div className="mb-[62px] flex flex-col text-center">
            <h2 className="text-xl font-bold">이사 지역을 선택해주세요</h2>
            <p className="text-sm text-gray-400">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
          </div>
          {/* 주소 검색 버튼 */}
          <div className="flex w-[327px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-medium">출발지</p>
              <Button
                text={addressFrom ? AddressSummary(addressFrom) : "출발지 선택하기"}
                type="white-orange"
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("from")}
              />
            </div>
            <div className="flex flex-col gap-3 lg:w-full">
              <p className="font-medium">도착지</p>
              <Button
                text={addressTo ? AddressSummary(addressTo) : "도착지 선택하기"}
                type="white-orange"
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("to")}
              />
            </div>
          </div>

          {/* 이전, 요청 버튼 */}
          {/* TODO: 요청 버튼 연결하기 */}
          <div className="mt-71 flex justify-center gap-2">
            <Button type="white-orange" onClick={() => setStep(2)} text="이전" className="h-[54px] w-[158px]" />

            <Button
              isDisabled={!isValidStep3}
              onClick={() => alert("요청 완료")}
              text="견적 요청하기"
              type="orange"
              className="h-[54px] w-[158px]"
            />
          </div>
        </div>
      )}

      {/* 주소 검색 모달 */}
      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? "출발지 선택" : "도착지 선택"}
          confirmLabel="선택 완료"
          onClose={() => setShowModal(null)}
          onConfirm={(value) => {
            if (showModal === "from") setAddressFrom(value);
            if (showModal === "to") setAddressTo(value);
            setShowModal(null);
          }}
          onChange={(value) => (showModal === "from" ? setAddressFrom(value) : setAddressTo(value))}
          selectedValue={showModal === "from" ? addressFrom : addressTo}
        />
      )}
    </main>
  );
}
