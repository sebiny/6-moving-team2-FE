import { NextResponse, type NextRequest } from "next/server";
import { UserType } from "@/types/UserType";
import createMiddleware from "next-intl/middleware";
import { locales } from "./config";
import { routing } from "./i18n/routing";
const localeRegex = new RegExp(`^/(${locales.join("|")})`);

const intlMiddleware = createMiddleware(routing);

// JWT 페이로드 타입 정의
interface JwtPayload {
  exp: number;
  userType: UserType;
  driverId?: string;
  customerId?: string;
  [key: string]: any;
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload && typeof payload.exp === "number" && payload.userType) {
      return payload;
    }
    return null;
  } catch (e) {
    console.error("JWT 파싱에 실패했습니다:", e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // 1. next-intl 미들웨어를 먼저 실행하여 응답을 생성합니다.
  // 이 응답에는 리디렉션 정보나, 다음 단계 처리에 필요한 로케일 헤더가 포함됩니다.
  const response = intlMiddleware(request);

  // 2. next-intl이 리디렉션을 지시한 경우(예: '/' -> '/ko'), 해당 응답을 즉시 반환합니다.
  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  // 3. 리디렉션이 아닌 경우, 인증 로직을 계속 진행합니다.
  const rawPathname = request.nextUrl.pathname;
  const pathname = rawPathname.replace(localeRegex, ""); // locale prefix 제거

  const accessToken = request.cookies.get("accessToken")?.value;

  let isAuthenticated = false;
  let payload: JwtPayload | null = null;

  if (accessToken) {
    const parsedPayload = parseJwtPayload(accessToken);
    if (parsedPayload && parsedPayload.exp * 1000 > Date.now()) {
      isAuthenticated = true;
      payload = parsedPayload;
    }
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDriverPage = pathname.startsWith("/driver/");
  const isCustomerPage = pathname.startsWith("/customer/");
  const isDriverProfileCreationPage = pathname === "/driver/profile";
  const isCustomerProfileCreationPage = pathname === "/customer/profile";

  // 1. 비인증 사용자 처리
  if (!isAuthenticated) {
    if (isDriverPage) {
      return NextResponse.redirect(new URL("/login/driver", request.url));
    }
    if (isCustomerPage) {
      return NextResponse.redirect(new URL("/login/customer", request.url));
    }
    // 인증이 필요 없는 페이지는 next-intl의 헤더가 포함된 응답을 그대로 반환합니다.
    return response;
  }

  // 2. 인증된 사용자는 로그인/회원가입 페이지 접근 불가
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userType = payload?.userType;
  const hasDriverProfile = !!payload?.driverId;
  const hasCustomerProfile = !!payload?.customerId;

  // 3. 프로필이 없는 사용자 리디렉션
  if (userType === UserType.DRIVER && !hasDriverProfile) {
    if (!isDriverProfileCreationPage) {
      return NextResponse.redirect(new URL("/driver/profile", request.url));
    }
    return response;
  }

  if (userType === UserType.CUSTOMER && !hasCustomerProfile) {
    if (!isCustomerProfileCreationPage) {
      return NextResponse.redirect(new URL("/customer/profile", request.url));
    }
    return response;
  }

  // 4. 프로필이 있는 사용자의 접근 제한
  if (userType === UserType.DRIVER && hasDriverProfile) {
    if (isDriverProfileCreationPage || isCustomerPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (userType === UserType.CUSTOMER && hasCustomerProfile) {
    if (isCustomerProfileCreationPage || isDriverPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 모든 접근 제어 규칙을 통과한 경우, next-intl의 헤더가 포함된 응답을 반환합니다.
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|favicon.svg).*)"]
};
