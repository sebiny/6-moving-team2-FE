"use client";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import { createDesignatedEstimateRequest } from "@/lib/api/api-estimateRequest";
import { useMutation } from "@tanstack/react-query";

function DesignatedEstimateButton() {
  const router = useRouter();
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { id } = useParams();
  const driverId = id as string;
  const mutation = useMutation({
    mutationFn: () => createDesignatedEstimateRequest({ driverId }),
    onError: (err) => {
      setErrorMsg(err.message);
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
      {errorMsg && <EstimateRequestModal setErrorMsg={setErrorMsg} errorMsg={errorMsg} />}
    </div>
  );
}

export default DesignatedEstimateButton;
