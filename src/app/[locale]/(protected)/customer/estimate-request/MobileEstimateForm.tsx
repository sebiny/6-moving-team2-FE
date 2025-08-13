"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEstimateRequest } from "@/lib/api/api-estimateRequest";
import MoveTypeCard from "./_components/card/MoveTypeCard";
import MobileDatePicker from "./_components/datepicker/MobileDatePicker";
import AddressCardModal from "./_components/modal/AddressCardModal";
import Button from "@/components/Button";
import { Address } from "@/types/Address";
import { useLocale, useTranslations } from "next-intl";
import { ToastModal } from "@/components/common-modal/ToastModal";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { batchTranslate } from "@/utills/batchTranslate";
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedGuard";

export default function MobileEstimateForm() {
  const t = useTranslations("EstimateReq");
  const t1 = useTranslations("Common");

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

  const [step, setStep] = useState(1);
  const [moveType, setMoveType] = useState<MoveTypeKey | null>(null);
  const [moveDate, setMoveDate] = useState<Date | null>(null);
  const [addressFrom, setAddressFrom] = useState<Address | null>(null);
  const [addressTo, setAddressTo] = useState<Address | null>(null);
  const [showModal, setShowModal] = useState<"from" | "to" | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const [translatedAddressFrom, setTranslatedAddressFrom] = useState("");
  const [translatedAddressTo, setTranslatedAddressTo] = useState("");

  const [guardEnabled, setGuardEnabled] = useState(true);

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

  const isValidStep1 = !!moveType;
  const isValidStep2 = !!moveDate;
  const isValidStep3 = !!addressFrom && !!addressTo;

  const isDirty =
    !isRequesting &&
    (step > 1 ||
      !!moveType ||
      !!moveDate ||
      !!addressFrom ||
      !!addressTo ||
      !!showModal);

  useUnsavedChangesGuard({
    when: guardEnabled && isDirty,
    message: t1("leaveWarning"), // 공용 문구가 있으면 사용
    interceptLinks: true,
    interceptBeforeUnload: true,
    patchRouterMethods: true,
  });

  // 견적 요청 mutation
  const { mutateAsync: requestEstimate } = useMutation({
    mutationFn: createEstimateRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimate", "active"] });
    }
  });

  // 견적 요청 처리 함수
  const handleRequest = async () => {
    if (!moveType || !moveDate || !addressFrom || !addressTo) return;

    try {
      setIsRequesting(true);
      setGuardEnabled(false);
      await requestEstimate({
        moveType: moveType,
        moveDate: moveDate.toISOString(),
        fromAddressId: addressFrom.id,
        toAddressId: addressTo.id
      });
      ToastModal(t("estimateReqSuccess"));
    } catch (err: any) {
       setGuardEnabled(true);
      const messageKey = err?.response?.data?.message || err?.message || "estimateReqFailure";
      ToastModal(t(messageKey));
    } finally {
      setIsRequesting(false);
    }
  };

  // 단계 표시 인디케이터
  const renderStepIndicator = () => (
    <div className="mb-3 flex justify-center gap-2" role="list">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          role="listitem"
          aria-current={step === s ? "step" : undefined}
          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
            step === s ? "bg-[var(--color-orange-400)] text-white" : "bg-background-200 text-gray-300"
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );

  if (isRequesting) {
    return <LoadingLottie text={t("loading.request")} />;
  }

  return (
    <main className="mt-[90px] min-h-screen justify-center bg-white px-6">
      {renderStepIndicator()}

      {/* 1. 이사 유형 선택 */}
      {step === 1 && (
        <section className="flex flex-col items-center">
          <header className="mb-4 flex flex-col text-center">
            <h2 className="text-xl font-bold">{t("typeText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
          </header>
          <div className="w-[327px]">
            {/* 이동 유형 카드 */}
            <div className="flex flex-col gap-4">
              {moveTypes.map(({ key, label, description }) => (
                <MoveTypeCard
                  key={key}
                  label={label}
                  description={description}
                  selected={moveType === key}
                  onClick={() => setMoveType((prev) => (prev === key ? null : key))}
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
        </section>
      )}

      {/* 2. 이사 예정일 선택 */}
      {step === 2 && (
        <section>
          {/* 타이틀 */}
          <header className="mb-[70px] flex flex-col text-center">
            <h2 className="text-xl font-bold">{t("dateText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
          </header>
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
        </section>
      )}

      {/* 3. 이사 지역 선택 */}
      {step === 3 && (
        <section className="flex flex-col items-center">
          {/* 타이틀 */}
          <header className="mb-[62px] flex flex-col text-center">
            <h2 className="text-xl font-bold">{t("areaText")}</h2>
            <p className="text-sm text-gray-400">{t("estimateReqSubTitle")}</p>
          </header>
          {/* 주소 검색 버튼 */}
          <div className="flex w-[327px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="font-medium">{t("from")}</p>
              <Button
                text={
                  addressFrom ? (
                    <span className="scroll-hide max-w-full overflow-x-auto whitespace-nowrap">
                      {translatedAddressFrom}
                    </span>
                  ) : (
                    t("fromChoose")
                  )
                }
                type="white-orange"
                aria-label={addressFrom ? `${t("from")}: ${translatedAddressFrom}` : t("fromChoose")}
                className="h-[54px] justify-start rounded-xl px-8 leading-[22px]"
                onClick={() => setShowModal("from")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium">{t("to")}</p>
              <Button
                text={
                  addressTo ? (
                    <span className="scroll-hide max-w-full overflow-x-auto whitespace-nowrap">
                      {translatedAddressTo}
                    </span>
                  ) : (
                    t("toChoose")
                  )
                }
                type="white-orange"
                aria-label={addressTo ? `${t("to")}: ${translatedAddressTo}` : t("toChoose")}
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
        </section>
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
