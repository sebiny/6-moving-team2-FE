"use client";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import { useRouter } from "next/navigation";
import React from "react";

function MyPageEditPage() {
  const router = useRouter();
  const handleClickEdit = () => {};

  const handleClickCancel = () => {
    router.push("/driver/my-page");
  };
  return (
    <div className="flex justify-center">
      <div className="mt-[26px] w-[327px] max-w-[1120px] lg:mt-20 lg:w-full">
        <h1 className="text-lg font-bold lg:text-[32px] lg:font-semibold">기본정보 수정</h1>
        <div className="border-line-100 mt-4 mb-5 border-b lg:my-10"></div>
        <div className="lg:flex lg:justify-center lg:gap-30">
          <div className="flex w-full flex-col gap-5">
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">이름</div>
              <TextField />
            </div>
            <div className="border-line-100 border-b"></div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">이메일</div>
              <TextField />
            </div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">전화번호</div>
              <TextField />
            </div>
          </div>
          <div className="border-line-100 my-5 border-b lg:hidden"></div>
          <div className="flex w-full flex-col gap-5">
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">현재 비밀번호</div>
              <TextField type="password" placeholder="현재 비밀번호를 입력해주세요" />
            </div>
            <div className="border-line-100 hidden border-b lg:block"></div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">새 비밀번호</div>
              <TextField type="password" placeholder="새 비밀번호를 입력해주세요" />
            </div>
            <div>
              <div className="text-black-300 mb-4 font-semibold lg:text-xl">새 비밀번호 확인</div>
              <TextField type="password" placeholder="새 비밀번호를 다시 한번 입력해주세요" />
            </div>
            <div className="mt-4 flex flex-col gap-2 lg:mt-16 lg:flex-row-reverse">
              <Button text="수정하기" type="orange" onClick={handleClickEdit} />
              <Button text="취소" type="white-gray" onClick={handleClickCancel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageEditPage;
