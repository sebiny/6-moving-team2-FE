import React from "react";
import Reviews from "./_components/Reviews";
import Image from "next/image";

function DriverDetailPage() {
  const driver = {
    nickname: "김코드",
    line: "고객님의 물품을 안전하게 운송해 드립니다.",
    description:
      "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    service: ["소형이사", "가정이사"],
    region: ["서울", "경기"],
    like: 136,
    reviews: [],
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-orange-400 h-[225px]"></div>
      <div className="flex gap-[116px]">
        <div className="w-[742px]">
          <div className="mt-[62px]">
            <div></div>
            <p className="font-semibold text-2xl">{driver.line}</p>
            <div className="flex justify-between mt-5">
              <div className="flex gap-[6px]">
                <Image
                  src="/assets/icons/ic_driver.svg"
                  alt="기사님"
                  width={20}
                  height={23}
                />
                <p className="font-semibold text-lg">
                  {driver.nickname} 기사님
                </p>
              </div>
              <div className="flex items-center">
                <p>{driver.like}</p>
                <Image
                  src="/assets/icons/ic_like_black.svg"
                  alt="좋아요"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="text-gray-500 mt-5">{driver.description}</div>
            <div className="border border-line-200 rounded-2xl flex h-30 items-center justify-around mt-[31px]">
              <div className="flex flex-col items-center gap-1">
                <p>진행</p>
                <p className="text-black-300 font-bold text-xl">344건</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p>리뷰</p>
                <div className="flex gap-[6px] items-center">
                  <Image
                    src="/assets/icons/ic_star_yellow.svg"
                    alt="별점"
                    width={20}
                    height={20}
                  />
                  <p className="font-bold text-xl ">5.0</p>
                  <p className="text-gray-300">(178)</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p>총 경력</p>
                <p className="font-bold text-xl">{driver.career}년</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-black-400 font-semibold text-xl">제공 서비스</p>
            <div></div>
          </div>
          <div className="mt-10 mb-20">
            <p className="text-black-400 font-semibold text-xl">
              서비스 가능 지역
            </p>
            <div></div>
          </div>
          <Reviews />
        </div>
        <div className="w-80 mt-[109px]">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">
              김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
            </p>
            <button className="bg-orange-400 text-white flex justify-center items-center text-lg font-semibold w-80 h-16 rounded-2xl">
              지정 견적 요청하기
            </button>
            <button className="flex justify-center items-center w-80 h-16 gap-[10px] border border-line-200 rounded-2xl">
              <Image
                src="/assets/icons/ic_like_black.svg"
                alt="찜하기"
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold">기사님 찜하기</p>
            </button>
          </div>
          <div className="mt-[70px]">
            <p className="text-black-400 font-semibold text-xl">
              나만 알기엔 아쉬운 기사님인가요?
            </p>
            <div className="flex gap-4 mt-[22px]">
              <div className="border border-line-200 rounded-2xl w-16 h-16 flex justify-center items-center">
                <Image
                  src="/assets/icons/ic_clip.svg"
                  alt="링크 복사하기"
                  width={36}
                  height={36}
                />
              </div>
              <div className="bg-[#FAE100] rounded-2xl w-16 h-16 flex justify-center items-center">
                <Image
                  src="/assets/icons/ic_share_kakao.svg"
                  alt="카카오톡으로 공유하기"
                  width={28}
                  height={28}
                />
              </div>
              <div className="bg-orange-400 rounded-2xl w-16 h-16 flex justify-center items-center ">
                <Image
                  src="/assets/icons/ic_share_facebook.svg"
                  alt="페이스북으로 공유하기"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailPage;
