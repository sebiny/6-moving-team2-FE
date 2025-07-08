"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

interface Route {
  path: string;
  name: string;
  group: "common" | "customer" | "driver";
}

export default function DevNav() {
  const pathname = usePathname();

  const routes: Route[] = [
    // 공통 라우트
    { path: "/", name: "랜딩페이지", group: "common" },
    { path: "/login", name: "로그인", group: "common" },
    { path: "/signup", name: "회원가입", group: "common" },

    // 고객 관련 라우트 (@customer)
    { path: "/member/estimate-past", name: "페이지명", group: "customer" },
    { path: "/member/estimate-pending", name: "페이지명", group: "customer" },

    // 기사 관련 라우트 (@driver)
    { path: "/driver/my-page", name: "페이지명", group: "driver" }
  ];

  // 라우트를 그룹별로 분류
  const groupedRoutes = routes.reduce<Record<Route["group"], Route[]>>(
    (acc, route) => {
      if (!acc[route.group]) {
        acc[route.group] = [];
      }
      acc[route.group].push(route);
      return acc;
    },
    { common: [], customer: [], driver: [] }
  );

  return (
    <nav className="fixed bottom-0 flex w-full flex-col items-center justify-center gap-1 py-1">
      {Object.entries(groupedRoutes).map(([group, routes]) => (
        <div key={group} className="flex max-w-[1280px] gap-1">
          <span>{group === "customer" ? "고객 :" : group === "driver" ? "기사" : "공통"}</span>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`rounded border-gray-100 bg-gray-100 px-3 py-1 text-sm ${pathname === route.path ? "bg-orange-400 font-bold text-white" : ""}`}
            >
              {route.name}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
