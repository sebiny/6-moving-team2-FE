// DeleteConfirmModal.jsx
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
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <button className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400" onClick={onClose}>
            No
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => {
              if (selectedReview) {
                handleDelete(selectedReview.reviewId, selectedReview.driverId);
              }
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
