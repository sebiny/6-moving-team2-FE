import clsx from "clsx";
import React from "react";

interface ToastType {
  text: string;
  classname?: string;
}

function Toast({ text, classname }: ToastType) {
  return (
    <div
      className={clsx(
        classname,
        "fixed top-17 left-1/2 z-100 w-[360px] -translate-x-1/2 rounded-xl bg-orange-100 px-4 py-3 text-orange-400 md:w-[600px] lg:top-25 lg:w-[1200px] lg:text-lg"
      )}
    >
      {text}
    </div>
  );
}

export default Toast;
