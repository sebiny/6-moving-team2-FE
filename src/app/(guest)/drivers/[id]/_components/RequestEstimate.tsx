import React from "react";
import FavoriteButton from "./FavoriteButton";
import DesignatedEstimateButton from "./DesignatedEstimateButton";

interface RequestEstimateType {
  userFavorite: boolean;
  favorite: boolean;
  setFavorite: (value: boolean) => void;
}

function RequestEstimate({ favorite, setFavorite }: RequestEstimateType) {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <p className="text-xl font-semibold">
        김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
      </p>
      <DesignatedEstimateButton />
      <FavoriteButton favorite={favorite} setFavorite={setFavorite} />
    </div>
  );
}

export default RequestEstimate;
