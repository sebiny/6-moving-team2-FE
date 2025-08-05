"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEstimateRequest } from "@/lib/api/api-estimateRequest";
import CalenderDropdown from "./_components/dropdown/CalenderDropdown";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { Address } from "@/types/Address";
import { useLocale, useTranslations } from "next-intl";
import { ToastModal } from "@/components/common-modal/ToastModal";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { batchTranslate } from "@/utills/batchTranslate";

export default function DesktopEstimateForm() {
  const t = useTranslations("EstimateReq");
  const locale = useLocale();
  const queryClient = useQueryClient();
  const moveTypes = useMemo(
    () => [
      { key: "SMALL", label: t("smallBox.text"), description: t("smallBox.subText") },
      { key: "HOME", label: t("familyBox.text"), description: t("familyBox.subText") },
      { key: "OFFICE", label: t("officeBox.text"), description: t("officeBox.subText") }
    ],
    [t]
  );
  type MoveTypeKey = (typeof moveTypes)[number]["key"];
  const [selectedMoveType, setSelectedMoveType] = useState<MoveTypeKey | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  const [translatedAddressFrom, setTranslatedAddressFrom] = useState("");
  const [translatedAddressTo, setTranslatedAddressTo] = useState("");

  // 주소 동적 번역
  useEffect(() => {
    const translateAddress = async () => {
      if (!addressFrom && !addressTo) return;

      if (locale !== "ko") {
        if (addressFrom) {
          const result = await batchTranslate({ road: addressFrom.roadAddress }, locale);
          setTranslatedAddressFrom(result.road);
        }
        if (addressTo) {
          const result = await batchTranslate({ road: addressTo.roadAddress }, locale);
          setTranslatedAddressTo(result.road);
        }
      } else {
        setTranslatedAddressFrom(addressFrom?.roadAddress ?? "");
        setTranslatedAddressTo(addressTo?.roadAddress ?? "");
      }
    };

    translateAddress();
  }, [addressFrom, addressTo, locale]);

  // Lottie 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 견적 요청 mutation
  const { mutateAsync: requestEstimate } = useMutation({
    mutationFn: createEstimateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimate", "active"] });
    }
  });

  // 견적 요청 처리 함수
  const handleRequest = async () => {
    if (!selectedMoveType || !selectedDate || !addressFrom || !addressTo) return;

    try {
      setIsRequesting(true);
      await requestEstimate({
        moveType: selectedMoveType,
        moveDate: selectedDate.toISOString(),
        fromAddressId: addressFrom.id,
        toAddressId: addressTo.id
      });
      ToastModal(t("estimateReqSuccess"));
    } catch (err: any) {
      const messageKey = err?.response?.data?.message || err?.message || "estimateReqFailure";
      ToastModal(t(messageKey));
    } finally {
      setIsRequesting(false);
    }
  };

  const isFormValid = selectedMoveType !== null && selectedDate !== null && addressFrom !== null && addressTo !== null;

  if (isLoading || isRequesting) {
    return <LoadingLottie text={t(isLoading ? "loading.page" : "loading.request")} />;
  }

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
              {moveTypes.map(({ key, label, description }) => (
                <MoveTypeCard
                  key={key}
                  label={label}
                  description={description}
                  selected={selectedMoveType === key}
                  onClick={() => setSelectedMoveType((prev) => (prev === key ? null : key))}
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
            <div className="flex w-[400px] flex-col gap-[30px] lg:w-[520px] lg:flex-row lg:gap-4">
              <div className="flex flex-col gap-3 lg:w-full">
                <p className="font-medium">{t("from")}</p>
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
                  onClick={() => setShowModal("from")}
                  className="h-[54px] w-[400px] justify-start rounded-xl px-6 py-4 lg:w-[252px]"
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
                  onClick={() => setShowModal("to")}
                  className="h-[54px] w-[400px] justify-start rounded-xl px-6 py-4 lg:w-[252px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 태블릿 버튼 */}
        <div className="mt-[57px] flex w-full justify-end lg:hidden">
          <Button
            text={t("requestQuote")}
            type="orange"
            isDisabled={!isFormValid}
            className="px-[51px]"
            onClick={handleRequest}
          />
        </div>
      </div>

      {/* PC 버튼 */}
      <div className="hidden lg:block">
        <div className="mx-20 mt-10 mb-[50px] hidden justify-end lg:flex">
          <Button
            text={t("requestQuote")}
            type="orange"
            isDisabled={!isFormValid}
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
