import { useTranslations } from "next-intl";
import React from "react";

export default function CompletedRejectedCard() {
  const t = useTranslations("MyEstimate");
  return (
    <div className="absolute top-0 left-0 inline-flex h-60 w-[588px] flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60 outline outline-1 outline-offset-[-1px] outline-neutral-400">
      <div className="flex w-48 flex-col items-center justify-start gap-5">
        <div className="justify-center text-lg leading-relaxed font-semibold text-white">{t("ThisIsRejected")}</div>
      </div>
    </div>
  );
}
