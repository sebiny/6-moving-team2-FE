"use client";
import Link from "next/link";
import Image from "next/image";
import TextField from "@/components/input/TextField";
import { useSignupForm } from "@/hooks/useAuthForm";
import { UserType } from "@/types/UserType";

export default function SignupCustomer() {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordError,
    passwordConfirmationError,
    isFormValid,
    onSubmit
  } = useSignupForm(UserType.CUSTOMER);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 pt-[110px] md:bg-orange-400 md:p-0">
      {/* 1. 가운데 가장 중심 박스 */}
      <div className="flex w-full max-w-[327px] flex-col gap-[40px] md:w-[640px] md:max-w-none md:gap-[48px] md:rounded-[40px] md:bg-gray-50 md:px-[40px] md:py-[68px] lg:w-[740px] lg:px-[50px] lg:py-[48px]">
        {/* 1-1. 로고 및 기사님 페이지 링크 섹션 */}
        <div className="flex flex-col md:gap-[8px]">
          {/* 1-1-1. 로고 컨테이너 */}
          <div className="flex h-[84px] w-full items-center justify-center md:h-[100px]">
            {/* 1-1-1-1. 로고 */}
            <Image
              src="/assets/icons/ic_logo_text.svg"
              alt="무빙 로고"
              width={85.36}
              height={44.11}
              priority
              className="scale-[1.2] md:h-[55.14px] md:w-[106.7px] md:scale-100"
            />
          </div>

          {/* 1-1-2. 기사님 전용 페이지 링크 컨테이너 */}
          <div className="flex w-full items-center justify-center gap-[2px] md:h-[32px] md:w-fit md:self-center">
            <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-900 md:text-xl md:leading-8 md:font-normal">
              기사님이신가요?
            </span>
            <Link
              href="/signup/driver"
              className="text-xs leading-[20px] font-semibold text-orange-400 underline md:text-xl md:leading-[20px]"
            >
              기사님 전용 페이지
            </Link>
          </div>
        </div>

        {/* 1-2. 회원가입 폼 및 하단 링크 섹션 */}
        <div className="flex flex-col gap-[16px] md:gap-[24px]">
          {/* 1-2-1. 회원가입 폼 */}
          <form onSubmit={onSubmit} className="flex w-full flex-col gap-8 md:gap-[56px]">
            {/* 1-2-1-1. 입력 필드 그룹 */}
            <div className="flex flex-col items-start gap-4 self-stretch md:gap-[32px]">
              {/* 이름 입력 */}
              <div className="flex w-full flex-col items-start gap-2 md:gap-[16px]">
                <label
                  htmlFor="name"
                  className="md:text-black-400 text-sm leading-6 font-normal text-gray-600 md:text-xl md:leading-8"
                >
                  이름
                </label>
                <TextField
                  id="name"
                  type="text"
                  placeholder="성함을 입력해 주세요"
                  value={name}
                  onChange={setName}
                  className="w-full"
                  mdHeight="54"
                />
              </div>
              {/* 이메일 입력 */}
              <div className="flex w-full flex-col items-start gap-2 md:gap-[16px]">
                <label
                  htmlFor="email"
                  className="md:text-black-400 text-sm leading-6 font-normal text-gray-600 md:text-xl md:leading-8"
                >
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
              {/* 전화번호 입력 */}
              <div className="flex w-full flex-col items-start gap-2 md:gap-[16px]">
                <label
                  htmlFor="phone"
                  className="md:text-black-400 text-sm leading-6 font-normal text-gray-600 md:text-xl md:leading-8"
                >
                  전화번호
                </label>
                <TextField
                  id="phone"
                  type="text"
                  placeholder="숫자만 입력해주세요"
                  value={phone}
                  onChange={setPhone}
                  className="w-full"
                  mdHeight="54"
                />
              </div>
              {/* 비밀번호 입력 */}
              <div className="flex w-full flex-col items-start gap-2 md:gap-[16px]">
                <label
                  htmlFor="password"
                  className="md:text-black-400 text-sm leading-6 font-normal text-gray-600 md:text-xl md:leading-8"
                >
                  비밀번호
                </label>
                <TextField
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={setPassword}
                  className="w-full"
                  error={
                    password.length > 0 && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password)
                      ? "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
                      : ""
                  }
                  mdHeight="54"
                />
              </div>
              {/* 비밀번호 확인 입력 */}
              <div className="flex w-full flex-col items-start gap-2 md:gap-[16px]">
                <label
                  htmlFor="passwordConfirmation"
                  className="md:text-black-400 text-sm leading-6 font-normal text-gray-600 md:text-xl md:leading-8"
                >
                  비밀번호 확인
                </label>
                <TextField
                  id="passwordConfirmation"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해 주세요"
                  value={passwordConfirmation}
                  onChange={setPasswordConfirmation}
                  className="w-full"
                  error={
                    passwordConfirmation.length > 0 && password !== passwordConfirmation
                      ? "비밀번호가 일치하지 않습니다."
                      : ""
                  }
                  mdHeight="54"
                />
              </div>
            </div>
            {/* 시작하기 버튼 */}
            <button
              type="submit"
              disabled={
                !email ||
                !password ||
                !passwordConfirmation ||
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password) ||
                password !== passwordConfirmation
              }
              className={`h-[54px] w-full rounded-xl px-5 py-4 text-base leading-[26px] font-semibold transition-colors md:h-[60px] md:rounded-[16px] md:text-[18px] ${
                email &&
                password &&
                passwordConfirmation &&
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password) &&
                password === passwordConfirmation
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 text-gray-50"
              }`}
            >
              시작하기
            </button>
          </form>

          {/* 1-2-2. 로그인 링크 */}
          <div className="flex w-full items-center justify-center md:w-fit md:gap-2 md:self-center">
            <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-500 md:text-xl md:leading-8">
              이미 무빙 회원이신가요?
            </span>
            <Link
              href="/login/customer"
              className="ml-1 text-xs leading-[20px] font-semibold text-orange-400 underline md:ml-0 md:text-xl md:leading-[20px]"
            >
              로그인
            </Link>
          </div>
        </div>

        {/* 1-3. SNS 로그인 박스 */}
        <div className="flex h-[96px] w-[210px] flex-col items-center justify-center gap-[24px] self-center md:h-fit md:w-[280px] md:gap-[32px]">
          <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-500 md:text-xl md:leading-8">
            SNS 계정으로 간편 가입하기
          </span>
          <div className="flex h-[54px] w-full items-center justify-between md:h-[72px] md:w-fit md:justify-center md:gap-[32px]">
            <button className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]">
              <Image
                src="/assets/icons/ic_google.svg"
                alt="Google 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </button>
            <button className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]">
              <Image
                src="/assets/icons/ic_kakao.svg"
                alt="Kakao 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </button>
            <button className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]">
              <Image
                src="/assets/icons/ic_naver.svg"
                alt="Naver 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
