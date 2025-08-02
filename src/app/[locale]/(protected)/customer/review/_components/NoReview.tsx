import React from "react";
import Empty from "/public/assets/images/img_empty_review.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function NoReview() {
  const tC = useTranslations("Common");
  return (
    <div className="flex h-full items-center justify-center py-10">
      <div className="flex flex-col items-center justify-center">
        <Image src={Empty} width={260} height={260} alt="empty_image" />
        <p className="text-[24px] leading-[32px] text-gray-400">{tC("noReview")}</p>
      </div>
    </div>
  );
}
