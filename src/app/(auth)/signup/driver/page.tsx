"use client";

import { useSignupForm } from "@/hooks/UseAuthForm";

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
    onSubmit
  } = useSignupForm("DRIVER");

  return (
    <div className="flex min-h-screen items-center">
      <form onSubmit={onSubmit} className="mx-auto flex max-w-xs flex-col gap-2 p-4">
        <input
          type="text"
          placeholder="이름"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="border p-2"
        />
        <button className="bg-blue-600 py-2 text-white" type="submit">
          기사 회원가입
        </button>
      </form>
    </div>
  );
}
