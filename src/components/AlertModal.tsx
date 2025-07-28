"use client";

import Image from "next/image";
import React from "react";
import Button from "./Button";

type ModalType = "confirm" | "handleClick";

interface AlertModalProps {
  type: ModalType;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  buttonText?: string;
}

export default function AlertModal({
  type = "confirm",
  message,
  onClose,
  onConfirm,
  buttonText = "확인"
}: AlertModalProps) {
  const handleButtonClick = () => {
    if (type === "handleClick") {
      onConfirm?.();
    }
    onClose();
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={onClose}
    >
      <div className="relative w-[450px] rounded-[32px] bg-white px-6 py-8 shadow-lg">
        {/* 닫기 버튼은 handleClick 타입일 때만 */}
        {type === "handleClick" && (
          <button className="absolute top-5 right-5 h-9 w-9" onClick={onClose}>
            <Image src="/assets/icons/ic_X.svg" alt="닫기" fill className="object-contain" />
          </button>
        )}

        {/* 메시지 */}
        <p className="text-center text-xl whitespace-pre-wrap md:my-20">{message}</p>

        {/* 확인 버튼 */}
        <Button type="orange" text={buttonText} onClick={handleButtonClick} />
      </div>
    </div>
  );
}
