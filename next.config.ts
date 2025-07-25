import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    domains: [
      "aws-basic-codeit-bucket-1.s3.ap-northeast-2.amazonaws.com" // ← 이 줄 추가
    ]
  }
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
