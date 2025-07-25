"use client";

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

  const handleRemoveImage = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    onImageChange(null, null);
    onImageError(null);
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

  return (
    <div className="mb-6">
      <label className="mb-2 block text-lg leading-[26px] font-bold text-gray-600">
        {label}{" "}
        {isRequired ? <span className="text-red-500">*</span> : <span className="text-sm text-gray-500">(선택)</span>}{" "}
        (최대 {maxSizeMB}MB)
      </label>
      <div className="flex h-auto w-full items-start gap-4 md:w-[588px]">
        {/* 업로드 박스 */}
        <label
          htmlFor={id}
          className={`flex h-[282px] w-[282px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-colors hover:bg-gray-100 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <svg
            className="mb-2 h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            ></path>
          </svg>
          <span className="text-sm text-gray-500">{previewUrl ? "이미지 변경" : "이미지 등록"}</span>
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
        </label>

        {/* 미리보기 */}
        <div className="relative flex h-[282px] w-[282px] items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {previewUrl ? (
            <>
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
              {allowRemove && !isSubmitting && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-opacity-50 hover:bg-opacity-75 absolute top-2 right-2 rounded-full bg-black p-1 text-xs leading-none text-white"
                  aria-label="이미지 제거"
                >
                  &times;
                </button>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-400">미리보기</span>
          )}
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
