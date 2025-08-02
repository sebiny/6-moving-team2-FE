"use client";

import DriverFindCard from "@/components/card/DriverFindCard";
import SubHeader from "../_components/SubHeader";
import { useEffect, useState } from "react";
import CustomCheckbox from "@/components/button/CustomCheckbox";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DriverType } from "@/types/driverType";
import { favoriteService } from "@/lib/api/api-favorite";
import { ToastModal } from "@/components/common-modal/ToastModal";
import AlertModal from "@/components/common-modal/AlertModal";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function FavoriteDrivers() {
  const t = useTranslations("Gnb");
  const tC = useTranslations("Common");
  const tm = useTranslations("ToastModal.favoriteDrivers");

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<DriverType[]>({
    queryKey: ["favoriteDrivers"],
    queryFn: () => favoriteService.favoriteDrivers()
  });

  const [checkedList, setCheckedList] = useState<boolean[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirmDelete, setOnConfirmDelete] = useState<(() => void) | null>(null);

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

  const handleDeleteSelected = () => {
    const selectedDrivers = data.filter((_, index) => checkedList[index]);
    const selectedIds = selectedDrivers.map((driver) => driver.id);

    if (selectedIds.length === 0) {
      setAlertMessage(tC("selectToDelete"));
      setOnConfirmDelete(() => null); // 확인 시 별도 동작 없음
      setShowAlert(true);
      return;
    }

    setAlertMessage(tC("confirmDelete"));
    setOnConfirmDelete(() => async () => {
      try {
        await Promise.all(selectedIds.map((id) => deleteFavoriteMutation.mutateAsync(id)));
        ToastModal(tC("deleted"));
      } catch (error) {
        ToastModal(tC("deleteError"));
      } catch (error) {
        ToastModal(tm("failedToDelete"));
      } finally {
        setShowAlert(false);
      }
    });
    setShowAlert(true);
  };

  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 스티키 헤더 */}
      <div className="fixed z-9 w-full bg-white lg:top-22">
        <SubHeader title={t("likedDrivers")} />
      </div>

      {/* 실제 내용 */}
      <div className="mt-13 flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:mt-15 lg:px-100 lg:py-15">
        {isLoading ? (
          <div>{tC("loading")}</div>
        ) : data.length === 0 ? (
          // 데이터 없을 경우
          <div className="mt-50 flex flex-col items-center justify-center gap-6">
            <img
              src="/assets/images/img_empty_review.svg"
              alt="찜한 기사님 없음"
              width={250}
              height={250}
              className="object-contain"
            />
            <p className="text-lg font-medium text-gray-600">{tC("noLiked")}</p>
            <div className="w-60">
              <Button type="orange" text={tC("GotoLike")} onClick={() => router.push("/drivers")} />
            </div>
          </div>
        ) : (
          <>
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

            {data.map((driver, index) => (
              <DriverFindCard
                key={driver.id}
                driver={driver}
                isFavoritePage={true}
                checked={checkedList[index]}
                onCheckChange={(val) => handleChange(index, val)}
              />
            ))}
          </>
        )}
      </div>

      {/* AlertModal */}
      {showAlert && (
        <AlertModal
          type={onConfirmDelete ? "handleClick" : "confirm"}
          message={alertMessage}
          buttonText={onConfirmDelete ? tC("delete") : tC("confirm")}
          onClose={() => setShowAlert(false)}
          onConfirm={onConfirmDelete || (() => setShowAlert(false))}
        />
      )}
    </div>
  );
}
