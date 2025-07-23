import React from "react";
import FavoriteButton from "./FavoriteButton";
import DesignatedEstimateButton from "./DesignatedEstimateButton";

interface BottomNavType {
  favorite: boolean;
  setFavorite: (value: boolean) => void;
}

function BottomNav({ favorite, setFavorite }: BottomNavType) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex gap-2 bg-white px-6 py-7 lg:hidden">
      <FavoriteButton favorite={favorite} setFavorite={setFavorite} />
      <DesignatedEstimateButton />
    </div>
  );
}

export default BottomNav;
