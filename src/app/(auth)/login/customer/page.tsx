"use client";

import Link from "next/link";
import Image from "next/image";
import { useLoginForm } from "@/hooks/useAuthForm";
import TextField from "@/components/input/TextField";

export default function LoginCustomer() {
  const { email, setEmail, password, setPassword, onSubmit } = useLoginForm();

  return (
    <div className="flex min-h-screen justify-center bg-white px-[24px] pt-[110px]">
      {/* 1. 가운데 가장 중심 박스 */}
      <div className="flex w-full max-w-[327px] flex-col gap-[40px]">
        {/* 1-1. 로고 및 기사님 페이지 링크 섹션 */}
        <div className="flex flex-col">
          {/* 1-1-1. 로고 컨테이너 */}
          <div className="flex h-[84px] w-full items-center justify-center">
            {/* 1-1-1-1. 로고 */}
            <h1 className="text-[44.11px] font-bold text-orange-400">무빙</h1>
          </div>

          {/* 1-1-2. 기사님 전용 페이지 링크 컨테이너 */}
          <div className="flex items-center justify-center gap-[2px]">
            {/* 1-1-2-1. "기사님이신가요?" 텍스트 */}
            <span className="text-xs leading-[18px] font-normal text-gray-900">기사님이신가요?</span>
            {/* 1-1-2-2. "기사님 전용 페이지" 링크 */}
            <Link href="/login/driver" className="text-xs leading-[20px] font-semibold text-orange-400 underline">
              기사님 전용 페이지
            </Link>
          </div>
        </div>

        {/* 1-2. 로그인 폼 및 하단 링크 섹션 */}
        <div className="flex flex-col gap-[48px]">
          {/* 1-2-1. 로그인 폼 그룹 */}
          <div className="flex flex-col gap-[16px]">
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              {/* 1-2-1-1-1. 입력 필드 그룹 */}
              <div className="flex flex-col gap-4">
                {/* 1-2-1-1-1-1. 이메일 입력 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm leading-6 font-normal text-gray-600">
                    이메일
                  </label>
                  <TextField
                    id="email"
                    type="text"
                    placeholder="이메일을 입력해 주세요"
                    value={email}
                    onChange={setEmail}
                    className="w-full"
                    mdHeight="54"
                  />
                </div>
                {/* 1-2-1-1-1-2. 비밀번호 입력 */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm leading-6 font-normal text-gray-600">
                    비밀번호
                  </label>
                  <TextField
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    onChange={setPassword}
                    className="w-full"
                    error={password.length > 0 && password.length < 6 ? "비밀번호는 6자 이상 입력해 주세요." : ""}
                    mdHeight="54"
                  />
                </div>
              </div>
              {/* 1-2-1-1-2. 로그인 버튼 */}
              <button
                type="submit"
                disabled
                className="h-[54px] w-full rounded-xl bg-gray-100 text-base leading-[26px] font-semibold text-gray-500"
              >
                로그인
              </button>
            </form>
            {/* 1-2-1-2. 회원가입 링크 */}
            <div className="flex items-center justify-center">
              <span className="text-xs leading-[18px] font-normal text-gray-500">아직 무빙 회원이 아니신가요?</span>
              <Link href="/signup" className="ml-1 text-xs leading-[20px] font-semibold text-orange-400 underline">
                이메일로 회원가입하기
              </Link>
            </div>
          </div>

          {/* 1-2-2. SNS 로그인 박스 (Placeholder) */}
          <div className="flex h-[96px] w-[210px] flex-col items-center gap-[24px] self-center">
            {/* 1-2-2-1. SNS 안내 문구 */}
            <span className="text-xs leading-[18px] font-normal text-gray-500">SNS 계정으로 간편 가입하기</span>
            {/* 1-2-2-2. SNS 아이콘 그룹 */}
            <div className="flex h-[54px] w-full items-center justify-between">
              {/* 1-2-2-2-1. 구글, 카카오, 네이버 아이콘 */}
              <button className="h-[54px] w-[54px]">
                <Image src="/assets/icons/ic_google.svg" alt="Google 로그인" width={54} height={54} />
              </button>
              <button className="h-[54px] w-[54px]">
                <Image src="/assets/icons/ic_kakao.svg" alt="Kakao 로그인" width={54} height={54} />
              </button>
              <button className="h-[54px] w-[54px]">
                <Image src="/assets/icons/ic_naver.svg" alt="Naver 로그인" width={54} height={54} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
