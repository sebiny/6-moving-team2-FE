import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import { MoveType } from "@/constant/moveTypes";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

interface RejectEstimateModalProps {
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

const korToMoveTypeMap: Record<string, MoveType> = {
  소형이사: "SMALL",
  가정이사: "HOME",
  사무실이사: "OFFICE",
  지정견적요청: "REQUEST",
  "지정 견적 요청": "REQUEST"
};

export default function RejectEstimateModal({
  open,
  onClose,
  onSubmit,
  moveType,
  isDesignated,
  customerName,
  fromAddress,
  toAddress,
  moveDate
}: RejectEstimateModalProps) {
  const [commentValid, setCommentValid] = useState(false);

  const moveTypeKey: MoveType = korToMoveTypeMap[moveType] ?? "SMALL";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="inline-flex flex-col items-start justify-start gap-10 rounded-[32px] bg-white px-6 pt-8 pb-10 shadow-[4px_4px_10px_0px_rgba(169,169,169,0.20)]">
        {/* 헤더 */}
        <div className="inline-flex w-[560px] items-center justify-between">
          <div className="text-2xl leading-loose font-semibold text-neutral-800">반려요청</div>
          <button className="flex h-9 w-9 items-center justify-center" onClick={onClose}>
            <IoMdClose size={28} />
          </button>
        </div>
        {/* 본문 */}
        <div className="flex flex-col items-start justify-start gap-8 self-stretch">
          {/* 견적 정보 */}
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="inline-flex items-center justify-start gap-2">
              <ChipRectangle moveType={moveTypeKey} size="md" />
              {isDesignated && <ChipRectangle moveType="REQUEST" size="md" />}
            </div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold text-zinc-800">
              <span>{customerName}</span>
              <span>고객님</span>
            </div>
            <div className="flex flex-row items-center gap-12 self-stretch">
              <div className="flex w-52 items-end gap-3">
                <div className="flex flex-col items-start justify-start">
                  <div className="text-center text-sm leading-normal font-normal text-zinc-500">출발지</div>
                  <div className="overflow-hidden text-base leading-relaxed font-medium text-ellipsis whitespace-nowrap text-neutral-900">
                    {fromAddress}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center justify-center">
                  <Image src="/assets/icons/ic_arrow.svg" alt="화살표" width={20} height={20} />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-center text-sm leading-normal font-normal text-zinc-500">도착지</div>
                  <div className="overflow-hidden text-base leading-relaxed font-medium text-ellipsis whitespace-nowrap text-neutral-900">
                    {toAddress}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-center text-sm leading-normal font-normal text-zinc-500">이사일</div>
                <div className="text-base leading-relaxed font-medium text-neutral-900">{moveDate}</div>
              </div>
            </div>
            <div className="h-0 w-full outline outline-1 outline-offset-[-0.5px] outline-zinc-100" />
          </div>

          {/* 반려 사유 입력 */}
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold text-zinc-800">반려 사유를 입력해 주세요</div>
            <div className="w-[560px]">
              <InputText setInputValid={setCommentValid} />
            </div>
          </div>
        </div>
        {/* 버튼 */}
        <Button
          type={commentValid ? "orange" : "gray"}
          text="반려하기"
          image={false}
          isDisabled={!commentValid}
          onClick={() => onSubmit(0, "")}
        />
      </div>
    </div>
  );
}
