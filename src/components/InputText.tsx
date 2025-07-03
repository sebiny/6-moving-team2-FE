import React from "react";

function InputText() {
  return (
    <div>
      <textarea
        placeholder="최소 10자 이상 입력해주세요"
        className="w-[327px] md:w-[536px] h-[160px] rounded-[16px] 
        border border-gray-200 bg-gray-50 pt-[14px] pr-[24px] 
        pb-[14px] pl-[24px] resize-none
        focus:outline-none focus:border-gray-300 focus:border-[2px]
        placeholder:text-gray-300
        placeholder:text-[16px] placeholder:leading-[26px]
        md:placeholder:text-[18px] md:placeholder:leading-[32px]
        font-[Pretendard]"
      ></textarea>
    </div>
  );
}

export default InputText;
