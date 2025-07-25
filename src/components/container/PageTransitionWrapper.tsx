"use client"; // 훅을 사용하기 위해 클라이언트 컴포넌트로 지정

import { usePathname } from "next/navigation";
import React from "react";

// children을 props로 받도록 타입을 지정합니다.
interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname(); // 현재 URL 경로를 가져옵니다. (예: /mypage)

  // GnbMenuList에서 만들었던 규칙과 '정확히 동일한' 규칙으로 이름을 생성합니다.
  const transitionName = `gnb-menu-${pathname.replace(/\//g, "")}`;

  return (
    // 이 div가 페이지 컨텐츠를 감싸면서, 동적으로 view-transition-name을 부여합니다.
    <div style={{ viewTransitionName: transitionName }}>{children}</div>
  );
}
