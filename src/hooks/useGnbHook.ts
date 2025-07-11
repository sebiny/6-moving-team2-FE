import { useState } from "react";

export type OpenLayer = "notification" | "profile" | "gnbMobileMenu" | null;

export function useGnbHooks() {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [openLayer, setOpenLayer] = useState<OpenLayer>(null);
  const handleResize = () => {
    setIsLg(window.innerWidth > 1280);

    // 모바일 메뉴 열려있으면 창 크기 변경 시 닫기
    if (window.innerWidth > 1280 && openLayer === "gnbMobileMenu") {
      setOpenLayer(null);
    }
  };
  return { isLg, setIsLg, openLayer, setOpenLayer, handleResize };
}
