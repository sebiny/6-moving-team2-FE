"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import InputText from "@/components/InputText";
import SelectService from "@/components/profile/SelectService"; // 고객 컴포넌트 import
import SelectRegion from "@/components/profile/SelectRegion"; // 고객 컴포넌트 import
import { useTranslations } from "next-intl";
import { ToastModal } from "@/components/common-modal/ToastModal";
import { useUnsavedChangesGuard } from "@/hooks/useUnsavedGuard";

interface DriverProfileFormProps {
  isEditMode: boolean;
  initialData?: any;
}

export default function DriverProfileForm({ isEditMode, initialData }: DriverProfileFormProps) {
  const router = useRouter();
  const t = useTranslations("DriverProfileEdit");
  const t1 = useTranslations("Common");

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [nickname, setNickname] = useState("");
  const [career, setCareer] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [detailIntro, setDetailIntro] = useState("");
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [guardEnabled, setGuardEnabled] = useState(true);

  // 이탈방지: 초기값 저장(수정 모드 비교용)
  const initial = useMemo(() => {
    if (!isEditMode || !initialData?.driver) return null;
    const d = initialData.driver;
    return {
      profileImage: d.profileImage || null,
      moveType: (d.moveType || []).slice().sort(),
      nickname: d.nickname || "",
      career: String(d.career ?? ""),
      shortIntro: d.shortIntro || "",
      detailIntro: d.detailIntro || "",
      regions: (d.serviceAreas?.map((a: { region: string }) => a.region) || []).slice().sort()
    };
  }, [isEditMode, initialData]);

  useEffect(() => {
    if (isEditMode && initialData?.driver) {
      const profileData = initialData.driver;
      setProfileImagePreview(profileData.profileImage || null);
      setSelectedMoveTypes(profileData.moveType || []);
      setNickname(profileData.nickname || "");
      setCareer(String(profileData.career ?? ""));
      setShortIntro(profileData.shortIntro || "");
      setDetailIntro(profileData.detailIntro || "");
      const initialServiceAreas = profileData.serviceAreas?.map((area: { region: string }) => area.region);
      setSelectedRegions(initialServiceAreas || []);
    }
  }, [isEditMode, initialData]);

  const uploadImageFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await cookieFetch<{ imageUrl: string }>("/profile/image", {
      method: "POST",
      body: formData
    });

    if (response?.imageUrl) return response.imageUrl;
    throw new Error("이미지 업로드 실패");
  };

  const handleImageChange = async (file: File | null, previewUrl: string | null) => {
    setImageError(null);
    setProfileImageFile(file);
    if (file) {
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadImageFile(file);
        setProfileImagePreview(uploadedUrl);
      } catch (error: any) {
        setImageError(error.message || "이미지 업로드 중 오류");
        setProfileImageFile(null);
        setProfileImagePreview(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      setProfileImagePreview(previewUrl);
    }
  };

  const handleImageError = (error: string | null) => {
    setImageError(error);
    if (error) {
      setProfileImageFile(null);
      setProfileImagePreview(null);
    }
  };

  const isNicknameValid = useMemo(() => nickname.trim().length > 0, [nickname]);
  const isCareerValid = useMemo(() => /^[0-9]+$/.test(career), [career]);
  const isIntroValid = useMemo(() => shortIntro.trim().length >= 8, [shortIntro]);
  const isDescriptionValid = useMemo(() => detailIntro.trim().length >= 10, [detailIntro]);
  const isServicesValid = useMemo(() => selectedMoveTypes.length > 0, [selectedMoveTypes]);
  const isRegionsValid = useMemo(() => selectedRegions.length > 0, [selectedRegions]);

  const isFormValid =
    isNicknameValid && isCareerValid && isIntroValid && isDescriptionValid && isServicesValid && isRegionsValid;

  // 이탈 방지
  const isDirty = useMemo(() => {
    if (isSubmitting || isUploading) return false; // 전송/업로드 중엔 경고 끄기
    if (isEditMode && initial) {
      const now = {
        profileImage: profileImagePreview || null,
        moveType: selectedMoveTypes.slice().sort(),
        nickname: nickname,
        career: career,
        shortIntro,
        detailIntro,
        regions: selectedRegions.slice().sort()
      };
      return (
        now.profileImage !== initial.profileImage ||
        JSON.stringify(now.moveType) !== JSON.stringify(initial.moveType) ||
        now.nickname !== initial.nickname ||
        now.career !== initial.career ||
        now.shortIntro !== initial.shortIntro ||
        now.detailIntro !== initial.detailIntro ||
        JSON.stringify(now.regions) !== JSON.stringify(initial.regions)
      );
    }
    // 생성 모드: 아무 값이라도 채워졌으면 dirty
    return (
      !!profileImagePreview ||
      nickname.trim().length > 0 ||
      career.trim().length > 0 ||
      shortIntro.trim().length > 0 ||
      detailIntro.trim().length > 0 ||
      selectedMoveTypes.length > 0 ||
      selectedRegions.length > 0
    );
  }, [
    isEditMode,
    initial,
    isSubmitting,
    isUploading,
    profileImagePreview,
    nickname,
    career,
    shortIntro,
    detailIntro,
    selectedMoveTypes,
    selectedRegions
  ]);

  useUnsavedChangesGuard({
    when: guardEnabled && isDirty,
    message: t1("leaveWarning"),
    interceptLinks: true,
    interceptBeforeUnload: true,
    patchRouterMethods: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const payload = {
      nickname,
      career: Number(career),
      shortIntro,
      detailIntro,
      moveType: selectedMoveTypes,
      profileImage: profileImagePreview || undefined,
      serviceAreas: selectedRegions.map((label) => ({ region: label }))
    };

    try {
      const endpoint = "/profile/driver";
      const method = isEditMode ? "PATCH" : "POST";

      setGuardEnabled(false);

      const response = await cookieFetch<{ accessToken?: string }>(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      if (response?.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      ToastModal(t(isEditMode ? "success.edit" : "success.create"));
      router.push("/");
    } catch (error: any) {
      setGuardEnabled(true);
      console.error(error);
      if (error?.message === "이미 사용 중인 닉네임입니다.") {
        ToastModal(error.message); // 백엔드 메시지 그대로
      } else {
        ToastModal(t(isEditMode ? "error.edit" : "error.create"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main role="main">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-[23px] box-border flex w-[375px] max-w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-6 pt-8 pb-10 md:w-[375px] lg:w-[1200px] lg:px-10"
      >
        {/* Header */}
        <header className="flex flex-col gap-8">
          <h1 className="text-[32px] font-semibold">
            {t("header")} {isEditMode ? t("edit") : t("register")}
          </h1>
          {!isEditMode && <p className="text-black-200 text-xl">{t("registerGuide")}</p>}
        </header>

        <div className="bg-line-100 h-px" />

        {/* Content */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          {/* Left */}
          <div className="flex w-full flex-col gap-8">
            <div className="flex h-[196px] flex-col gap-2">
              <label htmlFor="profileImage" className="text-xl font-semibold">
                {t("profileImage")}
              </label>
              <ImageUploader
                label=""
                id="profileImage"
                maxSizeMB={5}
                onImageChange={handleImageChange}
                onImageError={handleImageError}
                previewUrl={profileImagePreview}
                isSubmitting={isSubmitting || isUploading}
                isRequired={false}
                error={imageError}
                allowRemove
                aria-label="프로필 이미지 업로더"
              />
            </div>

            <div className="bg-line-100 h-px" />
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("nickname")} <span className="text-red-500">*</span>
              </label>
              <TextField value={nickname} onChange={setNickname} placeholder={t("nicknamePlaceholder")} required />
              {!isNicknameValid && nickname.length > 0 && (
                <p className="text-base text-rose-500">{t("nicknameError")}</p>
              )}
            </div>

            <div className="bg-line-100 h-px" />
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("career")} <span className="text-red-500">*</span>
              </label>
              <TextField value={career} onChange={setCareer} placeholder={t("careerPlaceholder")} required />
              {!isCareerValid && career.length > 0 && <p className="text-base text-rose-500">{t("careerError")}</p>}
            </div>

            <div className="bg-line-100 h-px" />
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("introOneLine")} <span className="text-red-500">*</span>
              </label>
              <TextField value={shortIntro} onChange={setShortIntro} placeholder={t("introPlaceholder")} required />
              {!isIntroValid && shortIntro.length > 0 && <p className="text-base text-rose-500">{t("introError")}</p>}
            </div>
          </div>

          <div className="bg-line-100 my-6 h-px" />

          {/* Right */}
          <div className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("description")} <span className="text-red-500">*</span>
              </label>
              <InputText
                aria-label="소개 입력"
                value={detailIntro}
                onChange={setDetailIntro}
                setInputValid={() => {}}
              />
            </div>

            <div className="bg-line-100 h-px" />
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("services")} <span className="text-red-500">*</span>
              </label>
              {!isServicesValid && <p className="text-base text-rose-500">{t("servicesError")}</p>}
              <SelectService
                aria-label="이사 서비스 선택"
                services={selectedMoveTypes}
                setServices={setSelectedMoveTypes}
              />
            </div>

            <div className="bg-line-100 h-px" />
            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold">
                {t("serviceArea")} <span className="text-red-500">*</span>
              </label>
              {!isRegionsValid && <p className="text-base text-rose-500">{t("regionError")}</p>}
              <SelectRegion
                aria-label="서비스 지역 선택"
                currentAreas={selectedRegions}
                setCurrentAreas={setSelectedRegions}
                type="driver"
              />
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <nav aria-label="Form actions" className="mt-6 flex justify-end">
          {isEditMode ? (
            <div className="flex w-full flex-col gap-4 md:gap-[20px] lg:w-[500px] lg:flex-row">
              <Button
                text={t("cancel")}
                type="gray"
                buttonType="button"
                className="h-15 w-full rounded-2xl bg-gray-200 text-lg font-semibold text-gray-700 md:w-full"
                onClick={() => {
                  setGuardEnabled(false);
                  router.push("/driver/my-page");
                }}
              />
              <Button
                text={isSubmitting ? t("submitting") : t("edit")}
                type="orange"
                className="h-15 w-full rounded-2xl text-lg font-semibold md:w-[full]"
                isDisabled={!isFormValid || isSubmitting || isUploading}
              />
            </div>
          ) : (
            <div className="flex w-full justify-end">
              <Button
                text={isSubmitting ? t("submitting") : t("start")}
                type="orange"
                className="h-15 w-[500px] rounded-2xl text-lg font-semibold"
                isDisabled={!isFormValid || isSubmitting || isUploading}
              />
            </div>
          )}
        </nav>
      </form>
    </main>
  );
}
