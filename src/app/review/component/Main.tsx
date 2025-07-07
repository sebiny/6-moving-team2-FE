import React from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";

function Main() {
  const boxes = [{ idx: "1" }, { idx: "2" }, { idx: "3" }]; //array
  const details = [
    { label: "출발지", details: "서울시 중구" },
    { label: "도착지", details: "경기도 수원시" },
    { label: "이사일", details: "2024년 07월 01일 (월)" }
  ]; //array
  const SIZE_CLASSES = {
    base: ["2xl:h-[242px] w-[1120px] px-10 py-8 gap-6"],
    sm: [],
    md: []
  };
  //object
  return (
    <>
      <div className="bg-background-100 flex h-screen w-full flex-col items-center gap-5 pt-[54px]">
        {boxes.map(() => (
          <div
            className={clsx(
              ...SIZE_CLASSES.base,
              "border-line-100 mx-auto flex flex-col self-stretch rounded-[20px] border-[0.5px] bg-gray-50"
            )}
          >
            <div className="flex justify-between">
              <div className="flex gap-6">
                <Image width={100} height={100} src={DriverImg} alt="driverImg" />
                <div className="pt-[10px]">
                  <p>김코드 기사님</p>
                  <p>이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.</p>
                  <p>소형이사</p>
                </div>
              </div>
              <div className="pt-[41px]">
                <p>견적 금액</p>
                <p>180,000원</p>
              </div>
            </div>
            <div className="flex h-[54px] w-[1040px] justify-between">
              {details.map(({ label, details }) => (
                <div>
                  <p>{label}</p>
                  <p>{details}</p>
                </div>
              ))}
              <button className="bg-gray-100">리뷰 작성하기</button>
            </div>
          </div>
        ))}
        <div>pagination</div>
      </div>
    </>
  );
}

export default Main;
