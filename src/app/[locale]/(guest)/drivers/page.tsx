import React, { Suspense } from "react";
import FindDrivers from "./_components/FindDrivers";
import { useTranslations } from "next-intl";

function DriversPage() {
  const t = useTranslations("FindDriver");
  return (
    <Suspense>
      <FindDrivers />
    </Suspense>
  );
}

export default DriversPage;
