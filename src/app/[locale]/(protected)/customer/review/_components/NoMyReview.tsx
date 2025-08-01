import React from "react";
import Empty from "/public/assets/images/img_empty_review.svg";
import Image from "next/image";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";

interface NoMyReviewProps {
  setSelectedIdx: (value: string) => void;
}
export default function NoMyReview({ setSelectedIdx }: NoMyReviewProps) {
  const tC = useTranslations("Common");
  return (
    <div className="flex h-full items-center justify-center py-10">
      <div className="flex flex-col items-center justify-center">
        <Image src={Empty} width={260} height={260} alt="empty_image" />
        <p className="text-[24px] leading-[32px] text-gray-400">{tC("noMyReview")}</p>
        <Button type="orange" text="리뷰 작성하러 가기" onClick={() => setSelectedIdx("1")} />
      </div>
    </div>
  );
}
