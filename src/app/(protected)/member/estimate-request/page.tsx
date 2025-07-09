"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import MobileEstimateForm from "./MobileEstimateForm";
import DesktopEstimateForm from "./DesktopEstimateForm";
import DisabledForm from "./DisabledForm";

export default function MoveRequestPage() {
  const isMobile = useMediaQuery("(max-width: 743px)");

  // TODO: API 연결 후 삭제 예정
  const isPending = false;
  const isAvailable = false;

  if (isPending) return null;

  if (!isAvailable) {
    return <DisabledForm />;
  }

  return isMobile ? <MobileEstimateForm /> : <DesktopEstimateForm />;
}
