"use client";

import { useLoginForm } from "@/hooks/useAuthForm";

export default function LoginCustomer() {
  const { email, setEmail, password, setPassword, onSubmit } = useLoginForm();

  return (
    <div className="flex min-h-screen items-center">
      <form onSubmit={onSubmit} className="mx-auto flex max-w-xs flex-col gap-2 p-4">
        <input
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="bg-black py-2 text-white" type="submit">
          기사 로그인
        </button>
      </form>
    </div>
  );
}
