"use client";

import SearchBar from "@/components/input/SearchBar";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import SortDropdown from "@/components/dropdown/SortDropdown";
import DriverFindCard from "@/components/card/DriverFindCard";
import LikedDrivers from "./LikedDrivers";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { driverService } from "@/lib/api/api-driver";
import { DriverType } from "@/types/driverType";
import { useInView } from "react-intersection-observer";

function FindDrivers() {
  const [region, setRegion] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("work");
  const [keyword, setKeyword] = useState<string>("");
  //   const searchParams = useSearchParams();
  //   const keyword = searchParams.get("keyword") || "";
  //   const region = searchParams.get("region") || "";
  //   const service = searchParams.get("service") || "";
  //   const orderBy = searchParams.get("orderBy") || "work";

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery<{
    data: DriverType[];
    hasNext: boolean;
  } | null>({
    queryKey: ["drivers", keyword, orderBy, region, service],
    queryFn: ({ pageParam = 1 }) =>
      driverService.getAllDriversDefault({ keyword, orderBy, region, service, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) return allPages.length + 1;
      return undefined;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const drivers = data?.pages.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <div className="mb-20 flex justify-center">
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
          <div ref={ref} className="h-1" />
          {isFetchingNextPage && (
            <div className="mt-4 flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-[260px] ml-[54px] hidden lg:block">
        <LikedDrivers />
      </div>
    </div>
  );
}

export default FindDrivers;
