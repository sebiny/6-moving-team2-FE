"use client";

import FilterDropdown from "@/components/dropdown/FilterDropdown";
import React, { useState } from "react";

function Filters() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleClick = () => {
    setSelectedRegion("");
    setSelectedService("");
  };

  return (
    <div className="flex items-center gap-8">
      <div className="flex gap-3">
        <FilterDropdown
          label="지역"
          options={[
            "서울",
            "경기",
            "인천",
            "강원",
            "충남",
            "충북",
            "전북",
            "전남",
            "대전",
            "세종",
            "광주",
            "경북",
            "경남",
            "대구",
            "울산",
            "부산",
            "제주"
          ]}
          selected={selectedRegion}
          onSelect={setSelectedRegion}
          isMultiColumn
        />
        <FilterDropdown
          label="서비스"
          options={["소형이사", "가정이사", "사무실이사"]}
          selected={selectedService}
          onSelect={setSelectedService}
        />
      </div>
      <p className="hidden cursor-pointer text-gray-300 lg:block" onClick={handleClick}>
        초기화
      </p>
    </div>
  );
}

export default Filters;
