import React from "react";

function Header() {
  return (
    <div>
      <div
        className="flex w-[1920px] pt-4 px-[360px] pb-0 items-start gap-8
      bg-gray-50 border-b-1 border-line-100 shadow-[0px_2px_10px_rgba(248,248,248,0.10)]"
      >
        <div
          className="flex flex-col
        items-center justify-center py-4
        gap-6 self-stretch border-b-[2px]
        border-black-500"
        >
          <p
            className="text-black-500 font-semibold text-[20px] 
            leading-[32px] font-[Pretendard]"
          >
            작성 가능한 리뷰
          </p>
        </div>
        <div
          className="flex flex-col
        items-center justify-center py-4
        gap-6 self-stretch"
        >
          <p
            className="text-gray-400 font-semibold text-[20px] 
            leading-[32px] font-[Pretendard]"
          >
            내가 작성한 리뷰
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
