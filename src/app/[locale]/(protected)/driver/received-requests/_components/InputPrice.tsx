import React from "react";

interface InputPriceProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  size?: "md" | "sm";
}

// 천 단위 쉼표 추가 함수
const formatNumberWithCommas = (value: string): string => {
  // 숫자가 아닌 문자 제거
  const numbersOnly = value.replace(/[^0-9]/g, "");
  // 천 단위 쉼표 추가
  return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 쉼표 제거 함수
const removeCommas = (value: string): string => {
  return value.replace(/,/g, "");
};

export default function InputPrice({
  value,
  onChange,
  placeholder = "견적가 입력",
  icon,
  size = "md"
}: InputPriceProps) {
  const isSm = size === "sm";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 쉼표 제거 후 숫자만 추출
    const numbersOnly = removeCommas(inputValue).replace(/[^0-9]/g, "");
    // 천 단위 쉼표 추가
    const formattedValue = formatNumberWithCommas(numbersOnly);
    onChange(formattedValue);
  };

  return (
    <div
      className={
        isSm
          ? "inline-flex w-full items-center justify-start overflow-hidden rounded-2xl bg-white p-3.5 outline outline-offset-[-1px] outline-neutral-200"
          : "inline-flex h-14 w-full items-center justify-start overflow-hidden rounded-2xl bg-white py-3.5 pr-6 pl-3.5 outline outline-offset-[-1px] outline-neutral-200"
      }
    >
      <div
        className={
          isSm ? "relative flex flex-1 items-center justify-between" : "flex flex-1 items-center justify-between"
        }
      >
        <input
          className={
            isSm
              ? "w-full bg-transparent font-['Pretendard'] text-base leading-relaxed font-normal text-neutral-800 outline-none placeholder:text-neutral-400"
              : "flex-1 bg-transparent font-['Pretendard'] text-lg leading-relaxed font-normal text-neutral-800 outline-none placeholder:text-neutral-400"
          }
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {icon && isSm && (
          <div className="absolute top-1/2 right-4 flex h-6 w-6 -translate-y-1/2 items-center justify-center overflow-hidden">
            {icon}
          </div>
        )}
        {icon && !isSm && <div className="ml-2 flex h-6 w-6 items-center justify-center">{icon}</div>}
        <span className={isSm ? "ml-2 text-base text-neutral-400" : "ml-2 text-lg text-neutral-400"}>원</span>
      </div>
    </div>
  );
}
