import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface AddressDateSectionProps {
  from: string;
  to: string;
  date: string;
}

export default function AddressDateSection({ from, to, date }: AddressDateSectionProps) {
  const t = useTranslations("MyEstimate");
  const locale = useLocale();

  return (
    <div
      className={`flex w-full flex-col gap-3 ${locale === "en" ? "" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div
        className={`flex flex-1 items-end gap-3 ${
          locale === "en" ? "flex-col items-start md:flex-row md:items-center" : "md:flex-row md:items-center"
        }`}
      >
        <div className="flex flex-col">
          <div className="text-sm font-normal text-zinc-500">{t("to")}</div>
          <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
            {from}
          </div>
        </div>
        <div className={`relative h-5 w-4 flex-shrink-0 ${locale === "en" ? "hidden text-left md:block" : ""}`}>
          <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-normal text-zinc-500">{t("from")}</div>
          <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
            {to}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-normal text-zinc-500">{t("date")}</div>
        <div className="text-base font-semibold text-neutral-900">{date}</div>
      </div>
    </div>
  );
}
