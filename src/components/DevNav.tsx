"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

interface Route {
  path: string;
  name: string;
  group: "common" | "customer" | "driver" | "guest";
}

export default function DevNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes: Route[] = [
    // 공통 라우트
    { path: "/", name: "랜딩페이지", group: "common" },
    { path: "/login/driver", name: "기사로그인", group: "common" },
    { path: "/login/customer", name: "고객로그인", group: "common" },
    { path: "/signup/driver", name: "기사회원가입", group: "common" },
    { path: "/signup/customer", name: "고객회원가입", group: "common" },
    { path: "/common", name: "컴포넌트", group: "common" },

    // 고객 관련 라우트 (@customer)

    { path: "/customer/profile", name: "고객프로필생성", group: "customer" },
    { path: "/customer/my-estimates/favorite-drivers", name: "찜한 기사님", group: "customer" },
    { path: "/customer/my-estimates/estimate-pending", name: "대기 중인 견적", group: "customer" },
    { path: "/customer/my-estimates/estimate-past", name: "받은 견적", group: "customer" },

    // 기사 관련 라우트 (@driver)
    { path: "/driver/received-requests", name: "받은 요청", group: "driver" },
    { path: "/driver/my-estimates/sent", name: "보낸견적조회", group: "driver" },
    { path: "/driver/my-estimates/sent/1", name: "견적상세", group: "driver" },
    { path: "/driver/my-estimates/rejected", name: "반려 요청", group: "driver" },
    { path: "/driver/my-page", name: "마이페이지", group: "driver" },
    { path: "/driver/profile", name: "기사프로필생성", group: "driver" },

    // 게스트 관련 라우트 (@guest)
    { path: "/drivers", name: "페이지명", group: "guest" }
  ];

  const groupedRoutes = routes.reduce<Record<Route["group"], Route[]>>(
    (acc, route) => {
      if (!acc[route.group]) {
        acc[route.group] = [];
      }
      acc[route.group].push(route);
      return acc;
    },
    { common: [], customer: [], driver: [], guest: [] }
  );

  return (
    <div className="fixed bottom-0 z-50 flex w-full flex-col items-center">
      <nav className={`flex flex-col items-center justify-center gap-1 py-1 ${isOpen ? "" : "hidden"}`}>
        {Object.entries(groupedRoutes).map(([group, routes]) => (
          <div key={group} className="flex max-w-[1280px] gap-1">
            <span>
              {group === "customer"
                ? "고객 :"
                : group === "driver"
                  ? "기사 :"
                  : group === "guest"
                    ? "게스트 :"
                    : "공통"}
            </span>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`rounded border-gray-100 bg-gray-100 px-3 py-1 text-sm ${
                  pathname === route.path ? "bg-orange-400 font-bold text-white" : ""
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`z-50 mb-1 cursor-pointer rounded-sm bg-gray-400 px-3 py-1 text-sm font-bold text-white ${
          isOpen ? "" : "bg-orange-500"
        }`}
      >
        {isOpen ? "DevNav 닫기" : "DevNav 열기"}
      </button>
    </div>
  );
}
