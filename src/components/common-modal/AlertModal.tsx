"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Button from "../Button";
import ReactDOM from "react-dom";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 포털 컨테이너 준비
  if (!containerRef.current && typeof document !== "undefined") {
    const el = document.createElement("div");
    // 최상위 모달 레이어임을 확실히
    el.setAttribute("id", "global-modal-root");
    containerRef.current = el;
  }

  useEffect(() => {
    if (!containerRef.current) return;
    document.body.appendChild(containerRef.current);
    // 포커스 이동(선택)
    requestAnimationFrame(() => btnRef.current?.focus());
    return () => {
      containerRef.current && document.body.removeChild(containerRef.current);
    };
  }, []);

  const handleOverlayClick = () => onClose();
  const handleDialogClick: React.MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  const handleButtonClick = () => {
    if (type === "handleClick") onConfirm?.();
    onClose();
  };

  const modal = (
    <div
      // z-index를 페이지 어떤 요소보다 확실히 높게
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      onClick={handleOverlayClick}
      aria-hidden="false"
    >
      {/* 반투명 배경 (별도의 div로 깔아주면 래스터화가 안정적) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 모달 다이얼로그 */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[10001] w-[90%] max-w-[450px] rounded-[32px] bg-white px-6 py-8 shadow-lg"
        onClick={handleDialogClick}
      >
        {/* 닫기 X 버튼: handleClick 타입일 때만 노출 (원 코드 유지) */}
        {type === "handleClick" && (
          <button type="button" className="absolute top-5 right-5 h-9 w-9" onClick={onClose} aria-label="닫기">
            <Image src="/assets/icons/ic_X.svg" alt="" aria-hidden="true" fill className="object-contain" />
          </button>
        )}

        {/* 메시지 */}
        <p className="text-center text-xl whitespace-pre-wrap md:my-20">{message}</p>

        {/* 확인 버튼 */}
        <Button ref={btnRef} type="orange" text={buttonText} onClick={handleButtonClick} />
      </div>
    </div>
  );

  // 포털로 body 최상단에 렌더 -> 헤더/서브헤더보다 항상 위
  return containerRef.current ? ReactDOM.createPortal(modal, containerRef.current) : null;
}
