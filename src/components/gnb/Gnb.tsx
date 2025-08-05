"use client";

import Logo from "./_components/Logo";
import GnbListLayout from "@/components/gnb/GnbListLayout";
import React, { useEffect, useRef, useState } from "react";
import Notification from "../notification/NotificationDropdown";
import Profile from "../dropdown/ProfileDropdown";
import GnbMenuList from "./GnbMenuList";
import { useAuth } from "@/providers/AuthProvider";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import { OpenLayer, useGnbHooks } from "@/hooks/useGnbHook";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

// Gnb에서 정의해야 하는 요소들
// 화면 너비에 따라 UI가 바뀜
// 유저 상태에 따라 메뉴가 바뀜

interface GnbProps {
  userRole?: "GUEST" | "CUSTOMER" | "DRIVER" | undefined;
}

export default function Gnb() {
  const t = useTranslations("Gnb");
  const { user, isLoading, logout } = useAuth();
  const { handleResize, isLg, openLayer, setOpenLayer } = useGnbHooks();

  // user가 null이면 비로그인 상태

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const gnbMobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const drivers = pathname.includes("/drivers");
  // 레이어가 열려있는 상태일 때, 레이어 DOM이 존재하며, 클릭한 위치가 레이어 밖이라면 닫힘
  const handleClickOutside = (event: MouseEvent) => {
    if (
      (openLayer === "notification" &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)) ||
      (openLayer === "profile" && profileRef.current && !profileRef.current.contains(event.target as Node)) ||
      (openLayer === "gnbMobileMenu" &&
        gnbMobileMenuRef.current &&
        !gnbMobileMenuRef.current.contains(event.target as Node))
    ) {
      setOpenLayer(null);
    }
  };

  // 컴포넌트 마운트 시 바깥 클릭 이벤트 리스너 등록, 언마운트 시 해제
  useEffect(() => {
    if (openLayer !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openLayer]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openLayer]);

  // if (isLoading)
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
  //       <svg className="h-12 w-12 animate-spin text-white" viewBox="0 0 24 24" fill="none">
  //         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  //         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  //       </svg>
  //     </div>
  //   );
  const isLoggedIn = !!user;
  const userRole = user?.userType ?? "GUEST";

  const toggleLayer = (layer: OpenLayer) => {
    setOpenLayer((prev: any) => (prev === layer ? null : layer));
  };

  return (
    <header
      className={`border-line-100 fixed z-10 flex h-14 w-full items-center justify-center bg-white px-6 lg:h-22 ${drivers ? `sm:border-b-0 md:border-b-0 lg:border-b` : `border-b-1`}`}
    >
      <div className="flex w-full max-w-[var(--container-gnb)] items-center justify-between">
        <Logo />
        {isLg ? (
          <div className="flex flex-1 items-center justify-between">
            <GnbListLayout lg="lg" className="flex-1">
              <GnbMenuList browserWidth="lg" isLg={true} userRole={userRole} />
            </GnbListLayout>
            <div className="flex items-center justify-between">
              <div className="mr-5">
                {isLoggedIn ? <LanguageSwitcher /> : <LanguageSwitcher classname={"py-2 px-4 text-lg"} />}
              </div>

              {isLoggedIn ? (
                <div className="flex flex-row justify-between gap-5">
                  <Notification
                    ref={notificationRef}
                    isOpen={openLayer === "notification"}
                    onClick={() => toggleLayer("notification")}
                  />
                  <Profile
                    ref={profileRef}
                    lg="lg"
                    isOpen={openLayer === "profile"}
                    onClick={() => toggleLayer("profile")}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    type="orange"
                    text={t("login")}
                    isLoginText={true}
                    className="w-30 rounded-md"
                    onClick={() => router.push("/login/customer")}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-5">
            <LanguageSwitcher /> {/* 여기! */}
            <Notification
              ref={notificationRef}
              className={isLoggedIn ? "block" : "hidden"}
              isOpen={openLayer === "notification"}
              onClick={() => toggleLayer("notification")}
            />
            <div className="flex items-center justify-between gap-5">
              <Profile
                ref={profileRef}
                className={isLoggedIn ? "block" : "hidden"}
                isOpen={openLayer === "profile"}
                onClick={() => toggleLayer("profile")}
              />
              <GnbListLayout
                ref={gnbMobileMenuRef}
                isOpen={openLayer === "gnbMobileMenu"}
                onClick={() => toggleLayer("gnbMobileMenu")}
              >
                <GnbMenuList
                  browserWidth="default"
                  isLg={false}
                  userRole={userRole}
                  onClick={() => toggleLayer("gnbMobileMenu")}
                />
              </GnbListLayout>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
