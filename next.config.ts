import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["aws-basic-codeit-bucket-1.s3.ap-northeast-2.amazonaws.com", "dfji8rtv1ziar.cloudfront.net"]
  },

  // 아이콘 라이브러리와 함께 다국어 패키지도 최적화 대상에 추가합니다.
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "next-intl" // 다국어 패키지 최적화 추가
    ]
  },

  // Webpack 설정을 통해 캐시는 유지하되, 큰 파일이 생성되지 않도록 제어합니다.
  webpack: (config, { dev }) => {
    // 개발 환경에만 적용
    if (dev && config.optimization?.splitChunks) {
      config.optimization.splitChunks.maxSize = 200000; // 청크 최대 크기를 200KB로 제한
    }
    return config;
  }
};

const withNextIntl = createNextIntlPlugin();

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "moving-wm",
  project: "javascript-nextjs-3j",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true
});
