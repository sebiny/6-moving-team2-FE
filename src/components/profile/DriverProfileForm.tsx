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

interface DriverProfileFormProps {
  isEditMode: boolean;
  initialData?: any;
}

export default function DriverProfileForm({ isEditMode, initialData }: DriverProfileFormProps) {
  const router = useRouter();

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
      const initialServiceAreas = profileData.serviceAreas
        ?.map((area: { region: string }) => regionMapReverse[area.region])
        .filter(Boolean);
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
      className="mx-auto mt-[23px] flex w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-10 pt-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-8">
        <h1 className="text-[32px] font-semibold">기사님 프로필 {isEditMode ? "수정" : "등록"}</h1>
        <p className="text-black-200 text-xl">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
      </div>
      <div className="bg-line-100 h-px" />

      <div className="flex flex-col justify-between lg:flex-row">
        {/* 왼쪽 */}
        <div className="flex w-[500px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <ImageUploader
              id="profileImage"
              label="프로필 이미지"
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
              별명 <span className="text-red-500">*</span>
            </label>
            <TextField
              value={nickname}
              onChange={setNickname}
              placeholder="사이트에 노출될 별명을 입력해 주세요"
              required
            />
            {!isNicknameValid && nickname.length > 0 && <p className="text-base text-rose-500">별명을 입력해주세요.</p>}
          </div>

          {/* 경력 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              경력 <span className="text-red-500">*</span>
            </label>
            <TextField value={career} onChange={setCareer} placeholder="기사님의 경력을 입력해 주세요" required />
            {!isCareerValid && career.length > 0 && <p className="text-base text-rose-500">숫자만 입력해주세요.</p>}
          </div>
          {/* 한 줄 소개 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              한 줄 소개 <span className="text-red-500">*</span>
            </label>
            <TextField value={shortIntro} onChange={setShortIntro} placeholder="한 줄 소개를 입력해 주세요" required />
            {!isIntroValid && shortIntro.length > 0 && (
              <p className="text-base text-rose-500">8자 이상 입력해주세요.</p>
            )}
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex w-[500px] flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              상세 설명 <span className="text-red-500">*</span>
            </label>
            <InputText value={detailIntro} onChange={setDetailIntro} setInputValid={() => {}} />
            {!isDescriptionValid && detailIntro.length > 0 && (
              <p className="text-base text-rose-500">10자 이상 입력해주세요.</p>
            )}
          </div>
          <div className="bg-line-100 h-px" />

          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              제공 서비스 <span className="text-red-500">*</span>
            </label>
            {!isServicesValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>}

            <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
          </div>
          <div className="bg-line-100 h-px" />

          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              서비스 가능 지역 <span className="text-red-500">*</span>
            </label>
            {!isRegionsValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>}

            <SelectRegion currentAreas={selectedRegions} setCurrentAreas={setSelectedRegions} type="driver" />
          </div>
          <div className="flex justify-end">
            <Button
              text={isSubmitting ? "제출 중..." : "시작하기"}
              type="orange"
              className="h-15 w-[500px] rounded-2xl text-lg font-semibold"
              isDisabled={!isFormValid || isSubmitting || isUploading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
