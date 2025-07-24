"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEstimateRequest } from "@/lib/api/api-estimateRequest";
import { moveTypeValueMap } from "@/types/moveType";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import MobileDatePicker from "./_components/datepicker/MobileDatePicker";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { AddressSummary } from "@/utills/AddressMapper";
import { Address } from "@/types/Address";
import { useTranslations } from "next-intl";

export default function MobileEstimateForm() {
  const t = useTranslations("EstimateReq");
  const moveTypes = [
    { label: t("smallBox.text"), description: t("smallBox.subText") },
    { label: t("familyBox.text"), description: t("familyBox.subText") },
    { label: t("officeBox.text"), description: t("officeBox.subText") }
  ];
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [moveType, setMoveType] = useState<string | null>(null);
  const [moveDate, setMoveDate] = useState<Date | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);

  const isValidStep1 = !!moveType;
  const isValidStep2 = !!moveDate;
  const isValidStep3 = !!addressFrom && !!addressTo;

  const stepList = [1, 2, 3];

  const { mutateAsync: requestEstimate, isPending } = useMutation({
    mutationFn: createEstimateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimate", "active"] });
    }
  });

  const handleMoveTypeSelect = (label: string) => {
    setMoveType((prev) => (prev === label ? null : label));
  };

  const handleRequest = async () => {
    if (!moveType || !moveDate || !addressFrom || !addressTo) return;

    try {
      await requestEstimate({
        moveType: moveTypeValueMap[moveType],
        moveDate: moveDate.toISOString(),
        fromAddressId: String(addressFrom.id),
        toAddressId: String(addressTo.id)
      });
      alert(t("estimateReqSuccess"));
    } catch {
      alert(t("estimateReqFailure"));
    }
  };

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
            <h2 className="text-xl font-bold">{t("typeText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
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
                  onClick={() => handleMoveTypeSelect(label)}
                />
              ))}
            </div>
            {/* 다음 버튼 */}
            <div className="mt-6 flex justify-end">
              <Button
                isDisabled={!isValidStep1}
                onClick={() => setStep(2)}
                text={t("next")}
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
            <h2 className="text-xl font-bold">{t("dateText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
          </div>
          {/* 달력 */}
          <div>
            <MobileDatePicker selectedDate={moveDate} onSelectDate={setMoveDate} />
          </div>
          {/* 이전, 다음 버튼 */}
          <div className="mt-32 flex justify-center gap-2">
            <Button
              type="white-orange"
              onClick={() => setStep(1)}
              text={t("previous")}
              className="h-[54px] w-[158px]"
            />
            <Button
              isDisabled={!isValidStep2}
              onClick={() => setStep(3)}
              text={t("next")}
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
            <h2 className="text-xl font-bold">{t("areaText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
          </div>
          {/* 주소 검색 버튼 */}
          <div className="flex w-[327px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-medium">{t("from")}</p>
              <Button
                text={addressFrom ? AddressSummary(addressFrom.roadAddress) : t("fromChoose")}
                type="white-orange"
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("from")}
              />
            </div>
            <div className="flex flex-col gap-3 lg:w-full">
              <p className="font-medium">{t("to")}</p>
              <Button
                text={addressTo ? AddressSummary(addressTo.roadAddress) : t("toChoose")}
                type="white-orange"
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("to")}
              />
            </div>
          </div>

          {/* 이전, 요청 버튼 */}
          <div className="mt-71 flex justify-center gap-2">
            <Button
              type="white-orange"
              onClick={() => setStep(2)}
              text={t("previous")}
              className="h-[54px] w-[158px]"
            />

            <Button
              isDisabled={!isValidStep3 || isPending}
              onClick={handleRequest}
              text={isPending ? t("requesting") : t("requestEstimate")}
              type="orange"
              className="h-[54px] w-[158px]"
            />
          </div>
        </div>
      )}

      {/* 주소 검색 모달 */}
      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? t("fromSelect") : t("toSelect")}
          confirmLabel={t("confirm")}
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
    </main>
  );
}
