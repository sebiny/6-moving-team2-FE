"use client";
import LikeIcon from "@/components/icon/LikeIcon";
import useMediaHook from "@/hooks/useMediaHook";
import { favoriteService } from "@/lib/api/api-favorite";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface FavoriteButtonType {
  favorite: boolean;
  setFavorite: (value: boolean) => void;
}

function FavoriteButton({ favorite, setFavorite }: FavoriteButtonType) {
  const { isLg } = useMediaHook();
  const { id } = useParams();
  const driverId = id as string;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  const favoriteMutation = useMutation({
    mutationFn: () => (favorite ? favoriteService.createFavorite(driverId) : favoriteService.deleteFavorite(driverId)),
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
  const handleClickFavorite = () => {
    if (!user) router.push("/login/customer");
    else favoriteMutation.mutate();
  };
  const t = useTranslations("FindDriver.requestQuote");
  return (
    <button
      className="border-line-200 flex h-[54px] w-[54px] items-center justify-center gap-[10px] rounded-2xl border lg:h-16 lg:w-80"
      onClick={handleClickFavorite}
    >
      <LikeIcon color="black" isFilled={isLg || favorite} />
      {isLg && <p className="text-lg font-semibold">기사님 {favorite ? t("dislike Driver") : t("like Driver")}</p>}
    </button>
  );
}

export default FavoriteButton;
