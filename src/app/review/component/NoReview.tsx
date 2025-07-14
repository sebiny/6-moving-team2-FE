import React from "react";
import Empty from "../../../../public/assets/images/img_empty_review.svg";
import Image from "next/image";
import Button from "@/components/Button";
export default function NoReview() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={Empty} width={260} height={260} alt="empty_image" />
      <p className="text-[24px] leading-[32px] text-gray-400">아직 등록된 리뷰가 없어요!</p>
      <Button type="orange" text="리뷰 작성하러 가기" />
    </div>
  );
}
