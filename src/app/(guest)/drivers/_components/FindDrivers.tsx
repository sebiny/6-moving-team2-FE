"use client";

import SearchBar from "@/components/input/SearchBar";
import React, { useState } from "react";
import Filters from "./Filters";
import SortDropdown from "@/components/dropdown/SortDropdown";
import { drivers } from "@/constant/constant";
import DriverFindCard from "@/components/card/DriverFindCard";
import LikedDrivers from "./LikedDrivers";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { driverService } from "@/lib/api/api-driver";
import { DriverType } from "@/types/driverType";

function FindDrivers() {
  const [page, setPage] = useState<number>(1);
  const [region, setRegion] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("work");
  const [keyword, setKeyword] = useState<string>("");
  //   const searchParams = useSearchParams();
  //   const keyword = searchParams.get("keyword") || "";
  //   const region = searchParams.get("region") || "";
  //   const service = searchParams.get("service") || "";
  //   const orderBy = searchParams.get("orderBy") || "work";

  const { data: drivers, isPending } = useQuery<DriverType[] | null>({
    queryKey: ["drivers", keyword, orderBy, region, service],
    queryFn: () => driverService.getAllDriversDefault({ keyword, orderBy, region, service })
  });

  return (
    <div className="flex justify-center">
      <div className="mx-6 w-full max-w-205">
        <p className="my-8 hidden text-3xl font-semibold lg:block">기사님 찾기</p>
        <SearchBar width="w-full" value={keyword} onChange={setKeyword} />
        <div className="my-[38px] flex justify-between">
          <Filters region={region} setRegion={setRegion} service={service} setService={setService} />
          <SortDropdown sortings={["reviewCount", "career", "work", "rating"]} sort={orderBy} setSort={setOrderBy} />
        </div>
        <div className="flex flex-col gap-5">
          {drivers?.map((driver) => (
            <DriverFindCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
      <div className="mt-[260px] ml-[54px] hidden lg:block">
        <LikedDrivers />
      </div>
    </div>
  );
}

export default FindDrivers;
