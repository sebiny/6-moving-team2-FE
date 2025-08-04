"use client";

import React from "react";
import { cssTransition, toast } from "react-toastify";

const Fade = cssTransition({
  enter: "toast-enter",
  exit: "toast-exit"
});

const TOAST_ID = "global-toast";

// 내부에서 사용
function Toast({ message }: { message: string }) {
  return (
    <div
      className="relative inline-flex gap-2 rounded-lg bg-orange-200/90 px-5 py-3 shadow-none"
      style={{
        minWidth: "150px", // 최소 너비
        maxWidth: "90vw" // 화면 90%까지 확장
      }}
    >
      <img
        src="/assets/icons/ic_logo.svg"
        alt="icon"
        width={20}
        height={20}
        className="absolute left-5 flex-shrink-0"
      />
      {/* 항상 한 줄 유지 + 박스 안에서만 확장 */}
      <p className="ml-8 overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">{message}</p>
    </div>
  );
}

// 외부에서 사용할 함수
export function ToastModal(message: string, duration = 1300) {
  if (toast.isActive(TOAST_ID)) {
    toast.update(TOAST_ID, {
      render: <Toast message={message} />,
      autoClose: duration,
      progress: undefined
    });
  } else {
    toast(<Toast message={message} />, {
      toastId: TOAST_ID,
      position: "top-center",
      autoClose: duration,
      hideProgressBar: true,
      closeButton: false,
      draggable: false,
      pauseOnHover: false,
      transition: Fade,
      style: {
        background: "none",
        boxShadow: "none",
        padding: 0,
        display: "flex",
        justifyContent: "center"
      },
      className: "!bg-transparent !shadow-none !flex !justify-center"
    });
  }
}
