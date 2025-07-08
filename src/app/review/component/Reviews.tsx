import React from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
export default function Reviews() {
  const boxes = [{ idx: "1" }, { idx: "2" }, { idx: "3" }]; //array
  const details = [
    { label: "출발지", content: "서울시 중구" },
    { label: "도착지", content: "경기도 수원시" },
    { label: "이사일", content: "2024년 07월 01일 (월)" }
  ]; //array
  const SIZE_CLASSES = {
    base: ["h-[242px] w-[1120px] px-10 py-8 gap-6"], //나중에 반응형 할때 lg로 바꾸기
    sm: [],
    md: []
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {boxes.map((box) => (
          <div
            key={box.idx}
            className={clsx(
              ...SIZE_CLASSES.base,
              "border-line-100 mx-auto flex flex-col self-stretch rounded-[20px] border-[0.5px] bg-gray-50"
            )}
          >
            <div className="flex justify-between">
              <div className="flex gap-6">
                <Image width={100} height={100} src={DriverImg} alt="driverImg" />
                <div className="pt-[10px]">
                  <p className="text-black-300 font-[Pretendard] text-[18px] leading-[26px] font-bold">김코드 기사님</p>
                  <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[14px] leading-[24px] font-normal text-ellipsis text-gray-500">
                    이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.
                  </p>
                  <ChipRectangle moveType="small" size="md" className="mt-2" />
                </div>
              </div>
              <div className="flex flex-col items-end pt-[41px]">
                <p className="text-right font-[Pretendard] text-[16px] leading-[26px] font-medium text-gray-500">
                  견적 금액
                </p>
                <p className="text-black-400 text-right font-[Pretendard] text-[24px] leading-[32px] font-bold">
                  180,000원
                </p>
              </div>
            </div>
            <div className="flex h-[54px] w-[1040px] justify-between">
              <div className="flex gap-5">
                {details.map(({ label, content }) => (
                  <div>
                    <p className="font-[Pretendard] text-[14px] leading-[24px] font-normal text-gray-500">{label}</p>
                    <p className="text-black-500 text-4 font-[Pretendard] leading-[26px] font-normal">{content}</p>
                  </div>
                ))}
              </div>
              <div className="flex h-[54px] w-40 items-center justify-center rounded-[12px] bg-orange-400 p-4">
                <p className="text-4 text-center font-[Pretendard] leading-[26px] font-semibold text-gray-50">
                  리뷰 작성하기
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
