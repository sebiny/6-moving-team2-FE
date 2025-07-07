"use client";

import Logo from "./_components/Logo";
import GnbList from "@/components/list/GnbList";
import React, { useEffect, useState } from "react";
import Notification from "../dropdown/NotificationDropdown";
import Profile from "../dropdown/ProfileDropdown";

export default function Gnb() {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 744);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //744이상이될때 데스크탑이 되고 있다.
  return (
    <header className="border-line-100 flex h-14 items-center justify-center border-b-1 bg-white px-6 md:h-22">
      <div className="flex w-full max-w-[var(--container-gnb)] items-center justify-between">
        <Logo />

        {isMd ? (
          <div className="flex flex-1 items-center justify-between">
            <GnbList md="md" className="flex-1" />
            <div className="flex items-center justify-between gap-5">
              <Notification />
              <Profile md="md" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-5">
            <Notification />
            <div className="flex items-center justify-between gap-5">
              <Profile />
              <GnbList />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
