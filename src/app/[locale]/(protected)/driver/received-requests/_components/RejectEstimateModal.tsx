import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import XIcon from "../../../../../../../public/assets/icons/ic_X_gray.svg";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType } from "@/constant/moveTypes";
import clsx from "clsx";
import arrow from "../../../../../../../public/assets/icons/ic_arrow.svg";
import InputText from "@/components/InputText";
import useMediaHook from "@/hooks/useMediaHook";

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
  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(false);
  // moveType을 MoveType으로 변환
  const korToMoveTypeMap: Record<string, MoveType> = {
    소형이사: "SMALL",
    가정이사: "HOME",
    사무실이사: "OFFICE",
    지정견적요청: "REQUEST",
    "지정 견적 요청": "REQUEST"
  };
  const moveTypeKey: MoveType = korToMoveTypeMap[moveType] ?? "SMALL";
  const { isLg, isSm } = useMediaHook();
  const textClass = "text-black-300 mb-3 lg:text-[18px] text-[16px] leading-[26px] font-semibold ";

  const handleSubmit = () => {
    if (commentValid) {
      onSubmit(estimateRequestId, comment);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center">
      <div
        className={clsx(
          "h-[678px] w-full rounded-t-[32px] bg-gray-50 px-6 py-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]",
          "sm:max-h-none",
          "md:w-[375px] md:items-center md:justify-center md:rounded-b-[32px]",
          "lg:w-150 lg:p-8",
          "flex flex-col", // flex column 구조
          "max-h-[90vh]", // 최대 높이 제한
          "h-auto" // 고정 높이 제거
        )}
      >
        <div className="flex flex-col gap-[26px] lg:gap-10">
          <div className="flex justify-between">
            <p className="text-black-400 text-[18px] leading-[26px] font-semibold lg:text-[24px] lg:leading-[32px]">
              반려요청
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
                    {customerName} 고객님
                  </p>
                </div>
              </div>
              <div className="border-line-100 flex border-b py-3 lg:py-4">
                <div className={clsx("flex items-center")}>
                  <div>
                    <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">출발지</p>
                    <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                      {fromAddress}
                    </p>
                  </div>
                  <Image src={arrow} height={23} alt="arrow" className="mx-3 w-3 lg:w-4" />
                  <div>
                    <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">도착지</p>
                    <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">
                      {toAddress}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-start justify-center lg:ml-10">
                  <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">이사일</p>
                  <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">{moveDate}</p>
                </div>
              </div>
            </div>
            {/* 견적/코멘트 입력 */}
            <div className="flex flex-col gap-7 lg:gap-8">
              <div>
                <p className={textClass}>반려 사유를 입력해 주세요</p>
                <InputText setInputValid={setCommentValid} value={comment} onChange={setComment} />
              </div>
            </div>
          </div>
          {/* ModalContent 내용 끝 */}
          <Button
            type={commentValid ? "orange" : "gray"}
            text="반려하기"
            className="mt-auto h-[54px] lg:h-[64px]"
            isDisabled={!commentValid}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
