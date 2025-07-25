import React from "react";
import FavoriteButton from "./FavoriteButton";
import DesignatedEstimateButton from "./DesignatedEstimateButton";
import { useTranslations } from "next-intl";

interface RequestEstimateType {
  favorite: boolean;
  setFavorite: (value: boolean) => void;
  isDesignated: boolean;
}

function RequestEstimate({ favorite, setFavorite, isDesignated }: RequestEstimateType) {
  const t = useTranslations("FindDriver");
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <p className="text-xl font-semibold">
        김코드 {t("requestQuote.title")} <br></br>
        {t("requestQuote.subtitle")}
      </p>
      <DesignatedEstimateButton isDesignated={isDesignated} />
      <FavoriteButton favorite={favorite} setFavorite={setFavorite} />
    </div>
  );
}

export default RequestEstimate;
