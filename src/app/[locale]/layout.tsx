import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/providers/Providers";
import Gnb from "@/components/gnb/Gnb";
import { useAuth } from "@/providers/AuthProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ConditionalTransitionWrapper from "@/components/container/ConditionalTransitionWrapper";
import { cssTransition, ToastContainer } from "react-toastify";
import Script from "next/script";
import WelcomeToastTrigger from "@/components/WelcomeToastTrigger";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "무빙 - 복잡한 이사 준비, 무빙 하나면 끝!",
  description:
    "무빙에서는 여러 이사 기사에게 한 번에 견적을 받아 가격, 서비스, 후기 등 다양한 정보를 한눈에 비교할 수 있습니다. 각 기사별로 제공하는 서비스의 차이점과 비용을 꼼꼼하게 확인한 뒤, 내 상황과 예산에 가장 잘 맞는 이사 업체를 직접 선택할 수 있어 더욱 합리적이고 현명한 이사가 가능합니다. 복잡한 이사 준비 과정에서 발생할 수 있는 불필요한 고민과 시간 낭비를 줄여주며, 신뢰할 수 있는 기사와의 매칭을 통해 안전하고 만족스러운 이사 경험을 제공합니다.",
  keywords: ["이사", "이사 견적", "Moving", "무빙", "이사 플랫폼"],
  authors: [{ name: "Moving", url: "https://www.moving-2.click" }],
  creator: "Moving",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Docthru - 개발문서 번역 플랫폼",
    description: "전 세계 개발 문서를 한국어로 쉽게 이해하세요.",
    url: "https://www.moving-2.click",
    siteName: "Docthru",
    images: [
      {
        url: "https://www.moving-2.click/og-image.webp",
        width: 1488,
        height: 556,
        alt: "Moving 서비스 소개 이미지"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "무빙 - 복잡한 이사 준비, 무빙 하나면 끝!",
    description: "무빙으로 복잡한 이사, 쉽게 시작하고 끝내세요!",
    images: ["https://www.moving-2.click/og-image.webp"]
  },
  metadataBase: new URL("https://www.moving-2.click")
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#F9502E" />
        <meta name="description" content="복잡한 이사 준비, 무빙 하나면 끝!" />
        <meta property="og:url" content="https://www.moving-2.click/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="무빙 - 복잡한 이사 준비, 무빙 하나면 끝!" />
        <meta property="og:description" content="복잡한 이사 준비, 무빙 하나면 끝!" />
        <meta property="og:image" content="https://www.moving-2.click/og-image.webp" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="무빙 - 복잡한 이사 준비, 무빙 하나면 끝!" />
        <meta name="twitter:description" content="복잡한 이사 준비, 무빙 하나면 끝!" />
        <meta name="twitter:image" content="https://www.moving-2.click/og-image.webp" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="canonical" href="https://www.moving-2.click/" />
      </head>
      <link rel="icon" href="/favicon.svg" />
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col`}>
        <Script src="https://developers.kakao.com/sdk/js/kakao.min.js" strategy="beforeInteractive" />
        <NextIntlClientProvider>
          <Providers>
            <ConditionalTransitionWrapper>
              <Gnb />
              <div className="mt-14 flex-1 bg-white lg:mt-22">
                {children}
                <ToastContainer
                  position="top-center"
                  theme="light"
                  closeButton={false}
                  style={{ zIndex: 9999, left: "50%", transform: "translateX(-50%)" }}
                  toastClassName="!bg-transparent !shadow-none !backdrop-blur-md rounded-xl"
                />
              </div>
            </ConditionalTransitionWrapper>
            <WelcomeToastTrigger />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
