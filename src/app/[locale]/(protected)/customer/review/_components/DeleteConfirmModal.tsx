// DeleteConfirmModal.jsx
import Button from "@/components/Button";
import { ToastModal } from "@/components/common-modal/ToastModal";
import { queryClient } from "@/components/notification/NotificationDropdown";
import { deleteMyReview } from "@/lib/api/api-review";
import { useTranslations } from "next-intl";
import React from "react";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedReview: { reviewId: string; driverId: string } | null;
};

export default function DeleteConfirmModal({ isOpen, onClose, selectedReview }: DeleteConfirmModalProps) {
  const t = useTranslations("Review");

  const handleDelete = async (reviewId: string, driverId: string) => {
    try {
      await deleteMyReview(reviewId, driverId);
      ToastModal(t("reviewDeleted"));
      queryClient.invalidateQueries({ queryKey: ["reviews"] }); // 목록 새로고침
    } catch (err) {
      console.error(err);
      ToastModal(t("reviewDeleteFailed"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="flex w-80 flex-col gap-4 rounded-[20px] bg-white p-6 shadow-lg">
        <p className="mb-4 text-lg font-semibold">{t("deleteConfirm")}</p>
        <div className="flex justify-end gap-6">
          <Button type="white-orange" text={t("no")} onClick={onClose} />
          <Button
            type="orange"
            text={t("yes")}
            onClick={() => {
              if (selectedReview) {
                handleDelete(selectedReview.reviewId, selectedReview.driverId);
              }
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
