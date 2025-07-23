"use client";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import { createDesignatedEstimateRequest } from "@/lib/api/api-estimateRequest";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "@/providers/ModalProvider";

function DesignatedEstimateButton() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useParams();
  const driverId = id as string;
  const { openModal, closeModal } = useModal();
  const mutation = useMutation({
    mutationFn: () => createDesignatedEstimateRequest({ driverId }),
    onError: (err) => {
      openModal("default", <EstimateRequestModal onClose={closeModal} errorMsg={err.message} />);
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
      <Button text="지정 견적 요청하기" type="orange" onClick={handleClickRequest} className="h-16 w-full lg:w-80" />
    </div>
  );
}

export default DesignatedEstimateButton;
