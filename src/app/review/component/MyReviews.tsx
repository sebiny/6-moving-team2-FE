import React from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
import StarIcon from "@/components/icon/StarIcon";
export default function MyReviews() {
  const boxes = [{ idx: "1" }, { idx: "2" }, { idx: "3" }]; //array
  const details = [
    { label: "출발지", content: "서울시 중구" },
    { label: "도착지", content: "경기도 수원시" },
    { label: "이사일", content: "2024년 07월 01일 (월)" }
  ]; //array
  const SIZE_CLASSES = {
    base: ["h-[338px] w-[1120px] p-10 gap-5"], //나중에 반응형 할때 lg로 바꾸기
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
            <div className="flex gap-6">
              <Image width={80} height={80} src={DriverImg} alt="driverImg" />
              <div>
                <p className="text-black-300 font-[Pretendard] text-[18px] leading-[26px] font-bold">김코드 기사님</p>
                <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[14px] leading-[24px] font-normal text-ellipsis text-gray-500">
                  이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.
                </p>
                <ChipRectangle moveType="small" size="sm" className="mt-2" />
              </div>
            </div>
            <div className="flex gap-10">
              {/* //중간에 선 들어가야 함 */}
              {details.map(({ label, content }) => (
                <div>
                  <p className="font-[Pretendard] text-[14px] leading-[24px] font-normal text-gray-500">{label}</p>
                  <p className="text-black-100 font-[Pretendard] text-[14px] leading-[24px] font-medium">{content}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <StarIcon width={100} height={20} />
              <p className="text-black-400 font-[Pretendard] text-[18px] leading-[26px] font-medium">
                처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸
                이사는 믿고 맡기세요! :) 곧 이사 앞두고 있는 지인분께 추천드릴 예정입니다!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
