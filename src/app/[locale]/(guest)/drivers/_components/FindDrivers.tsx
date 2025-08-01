"use client";

import SearchBar from "@/components/input/SearchBar";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import SortDropdown from "@/components/dropdown/SortDropdown";
import DriverFindCard from "@/components/card/DriverFindCard";
import LikedDrivers from "./LikedDrivers";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { driverService } from "@/lib/api/api-driver";
import { DriverType } from "@/types/driverType";
import { useInView } from "react-intersection-observer";
import { useAuth } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";
import DriverFindCardSkeleton from "@/components/card/DriverFindCardSkeleton";

function FindDrivers() {
  const t = useTranslations("FindDriver");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const region = searchParams.get("region") || "";
  const service = searchParams.get("service") || "";
  const orderBy = searchParams.get("orderBy") || "work";
  const [keywordInput, setKeywordInput] = useState(keyword);
  const { user } = useAuth();
  const { ref, inView } = useInView();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  const handleSearch = (val: string) => {
    updateQuery("keyword", val);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery<{
    data: DriverType[];
    hasNext: boolean;
  } | null>({
    queryKey: ["drivers", keyword, orderBy, region, service],
    queryFn: ({ pageParam = 1 }) =>
      user
        ? driverService.getAllDriversCookie({ keyword, orderBy, region, service, page: pageParam as number })
        : driverService.getAllDriversDefault({ keyword, orderBy, region, service, page: pageParam as number }),
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
        <p className="my-8 hidden text-3xl font-semibold lg:block">{t("findDriver")}</p>
        <SearchBar
          width="w-full"
          placeholder={t("textPlaceholder")}
          value={keywordInput}
          onChange={(val) => setKeywordInput(val)}
          onSearch={handleSearch}
        />
        <div className="my-[38px] flex justify-between">
          <Filters
            region={region}
            setRegion={(val) => updateQuery("region", val)}
            service={service}
            setService={(val) => updateQuery("service", val)}
          />
          <SortDropdown
            translator={(key) => t(`sortOptions.${key}`)}
            sortings={["reviewCount", "career", "work", "averageRating"]}
            sort={orderBy}
            setSort={(val) => updateQuery("orderBy", val)}
          />
        </div>
        <div className="flex flex-col gap-5">
          {isPending
            ? Array.from({ length: 5 }).map((_, i) => <DriverFindCardSkeleton key={i} />)
            : drivers.map((driver) => <DriverFindCard key={driver.id} driver={driver} />)}
          <div ref={ref} className="h-1" />
          {isFetchingNextPage && (
            <div className="mt-4 flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-orange-400" />
            </div>
          )}
        </div>
      </div>
      {user && (
        <div className="mt-[260px] ml-[54px] hidden lg:block">
          <LikedDrivers />
        </div>
      )}
    </div>
  );
}

export default FindDrivers;
