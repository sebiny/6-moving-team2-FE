export const getCookieDomain = (): string | undefined => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    // 로컬 개발 환경이면 domain 생략
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return undefined;
    }

    // 배포 환경이면 .도메인 형식
    return ".moving-2.click";
  }

  return undefined;
};
