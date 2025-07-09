import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
import InputText from "@/components/InputText";
import React from "react";
import DriverIcon from "../../../../public/assets/icons/ic_driver.svg";
import Image from "next/image";
import Button from "@/components/Button";
import clsx from "clsx";
import arrow from "../../../../public/assets/icons/ic_arrow.svg";

export default function ReviewModal() {
  const deliverInfo = [
    { label: "출발지", content: "서울시 중구", isArrow: true },
    { label: "도착지", content: "경기도 수원시" },
    { label: "이사일", content: "2024년 07월 01일 (월)" }
  ];
  return (
    <div>
      <div className="mb-20 h-194 w-150 rounded-[32px] bg-gray-50 p-8 shadow-[4px_4px_10px_rgba(169,169,169,0.2)]">
        <div className="flex flex-col gap-10">
          <p className="text-black-400 text-[24px] leading-[32px] font-semibold">리뷰 쓰기</p>
          <div className="flex flex-col gap-8 self-stretch">
            <div>
              <div className="flex gap-3">
                <ChipRectangle moveType="small" size="md" />
                <ChipRectangle moveType="request" size="md" />
              </div>
              <div className="border-line-100 border-b py-4">
                <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />
                <p className="text-black-300 text-[18px] leading-[26px] font-semibold">김코드 기사님</p>
              </div>
              <div className="border-line-100 flex border-b py-4">
                {deliverInfo.map(({ label, content, isArrow }) => (
                  <div key={label} className={clsx("flex", label === "이사일" && "ml-10")}>
                    <div>
                      <p className="text-[14px] leading-6 text-gray-500">{label}</p>
                      <p>{content}</p>
                    </div>
                    {isArrow && <Image src={arrow} width={16} height={23} alt="arrow" className="mx-3" />}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-black-300 mb-3 text-[18px] leading-[26px] font-semibold">평점을 선택해 주세요</p>
              <StarIcon width={180} height={36} rating={0} />
            </div>
            <div>
              <p className="text-black-300 mb-3 text-[18px] leading-[26px] font-semibold">상세 후기를 작성해 주세요</p>
              <InputText />
            </div>
          </div>
          <Button type="gray" text="리뷰 등록" className="h-[64px]" />
        </div>
      </div>
    </div>
  );
}
