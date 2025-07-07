import Button from "@/components/Button";
import Reviews from "@/components/driver/Reviews";
import Service from "@/components/Service";
import React from "react";

function DriverMyPage() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div>마이페이지</div>
      </div>
      <div className="h-45 w-full bg-orange-400"></div>
      <div className="flex w-205 flex-col">
        <div>
          <div>
            <Button text="내 프로필 수정" type="orange" image={true} />
            <Button text="기본 정보 수정" type="white-gray" image={true} />
          </div>
        </div>
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
        <Service services={[]} regions={[]} />
        <Reviews />
      </div>
    </div>
  );
}

export default DriverMyPage;
