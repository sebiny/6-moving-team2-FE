import React, { ReactNode } from "react";

/**
 * 다양한 페이지에서 재사용 가능한 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 컨테이너 내부에 표시될 콘텐츠
 * @param {string} props.className - 추가 스타일링을 위한 클래스명
 * @param {string} props.maxWidth - 컨테이너 최대 너비 (기본값: 'max-w-[1920px]')
 * @param {string} props.padding - 컨테이너 패딩 (기본값: 'px-6')
 * @param {string} props.margin - 컨테이너 마진 (기본값: 'mx-auto')
 * @returns {React.ReactElement} 컨테이너 컴포넌트
 */

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  style?: React.CSSProperties | undefined;
}

export default function Container({
  children,
  className = "",
  maxWidth = "max-w-[1920px]",
  padding = "px-6",
  margin = "mx-auto",
  style = {}
}: ContainerProps) {
  return (
    <div style={style} className={`${maxWidth} ${padding} ${margin} ${className}`}>
      {children}
    </div>
  );
}
