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
import useMediaHook from "@/hooks/useMediaHook";

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
  const { isLg } = useMediaHook();
  const searchBarSize = isLg ? "md" : "sm";

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
    <main className="mb-20 flex justify-center px-6 pt-[6px]" aria-label={t("findDriver")}>
      <section className="w-full max-w-205" aria-labelledby="findDriverTitle">
        <h1 id="findDriverTitle" className="my-8 hidden text-3xl font-semibold lg:block">
          {t("findDriver")}
        </h1>

        <form
          role="search"
          aria-label="searchDrivers"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(keywordInput);
          }}
        >
          <SearchBar
            width="w-full"
            size={searchBarSize}
            placeholder={t("textPlaceholder")}
            value={keywordInput}
            onChange={(val) => setKeywordInput(val)}
            onSearch={handleSearch}
            aria-label="searchInputLabel"
          />
        </form>

        <section
          aria-label="filtersSectionLabel"
          className="my-4 flex items-center justify-between md:mt-[26px] md:mb-10 lg:my-[38px]"
        >
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
        </section>

        <section aria-label="driverList" aria-live="polite" aria-relevant="additions" aria-atomic="false" role="list">
          <div className="flex flex-col gap-5">
            {isPending
              ? Array.from({ length: 5 }).map((_, i) => <DriverFindCardSkeleton key={i} aria-hidden="true" />)
              : drivers.map((driver) => <DriverFindCard key={driver.id} driver={driver} />)}
          </div>
          <div ref={ref} className="h-1" aria-hidden="true" />
          {isFetchingNextPage && (
            <div className="mt-4 flex justify-center" aria-live="assertive" aria-busy="true" role="alert">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-orange-400" />
              <span className="sr-only">{t("loading")}</span>
            </div>
          )}
        </section>
      </section>

      {user && <LikedDrivers />}
    </main>
  );
}

export default FindDrivers;
