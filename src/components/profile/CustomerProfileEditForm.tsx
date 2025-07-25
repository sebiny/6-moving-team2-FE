"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import SelectRegion from "./SelectRegion";
import SelectService from "./SelectService";

interface CustomerProfileEditFormProps {
  initialData?: any;
}

export default function CustomerProfileEditForm({ initialData }: CustomerProfileEditFormProps) {
  const router = useRouter();

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [currentArea, setCurrentArea] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const profileData = initialData.customer;
      if (profileData) {
        setProfileImagePreview(profileData.profileImage || null);
        setSelectedMoveTypes(profileData.moveType || []);
        setCurrentArea(profileData.currentArea || "");
      }
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
    }
  }, [initialData]);

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
        setImageError(error.message || "이미지 업로드 실패");
        setProfileImageFile(null);
        setProfileImagePreview(null);
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

    if (selectedMoveTypes.length === 0 || !currentArea) {
      alert("제공 서비스와 지역을 모두 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    const payload: any = {
      name,
      phone,
      profileImage: profileImagePreview || undefined,
      moveType: selectedMoveTypes,
      currentArea
    };

    if (currentPassword || newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        alert("새 비밀번호와 확인이 일치하지 않습니다.");
        setIsSubmitting(false);
        return;
      }
      payload.password = {
        currentPassword,
        newPassword
      };
    }

    try {
      const response = await cookieFetch<{ accessToken?: string }>("/profile/customer", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });

      if (response?.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      alert("프로필 수정 완료!");
      router.push("/");
    } catch (error: any) {
      alert(error?.message || "프로필 제출 중 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex w-full max-w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-6 py-8 md:flex-row"
    >
      {/* 왼쪽: 텍스트 입력 필드 */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        <h2 className="text-2xl font-semibold">고객 프로필 수정</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">이름</label>
          <TextField value={name} onChange={setName} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">이메일</label>
          <TextField value={email} onChange={setEmail} disabled />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">전화번호</label>
          <TextField value={phone} onChange={setPhone} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">현재 비밀번호</label>
          <TextField value={currentPassword} onChange={setCurrentPassword} type="password" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">새 비밀번호</label>
          <TextField value={newPassword} onChange={setNewPassword} type="password" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">새 비밀번호 확인</label>
          <TextField value={confirmPassword} onChange={setConfirmPassword} type="password" />
        </div>
      </div>

      {/* 오른쪽: 프로필 이미지, 서비스, 지역 선택 */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        <div className="w-full self-start">
          <ImageUploader
            id="profileImage"
            label="프로필 이미지"
            maxSizeMB={5}
            onImageChange={handleImageChange}
            previewUrl={profileImagePreview}
            isSubmitting={isSubmitting || isUploading}
            isRequired={false}
            error={imageError}
            allowRemove
          />
        </div>

        <div>
          <label className="text-xl font-semibold">이용 서비스</label>
          <p className="mb-2 text-sm text-gray-400">* 견적 요청 시 이용 서비스를 선택할 수 있어요.</p>
          <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
        </div>

        <div>
          <label className="text-xl font-semibold">내가 사는 지역</label>
          <p className="mb-2 text-sm text-gray-400">* 견적 요청 시 이용 서비스를 선택할 수 있어요.</p>
          <SelectRegion setCurrentArea={setCurrentArea} currentArea={currentArea} type="customer" />
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded border border-gray-300 bg-white py-3 text-base font-semibold text-gray-700"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1 rounded bg-orange-500 py-3 text-base font-semibold text-white disabled:opacity-50"
          >
            수정하기
          </button>
        </div>
      </div>
    </form>
  );
}
