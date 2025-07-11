import React from "react";
import DriverReviews from "../../../../components/driver/DriverReviews";
import DriverInfo from "./_components/DriverInfo";
import ShareDriver from "../../../../components/ShareDriver";
import RequestEstimate from "./_components/RequestEstimate";
import Service from "../../../../components/Service";
import BottomNav from "./_components/BottomButton";
import OrangeBackground from "@/components/OrangeBackground";
import { driver } from "@/constant/driverType";
import { reviews } from "@/constant/reviewType";
import { ReviewAverage } from "@/utills/ReviewAverage";

function DriverDetailPage() {
  const result = ReviewAverage(reviews);
  return (
    <div className="flex flex-col items-center pt-[56px] lg:pt-[88px]">
      <OrangeBackground />
      <div className="flex w-full justify-center gap-[116px]">
        <div className="mx-5 w-full max-w-[742px] md:mx-18">
          <DriverInfo driver={driver} result={result} />
          <Service services={driver.services} regions={driver.serviceAreas} />
          <div className="mb-8 lg:hidden">
            <div className="border-line-100 border-b"></div>
            <ShareDriver text="나만 알기엔 아쉬운 기사님인가요?" />
            <div className="border-line-100 mt-8 border-b"></div>
          </div>
          <DriverReviews reviews={reviews} result={result} />
        </div>
        <div className="mt-[109px] hidden w-80 lg:block">
          <RequestEstimate />
          <ShareDriver text="나만 알기엔 아쉬운 기사님인가요?" />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default DriverDetailPage;
