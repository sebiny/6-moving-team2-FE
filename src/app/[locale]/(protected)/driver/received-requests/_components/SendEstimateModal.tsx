import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "../../../../../../../public/assets/icons/ic_X_gray.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType, moveTypeFromKorean } from "@/constant/moveTypes";
import clsx from "clsx";
import arrow from "../../../../../../../public/assets/icons/ic_arrow.svg";
import InputText from "@/components/InputText";
import InputPrice, { removeCommas } from "./InputPrice";
import useMediaHook from "@/hooks/useMediaHook";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedGuard";
import AlertModal from "@/components/common-modal/AlertModal";

interface SendEstimateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (price: number, comment: string) => void;
  moveType: string;
  isDesignated: boolean;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
}

export default function SendEstimateModal({
  open,
  onClose,
  onSubmit,
  moveType,
  isDesignated,
  customerName,
  fromAddress,
  toAddress,
  moveDate
}: SendEstimateModalProps) {
  const t = useTranslations("ReceivedReq");
  const t1 = useTranslations("Common");
  const locale = useLocale();
  const [translatedInfo, setTranslatedInfo] = useState({ from: "", to: "", date: "" });
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const moveTypeKey: MoveType = moveTypeFromKorean[moveType] ?? "SMALL";
  const { isLg, isSm } = useMediaHook();
  const textClass = "text-black-300 mb-3 lg:text-[18px] text-[16px] leading-[26px] font-semibold ";

  // 작성 중 여부 계산
  const isDirty = useMemo(() => {
    // 공백만 있는 경우도 제외
    const hasPrice = removeCommas(price).trim() !== "";
    const hasComment = comment.trim() !== "";
    return hasPrice || hasComment;
  }, [price, comment]);

  // 이탈 방지 훅 (모달이 열려 있고, 작성 중일 때만 동작)
  useUnsavedChangesGuard({
    when: open && isDirty,
    message: t1("leaveWarning"),
    interceptLinks: true,
    interceptBeforeUnload: true,
    patchRouterMethods: true
  });

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setPrice("");
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

  // 공통 닫기 시도 핸들러(X 버튼)
  const tryClose = () => {
    if (isDirty) {
      setShowLeaveModal(true);
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      tryClose();
    }
  };

  const handleSubmit = () => {
    const cleanPrice = removeCommas(price);
    const numericPrice = Number(cleanPrice);
    onSubmit(numericPrice, comment);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="send-estimate-modal-title"
      aria-describedby="send-estimate-modal-description"
    >
      <div
        className={clsx(
          "h-auto w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:h-194 lg:w-150 lg:p-8"
        )}
      >
        <div className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <h2
              id="send-estimate-modal-title"
              className="text-black-400 m-0 p-0 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]"
            >
              {t("sendReq")}
            </h2>
            <button
              onClick={tryClose}
              className="m-0 h-6 w-6 cursor-pointer border-none bg-transparent p-0 lg:w-9"
              aria-label="견적 전송 모달 닫기"
            >
              <Image src={XIcon} alt="닫기" className="h-full w-full" />
            </button>
          </div>
          {/* ModalContent 내용 시작 */}
          <div id="send-estimate-modal-description" className="flex flex-col gap-7 self-stretch lg:gap-8">
            <div>
              <div className="flex gap-3" role="group" aria-label="이사 유형">
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
              <div
                className="border-line-100 flex flex-row items-center gap-4 border-b py-3 md:flex-col md:items-start lg:flex-row lg:items-center lg:py-4"
                role="group"
                aria-label="이사 정보"
              >
                <div className="flex flex-1 items-center" role="group" aria-label="이사 경로">
                  <div>
                    <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">{t("from")}</p>
                    <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                      {translatedInfo.from}
                    </p>
                  </div>
                  <Image src={arrow} height={23} alt="출발지에서 도착지로" className="mx-3 w-3 lg:w-4" />
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
                  <time
                    className="m-0 p-0 text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]"
                    dateTime={moveDate}
                  >
                    {translatedInfo.date}
                  </time>
                </div>
              </div>
            </div>
            {/* 견적/코멘트 입력 */}
            <div className="m-0 flex flex-col gap-7 p-0 lg:gap-8">
              <div>
                <p className={`${textClass} m-0 p-0`}>{t("enterCost")}</p>
                <InputPrice size="md" value={price} onChange={setPrice} aria-describedby="price-description" />
                <div id="price-description" className="sr-only">
                  원 단위로 입력해주세요
                </div>
              </div>
              <div>
                <p className={`${textClass} m-0 p-0`}>{t("enterComment")}</p>
                <InputText
                  setInputValid={setCommentValid}
                  value={comment}
                  onChange={setComment}
                  aria-describedby="comment-description"
                />
                <div id="comment-description" className="sr-only">
                  견적에 대한 코멘트를 입력해주세요
                </div>
              </div>
            </div>
          </div>
          {/* ModalContent 내용 끝 */}
          <Button
            type={price !== "" && commentValid ? "orange" : "gray"}
            text={t("sendEst")}
            className="h-[54px] lg:h-[64px]"
            isDisabled={price === "" || !commentValid || Number(removeCommas(price)) <= 0}
            onClick={handleSubmit}
            aria-label={`${customerName} 고객에게 ${price}원 견적 전송하기`}
          />

          {/* 이탈 방지 모달 */}
          {showLeaveModal && (
            <AlertModal
              type="handleClick"
              message={t1("leaveWarning")}
              buttonText={t1("confirm")}
              onConfirm={() => {
                setShowLeaveModal(false);
                onClose();
              }}
              onClose={() => {
                setShowLeaveModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
