"use client";

import FilterDropdown from "@/components/dropdown/FilterDropdown";
import React, { useState } from "react";

function Filters() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedService, setSelectedService] = useState("");
  return (
    <div className="flex gap-3">
      <FilterDropdown
        label="지역"
        options={["서울", "경기", "인천", "충남", "충북", "전북", "대전", "세종"]}
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
  );
}

export default Filters;
