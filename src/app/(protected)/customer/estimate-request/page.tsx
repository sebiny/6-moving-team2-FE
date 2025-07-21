"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import MobileEstimateForm from "./MobileEstimateForm";
import DesktopEstimateForm from "./DesktopEstimateForm";
import DisabledForm from "./DisabledForm";
import { useQuery } from "@tanstack/react-query";
import { getActiveEstimateRequest } from "@/lib/api/api-estimateRequest";

export default function MoveRequestPage() {
  const isMobile = useMediaQuery("(max-width: 743px)");

  const { data: activeRequest, isPending } = useQuery({
    queryKey: ["estimate", "active"],
    queryFn: getActiveEstimateRequest,
    retry: false
  });

  if (isPending) return null;

  if (activeRequest) {
    return <DisabledForm />;
  }

  return isMobile ? <MobileEstimateForm /> : <DesktopEstimateForm />;
}
