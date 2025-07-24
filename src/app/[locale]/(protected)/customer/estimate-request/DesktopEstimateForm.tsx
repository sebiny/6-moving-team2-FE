"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEstimateRequest } from "@/lib/api/api-estimateRequest";
import { moveTypeValueMap } from "@/types/moveType";
import CalenderDropdown from "./_components/dropdown/CalenderDropdown";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { AddressSummary } from "@/utills/AddressMapper";
import { Address } from "@/types/Address";
import { useTranslations } from "next-intl";

export default function DesktopEstimateForm() {
  const t = useTranslations("EstimateReq");
  const moveTypes = [
    { label: t("smallBox.text"), description: t("smallBox.subText") },
    { label: t("familyBox.text"), description: t("familyBox.subText") },
    { label: t("officeBox.text"), description: t("officeBox.subText") }
  ];
  const queryClient = useQueryClient();
  const [selectedMoveType, setSelectedMoveType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);

  const handleMoveTypeSelect = (label: string) => {
    setSelectedMoveType((prev) => (prev === label ? null : label));
  };

  const isFormValid = selectedMoveType !== null && selectedDate !== null && addressFrom !== null && addressTo !== null;

  const { mutateAsync: requestEstimate, isPending } = useMutation({
    mutationFn: createEstimateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimate", "active"] });
    }
  });

  const handleRequest = async () => {
    if (!selectedMoveType || !selectedDate || !addressFrom || !addressTo) return;

    try {
      await requestEstimate({
        moveType: moveTypeValueMap[selectedMoveType],
        moveDate: selectedDate.toISOString(),
        fromAddressId: String(addressFrom.id),
        toAddressId: String(addressTo.id)
      });
      alert(t("estimateReqSuccess"));
    } catch {
      alert(t("estimateReqFailure"));
    }
  };

  return (
    <div className="bg-background-100 min-h-screen pt-1">
      {/* 컨테이너 */}
      <div className="mx-auto mt-[33px] flex max-w-[700px] flex-col items-center rounded-[40px] bg-white px-10 pt-[79px] pb-12 lg:mt-9 lg:max-w-[894px] lg:px-[47px] lg:pt-[89px]">
        {/* 타이틀 */}
        <div className="flex flex-col gap-2 text-center lg:gap-4">
          <h1 className="text-2xl font-bold">{t("estimateReqTitle")}</h1>
          <p className="text-[var(--color-gray-400)]">{t("estimateReqSubTitle")}</p>
        </div>
        {/* 콘텐츠 */}
        <div className="mt-16 lg:mt-20">
          {/* 이사 유형 */}
          <div className="lg mb-12 flex flex-col gap-2">
            <p className="text-lg font-bold">{t("movingType")}</p>
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
            <label className="text-lg font-bold">{t("movingExpectedDate")}</label>
            <CalenderDropdown date={selectedDate} onChange={setSelectedDate} />
          </div>
          {/* 이사 지역 */}
          <div className="flex justify-between lg:mb-[59px]">
            <label className="text-lg font-bold">{t("movingArea")}</label>
            <div className="flex w-100 flex-col gap-[30px] lg:w-[520px] lg:flex-row lg:gap-4">
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">{t("from")}</p>
                <Button
                  text={addressFrom ? AddressSummary(addressFrom.roadAddress) : t("fromChoose")}
                  type="white-orange"
                  onClick={() => setShowModal("from")}
                  className="h-[54px] w-100 justify-start truncate overflow-hidden rounded-xl px-6 py-4 whitespace-nowrap lg:w-[252px]"
                />
              </div>
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">{t("to")}</p>
                <Button
                  text={addressTo ? AddressSummary(addressTo.roadAddress) : t("toChoose")}
                  type="white-orange"
                  onClick={() => setShowModal("to")}
                  className="h-[54px] w-100 justify-start truncate overflow-hidden rounded-xl px-6 py-4 whitespace-nowrap lg:w-[252px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 태블릿 버튼 */}
        <div className="mt-[57px] flex w-full justify-end lg:hidden">
          <Button
            text={isPending ? t("requesting") : t("requestQuote")}
            type="orange"
            isDisabled={!isFormValid || isPending}
            className="px-[51px]"
            onClick={handleRequest}
          />
        </div>
      </div>

      {/* PC 버튼 */}
      <div className="hidden lg:block">
        <div className="mx-20 mt-10 mb-[50px] hidden justify-end lg:flex">
          <Button
            text={isPending ? t("requesting") : t("requestQuote")}
            type="orange"
            isDisabled={!isFormValid || isPending}
            className="px-[51px]"
            onClick={handleRequest}
          />
        </div>
      </div>

      {showModal && (
        <AddressCardModal
          title={showModal === "from" ? t("fromChoose") : t("toChoose")}
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
    </div>
  );
}
