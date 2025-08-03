"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import { regionMap, regionMapReverse } from "@/constant/profile";
import ImageUploader from "@/components/profile/ImageUploader";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import InputText from "@/components/InputText";
import SelectService from "@/components/profile/SelectService"; // 고객 컴포넌트 import
import SelectRegion from "@/components/profile/SelectRegion"; // 고객 컴포넌트 import
import { useTranslations } from "next-intl";

interface DriverProfileFormProps {
  isEditMode: boolean;
  initialData?: any;
}

export default function DriverProfileForm({ isEditMode, initialData }: DriverProfileFormProps) {
  const router = useRouter();
  const t = useTranslations("DriverProfileEdit");
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

      const response = await cookieFetch<{ accessToken?: string }>(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      if (response?.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      alert(`프로필 ${isEditMode ? "수정" : "등록"} 완료!`);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      alert("프로필 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-[23px] box-border flex w-[375px] max-w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-6 pt-8 pb-10 md:w-[375px] lg:w-[1200px] lg:px-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-8">
        <h1 className="text-[32px] font-semibold">
          {t("header")} {isEditMode ? t("edit") : t("register")}
        </h1>
        {!isEditMode && <p className="text-black-200 text-xl">{t("registerGuide")}</p>}
      </div>

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
            />
          </div>

          <div className="bg-line-100 h-px" />
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              {t("nickname")} <span className="text-red-500">*</span>
            </label>
            <TextField value={nickname} onChange={setNickname} placeholder={t("nicknamePlaceholder")} required />
            {!isNicknameValid && nickname.length > 0 && <p className="text-base text-rose-500">{t("nicknameError")}</p>}
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
            <InputText value={detailIntro} onChange={setDetailIntro} setInputValid={() => {}} />
            {!isDescriptionValid && detailIntro.length > 0 && (
              <p className="text-base text-rose-500">{t("descriptionError")}</p>
            )}
          </div>

          <div className="bg-line-100 h-px" />
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              {t("services")} <span className="text-red-500">*</span>
            </label>
            {!isServicesValid && <p className="text-base text-rose-500">{t("servicesError")}</p>}
            <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
          </div>

          <div className="bg-line-100 h-px" />
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              {t("serviceArea")} <span className="text-red-500">*</span>
            </label>
            {!isRegionsValid && <p className="text-base text-rose-500">{t("regionError")}</p>}
            <SelectRegion currentAreas={selectedRegions} setCurrentAreas={setSelectedRegions} type="driver" />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex justify-end">
        {isEditMode ? (
          <div className="flex w-full flex-col gap-4 md:gap-[20px] lg:w-[500px] lg:flex-row">
            <Button
              text={t("cancel")}
              type="gray"
              buttonType="button"
              className="h-15 w-full rounded-2xl bg-gray-200 text-lg font-semibold text-gray-700 md:w-full"
              onClick={() => {
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
      </div>
    </form>
  );
}
