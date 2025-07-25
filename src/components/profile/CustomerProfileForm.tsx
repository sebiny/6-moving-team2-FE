"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import SelectRegion from "./SelectRegion";
import SelectService from "./SelectService";
import Button from "../Button";

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
  const [currentArea, setCurrentArea] = useState<string>("");
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

  const handleImageError = (error: string | null) => {
    setImageError(error);
    if (error) {
      setProfileImageFile(null);
      setProfileImagePreview(null);
    }
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
      currentArea: currentArea
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

  const pageTitle = `프로필 ${isEditMode ? "수정" : "등록"}`;

  return (
    <form className="w-[327px] max-w-160 space-y-4 p-6 lg:w-full">
      <div>
        <h2 className="text-lg font-bold lg:text-[32px] lg:font-semibold">{pageTitle}</h2>
        {!isEditMode && (
          <p className="text-black-100 my-4 text-xs lg:my-7 lg:text-[16px]">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
        )}
        <div className="border-line-100 border-b"></div>
      </div>

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
      <div className="border-line-100 my-5 border-b lg:my-8"></div>
      <div>
        <p className="text-black-300 font-semibold lg:text-xl">이용 서비스</p>
        <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">
          {isEditMode
            ? "*견적 요청 시 이용 서비스를 선택할 수 있어요."
            : "*이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!"}
        </p>
        <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
      </div>
      <div className="border-line-100 my-5 border-b lg:my-5"></div>
      <div>
        <p className="text-black-300 font-semibold lg:text-xl">내가 사는 지역</p>
        <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">
          {isEditMode ? "견적 요청 시 지역을 설정할 수 있어요." : "*내가 사는 지역은 언제든 수정 가능해요!"}
        </p>
        <SelectRegion setCurrentArea={setCurrentArea} currentArea={currentArea} type="customer" />
      </div>

      <Button
        type="orange"
        text={isSubmitting ? "제출 중..." : "제출"}
        isDisabled={isSubmitting || isUploading}
        className="mt-15 w-full rounded bg-blue-600 py-2 text-white"
        onClick={handleSubmit}
      ></Button>
    </form>
  );
}
