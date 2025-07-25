import { regionMap } from "@/constant/profile";
import React from "react";

interface SelectRegionType {
  currentArea: string;
  setCurrentArea: (value: string) => void;
}

function SelectRegion({ currentArea, setCurrentArea }: SelectRegionType) {
  const regions = [""];
  return (
    <div>
      <label>내가 사는 지역</label>
      <p>*내가 사는 지역은 언제든 수정 가능해요!</p>
      <select
        value={currentArea}
        onChange={(e) => setCurrentArea(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">지역 선택</option>
        {regions.map((region) => (
          <option key={region} value={regionMap[region]}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectRegion;
