import React, { useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "/public/assets/icons/ic_X_gray.svg";
import ModalContent from "./ModalContent";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { createReview } from "@/lib/api/api-review";
import { ToastModal } from "@/components/common-modal/ToastModal";
import { reviewModalProps } from "@/types/reviewType";
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedGuard";

export default function ReviewModal({
  setIsModal,
  estimateRequestId,
  moveType,
  driverId,
  isDesignated,
  fromAddress,
  toAddress,
  moveDate,
  driverNickName,
  driverProfileImage
}: reviewModalProps) {
  const t = useTranslations("Review");
  const tm = useTranslations("ToastModal.review");
  const t1 = useTranslations("Common");

  const [isValid, setIsValid] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [guardEnabled, setGuardEnabled] = useState(true);
  console.log({ estimateRequestId, driverId, rating, content });

  // 이탈방지
  const isDirty = useMemo(() => rating > 0 || content.trim().length > 0, [rating, content]);

  useUnsavedChangesGuard({
    when: guardEnabled && isDirty,
    message: t1("leaveWarning"),
    interceptLinks: true,
    interceptBeforeUnload: true,
    patchRouterMethods: true
  });

  const safeClose = () => {
    if (isDirty) {
      const ok = window.confirm(t1("leaveWarning"));
      if (!ok) return;
    }
    setGuardEnabled(false);
    setIsModal(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) safeClose();
  };

  const handleSubmit = async () => {
    try {
      setGuardEnabled(false);
      await createReview({
        estimateRequestId,
        driverId,
        rating,
        content
      });
      ToastModal(tm("reviewRegistered"));
      setIsModal(false);
    } catch (error) {
      setGuardEnabled(true);
      ToastModal(tm("failedToRegisterReview"));
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 md:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "h-auto w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:h-194 lg:w-150 lg:p-8"
        )}
      >
        <div className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <p className="text-black-400 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]">
              {t("button.createReview")}
            </p>
            <Image onClick={safeClose} src={XIcon} alt="X_icon" className="h-6 w-6 cursor-pointer lg:w-9" />
          </div>
          <ModalContent
            setIsValid={setIsValid}
            setRating={setRating}
            setContent={setContent}
            estimateRequestId={estimateRequestId}
            moveType={moveType}
            fromAddress={fromAddress}
            toAddress={toAddress}
            moveDate={moveDate}
            isDesignated={isDesignated}
            driverNickName={driverNickName}
            driverProfileImage={driverProfileImage}
          />
          <Button
            onClick={handleSubmit}
            type={isValid ? "orange" : "gray"}
            text={t("button.createReview")}
            className="h-[54px] lg:h-[64px]"
            isDisabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
}
