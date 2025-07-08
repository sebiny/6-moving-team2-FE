import React from "react";

export default function ReviewModal() {
  return (
    <div>
      <div className="flex h-194 w-150 flex-col gap-10 bg-gray-200 p-8">
        <p className="text-black-400 font-[Pretendard] text-[24px] leading-[32px] font-semibold">리뷰 쓰기</p>
        <div className="flex flex-col gap-8 self-stretch">소형이사 지정견적요청 등등</div>
        <button>리뷰 등록</button>
      </div>
    </div>
  );
}
