import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DevNav from "@/components/DevNav";
import Providers from "../providers/Providers";
import Gnb from "@/components/gnb/Gnb";
import { useAuth } from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "무빙 - 복잡한 이사 준비, 무빙 하나면 끝!",
  description:
    "무빙에서는 여러 이사 기사에게 한 번에 견적을 받아 가격, 서비스, 후기 등 다양한 정보를 한눈에 비교할 수 있습니다. 각 기사별로 제공하는 서비스의 차이점과 비용을 꼼꼼하게 확인한 뒤, 내 상황과 예산에 가장 잘 맞는 이사 업체를 직접 선택할 수 있어 더욱 합리적이고 현명한 이사가 가능합니다. 복잡한 이사 준비 과정에서 발생할 수 있는 불필요한 고민과 시간 낭비를 줄여주며, 신뢰할 수 있는 기사와의 매칭을 통해 안전하고 만족스러운 이사 경험을 제공합니다.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col`}>
        <Providers>
          <Gnb />
          <div className="mt-14 lg:mt-22">{children}</div>
          <DevNav />
        </Providers>
      </body>
    </html>
  );
}
