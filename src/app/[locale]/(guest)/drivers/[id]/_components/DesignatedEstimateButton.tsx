"use client";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import { createDesignatedEstimateRequest } from "@/lib/api/api-estimateRequest";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "@/providers/ModalProvider";
import { useTranslations } from "next-intl";
import { ToastModal } from "@/components/common-modal/ToastModal";

interface DesignatedEstimateButtonType {
  isDesignated: boolean;
}

function DesignatedEstimateButton({ isDesignated: initialIsDesignated }: DesignatedEstimateButtonType) {
  const t = useTranslations("FindDriver");
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useParams();
  const driverId = id as string;
  const { openModal, closeModal } = useModal();
  const [isDesignated, setIsDesignated] = useState(initialIsDesignated);
  const mutation = useMutation({
    mutationFn: () => createDesignatedEstimateRequest({ driverId }),
    onSuccess: () => setIsDesignated(true),
    onError: (err) => {
      const errorKey = err.message;
      const translated = t(errorKey);

      // 특정 에러 메시지일 경우
      if (errorKey === "maxThreeDriver") {
        ToastModal(translated);
        return;
      }

      // 그 외일 경우
      openModal(<EstimateRequestModal onClose={closeModal} errorMsg={translated} />);
    }
  });
  const handleClickRequest = () => {
    if (!user) router.push("/login/customer");
    else {
      mutation.mutate();
    }
  };
  const buttonText = mutation.isPending
    ? t("driverPage.requestingQuote")
    : isDesignated
      ? t("driverPage.requestQuoteComplete")
      : t("driverPage.requestQuote");

  return (
    <div className="w-full">
      <Button
        text={buttonText}
        type="orange"
        onClick={handleClickRequest}
        className="h-16 w-full lg:w-80"
        isDisabled={isDesignated || mutation.isPending}
      />
    </div>
  );
}

export default DesignatedEstimateButton;
