import React, { Suspense } from "react";
import FindDrivers from "./_components/FindDrivers";

function DriversPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <FindDrivers />
    </Suspense>
  );
}

export default DriversPage;
