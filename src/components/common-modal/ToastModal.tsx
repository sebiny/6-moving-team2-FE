"use client";

import React from "react";
import { cssTransition, toast } from "react-toastify";

const Fade = cssTransition({
  enter: "toast-enter",
  exit: "toast-exit"
});

const TOAST_ID = "global-toast";

function Toast({ message, role = "status" }: { message: string; role?: "status" | "alert" }) {
  return (
    <div
      // 정보/성공: role="status", 에러/경고: role="alert"
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
      className="relative inline-flex gap-2 rounded-lg bg-orange-200/90 px-5 py-3 shadow-none"
      style={{
        width: "auto",
        minWidth: "150px",
        maxWidth: "95vw",
        whiteSpace: "nowrap"
      }}
    >
      <img
        src="/assets/icons/ic_logo.svg"
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className="absolute left-5 flex-shrink-0"
      />
      <p className="m-0 ml-8 text-gray-800">{message}</p>
    </div>
  );
}

/**
 * ToastModal(message, duration, variant)
 * variant: 'info' | 'success' | 'warn' | 'error'
 */
export function ToastModal(message: string, duration = 1300, variant: "info" | "success" | "warn" | "error" = "info") {
  const role = variant === "error" || variant === "warn" ? "alert" : "status";

  const common = {
    autoClose: duration,
    progress: undefined as any,
    style: {
      display: "inline-flex",
      width: "auto",
      maxWidth: "95vw",
      justifyContent: "center"
    }
  };

  if (toast.isActive(TOAST_ID)) {
    toast.update(TOAST_ID, {
      render: <Toast message={message} role={role} />,
      ...common
    });
  } else {
    toast(<Toast message={message} role={role} />, {
      toastId: TOAST_ID,
      position: "top-center",
      hideProgressBar: true,
      closeButton: false,
      draggable: false,
      pauseOnHover: false,
      transition: Fade,
      style: {
        background: "none",
        boxShadow: "none",
        padding: 0,
        display: "inline-flex",
        width: "auto",
        maxWidth: "95vw",
        justifyContent: "center"
      },
      className: "!bg-transparent !shadow-none !flex !justify-center",
      autoClose: duration
    });
  }
}
