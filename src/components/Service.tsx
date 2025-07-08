import ChipCircle from "@/components/chip/ChipCircle";
import React from "react";

interface ServiceType {
  services: string[];
  regions: string[];
}

function Service({ services, regions }: ServiceType) {
  return (
    <div className="mb-8 lg:mb-20">
      <div className="mt-10">
        <p className="text-black-400 text-xl font-semibold">제공 서비스</p>
        <div className="mt-4 flex gap-3">
          {services.map((service) => (
            <ChipCircle key={service} type="region" color="orange" text={service} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-black-400 text-xl font-semibold">서비스 가능 지역</p>
        <div className="mt-4 flex gap-3">
          {regions.map((region) => (
            <ChipCircle key={region} type="region" color="gray" text={region} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
