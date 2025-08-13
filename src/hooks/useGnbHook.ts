import { useState } from "react";

export type OpenLayer = "notification" | "profile" | "gnbMobileMenu" | null;

export function useGnbHooks() {
  const [isLg, setIsLg] = useState<boolean>(false);
  const [openLayer, setOpenLayer] = useState<OpenLayer>(null);
  const handleResize = () => {
    setIsLg(window.innerWidth > 1280);
  };
  return { isLg, setIsLg, openLayer, setOpenLayer, handleResize };
}
