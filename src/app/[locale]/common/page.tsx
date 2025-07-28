"use client";

import Button from "@/components/Button";
import ShareDriver from "@/components/ShareDriver";
import SortDropdown from "@/components/dropdown/SortDropdown";
import ChipCircle from "@/components/chip/ChipCircle";
import Title, { DriverInfo } from "../../../components/Title";
import ChipRectangle from "../../../components/chip/ChipRectangle";
import { MoveType } from "../../../constant/moveTypes";
import OrangeBackground from "@/components/OrangeBackground";
import DriverFindCard from "@/components/card/DriverFindCard";
import FilterSection from "@/components/filter/FilterSection";
import { driver } from "@/constant/constant";
import { useState } from "react";
import DriverFindCardSkeleton from "@/components/card/DriverFindCardSkeleton";

// Title 더미데이터
const mockData = [
  {
    id: 1,
    status: "PROPOSED",
    labels: ["SMALL", "REQUEST"],
    driver: {
      name: "김코드",
      rating: 5.0,
      reviewCount: 178,
      experienceYear: 7,
      confirmedCount: 334,
      likes: 136
    } as DriverInfo,
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    estimatePrice: 180000
  },
  {
    id: 2,
    status: "ACCEPTED",
    labels: ["OFFICE", "REQUEST"],
    driver: {
      name: "최배달",
      rating: 4.8,
      reviewCount: 102,
      experienceYear: 5,
      confirmedCount: 210,
      likes: 85
    } as DriverInfo,
    message: "이사 전문으로 다년간 활동해왔습니다.",
    estimatePrice: 150000
  }
] satisfies {
  id: number;
  status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
  driver: DriverInfo;
  message: string;
  estimatePrice?: number;
}[];

function CommonPage() {
  const moveTypes: MoveType[] = ["SMALL", "HOME", "OFFICE", "REQUEST"];
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [isDesignatedChecked, setIsDesignatedChecked] = useState(false);
  const [isAvailableRegionChecked, setIsAvailableRegionChecked] = useState(false);
  return (
    /**
     * Title 컴포넌트
     */
    <div className="flex flex-col gap-12 bg-white p-6 md:p-10">
      {/* 임시 데이터 연결 */}
      {mockData.map((item) => (
        <div key={item.id}>
          <Title
            status={item.status}
            labels={item.labels}
            driver={item.driver}
            message={item.message}
            estimatePrice={item.estimatePrice}
          />
        </div>
      ))}

      {/* 기사님 -> 받은 요청 필터 버튼 */}
      <div className="flex">
        <FilterSection
          selectedMoveTypes={selectedMoveTypes}
          setSelectedMoveTypes={setSelectedMoveTypes}
          isDesignatedChecked={isDesignatedChecked}
          setIsDesignatedChecked={setIsDesignatedChecked}
          isAvailableRegionChecked={isAvailableRegionChecked}
          setIsAvailableRegionChecked={setIsAvailableRegionChecked}
        />
      </div>

      {/* ChipCircle 보여주기 */}
      <div className="flex gap-2">
        <ChipCircle type="address" color="gray" text="도로명" />
        <ChipCircle type="region" color="orange" text="소형이사" />
        <ChipCircle type="region" color="gray" text="소형이사" />
        <div>
          <ChipCircle type="region" color="orange" text="서울" click={true} />
        </div>
      </div>
      <div className="flex w-50 flex-col gap-2">
        <Button type="orange" text="작성" image={true} />
        <Button type="white-orange" text="작성" className="w-40 rounded-[10px] py-[20px]" />
        <Button type="white-gray" text="작성" image={true} />
      </div>
      <div>
        <ShareDriver text="견적서 공유하기" />
      </div>
      <div className="ml-20 w-30">
        <SortDropdown
          translator={(key) => key}
          sortings={["리뷰 많은순", "평점 높은순", "경력 높은순", "확정 많은순"]}
          sort="리뷰 많은순"
        />
      </div>

      {/* ChipRectangle 4종 보여주기 */}
      <div className="flex flex-wrap gap-3">
        {moveTypes.map((type) => (
          <ChipRectangle key={type} moveType={type} size="md" />
        ))}
        {moveTypes.map((type) => (
          <ChipRectangle key={type} moveType={type} size="sm" />
        ))}
      </div>
      <div>
        <OrangeBackground />
      </div>
      <div>
        <DriverFindCard driver={driver} />
      </div>
      <div>
        <DriverFindCardSkeleton />
      </div>
    </div>
  );
}

export default CommonPage;
