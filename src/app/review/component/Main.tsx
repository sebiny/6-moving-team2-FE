import React from "react";

function Main() {
  return (
    <div>
      <div>
        <div className="justify-certer rounded-5 border-line-100 flex h-[242px] w-[1120px] flex-col items-center gap-6 self-stretch border-[0.5px] bg-gray-50 px-10 py-8">
          <div>
            <p>김코드 기사님</p>
            <p>이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.</p>
          </div>
          <div className="flex h-[54px] w-[1040px] justify-between">
            <p>출발지와 도착지와 이사일</p>
            <button>리뷰 작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
