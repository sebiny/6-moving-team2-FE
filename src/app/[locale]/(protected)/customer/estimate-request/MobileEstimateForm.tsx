"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEstimateRequest } from "@/lib/api/api-estimateRequest";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import MobileDatePicker from "./_components/datepicker/MobileDatePicker";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { AddressSummary } from "@/utills/AddressMapper";
import { Address } from "@/types/Address";
import { useLocale, useTranslations } from "next-intl";
import { ToastModal } from "@/components/common-modal/ToastModal";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { batchTranslate } from "@/utills/batchTranslate";

export default function MobileEstimateForm() {
  const t = useTranslations("EstimateReq");
  const moveTypes = [
    { key: "SMALL", label: t("smallBox.text"), description: t("smallBox.subText") },
    { key: "HOME", label: t("familyBox.text"), description: t("familyBox.subText") },
    { key: "OFFICE", label: t("officeBox.text"), description: t("officeBox.subText") }
  ] as const;

  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  type MoveTypeKey = (typeof moveTypes)[number]["key"];
  const [moveType, setMoveType] = useState<MoveTypeKey | null>(null);
  const [moveDate, setMoveDate] = useState<Date | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const locale = useLocale();
  const [translatedAddressFrom, setTranslatedAddressFrom] = useState("");
  const [translatedAddressTo, setTranslatedAddressTo] = useState("");

  useEffect(() => {
    if (!addressFrom || locale === "ko") {
      setTranslatedAddressFrom(addressFrom ? AddressSummary(addressFrom.roadAddress) : "");
      return;
    }

    const translate = async () => {
      const result = await batchTranslate({ road: addressFrom.roadAddress }, locale);
      setTranslatedAddressFrom(AddressSummary(result.road));
    };

    translate();
  }, [addressFrom, locale]);

  useEffect(() => {
    if (!addressTo || locale === "ko") {
      setTranslatedAddressTo(addressTo ? AddressSummary(addressTo.roadAddress) : "");
      return;
    }

    const translate = async () => {
      const result = await batchTranslate({ road: addressTo.roadAddress }, locale);
      setTranslatedAddressTo(AddressSummary(result.road));
    };

    translate();
  }, [addressTo, locale]);

  const isValidStep1 = !!moveType;
  const isValidStep2 = !!moveDate;
  const isValidStep3 = !!addressFrom && !!addressTo;

  const stepList = [1, 2, 3];

  const { mutateAsync: requestEstimate } = useMutation({
    mutationFn: createEstimateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimate", "active"] });
    }
  });

  const handleMoveTypeSelect = (key: MoveTypeKey) => {
    setMoveType((prev) => (prev === key ? null : key));
  };

  const handleRequest = async () => {
    if (!moveType || !moveDate || !addressFrom || !addressTo) return;

    try {
      setIsRequesting(true);
      await requestEstimate({
        moveType: moveType,
        moveDate: moveDate.toISOString(),
        fromAddressId: String(addressFrom.id),
        toAddressId: String(addressTo.id)
      });
      ToastModal(t("estimateReqSuccess"));
    } catch {
      ToastModal(t("estimateReqFailure"));
    } finally {
      setIsRequesting(false);
    }
  };

  if (isRequesting) {
    return <LoadingLottie text="견적 요청 진행중입니다." />;
  }

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
              {moveTypes.map(({ key, label, description }) => (
                <MoveTypeCard
                  key={key}
                  label={label}
                  description={description}
                  selected={moveType === key}
                  onClick={() => handleMoveTypeSelect(key)}
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
              <Button
                text={
                  addressFrom ? (
                    <div className="scroll-hide max-w-full overflow-x-auto whitespace-nowrap">
                      {translatedAddressFrom}
                    </div>
                  ) : (
                    t("fromChoose")
                  )
                }
                type="white-orange"
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("from")}
              />
            </div>
            <div className="flex flex-col gap-3 lg:w-full">
              <p className="font-medium">{t("to")}</p>
              <Button
                text={
                  addressTo ? (
                    <div className="scroll-hide max-w-full overflow-x-auto whitespace-nowrap">
                      {translatedAddressTo}
                    </div>
                  ) : (
                    t("toChoose")
                  )
                }
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
              isDisabled={!isValidStep3}
              onClick={handleRequest}
              text={t("requestEstimate")}
              type="orange"
              className="h-[54px] w-[158px]"
            />
          </div>
        </div>
      )}

      {/* 주소 검색 모달 */}
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
    </main>
  );
}
