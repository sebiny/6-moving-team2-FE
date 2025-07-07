"use client";

import Title from "../../components/title/Title";
import { titleMockData } from "../../components/title/TitleData";
import ChipRectangle from "../../components/ChipRectangle";
import { MoveType } from "../../constant/moveTypes";

function CommonPage() {
  const moveTypes: MoveType[] = ["small", "home", "office", "request"];

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

      {/* ChipRectangle 4종 보여주기 */}
      <div className="flex flex-wrap gap-3">
        {moveTypes.map((type) => (
          <ChipRectangle key={type} moveType={type} size="md" />
        ))}
      </div>
    </div>
  );
}

export default CommonPage;
