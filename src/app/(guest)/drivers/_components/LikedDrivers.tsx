import React from "react";
import LikedDriverInfo from "./LikedDriverInfo";

function LikedDrivers() {
  const drivers = [{ id: 1 }];
  return (
    <div>
      <p className="mb-4 text-xl font-semibold">찜한 기사님</p>
      <div>
        {drivers.map((driver) => (
          <LikedDriverInfo key={driver.id} />
        ))}
      </div>
    </div>
  );
}

export default LikedDrivers;
