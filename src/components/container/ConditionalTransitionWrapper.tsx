"use client"; // usePathname 훅을 사용하기 위해 클라이언트 컴포넌트로 지정

import { usePathname } from "next/navigation";
import React from "react";

// 페이지 컨텐츠(children)와 PageTransitionWrapper를 그대로 가져옵니다.
import PageTransitionWrapper from "./PageTransitionWrapper";

// 전환 효과를 적용하고 싶지 않은 페이지 경로 목록
const EXCLUDE_PATHS = ["/login", "/signup"]; // 예: 로그인, 회원가입 페이지는 제외

export default function ConditionalTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 현재 경로가 제외 목록에 포함되어 있다면, Wrapper 없이 그대로 컨텐츠를 반환합니다.
  if (EXCLUDE_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  // 그 외의 모든 페이지는 PageTransitionWrapper로 감싸서 반환합니다.
  return <PageTransitionWrapper>{children}</PageTransitionWrapper>;
}
