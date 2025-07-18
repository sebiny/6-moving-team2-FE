"use client";
import Image from "next/image";
import React, { useState } from "react";
import EstimateRequestModal from "./EstimateRequestModal";
import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "@/lib/api/api-favorite";

function RequestEstimate() {
  const { id } = useParams();
  const driverId = id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: () => (favorite ? favoriteService.deleteFavorite(driverId) : favoriteService.createFavorite(driverId)),
    onMutate: async () => {
      const prevFavorite = favorite;
      setFavorite(!prevFavorite);
      return { prevFavorite };
    },
    onError: (error, _, context) => {
      if (context?.prevFavorite !== undefined) {
        setFavorite(context.prevFavorite);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driver", driverId] });
    }
  });

  const handleClickRequest = () => {
    if (!user) router.push("/login/customer");
    else {
      setIsModalOpen(true);
    }
  };

  const handleClickFavorite = () => {
    if (!user) router.push("/login/customer");
    else {
      favoriteMutation.mutate();
    }
  };
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <p className="text-xl font-semibold">
        김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
      </p>
      <Button text="지정 견적 요청하기" type="orange" onClick={handleClickRequest} className="h-16 w-80" />
      <button
        className="border-line-200 flex h-16 w-80 items-center justify-center gap-[10px] rounded-2xl border"
        onClick={handleClickFavorite}
      >
        <Image src="/assets/icons/ic_like_black.svg" alt="찜하기" width={24} height={24} />
        <p className="text-lg font-semibold">기사님 찜하기</p>
      </button>
      {isModalOpen && <EstimateRequestModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default RequestEstimate;
