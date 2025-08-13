"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import SelectRegion from "./SelectRegion";
import SelectService from "./SelectService";
import Button from "../Button";
import { useTranslations } from "next-intl";
import { ToastModal } from "../common-modal/ToastModal";
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedGuard";

export default function CustomerProfileCreateForm() {
  const router = useRouter();
  const t = useTranslations("Profile");
  const t1 = useTranslations("Common");

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [currentArea, setCurrentArea] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // 성공적으로 제출 할 경우 꺼줄 가드
  const [guardEnabled, setGuardEnabled] = useState(true);

  const isFormValid = selectedMoveTypes.length > 0 && currentArea !== "";

  // 이탈 방지
  const isDirty = useMemo(() => {
    if (isSubmitting || isUploading) return false;
    return selectedMoveTypes.length > 0 || currentArea !== "" || !!profileImageFile || !!profileImagePreview;
  }, [isSubmitting, isUploading, selectedMoveTypes.length, currentArea, profileImageFile, profileImagePreview]);

  useUnsavedChangesGuard({
    when: guardEnabled && isDirty,
    message: t1("leaveWarning"),
    interceptLinks: true,
    interceptBeforeUnload: true,
    patchRouterMethods: true
  });

  const handleImageError = (error: string | null) => {
    setImageError(error);
    setProfileImageFile(null);
    setProfileImagePreview(null);
  };

  async function uploadImageFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await cookieFetch<{ imageUrl: string }>("/profile/image", {
        method: "POST",
        body: formData
      });

      if (response && response.imageUrl) {
        return response.imageUrl;
      }
      throw new Error(t("error.upload.noUrl"));
    } catch {
      throw new Error(t("subtitle"));
    }
  }

  const handleImageChange = async (file: File | null, previewUrl: string | null) => {
    setImageError(null);
    setProfileImageFile(file);

    if (file) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadImageFile(file);
        setProfileImagePreview(uploadedUrl);
      } catch (error: any) {
        setImageError(error.message || t("error.upload.general"));
        setProfileImagePreview(null);
        setProfileImageFile(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      setProfileImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setImageError(null);

    // 서비스, 지역 선택하지 않았을 때 버튼 비활성화되도록
    // 서비스/지역 미선택시 뜨는 alert 알림 제거하고, 버튼 비활성화되도록 만들었습니다.
    if (!isFormValid) {
      return;
    }

    const payload = {
      moveType: selectedMoveTypes,
      profileImage: profileImagePreview || undefined,
      currentArea
    };

    try {
      const response = await cookieFetch<{ accessToken?: string }>("/profile/customer", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (response && response.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      ToastModal(t("success.create"));
      setGuardEnabled(false);
      router.push("/");
    } catch (error: any) {
      ToastModal(error.message || t("error.create"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main role="main">
      <form className="w-[327px] max-w-160 space-y-4 p-6 lg:w-full" onSubmit={handleSubmit}>
        <header>
          <h2 className="text-lg font-bold lg:text-[32px]">{t("title")}</h2>
          <p className="text-black-100 my-4 text-xs lg:my-7 lg:text-[16px]">{t("subtitle")}</p>
          <div className="border-line-100 border-b"></div>
        </header>

        <ImageUploader
          id="profileImage"
          label={t("profileImage")}
          maxSizeMB={5}
          onImageChange={handleImageChange}
          previewUrl={profileImagePreview}
          isSubmitting={isSubmitting || isUploading}
          isRequired={false}
          error={imageError}
          allowRemove={true}
          onImageError={handleImageError}
          aria-label="프로필 이미지 업로더"
        />
        {isUploading && <p className="text-sm text-gray-500">{t("uploading")}</p>}

        <div className="border-line-100 border-b"></div>

        <div>
          <p className="text-black-300 font-semibold lg:text-xl">{t("serviceTitle")}</p>
          <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">{t("serviceDescription")}</p>

          <SelectService
            aria-label="이사 서비스 선택"
            services={selectedMoveTypes}
            setServices={setSelectedMoveTypes}
          />
        </div>

        <div className="border-line-100 border-b"></div>

        <div>
          <p className="text-black-300 font-semibold lg:text-xl">{t("regionTitle")}</p>
          <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">{t("regionDescription")}</p>
          <SelectRegion
            aria-label="지역 선택"
            setCurrentArea={setCurrentArea}
            currentArea={currentArea}
            type="customer"
          />
        </div>
        <nav aria-label="Form actions">
          <Button
            type="orange"
            text={isSubmitting ? t("loading") : t("submit")}
            isDisabled={isSubmitting || isUploading || !isFormValid}
            className="mt-15 w-full rounded bg-blue-600 py-2 text-white"
          />
        </nav>
      </form>
    </main>
  );
}
