"use client";

import DriverFindCard from "@/components/card/DriverFindCard";
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
import LoadingLottie from "@/components/lottie/LoadingLottie";
import PageHeader from "@/components/common/PageHeader";

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
      } finally {
        setShowAlert(false);
      }
    });
    setShowAlert(true);
  };

  return (
    <div className="bg-background-200 flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="fixed z-9 w-full bg-white lg:top-22" aria-label="페이지 헤더">
        <PageHeader title={t("likedDrivers")} />
      </header>

      {/* 본문 */}
      <main
        id="main-content"
        className="mt-13 flex flex-1 flex-col gap-6 px-7 py-10 md:px-15 lg:container lg:mx-auto lg:mt-15 lg:px-20 lg:py-15 xl:px-90"
      >
        {isLoading ? (
          <div role="status" aria-live="polite">
            <LoadingLottie className="mt-30" />
          </div>
        ) : data.length === 0 ? (
          <section
            role="status"
            aria-label={tC("noLiked")}
            className="mt-50 flex flex-col items-center justify-center gap-6"
          >
            <img src="/assets/images/img_empty_review.svg" alt="" width={250} height={250} className="object-contain" />
            <p className="text-lg font-medium text-gray-600">{tC("noLiked")}</p>
            <div className="w-60">
              <Button type="orange" text={tC("GotoLike")} onClick={() => router.push("/drivers")} buttonType="button" />
            </div>
          </section>
        ) : (
          <>
            {/* 컨트롤 영역 */}
            <section aria-labelledby="fav-controls-heading">
              <h2 id="fav-controls-heading" className="sr-only">
                {t("likedDrivers")} {tC("controls")}
              </h2>
              <form className="flex justify-between" aria-describedby="selection-count">
                <fieldset className="flex">
                  <legend className="sr-only">{t("chooseAll")}</legend>
                  <label className="flex items-center gap-2">
                    <CustomCheckbox
                      checked={isAllChecked}
                      onChange={toggleAll}
                      shape="square"
                      aria-label={t("chooseAll")}
                    />
                    <span id="selection-count">
                      {t("chooseAll")} ({checkedList.filter(Boolean).length}/{checkedList.length})
                    </span>
                  </label>
                </fieldset>

                <button
                  type="button"
                  className="mt-1.5 mr-2.5 text-gray-600 hover:text-black disabled:text-gray-300"
                  onClick={handleDeleteSelected}
                  disabled={checkedList.every((v) => !v)}
                  aria-disabled={checkedList.every((v) => !v)}
                  aria-label={t("deleteItem")}
                >
                  {t("deleteItem")}
                </button>
              </form>
            </section>

            {/* 목록 */}
            <section aria-labelledby="fav-list-heading">
              <h2 id="fav-list-heading" className="sr-only">
                {t("likedDrivers")}
              </h2>
              <ul role="list" className="flex flex-col gap-4">
                {data.map((driver, index) => (
                  <li key={driver.id}>
                    <DriverFindCard
                      driver={driver}
                      isFavoritePage
                      checked={checkedList[index]}
                      onCheckChange={(val) => handleChange(index, val)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>

      {/* AlertModal (이미 ARIA 모달 적용 추천본 사용) */}
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
