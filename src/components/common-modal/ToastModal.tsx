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
    <div className="relative flex w-full max-w-[90%] gap-2 rounded-lg bg-orange-200/60 px-7 py-3 shadow-none backdrop-blur-md md:max-w-[400px]">
      <img
        src="/assets/icons/ic_logo.svg"
        alt="icon"
        width={20}
        height={20}
        className="absolute left-5 flex-shrink-0"
      />
      <p className="ml-6 whitespace-nowrap text-gray-800">{message}</p>
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
        background: "transparent",
        boxShadow: "none",
        padding: 0
      }
    });
  }
}
