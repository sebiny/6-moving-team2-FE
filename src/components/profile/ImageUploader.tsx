"use client";

import Image from "next/image";
import { useRef, useEffect, FC } from "react";

interface ImageUploaderProps {
  id: string;
  label: string;
  maxSizeMB: number;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  onImageError: (error: string | null) => void;
  previewUrl: string | null;
  isSubmitting?: boolean;
  isRequired?: boolean;
  error?: string | null;
  existingImageUrl?: string;
  allowRemove?: boolean;
}

function isValidSrc(src: string): boolean {
  return (
    typeof src === "string" &&
    (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("blob:"))
  );
}

const ImageUploader: FC<ImageUploaderProps> = ({
  id,
  label,
  maxSizeMB,
  onImageChange,
  onImageError,
  previewUrl,
  isSubmitting = false,
  isRequired = false,
  error,
  existingImageUrl = "",
  allowRemove = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        onImageError(`이미지 파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      const newPreviewUrl = URL.createObjectURL(file);
      onImageChange(file, newPreviewUrl);
      onImageError(null);
    } else {
      onImageChange(null, existingImageUrl || null);
      if (error) onImageError(null);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const currentPreview = previewUrl;
    return () => {
      if (currentPreview && currentPreview.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreview);
      }
    };
  }, [previewUrl]);

  const handleClickImage = () => {
    if (!isSubmitting) {
      fileInputRef.current?.click();
    }
  };
  return (
    <div className="mb-6">
      <label className="mb-2 block text-lg leading-[26px] font-bold text-gray-600">{label}</label>
      <div className="flex h-auto w-full items-start gap-4 md:w-[588px]">
        <div className="relative h-[160px] w-[160px]">
          {previewUrl ? (
            <div
              onClick={handleClickImage}
              className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg"
            >
              <img
                src={isValidSrc(previewUrl) ? previewUrl : "/default.png"}
                alt="미리보기"
                className="h-full w-full object-cover"
                onError={(e) => {
                  console.warn(`이미지 미리보기 로드 실패: ${previewUrl}`);
                  onImageError("미리보기 로드에 실패했습니다.");
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ) : (
            <label
              htmlFor={id}
              className={`bg-background-200 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Image src="/assets/icons/ic_profile_upload.svg" alt="이미지 업로드" width={40} height={40} />
            </label>
          )}

          <input
            id={id}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            required={isRequired && !previewUrl}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* 이미지 유효성용 숨김 input */}
      <input
        type="text"
        value={previewUrl ? "filled" : ""}
        required={isRequired}
        className="hidden"
        readOnly
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};

export default ImageUploader;
