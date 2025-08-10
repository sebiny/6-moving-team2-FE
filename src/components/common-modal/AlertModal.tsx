"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import Button from "../Button";

type ModalType = "confirm" | "handleClick";

interface AlertModalProps {
  type: ModalType;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  buttonText?: string;
  title?: string;
}

export default function AlertModal({
  type = "confirm",
  message,
  onClose,
  onConfirm,
  buttonText = "확인",
  title = "알림"
}: AlertModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Esc로 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  // 오픈 시 포커스 이동 + 리스너 등록
  useEffect(() => {
    prevFocusRef.current = (document.activeElement as HTMLElement) || null;
    primaryBtnRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // 닫힐 때 기존 포커스로 복귀(가능하면)
      prevFocusRef.current?.focus();
    };
  }, [handleKeyDown]);

  // 오버레이 클릭시 닫기, 내부 클릭은 막기
  const onOverlayClick = () => onClose();
  const onDialogClick: React.MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  const titleId = "alertmodal-title";
  const descId = "alertmodal-desc";

  const handleButtonClick = () => {
    if (type === "handleClick") onConfirm?.();
    onClose();
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      onClick={onOverlayClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-[90%] max-w-[450px] rounded-[32px] bg-white px-6 py-8 shadow-lg outline-none"
        onClick={onDialogClick}
      >
        {/* 닫기 버튼 — 접근성 위해 항상 노출 권장 (디자인상 숨기고 싶으면 handleClick에서만 보여도 OK) */}
        <button type="button" className="absolute top-5 right-5 h-9 w-9" onClick={onClose} aria-label="닫기">
          <Image src="/assets/icons/ic_X.svg" alt="" aria-hidden="true" fill className="object-contain" />
        </button>

        {/* 제목: 시각적 타이포 필요 없으면 sr-only로 */}
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>

        {/* 메시지 */}
        <p id={descId} className="text-center text-xl whitespace-pre-wrap md:my-20">
          {message}
        </p>

        {/* 확인 버튼 */}
        <Button
          ref={primaryBtnRef}
          type="orange"
          text={buttonText}
          onClick={handleButtonClick}
          // Button 내부가 <button>이면 자동으로 type="button" 우선 확인
        />
      </div>
    </div>
  );
}
