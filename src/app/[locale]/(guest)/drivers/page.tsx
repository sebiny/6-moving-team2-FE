import React, { Suspense } from "react";
import FindDrivers from "./_components/FindDrivers";
import { useTranslations } from "next-intl";

function DriversPage() {
  const t = useTranslations("FindDriver");
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <FindDrivers />
    </Suspense>
  );
}

export default DriversPage;
