"use client";

import useMediaHook from "@/hooks/useMediaHook";
import MobileEstimateForm from "./MobileEstimateForm";
import DesktopEstimateForm from "./DesktopEstimateForm";
import DisabledForm from "./DisabledForm";
import { useQuery } from "@tanstack/react-query";
import { getActiveEstimateRequest } from "@/lib/api/api-estimateRequest";

export default function MoveRequestPage() {
  const { isMd } = useMediaHook();

  const { data: activeRequest, isPending } = useQuery({
    queryKey: ["estimate", "active"],
    queryFn: getActiveEstimateRequest,
    retry: false
  });

  if (isPending) return null;

  if (activeRequest) {
    return <DisabledForm />;
  }

  return !isMd ? <MobileEstimateForm /> : <DesktopEstimateForm />;
}
