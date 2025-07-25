"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import SelectRegion from "./SelectRegion";
import SelectService from "./SelectService";
import Button from "../Button";

export default function CustomerProfileCreateForm() {
  const router = useRouter();

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [currentArea, setCurrentArea] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

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
      throw new Error("이미지 업로드 후 URL을 받지 못했습니다.");
    } catch (error) {
      throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
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
        setImageError(error.message || "이미지 업로드 중 오류가 발생했습니다.");
        setProfileImagePreview(null);
        setProfileImageFile(null);
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

      alert("프로필 생성 완료!");
      router.push("/");
    } catch (error: any) {
      alert(error.message || "프로필 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-[327px] max-w-160 space-y-4 p-6 lg:w-full" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg font-bold lg:text-[32px]">프로필 등록</h2>
        <p className="text-black-100 my-4 text-xs lg:my-7 lg:text-[16px]">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </p>
        <div className="border-line-100 border-b"></div>
      </div>

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

      <div>
        <p className="text-black-300 font-semibold lg:text-xl">이용 서비스</p>
        <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">
          * 이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
        </p>
        <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
      </div>

      <div>
        <p className="text-black-300 font-semibold lg:text-xl">내가 사는 지역</p>
        <p className="mt-2 mb-6 text-xs text-gray-400 lg:text-[16px]">* 내가 사는 지역은 언제든 수정 가능해요!</p>
        <SelectRegion setCurrentArea={setCurrentArea} currentArea={currentArea} type="customer" />
      </div>

      <Button
        type="orange"
        text={isSubmitting ? "로딩 중..." : "시작하기"}
        isDisabled={isSubmitting || isUploading}
        className="mt-15 w-full rounded bg-blue-600 py-2 text-white"
      />
    </form>
  );
}
