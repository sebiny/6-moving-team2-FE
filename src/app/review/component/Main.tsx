import React from "react";

function Main() {
  return (
    <div>
      <div>
        <div
          className="w-[1120px] h-[242px] flex flex-col justify-certer items-center
         py-8 px-10 gap-6 self-stretch rounded-5 border-[0.5px] border-line-100
         bg-gray-50"
        >
          <div>
            <p>김코드 기사님</p>
            <p>이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.</p>
          </div>
          <div className="w-[1040px] h-[54px] flex justify-between">
            <p>출발지와 도착지와 이사일</p>
            <button>리뷰 작성하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
