"use client";

import { useState } from "react";
import MoveTypeCard from "./_components/MoveTypeCard";
import MobileDatePicker from "./_components/MobileDatePicker";
import AddressCardModal from "./_components/AddressCardModal";
// import Button from "@/components/Button";

const moveTypes = [
  { label: "소형이사", description: "원룸, 투룸, 20평대 미만" },
  { label: "가정이사", description: "쓰리룸, 20평대 이상" },
  { label: "사무실이사", description: "사무실, 상업공간" }
];

// TODO: 버튼 컴포넌트 onClick 연결 후 삭제 예정
const baseBtn = "flex items-center justify-center gap-[6px] rounded-[16px] py-[14px] font-semibold w-[158px]";
const orangeBtn = `${baseBtn} bg-orange-400 text-white`;
const grayBtn = `${baseBtn} border border-orange-400 text-orange-400 bg-white`;
const orangeDisabled = `${baseBtn} bg-gray-100 text-white`;

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
    <main className="min-h-screen bg-white px-4 py-6">
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
        <>
          {/* 타이틀 */}
          <div className="mb-4 flex flex-col text-center">
            <h2 className="text-xl font-bold">이사 유형을 선택해주세요</h2>
            <p className="text-sm text-gray-400">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
          </div>
          {/* 이동 유형 카드 */}
          <div className="flex flex-col items-center gap-4">
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
            <button
              className={isValidStep1 ? orangeBtn : orangeDisabled}
              disabled={!isValidStep1}
              onClick={() => setStep(2)}
            >
              다음
            </button>
          </div>
        </>
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
            <button className={grayBtn} onClick={() => setStep(1)}>
              이전
            </button>
            <button
              className={isValidStep2 ? orangeBtn : orangeDisabled}
              disabled={!isValidStep2}
              onClick={() => setStep(3)}
            >
              다음
            </button>
          </div>
        </>
      )}

      {/* 3. 이사 지역 선택 */}
      {step === 3 && (
        <>
          {/* 타이틀 */}
          <div className="mb-[62px] flex flex-col text-center">
            <h2 className="text-xl font-bold">이사 지역을 선택해주세요</h2>
            <p className="text-sm text-gray-400">견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)</p>
          </div>
          {/* 주소 검색 버튼 */}
          {/* TODO: 모달에서 주소 선택 가능하도록 추후 수정 */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
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
                onClick={() => setShowModal("from")}
                className="h-[54px] w-full rounded-xl border border-orange-400 px-6 py-4 text-start font-semibold text-orange-400"
              >
                {addressTo || "도착지 선택하기"}
              </button>
            </div>
          </div>

          {/* 이전, 요청 버튼 */}
          {/* TODO: 요청 버튼 연결하기 */}
          <div className="mt-71 flex justify-center gap-2">
            <button className={grayBtn} onClick={() => setStep(1)}>
              이전
            </button>
            <button
              className={isValidStep3 ? orangeBtn : orangeDisabled}
              disabled={!isValidStep3}
              onClick={() => alert("요청 완료")}
            >
              견적 요청하기
            </button>
          </div>
        </>
      )}

      {/* 주소 검색 모달 */}
      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? "출발지 선택" : "도착지 선택"}
          onClose={() => setShowModal(null)}
          confirmLabel="선택 완료"
          onConfirm={() => setShowModal(null)}
          onChange={(value) => {
            if (showModal === "from") setAddressFrom(value);
            else setAddressTo(value);
          }}
        />
      )}
    </main>
  );
}
