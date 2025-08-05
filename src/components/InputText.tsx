import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface Props {
  setInputValid: (value: boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
}

function InputText({ setInputValid, value: externalValue, onChange: externalOnChange }: Props) {
  const t = useTranslations("Review");
  const [internalValue, setInternalValue] = useState("");
  const [touched, setTouched] = useState(false);

  // 외부에서 제어하는 경우와 내부에서 제어하는 경우를 구분
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = externalOnChange || setInternalValue;

  const isInvalid = touched && value.length < 10;

  useEffect(() => {
    if (touched) {
      setInputValid(!isInvalid);
    }
  }, [touched, isInvalid, setInputValid]);

  const CLASSES = {
    placeholder: ["placeholder:text-[16px] placeholder:leading-[26px] placeholder:text-gray-300"],
    focus: ["focus:border-[2px] focus:border-gray-300 focus:outline-none"],
    lg: ["lg:w-[536px] lg:placeholder:text-[18px] lg:placeholder:leading-[32px] lg:px-6"]
  }; //object

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={t("modal.placeholder")}
        className={clsx(
          "border-line-200 h-40 w-full resize-none rounded-[16px] border bg-gray-50 px-4 py-[14px]",
          CLASSES.placeholder,
          CLASSES.focus,
          CLASSES.lg,
          isInvalid && "border-[2px] border-red-300"
        )}
      ></textarea>
      {isInvalid && (
        <p className="pt-1 text-[16px] leading-[4px] font-semibold text-red-400">{t("modal.placeholder")}</p>
      )}
    </div>
  );
}

export default InputText;
