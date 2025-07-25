"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import { moveTypes, regions, regionMap } from "@/constant/profile";
import ImageUploader from "@/components/profile/ImageUploader";

interface CustomerProfileFormProps {
  isEditMode: boolean;
  initialData?: any;
}

export default function CustomerProfileForm({ isEditMode, initialData }: CustomerProfileFormProps) {
  const router = useRouter();

  // 실제 업로드할 파일
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  // 서버에 저장된 URL 혹은 blob URL로 미리보기용
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  // 업로드 상태
  const [isUploading, setIsUploading] = useState(false);

  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [currentArea, setCurrentArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && initialData) {
      const profileData = initialData.customer;
      if (profileData) {
        setProfileImagePreview(profileData.profileImage || null);
        setSelectedMoveTypes(profileData.moveType || []);
        setCurrentArea(profileData.currentArea || "");
      }
      setName(initialData.name || "");
      setPhone(initialData.phone || "");
    }
  }, [isEditMode, initialData]);

  // 서버에 이미지 업로드 함수 예시 (1.5초 지연 + blob URL 반환 시뮬레이션)
  async function uploadImageFile(file: File): Promise<string> {
    // 실제 서버 업로드 로직으로 대체
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file); // 실제론 서버 URL 받아야 함
        resolve(url);
      }, 1500);
    });
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
        setImageError(error.message || "이미지 업로드 중 오류가 발생했습니다.");
        setProfileImagePreview(null);
        setProfileImageFile(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      // 파일 없으면 기존 미리보기 유지 또는 초기화
      setProfileImagePreview(previewUrl);
    }
  };

  const handleImageError = (error: string) => {
    setImageError(error);
    setProfileImagePreview(null);
    setProfileImageFile(null);
  };

  const toggleMoveType = (type: string) => {
    setSelectedMoveTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setImageError(null);

    if (selectedMoveTypes.length === 0) {
      alert("요청 서비스를 하나 이상 선택해주세요.");
      setIsSubmitting(false);
      return;
    }
    if (!currentArea) {
      alert("현재 지역을 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    let payload: any = {
      moveType: selectedMoveTypes,
      profileImage: profileImagePreview || undefined,
      currentArea
    };

    if (isEditMode) {
      payload.name = name;
      payload.phone = phone;
    }

    try {
      const endpoint = "/profile/customer";
      const method = isEditMode ? "PATCH" : "POST";

      const response = await cookieFetch<{ accessToken?: string }>(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      if (response && response.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      alert(`프로필 ${isEditMode ? "수정" : "생성"} 완료!`);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.message || (error?.response?.data?.message ?? `프로필 ${isEditMode ? "수정" : "생성"} 실패`);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageTitle = `고객 프로필 ${isEditMode ? "수정" : "생성"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-bold">{pageTitle}</h2>

      {isEditMode && (
        <>
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
          />
          <label>연락처</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border p-2"
          />
        </>
      )}

      <label>프로필 이미지 (선택)</label>
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
        allowRemove={true}
      />
      {isUploading && <p className="text-sm text-gray-500">이미지 업로드 중...</p>}

      <label>요청 서비스 (중복 선택 가능)</label>
      <div className="flex flex-wrap gap-2">
        {moveTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => toggleMoveType(type.value)}
            className={`rounded border px-3 py-1 ${
              selectedMoveTypes.includes(type.value) ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <label>현재 지역</label>
      <select
        value={currentArea}
        onChange={(e) => setCurrentArea(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">지역 선택</option>
        {regions.map((region) => (
          <option key={region} value={regionMap[region]}>
            {region}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isSubmitting || isUploading}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {isSubmitting ? "제출 중..." : "제출"}
      </button>
    </form>
  );
}
