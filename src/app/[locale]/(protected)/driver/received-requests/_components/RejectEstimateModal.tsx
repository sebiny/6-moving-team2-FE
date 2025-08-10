import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "../../../../../../../public/assets/icons/ic_X_gray.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType, moveTypeFromKorean } from "@/constant/moveTypes";
import clsx from "clsx";
import arrow from "../../../../../../../public/assets/icons/ic_arrow.svg";
import InputText from "@/components/InputText";
import useMediaHook from "@/hooks/useMediaHook";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";

interface RejectEstimateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (estimateRequestId: string, reason: string) => void;
  estimateRequestId: string;
  moveType: string;
  isDesignated: boolean;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
}

export default function RejectEstimateModal({
  open,
  onClose,
  onSubmit,
  estimateRequestId,
  moveType,
  isDesignated,
  customerName,
  fromAddress,
  toAddress,
  moveDate
}: RejectEstimateModalProps) {
  const t = useTranslations("ReceivedReq");
  const locale = useLocale();
  const [translatedInfo, setTranslatedInfo] = useState({ from: "", to: "", date: "" });

  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(false);

  const moveTypeKey: MoveType = moveTypeFromKorean[moveType] ?? "SMALL";
  const { isLg, isSm } = useMediaHook();
  const textClass = "text-black-300 mb-3 lg:text-[18px] text-[16px] leading-[26px] font-semibold ";

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setComment("");
      setCommentValid(false);
    }
  }, [open]);

  useEffect(() => {
    const translatedTexts = async () => {
      if (!fromAddress || !toAddress || !moveDate) return;
      if (locale === "ko") {
        setTranslatedInfo({
          from: fromAddress,
          to: toAddress,
          date: moveDate
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            from: fromAddress ?? "",
            to: toAddress ?? "",
            date: moveDate ?? ""
          },
          locale
        );
        setTranslatedInfo({ from: result.from, to: result.to, date: result.date });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };
    translatedTexts();
  }, [fromAddress, toAddress, moveDate, locale]);
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "h-auto w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:w-150 lg:p-8"
        )}
      >
        <div className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <p className="text-black-400 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]">
              {t("rejectReq")}
            </p>
            <Image onClick={onClose} src={XIcon} alt="X_icon" className="h-6 w-6 cursor-pointer lg:w-9" />
          </div>
          {/* ModalContent 내용 시작 */}
          <div className="flex flex-col gap-7 self-stretch lg:gap-8">
            <div>
              <div className="flex gap-3">
                <ChipRectangle moveType={moveTypeKey} size={!isLg && isSm ? "sm" : "md"} />
                {isDesignated && <ChipRectangle moveType="REQUEST" size={!isLg && isSm ? "sm" : "md"} />}
              </div>
              <div className="flex justify-between pt-[14px] pb-3 lg:py-4">
                <div>
                  <p className="text-black-300 text-4 leading-[26px] font-semibold lg:text-[18px]">
                    {customerName} {t("customer")}
                  </p>
                </div>
              </div>
              <div className="border-line-100 flex flex-row items-center gap-4 border-b py-3 md:flex-col md:items-start lg:flex-row lg:items-center lg:py-4">
                <div className="flex flex-1 items-center">
                  <div>
                    <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">{t("from")}</p>
                    <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                      {translatedInfo.from}
                    </p>
                  </div>
                  <Image src={arrow} height={23} alt="arrow" className="mx-3 w-3 lg:w-4" />
                  <div>
                    <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">{t("to")}</p>
                    <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                      {translatedInfo.to}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center md:ml-0">
                  <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">
                    {t("moveDate")}
                  </p>
                  <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                    {translatedInfo.date}
                  </p>
                </div>
              </div>
            </div>
            {/* 견적/코멘트 입력 */}
            <div className="flex flex-col gap-7 lg:gap-8">
              <div>
                <p className={textClass}>{t("enterReason")}</p>
                <InputText setInputValid={setCommentValid} value={comment} onChange={setComment} />
              </div>
            </div>
          </div>
          {/* ModalContent 내용 끝 */}
          <Button
            type={commentValid ? "orange" : "gray"}
            text={t("reject")}
            className="mt-auto h-[54px] lg:h-[64px]"
            isDisabled={!commentValid}
            onClick={() => commentValid && onSubmit(estimateRequestId, comment)}
          />
        </div>
      </div>
    </div>
  );
}
