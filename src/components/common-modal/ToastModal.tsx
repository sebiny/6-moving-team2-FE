"use client";

import React, { useEffect, useRef, useState } from "react";
import { cssTransition, toast } from "react-toastify";

const Fade = cssTransition({
  enter: "toast-enter",
  exit: "toast-exit"
});

const TOAST_ID = "global-toast";

function Toast({ message }: { message: string }) {
  return (
    <div
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
        alt="icon"
        width={20}
        height={20}
        className="absolute left-5 flex-shrink-0"
      />
      <p className="ml-8 text-gray-800">{message}</p>
    </div>
  );
}

export function ToastModal(message: string, duration = 1300) {
  if (toast.isActive(TOAST_ID)) {
    toast.update(TOAST_ID, {
      render: <Toast message={message} />,
      autoClose: duration,
      progress: undefined,
      style: {
        display: "inline-flex",
        width: "auto",
        maxWidth: "95vw",
        justifyContent: "center"
      }
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
        display: "inline-flex",
        width: "auto",
        maxWidth: "95vw",
        justifyContent: "center"
      },
      className: "!bg-transparent !shadow-none !flex !justify-center"
    });
  }
}
