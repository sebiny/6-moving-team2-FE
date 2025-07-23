import { NextResponse, type NextRequest } from "next/server";
import { UserType } from "@/types/UserType";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

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
    // 필수 필드(exp, userType) 유효성 검사
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
  // 먼저 next-intl 내부 처리
  const intlResponse = intlMiddleware(request);
  if (intlResponse instanceof NextResponse) {
    return intlResponse; // 변경된 request 반영 (i18n 경로 처리용)
  }

  const { pathname } = request.nextUrl;
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

  // 1. 비인증 사용자 처리: 기사/고객 페이지 접근 시 각 로그인 페이지로 리디렉션
  if (!isAuthenticated) {
    if (isDriverPage) {
      return NextResponse.redirect(new URL("/login/driver", request.url));
    }
    if (isCustomerPage) {
      return NextResponse.redirect(new URL("/login/customer", request.url));
    }
    // 비인증 사용자는 인증/회원가입 페이지나 공개 페이지에 접근 가능
    return NextResponse.next();
  }

  // --- 여기서부터는 인증된 사용자(isAuthenticated === true) ---

  // 2. 인증된 사용자는 로그인/회원가입 페이지 접근 불가
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userType = payload?.userType;
  const hasDriverProfile = !!payload?.driverId;
  const hasCustomerProfile = !!payload?.customerId;

  // 3. 프로필이 없는 사용자 처리: 역할에 맞는 프로필 생성 페이지로 리디렉션
  if (userType === UserType.DRIVER && !hasDriverProfile) {
    if (!isDriverProfileCreationPage) {
      return NextResponse.redirect(new URL("/driver/profile", request.url));
    }
    // 드라이버 프로필 생성 페이지는 접근 허용, 다른 페이지는 차단됨
    return NextResponse.next();
  }

  if (userType === UserType.CUSTOMER && !hasCustomerProfile) {
    if (!isCustomerProfileCreationPage) {
      return NextResponse.redirect(new URL("/customer/profile", request.url));
    }
    // 고객 프로필 생성 페이지는 접근 허용, 다른 페이지는 차단됨
    return NextResponse.next();
  }

  // 4. 프로필이 있는 사용자 처리: 역할에 맞지 않는 페이지 접근 차단
  if (userType === UserType.DRIVER && hasDriverProfile) {
    // 프로필이 있는 드라이버는 프로필 생성 페이지 접근 불가
    if (isDriverProfileCreationPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // 고객 페이지 접근 불가
    if (isCustomerPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (userType === UserType.CUSTOMER && hasCustomerProfile) {
    // 프로필이 있는 고객은 프로필 생성 페이지 접근 불가
    if (isCustomerProfileCreationPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // 기사 페이지 접근 불가
    if (isDriverPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 위 모든 조건에 해당하지 않으면 요청을 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
// };
