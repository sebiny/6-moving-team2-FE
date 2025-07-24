import ChipCircle from "@/components/chip/ChipCircle";
import { MoveType } from "@/constant/moveTypes";
import { ServiceAreaType } from "@/types/ServiceAreaType";
import { TranslateRegion, TranslateService } from "@/utills/TranslateFunction";
import { useTranslations } from "next-intl";
import React, { use } from "react";

interface ServiceType {
  services: MoveType[];
  serviceAreas: ServiceAreaType[];
}

function Service({ services, serviceAreas }: ServiceType) {
  const t = useTranslations("FindDriver");
  return (
    <div className="mb-8 lg:mb-20">
      <div className="mt-10">
        <p className="text-black-400 text-xl font-semibold">{t("driverPage.offerService")}</p>
        <div className="mt-4 flex gap-3">
          {services.map((service) => (
            <ChipCircle key={service} type="region" color="orange" text={t(`service.${service}`)} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-black-400 text-xl font-semibold">{t("driverPage.servicePossibleRegion")}</p>
        <div className="mt-4 flex gap-3">
          {serviceAreas.map((serviceArea) => (
            <ChipCircle key={serviceArea.id} type="region" color="gray" text={t(`region.${serviceArea.region}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
