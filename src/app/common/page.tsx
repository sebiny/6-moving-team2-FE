"use client";

import ChipCircle from "@/components/ChipCircle";
import Title from "../../components/title/Title";
import { titleMockData } from "../../components/title/TitleData";

function CommonPage() {
  return (
    /**
     * Title 컴포넌트
     */
    <div className="flex flex-col gap-12 bg-white p-6">
      {/* 임시 데이터 연결 */}
      {titleMockData.map((item) => (
        <div key={item.id} className="">
          <Title
            status={item.status}
            labels={item.labels}
            driver={item.driver}
            message={item.message}
            estimatePrice={item.estimatePrice}
          />
        </div>
      ))}
      <div>
        <ChipCircle type="address" color="gray" text="도로명" />
        <ChipCircle type="region" color="orange" text="소형이사" />
        <ChipCircle type="region" color="gray" text="소형이사" />
        <ChipCircle type="region" color="orange" text="서울" click={true} />
      </div>
    </div>
  );
}

export default CommonPage;
