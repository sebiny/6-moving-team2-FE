"use client";

import Logo from "./_components/Logo";
import GnbListLayout from "@/components/layout/GnbListLayout";
import React, { useEffect, useRef, useState } from "react";
import Notification from "../dropdown/NotificationDropdown";
import Profile from "../dropdown/ProfileDropdown";
import GnbMenuList from "../list/GnbMenuList";

// Gnb에서 정의해야 하는 요소들
// 화면 너비에 따라 UI가 바뀜
// 유저 상태에 따라 메뉴가 바뀜

type OpenLayer = "notification" | "profile" | "gnbMobileMenu" | null;
interface GnbProps {
  userRole?: "guest" | "customer" | "driver" | undefined;
}

export default function Gnb({ userRole }: GnbProps) {
  const [isLg, setIsLg] = useState<boolean>(false);

  const [openLayer, setOpenLayer] = useState<OpenLayer>(null);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const gnbMobileMenuRef = useRef<HTMLDivElement>(null);

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
    const handleResize = () => {
      setIsLg(window.innerWidth > 1280);

      // 모바일 메뉴 열려있으면 창 크기 변경 시 닫기
      if (window.innerWidth > 1280 && openLayer === "gnbMobileMenu") {
        setOpenLayer(null);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openLayer]);

  const toggleLayer = (layer: OpenLayer) => {
    setOpenLayer((prev) => (prev === layer ? null : layer));
  };

  return (
    <header className="border-line-100 fixed z-10 flex h-14 w-full items-center justify-center border-b-1 bg-white px-6 lg:h-22">
      <div className="flex w-full max-w-[var(--container-gnb)] items-center justify-between">
        <Logo />

        {isLg ? (
          <div className="flex flex-1 items-center justify-between">
            <GnbListLayout lg="lg" className="flex-1">
              <GnbMenuList browserWidth="lg" userRole={userRole} />
            </GnbListLayout>
            <div className="flex items-center justify-between gap-5">
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
          </div>
        ) : (
          <div className="flex items-center justify-between gap-5">
            <Notification
              ref={notificationRef}
              isOpen={openLayer === "notification"}
              onClick={() => toggleLayer("notification")}
            />
            <div className="flex items-center justify-between gap-5">
              <Profile ref={profileRef} isOpen={openLayer === "profile"} onClick={() => toggleLayer("profile")} />
              <GnbListLayout
                ref={gnbMobileMenuRef}
                isOpen={openLayer === "gnbMobileMenu"}
                onClick={() => toggleLayer("gnbMobileMenu")}
              >
                <GnbMenuList browserWidth="default" userRole={userRole} onClick={() => toggleLayer("gnbMobileMenu")} />
              </GnbListLayout>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
