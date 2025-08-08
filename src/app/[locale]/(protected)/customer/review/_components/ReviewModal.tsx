import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "/public/assets/icons/ic_X_gray.svg";
import ModalContent from "./ModalContent";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { createReview } from "@/lib/api/api-review";
import { ToastModal } from "@/components/common-modal/ToastModal";

interface Props {
  setIsModal: (value: boolean) => void;
}

export default function ReviewModal({ setIsModal }: Props) {
  const t = useTranslations("Review");
  const tm = useTranslations("ToastModal.review");
  const [isValid, setIsValid] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [estimateRequestId, setEstimateRequestId] = useState("");
  const [driverId, setDriverId] = useState("");

  const handleSubmit = async () => {
    try {
      await createReview({
        estimateRequestId,
        driverId,
        rating,
        content
      });
      ToastModal(tm("reviewRegistered"));
      setIsModal(false);
    } catch (error) {
      ToastModal(tm("failedToRegisterReview"));
    }
  };

  return (
    <div
      onClick={() => setIsModal(false)}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
    >
      <div
        className={clsx(
          "h-auto w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:h-194 lg:w-150 lg:p-8"
        )}
      >
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <p className="text-black-400 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]">
              {t("button.createReview")}
            </p>
            <Image
              onClick={() => setIsModal(false)}
              src={XIcon}
              alt="X_icon"
              className="h-6 w-6 cursor-pointer lg:w-9"
            />
          </div>
          <ModalContent
            setIsValid={setIsValid}
            setRating={setRating}
            setContent={setContent}
            setEstimateRequestId={setEstimateRequestId}
            setDriverId={setDriverId}
          />
          <Button
            onClick={handleSubmit}
            type={isValid ? "orange" : "gray"}
            text={t("button.createReview")}
            className="h-[54px] lg:h-[64px]"
          />
        </div>
      </div>
    </div>
  );
}
