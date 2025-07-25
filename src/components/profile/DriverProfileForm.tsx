"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import { moveTypes, regions, regionMap, regionMapReverse } from "@/constant/profile";
import ImageUploader from "@/components/profile/ImageUploader";

interface DriverProfileFormProps {
  isEditMode: boolean;
  initialData?: any;
}

export default function DriverProfileForm({ isEditMode, initialData }: DriverProfileFormProps) {
  const router = useRouter();

  // 실제 업로드할 파일
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  // 서버에 저장된 URL 혹은 blob URL로 미리보기용
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  // 업로드 상태
  const [isUploading, setIsUploading] = useState(false);

  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");
  const [career, setCareer] = useState(0);
  const [shortIntro, setShortIntro] = useState("");
  const [detailIntro, setDetailIntro] = useState("");
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && initialData?.driver) {
      const profileData = initialData.driver;
      setProfileImagePreview(profileData.profileImage || null);
      setSelectedMoveTypes(profileData.moveType || []);
      setNickname(profileData.nickname || "");
      setCareer(profileData.career || 0);
      setShortIntro(profileData.shortIntro || "");
      setDetailIntro(profileData.detailIntro || "");
      const initialServiceAreas = profileData.serviceAreas
        ?.map((area: { region: string }) => regionMapReverse[area.region])
        .filter(Boolean);
      setServiceAreas(initialServiceAreas || []);
    }
  }, [isEditMode, initialData]);

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
      console.error("이미지 업로드 실패:", error);
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

  const toggleMoveType = (type: string) => {
    setSelectedMoveTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const toggleRegion = (region: string) => {
    setServiceAreas((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setImageError(null);

    if (!nickname.trim()) {
      alert("별명을 입력해주세요.");
      setIsSubmitting(false);
      return;
    }
    if (career < 0) {
      alert("경력은 0 이상의 숫자여야 합니다.");
      setIsSubmitting(false);
      return;
    }
    if (serviceAreas.length === 0) {
      alert("서비스 가능 지역을 하나 이상 선택해주세요.");
      setIsSubmitting(false);
      return;
    }
    if (selectedMoveTypes.length === 0) {
      alert("제공 서비스를 하나 이상 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    interface DriverProfilePayload {
      nickname: string;
      career: number;
      shortIntro: string;
      detailIntro: string;
      moveType: string[];
      profileImage?: string;
      serviceAreas: { region: string }[];
    }

    const payload: DriverProfilePayload = {
      nickname,
      career,
      shortIntro,
      detailIntro,
      moveType: selectedMoveTypes,
      profileImage: profileImagePreview || undefined,
      serviceAreas: serviceAreas.map((label) => ({ region: regionMap[label] }))
    };

    try {
      const endpoint = "/profile/driver";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-bold">{`기사 프로필 ${isEditMode ? "수정" : "생성"}`}</h2>

      <label>별명</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full rounded border p-2"
      />

      <label>경력 (년)</label>
      <input
        type="number"
        value={career}
        onChange={(e) => setCareer(Number(e.target.value))}
        className="w-full rounded border p-2"
        min={0}
      />

      <label>한 줄 소개</label>
      <input
        type="text"
        value={shortIntro}
        onChange={(e) => setShortIntro(e.target.value)}
        className="w-full rounded border p-2"
      />

      <label>상세 소개</label>
      <textarea
        value={detailIntro}
        onChange={(e) => setDetailIntro(e.target.value)}
        className="w-full rounded border p-2"
      />

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

      <label>제공 서비스 (중복 선택 가능)</label>
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

      <label>서비스 가능 지역</label>
      <div className="flex flex-wrap gap-2">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => toggleRegion(region)}
            className={`rounded border px-3 py-1 ${
              serviceAreas.includes(region) ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

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
