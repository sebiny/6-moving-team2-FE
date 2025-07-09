"use client";

import Button from "@/components/Button";
import ShareDriver from "@/components/ShareDriver";
import SortDropdown from "@/components/dropdown/SortDropdown";
import ChipCircle from "@/components/chip/ChipCircle";
import Title from "../../components/title/Title";
import { titleMockData } from "../../components/title/TitleData";
import ChipRectangle from "../../components/chip/ChipRectangle";
import { MoveType } from "../../constant/moveTypes";
import OrangeBackground from "@/components/OrangeBackground";

function CommonPage() {
  const moveTypes: MoveType[] = ["small", "home", "office", "request"];

  return (
    /**
     * Title 컴포넌트
     */
    <div className="flex flex-col gap-12 bg-white p-6 md:p-10">
      {/* 임시 데이터 연결 */}
      {titleMockData.map((item) => (
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
        <SortDropdown sortings={["리뷰 많은순", "평점 높은순", "경력 높은순", "확정 많은순"]} value="리뷰 많은순" />
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
    </div>
  );
}

export default CommonPage;
