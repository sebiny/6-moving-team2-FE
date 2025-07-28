// src/components/toast/toastModal.tsx

"use client";

import React from "react";
import { toast } from "react-toastify";

const TOAST_ID = "global-toast";

// 내부에서 사용
function Toast({ message }: { message: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-300/20 px-7 py-3 shadow-md backdrop-blur-md">
      <img src="/assets/icons/ic_logo.svg" alt="icon" width={20} height={20} className="flex-shrink-0" />
      <p className="text-center whitespace-nowrap text-gray-800">{message}</p>
    </div>
  );
}

// 외부에서 사용할 함수
export function ToastModal(message: string) {
  if (toast.isActive(TOAST_ID)) {
    // 이미 토스트가 있으면 업데이트
    toast.update(TOAST_ID, {
      render: <Toast message={message} />,
      autoClose: 2000
    });
  } else {
    toast(<Toast message={message} />, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      draggable: false,
      pauseOnHover: false,
      style: { background: "transparent", boxShadow: "none" },
      onClose: () => {
        const toastEl = document.querySelector(".Toastify__toast--default");
        if (toastEl) {
          toastEl.classList.add("toast-exit");
        }
      }
    });
  }
}
