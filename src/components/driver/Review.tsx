"use client";
import Image from "next/image";
import React from "react";
import StarIcon from "../icon/StarIcon";

function Review() {
  const review = {
    id: "kim****",
    rate: 5,
    date: "2024-07-01",
    content: "기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~"
  };
  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <div className="flex gap-[14px]">
          <div className="">{review.id}</div>
          <div className="border-line-200 w-[1px] border-l"></div>
          <div className="text-gray-300">{review.date}</div>
        </div>
        <div className="mt-2">
          <StarIcon rating={review.rate} width={100} />
        </div>
      </div>
      <p>{review.content}</p>
    </div>
  );
}

export default Review;
