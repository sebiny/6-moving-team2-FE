import type { Metadata } from "next";

// 이 메타데이터는 URL에 '/drivers'가 포함된 모든 페이지에 적용됩니다.
export const metadata: Metadata = {
  title: "기사님 추천 | 무빙",

  description: "무빙에서 최고의 이사 기사님을 찾아보세요. 서비스, 후기, 가격을 한눈에 비교할 수 있습니다.",

  openGraph: {
    title: "기사님 추천 | 무빙",

    description: "무빙에서 이사 전문가를 만나보세요. 이 기사님을 추천합니다!",

    images: [
      {
        url: "/og-image-drivers.webp",
        width: 1353,
        height: 740,
        alt: "무빙 기사님 추천"
      }
    ]
  }
};

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
