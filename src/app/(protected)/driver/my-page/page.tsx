import DriverSimpleInfo from "@/components/driver/DriverSimpleInfo";
import DriverReviews from "@/components/driver/DriverReviews";
import LikeIcon from "@/components/icon/LikeIcon";
import OrangeBackground from "@/components/OrangeBackground";
import Service from "@/components/Service";
import { reviews } from "@/constant/reviewType";
import Image from "next/image";
import React from "react";
import { ReviewAverage } from "@/utills/ReviewAverage";
import { driver } from "@/constant/constant";
import EditButtons from "./_components/EditButtons";

function DriverMyPage() {
  const result = ReviewAverage(reviews);
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[54px] w-full max-w-300 items-center px-7 md:px-24 lg:h-24 lg:px-2">
        <div className="text-lg font-semibold lg:text-2xl">마이페이지</div>
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
                  <p className="ml-1 text-2xl font-semibold">{driver.nickname}</p>
                </div>
                <div className="mt-2 flex">
                  <LikeIcon color="black" />
                  <p className="text-gray-500">{driver.favorite}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">{driver.shortIntro}</p>
              <p className="mt-3 text-gray-500">{driver.detailIntro}</p>
            </div>
          </div>
          <EditButtons />
        </div>
        <div className="w-full max-w-205">
          <div className="border-line-100 my-8 border-b"></div>

          <div className="flex flex-col gap-4">
            <p className="text-black-400 text-xl font-semibold">활동 현황</p>
            <DriverSimpleInfo type="my-page" career={driver.career} averageRating={result.average} work={driver.work} />
          </div>
          <Service services={driver.services} regions={driver.serviceAreas} />
          <DriverReviews reviews={reviews} result={result} />
        </div>
      </div>
    </div>
  );
}

export default DriverMyPage;
