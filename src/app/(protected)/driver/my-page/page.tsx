import Button from "@/components/Button";
import Reviews from "@/components/driver/Reviews";
import LikeIcon from "@/components/icon/LikeIcon";
import OrangeBackground from "@/components/OrangeBackground";
import Service from "@/components/Service";
import Image from "next/image";
import React from "react";

function DriverMyPage() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="text-lg font-semibold">마이페이지</div>
      </div>
      <OrangeBackground />
      <div className="flex w-300 flex-col">
        <div className="mt-[43px] flex flex-col justify-between lg:flex-row">
          <div>
            <div className="flex">
              <Image src="/assets/images/img_profile.svg" alt="프로필" width={80} height={85} />
              <div className="ml-3">
                <div className="mt-5 flex">
                  <Image src="/assets/icons/ic_profileMark.svg" alt="프로필" width={25} height={25} />
                  <p className="ml-1 text-2xl font-semibold">김코드</p>
                </div>
                <div className="mt-2 flex">
                  <LikeIcon color="black" />
                  <p className="text-gray-500">136</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">고객님의 물품을 안전하게 운송해 드립니다.</p>
              <p className="mt-3 text-gray-500">
                안녕하세요 이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.{" "}
              </p>
            </div>
          </div>
          <div className="mt-7 flex w-80 flex-col gap-4 md:w-205 md:flex-row lg:w-70 lg:flex-col">
            <Button text="내 프로필 수정" type="orange" image={true} />
            <Button text="기본 정보 수정" type="white-gray" image={true} />
          </div>
        </div>
        <div className="w-205">
          <div className="border-line-100 my-8 border-b"></div>
          <div className="flex flex-col gap-4">
            <p className="text-black-400 text-xl font-semibold">활동 현황</p>
            <div className="bg-background-100 border-line-100 flex h-30 w-full items-center justify-evenly rounded-2xl border">
              <div className="flex flex-col items-center">
                <p>진행</p>
                <p className="text-xl font-bold text-orange-400">334건</p>
              </div>
              <div className="flex flex-col items-center">
                <p>리뷰</p>
                <p className="text-xl font-bold text-orange-400">5.0</p>
              </div>
              <div className="flex flex-col items-center">
                <p>총 경력</p>
                <p className="text-xl font-bold text-orange-400">7년</p>
              </div>
            </div>
          </div>
          <Service services={["SMALL"]} regions={["SEOUL"]} />
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default DriverMyPage;
