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

interface DesignatedEstimateButtonType {
  isDesignated: boolean;
}

function DesignatedEstimateButton({ isDesignated }: DesignatedEstimateButtonType) {
  const t = useTranslations("FindDriver");
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useParams();
  const driverId = id as string;
  const { openModal, closeModal } = useModal();
  const mutation = useMutation({
    mutationFn: () => createDesignatedEstimateRequest({ driverId }),
    onError: (err) => {
      openModal(<EstimateRequestModal onClose={closeModal} errorMsg={err.message} />);
      //동적인 에러 메세지 처리
    }
  });
  const handleClickRequest = () => {
    if (!user) router.push("/login/customer");
    else {
      mutation.mutate();
    }
  };

  return (
    <div className="w-full">
      <Button
        text={isDesignated ? t("driverPage.requestQuoteComplete") : t("driverPage.requestQuote")}
        type="orange"
        onClick={handleClickRequest}
        className="h-16 w-full lg:w-80"
        isDisabled={isDesignated}
      />
    </div>
  );
}

export default DesignatedEstimateButton;
