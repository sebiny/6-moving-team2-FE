"use client";

import Logo from "./_components/Logo";
import GnbList from "@/components/list/GnbList";
import React, { useEffect, useRef, useState } from "react";
import Notification from "../dropdown/NotificationDropdown";
import Profile from "../dropdown/ProfileDropdown";

type DropDownType = "notification" | "profile" | null;
interface GnbProps {
  userRole: "guest" | "member" | "driver" | undefined;
}

export default function Gnb({ userRole }: GnbProps) {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<DropDownType>(null);

  const gnbRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 드롭다운 모두 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (gnbRef.current && !gnbRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    function handleKeydown(event: any) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth > 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      ref={gnbRef}
      className="border-line-100 fixed z-999 flex h-14 w-full items-center justify-center border-b-1 bg-white px-6 lg:h-22"
    >
      <div className="flex w-full max-w-[var(--container-gnb)] items-center justify-between">
        <Logo />

        {isLg ? (
          <div className="flex flex-1 items-center justify-between">
            <GnbList lg="lg" className="flex-1" userRole={userRole} />
            <div className="flex items-center justify-between gap-5">
              <Notification
                isOpen={openDropdown === "notification"}
                onToggle={() => setOpenDropdown(openDropdown === "notification" ? null : "notification")}
              />
              <Profile
                lg="lg"
                isOpen={openDropdown === "profile"}
                onToggle={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-5">
            <Notification
              isOpen={openDropdown === "notification"}
              onToggle={() => setOpenDropdown(openDropdown === "notification" ? null : "notification")}
            />
            <div className="flex items-center justify-between gap-5">
              <Profile
                isOpen={openDropdown === "profile"}
                onToggle={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
              />
              <GnbList />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
