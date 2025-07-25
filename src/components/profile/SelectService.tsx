import React from "react";
import ChipCircle from "../chip/ChipCircle";
import { useTranslations } from "next-intl";

interface SelectServiceType {
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
}

function SelectService({ services, setServices }: SelectServiceType) {
  const SERVICE_OPTIONS = ["SMALL", "HOME", "OFFICE"];
  const toggleService = (item: string) => {
    setServices((prev) => (prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]));
  };
  return (
    <div className="flex flex-col gap-2">
      {/* {!isServicesValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>} */}
      <div className="flex flex-wrap gap-3">
        {SERVICE_OPTIONS.map((s) => (
          <ChipCircle
            key={s}
            type="service"
            text={s}
            click
            isSelected={services.includes(s)}
            onSelect={toggleService}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectService;
