"use client";
import Image from "next/image";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import Button from "@/components/Button";

function RequestEstimate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true); //조건문 추가
  };
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <p className="text-xl font-semibold">
        김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
      </p>
      <div onClick={handleClick} className="h-16 w-80">
        <Button text="지정 견적 요청하기" type="orange" />
      </div>
      <button className="border-line-200 flex h-16 w-80 items-center justify-center gap-[10px] rounded-2xl border">
        <Image src="/assets/icons/ic_like_black.svg" alt="찜하기" width={24} height={24} />
        <p className="text-lg font-semibold">기사님 찜하기</p>
      </button>
      {isModalOpen && <EstimateRequestModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default RequestEstimate;
