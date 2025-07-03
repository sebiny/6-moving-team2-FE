"use client";

import Title from "../../components/Title/Title";
import { titleMockData } from "../../components/Title/TitleData";

function CommonPage() {
  return (
    /**
     * Title 컴포넌트
     */
    <div className="p-6 flex flex-col gap-12 bg-white">
      {/* 임시 데이터 연결 */}
      {titleMockData.map((item) => (
        <div key={item.id} className="max-w-2xl mx-auto">
          <Title
            status={item.status}
            labels={item.labels}
            driver={item.driver}
            message={item.message}
            estimatePrice={item.estimatePrice}
          />
        </div>
      ))}
    </div>
  );
}

export default CommonPage;
