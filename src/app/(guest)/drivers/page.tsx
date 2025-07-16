"use client";
import React, { useState } from "react";
import DriverFindCard from "../../../components/card/DriverFindCard";
import Image from "next/image";
import LikedDrivers from "./_components/LikedDrivers";
import SortDropdown from "@/components/dropdown/SortDropdown";
import Filters from "./_components/Filters";
import { drivers } from "@/constant/constant";
import { useQuery } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { driverService } from "@/lib/api/api-driver";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/input/SearchBar";

function DriversPage() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  // const { data, isPending } = useQuery<DriverType[]>({
  //   queryKey: ["drivers", keyword, orderBy, region, service],
  //   queryFn: driverService.getAllDrivers
  // });
  return (
    <div className="flex justify-center">
      <div className="mx-6 w-full max-w-205">
        <p className="my-8 hidden text-3xl font-semibold lg:block">기사님 찾기</p>
        <SearchBar />
        <div className="my-[38px] flex justify-between">
          <Filters />
          <SortDropdown sortings={["리뷰 많은순", "평점 높은순", "경력 높은순", "확정 많은순"]} value="리뷰 많은순" />
        </div>
        <div className="flex flex-col gap-5">
          {drivers.map((driver) => (
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

export default DriversPage;
