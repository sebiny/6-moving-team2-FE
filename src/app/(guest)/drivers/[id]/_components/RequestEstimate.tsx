"use client";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";

import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";

interface RequestEstimateType {
  userFavorite: boolean;
  favorite: boolean;
  setFavorite: (value: boolean) => void;
}

function RequestEstimate({ favorite, setFavorite }: RequestEstimateType) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleClickRequest = () => {
    if (!user) router.push("/login/customer");
    else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <p className="text-xl font-semibold">
        김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
      </p>
      <Button text="지정 견적 요청하기" type="orange" onClick={handleClickRequest} className="h-16 w-80" />
      <FavoriteButton favorite={favorite} setFavorite={setFavorite} />
      {isModalOpen && <EstimateRequestModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default RequestEstimate;
