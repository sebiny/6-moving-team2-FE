import { NextResponse, type NextRequest } from "next/server";
import { UserType } from "@/types/UserType";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function parseJwtPayload(token: string): { exp: number; userType: UserType; [key: string]: any } | null {
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
  // 먼저 next-intl 내부 처리
  const intlResponse = intlMiddleware(request);
  if (intlResponse instanceof NextResponse) {
    return intlResponse; // 변경된 request 반영 (i18n 경로 처리용)
  }

  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Path: ${pathname}`);

  const accessToken = request.cookies.get("accessToken")?.value;

  let isAuthenticated = false;
  let userPayload: { userType: UserType } | null = null;

  if (accessToken) {
    const payload = parseJwtPayload(accessToken);
    if (payload && payload.exp * 1000 > Date.now()) {
      isAuthenticated = true;
      userPayload = { userType: payload.userType };
    }
  }

  // (auth) 경로는 비인증자만 접근 가능
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // (protected)/customer 경로는 고객만 접근 가능
  if (pathname.startsWith("/customer/")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login/customer", request.url));
    }
    if (userPayload?.userType !== UserType.CUSTOMER) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // (protected)/driver 경로는 기사만 접근 가능
  if (pathname.startsWith("/driver/")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login/driver", request.url));
    }
    if (userPayload?.userType !== UserType.DRIVER) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // (guest)는 누구나 접근 가능
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
// };
