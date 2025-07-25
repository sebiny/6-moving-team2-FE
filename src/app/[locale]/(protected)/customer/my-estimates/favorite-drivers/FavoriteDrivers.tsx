"use client";

import DriverFindCard from "@/components/card/DriverFindCard";
import SubHeader from "../_components/SubHeader";
import { useEffect, useState } from "react";
import CustomCheckbox from "@/components/button/CustomCheckbox";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { favoriteService } from "@/lib/api/api-favorite";

export default function FavoriteDrivers() {
  const t = useTranslations("Gnb");
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<DriverType[]>({
    queryKey: ["favoriteDrivers"],
    queryFn: () => favoriteService.favoriteDrivers()
  });

  const [checkedList, setCheckedList] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedList(data.map(() => false));
  }, [data]);

  // 전체 선택 여부
  const isAllChecked = checkedList.length > 0 && checkedList.every(Boolean);

  // 전체 선택 토글
  const toggleAll = (value: boolean) => {
    setCheckedList(data.map(() => value));
  };

  // 개별(DriverFindCard) 체크 변경 함수
  const handleChange = (index: number, value: boolean) => {
    setCheckedList((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // 찜한 기사 삭제
  const deleteFavoriteMutation = useMutation({
    mutationFn: (driverId: string) => favoriteService.deleteFavorite(driverId),
    onSuccess: () => {
      // 쿼리 캐시 무효화하여 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["favoriteDrivers"] });
    }
  });

  const handleDeleteSelected = async () => {
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    const selectedDrivers = data.filter((_, index) => checkedList[index]);
    const selectedIds = selectedDrivers.map((driver) => driver.id);

    if (selectedIds.length === 0) {
      alert("삭제할 기사님을 선택해주세요.");
      return;
    }

    try {
      await Promise.all(selectedIds.map((id) => deleteFavoriteMutation.mutateAsync(id)));

      alert("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <SubHeader title={t("likedDrivers")} />
      </div>

      {/* 실제 내용 */}
      <div className="mt-13 flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:mt-15 lg:px-100 lg:py-15">
        <div className="flex justify-between">
          <div className="flex">
            <CustomCheckbox checked={isAllChecked} onChange={toggleAll} shape="square" />
            <div className="mt-1.5">
              {t("chooseAll")} ({checkedList.filter(Boolean).length}/{checkedList.length})
            </div>
          </div>
          <div className="mt-1.5 mr-2.5 cursor-pointer" onClick={handleDeleteSelected}>
            {t("deleteItem")}
          </div>
        </div>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          data.map((driver, index) => (
            <DriverFindCard
              key={driver.id}
              driver={driver}
              isFavoritePage={true}
              checked={checkedList[index]}
              onCheckChange={(val) => handleChange(index, val)}
            />
          ))
        )}
      </div>
    </div>
  );
}
