"use client";

import { useTranslations } from "next-intl";
import React from "react";

export default function AutoRejectedAlert() {
  const t = useTranslations("MyEstimates");

  return (
    <section
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-100 py-4 md:justify-start md:px-7 md:py-5"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={t("notConfirmed")} // 보조 텍스트 없이도 의미가 전달되도록
    >
      {/* 장식 아이콘: 스크린리더 숨김 */}
      <div data-size="md" className="relative h-6 w-6 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 h-6 w-6 rounded-full border border-zinc-600 bg-neutral-100" />
        <div className="absolute top-[6px] left-[11px] h-2 w-0.5 bg-zinc-600" />
        <div className="absolute top-[16px] left-[11px] h-0.5 w-0.5 rounded-full bg-zinc-600" />
      </div>

      <p className="m-0 justify-center text-center text-base leading-relaxed font-semibold text-zinc-600">
        {t("notConfirmed")}
      </p>
    </section>
  );
}
