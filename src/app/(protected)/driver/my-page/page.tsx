import Button from "@/components/Button";
import DriverSimpleInfo from "@/components/driver/DriverSimpleInfo";
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
      <OrangeBackground subTitle={true} />
      <div className="flex w-full max-w-300 flex-col items-center px-5 md:px-18 lg:items-stretch lg:px-0">
        <div className="mt-[43px] flex w-full flex-col justify-between md:max-w-205 lg:max-w-300 lg:flex-row">
          <div className="max-w-205">
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
          <div className="mt-7 flex w-full flex-col gap-4 md:flex-row lg:w-70 lg:flex-col">
            <Button text="내 프로필 수정" type="orange" image={true} />
            <Button text="기본 정보 수정" type="white-gray" image={true} />
          </div>
        </div>
        <div className="w-full max-w-205">
          <div className="border-line-100 my-8 border-b"></div>

          <div className="flex flex-col gap-4">
            <p className="text-black-400 text-xl font-semibold">활동 현황</p>
            <DriverSimpleInfo type="my-page" career={7} averageRating={5.0} work={334} />
          </div>
          <Service services={["SMALL"]} regions={["SEOUL"]} />
          <Reviews />
        </div>
      </div>
    </div>
  );
}

export default DriverMyPage;
