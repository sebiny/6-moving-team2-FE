"use client";
import Link from "next/link";
import Image from "next/image";
import TextField from "@/components/input/TextField";
import { useSignupForm } from "@/hooks/useAuthForm";
import { UserType } from "@/types/UserType";

export default function SignupDriver() {
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
    onSubmit,
    isNameValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid,
    isPasswordConfirmationValid,
    isFormValid
  } = useSignupForm(UserType.DRIVER);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 pt-[110px] md:bg-orange-400 md:p-0 md:pb-15 lg:pb-15">
      <div className="relative mt-[36px] flex w-full max-w-[327px] flex-col gap-[40px] md:mt-[40px] md:w-[640px] md:max-w-none md:gap-[48px] md:rounded-[40px] md:bg-gray-50 md:px-[40px] md:py-[68px] lg:mt-[48px] lg:w-[740px] lg:px-[50px] lg:py-[48px]">
        <div className="flex flex-col md:gap-[8px]">
          <div className="flex h-[84px] w-full items-center justify-center md:h-[100px]">
            <Image
              src="/assets/icons/ic_logo_text.svg"
              alt="무빙 로고"
              width={85.36}
              height={44.11}
              priority
              className="scale-[1.2] md:h-[55.14px] md:w-[106.7px] md:scale-100"
            />
          </div>

          <div className="flex w-full items-center justify-center gap-[2px] md:h-[32px] md:w-fit md:self-center">
            <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-900 md:text-xl md:leading-8 md:font-normal">
              일반 유저라면?
            </span>
            <Link
              href="/signup/customer"
              className="text-xs leading-[20px] font-semibold text-orange-400 underline md:text-xl md:leading-[20px]"
            >
              일반 유저 전용 페이지
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] md:gap-[24px]">
          <form onSubmit={onSubmit} className="flex w-full flex-col gap-8 md:gap-[56px]">
            <div className="flex flex-col items-start gap-4 self-stretch md:gap-[32px]">
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
                  error={name.length > 0 && !isNameValid ? "이름은 2~5자의 한글만 사용 가능합니다." : ""}
                  mdHeight="54"
                />
              </div>

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
                  error={email.length > 0 && !isEmailValid ? "유효하지 않은 이메일 형식입니다." : ""}
                  mdHeight="54"
                />
              </div>

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
                  error={
                    phone.length > 0 && !isPhoneValid ? "유효하지 않은 전화번호 형식입니다. (예: 01012345678)" : ""
                  }
                  mdHeight="54"
                />
              </div>

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
                    password.length > 0 && !isPasswordValid
                      ? "비밀번호는 최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다."
                      : ""
                  }
                  mdHeight="54"
                />
              </div>

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
                    passwordConfirmation.length > 0 && !isPasswordConfirmationValid
                      ? "비밀번호가 일치하지 않습니다."
                      : ""
                  }
                  mdHeight="54"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`h-[54px] w-full rounded-xl px-5 py-4 text-base leading-[26px] font-semibold transition-colors md:h-[60px] md:rounded-[16px] md:text-[18px] ${
                isFormValid ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-50"
              }`}
            >
              시작하기
            </button>
          </form>

          <div className="flex w-full items-center justify-center md:w-fit md:gap-2 md:self-center">
            <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-500 md:text-xl md:leading-8">
              이미 무빙 회원이신가요?
            </span>
            <Link
              href="/login/driver"
              className="ml-1 text-xs leading-[20px] font-semibold text-orange-400 underline md:ml-0 md:text-xl md:leading-[20px]"
            >
              로그인
            </Link>
          </div>
        </div>

        <div className="flex h-[96px] w-[210px] flex-col items-center justify-center gap-[24px] self-center md:h-fit md:w-[280px] md:gap-[32px]">
          <span className="md:text-black-200 text-xs leading-[18px] font-normal text-gray-500 md:text-xl md:leading-8">
            SNS 계정으로 간편 가입하기
          </span>
          <div className="flex h-[54px] w-full items-center justify-between md:h-[72px] md:w-fit md:justify-center md:gap-[32px]">
            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/google?userType=DRIVER`}
              className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]"
            >
              <Image
                src="/assets/icons/ic_google.svg"
                alt="Google 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/kakao?userType=DRIVER`}
              className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]"
            >
              <Image
                src="/assets/icons/ic_kakao.svg"
                alt="Kakao 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/naver?userType=DRIVER`}
              className="h-[54px] w-[54px] md:h-[72px] md:w-[72px]"
            >
              <Image
                src="/assets/icons/ic_naver.svg"
                alt="Naver 로그인"
                width={54}
                height={54}
                className="md:h-[72px] md:w-[72px]"
              />
            </a>
          </div>
        </div>

        <Image
          src="/assets/images/img_login_driver_avatar.png"
          alt="로그인 아바타"
          width={240}
          height={246}
          className="absolute -right-[90px] -bottom-[60px] z-0 hidden md:block lg:hidden"
        />

        <Image
          src="/assets/images/img_login_driver_avatar.png"
          alt="로그인 아바타"
          width={382.03}
          height={392}
          className="absolute -right-80 -bottom-[50px] z-0 hidden lg:block"
        />
      </div>
    </div>
  );
}
