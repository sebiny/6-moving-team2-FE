import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Props {
  setInputValid: (value: boolean) => void;
}

function InputText({ setInputValid }: Props) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const isInvalid = touched && value.length < 10;
  useEffect(() => {
    if (touched) {
      setInputValid(!isInvalid);
    }
  }, [touched, isInvalid]);
  const CLASSES = {
    placeholder: ["placeholder:text-[16px] placeholder:leading-[26px] placeholder:text-gray-300"],
    focus: ["focus:border-[2px] focus:border-gray-300 focus:outline-none"],
    md: ["md:w-[536px] md:placeholder:text-[18px] md:placeholder:leading-[32px]"]
  }; //object

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="최소 10자 이상 입력해주세요"
        className={clsx(
          "border-line-200 h-40 w-[327px] resize-none rounded-[16px] border bg-gray-50 px-6 py-[14px]",
          CLASSES.placeholder,
          CLASSES.focus,
          CLASSES.md,
          isInvalid && "border-[2px] border-red-300"
        )}
      ></textarea>
      {isInvalid && (
        <p className="pt-1 text-[16px] leading-[4px] font-semibold text-red-400">최소 10자 이상 입력해주세요</p>
      )}
    </div>
  );
}

export default InputText;
