"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import ImageUploader from "@/components/profile/ImageUploader";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import SelectRegion from "./SelectRegion";
import SelectService from "./SelectService";
import { useTranslations } from "next-intl";
import { ToastModal } from "../common-modal/ToastModal";

interface CustomerProfileEditFormProps {
  initialData?: any;
}

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

export default function CustomerProfileEditForm({ initialData }: CustomerProfileEditFormProps) {
  const router = useRouter();
  const t = useTranslations("Profile");

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

  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null); // 새 비밀번호 확인에러 상태 추가
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

  // newPassword가 바뀔 때마다 유효성 검사
  useEffect(() => {
    if (newPassword && !PASSWORD_REGEX.test(newPassword)) {
      setNewPasswordError(t("error.password.invalid"));
    } else {
      setNewPasswordError(null);
    }
    // 비밀번호 확인 불일치 시 에러 처리 추가
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError(t("error.password.confirm"));
    } else {
      setConfirmPasswordError(null);
    }
  }, [newPassword, confirmPassword]);

  const uploadImageFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await cookieFetch<{ imageUrl: string }>("/profile/image", {
      method: "POST",
      body: formData
    });

    if (response?.imageUrl) return response.imageUrl;
    throw new Error(t("error.upload"));
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
        setImageError(error.message || t("error.upload"));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setImageError(null);

    if (selectedMoveTypes.length === 0 || !currentArea) {
      alert("제공 서비스와 지역을 모두 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    // 새 비밀번호가 있으면 유효성 및 확인 검사
    if (newPassword) {
      if (!PASSWORD_REGEX.test(newPassword)) {
        // alert(t("error.password.invalid")); // alert 주석 처리 후 필드 아래 에러메세지로 보이도록 수정했습니다.
        setIsSubmitting(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        // alert(t("error.password.confirm"));
        setIsSubmitting(false);
        return;
      }
    }

    const payload: any = {
      name,
      phone,
      profileImage: profileImagePreview || undefined,
      moveType: selectedMoveTypes,
      currentArea
    };

    if (currentPassword || newPassword || confirmPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
      payload.passwordConfirmation = confirmPassword;
    }

    try {
      const response = await cookieFetch<{ accessToken?: string }>("/profile/customer", {
        method: "PATCH",
        body: JSON.stringify(payload)
      });

      if (response?.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      ToastModal(t("success.edit"));
      router.push("/");
    } catch (error: any) {
      ToastModal(error?.message || t("error.edit"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-[23px] box-border flex w-[372px] max-w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-6 pt-8 pb-10 md:w-[372px] lg:w-[1200px] lg:px-10"
    >
      {/* 상단 제목 */}
      <div className="flex flex-col gap-8">
        <h1 className="text-[32px] font-semibold">{t("editTitle")}</h1>
      </div>

      {/* 좌우 레이아웃 */}
      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        {/* 왼쪽 */}
        <div className="flex w-full flex-col lg:max-w-[500px]">
          {/* 이름 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("name")}</label>
            <TextField value={name} onChange={setName} required mdHeight="64" />
          </div>

          {/* 이메일 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("email")}</label>
            <TextField value={email} onChange={setEmail} disabled mdHeight="54" />
          </div>

          {/* 전화번호 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("phone")}</label>
            <TextField value={phone} onChange={setPhone} required mdHeight="54" />
          </div>
          <div className="border-line-100 my-2.5 border-t" />

          {/* 현재 비밀번호 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("currentPassword")}</label>
            <TextField
              placeholder={t("placeholder.currentPassword")}
              value={currentPassword}
              onChange={setCurrentPassword}
              type="password"
              mdHeight="54"
            />
          </div>
          <div className="border-line-100 my-2.5 border-t" />

          {/* 새 비밀번호 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("newPassword")}</label>
            <TextField
              placeholder={t("placeholder.newPassword")}
              value={newPassword}
              onChange={setNewPassword}
              type="password"
              mdHeight="54"
            />
            {newPasswordError && <p className="mt-1 text-sm text-red-500">{newPasswordError}</p>}
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="mb-5 flex flex-col pt-5">
            <label className="mb-5 text-xl font-semibold">{t("confirmPassword")}</label>
            <TextField
              placeholder={t("placeholder.confirmPassword")}
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
              mdHeight="54"
            />
            {confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>}
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex w-full flex-col gap-8 lg:max-w-[500px]">
          {/* 프로필 이미지 */}
          <div className="flex h-[196px] flex-col gap-2">
            <label htmlFor="profileImage" className="text-xl font-semibold">
              {t("profileImage")}
            </label>
            <ImageUploader
              id="profileImage"
              label=""
              maxSizeMB={5}
              onImageChange={handleImageChange}
              previewUrl={profileImagePreview}
              isSubmitting={isSubmitting || isUploading}
              isRequired={false}
              error={imageError}
              allowRemove
              onImageError={handleImageError}
            />
          </div>
          <div className="border-line-100 my-2.5 border-t" />

          {/* 이용 서비스 */}
          <div className="flex flex-col gap-5">
            <label className="text-xl font-semibold">{t("serviceTitle")}</label>
            <p className="text-sm text-gray-400">{t("serviceEditDescription")}</p>
            <SelectService services={selectedMoveTypes} setServices={setSelectedMoveTypes} />
          </div>
          <div className="border-line-100 my-2.5 border-t" />

          {/* 내가 사는 지역 */}
          <div className="flex flex-col gap-5">
            <label className="text-xl font-semibold">{t("regionTitle")}</label>
            <p className="text-sm text-gray-400">{t("regionEditDescription")}</p>
            <SelectRegion setCurrentArea={setCurrentArea} currentArea={currentArea} type="customer" />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-6 flex justify-end">
        <div className="flex w-full flex-col gap-4 md:gap-[20px] lg:w-[500px] lg:flex-row">
          <Button
            text={t("cancel")}
            type="gray"
            buttonType="button" // ← 폼 제출 막기 위해
            className="h-15 w-full rounded-2xl bg-gray-200 text-lg font-semibold text-gray-700 md:w-full"
            onClick={() => router.back()}
          />
          <Button
            text={t("editSubmit")}
            type="orange"
            className="h-15 w-full rounded-2xl text-lg font-semibold md:w-full"
            isDisabled={isSubmitting || isUploading}
          />
        </div>
      </div>
    </form>
  );
}
