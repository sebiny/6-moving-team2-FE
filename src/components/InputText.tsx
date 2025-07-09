import clsx from "clsx";
import React from "react";

function InputText() {
  const CLASSES = {
    placeholder: ["placeholder:text-[16px] placeholder:leading-[26px] placeholder:text-gray-300"],
    focus: ["focus:border-[2px] focus:border-gray-300 focus:outline-none"],
    md: ["md:w-[536px] md:placeholder:text-[18px] md:placeholder:leading-[32px]"]
  }; //object

  return (
    <div>
      <textarea
        placeholder="최소 10자 이상 입력해주세요"
        className={clsx(
          "border-line-200 h-40 w-[327px] resize-none rounded-[16px] border bg-gray-50 px-6 py-[14px]",
          CLASSES.placeholder,
          CLASSES.focus,
          CLASSES.md
        )}
      ></textarea>
    </div>
  );
}

export default InputText;
