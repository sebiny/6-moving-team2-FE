"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch } from "@/lib/FetchClient";

const moveTypes = [
  { value: "SMALL", label: "소형이사" },
  { value: "HOME", label: "가정이사" },
  { value: "OFFICE", label: "사무실이사" }
];

const regions = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "세종",
  "대전",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주"
];

// 한글 지역명 → enum RegionType 매핑
const regionMap: Record<string, string> = {
  서울: "SEOUL",
  부산: "BUSAN",
  대구: "DAEGU",
  인천: "INCHEON",
  광주: "GWANGJU",
  대전: "DAEJEON",
  울산: "ULSAN",
  세종: "SEJONG",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  전북: "JEONBUK",
  전남: "JEONNAM",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  제주: "JEJU"
};

export default function CustomerProfileForm() {
  const router = useRouter();
  const [moveType, setMoveType] = useState("HOME");
  const [currentArea, setCurrentArea] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentArea) {
      alert("지역을 선택해주세요.");
      return;
    }

    try {
      await cookieFetch("/profile/customer", {
        method: "POST",
        body: JSON.stringify({
          moveType,
          currentArea: regionMap[currentArea],
          profileImage: profileImage || undefined
        })
      });

      alert("프로필 생성 완료!");
      router.push("/");
    } catch (error: any) {
      console.error(error);

      const message = error?.message || (error?.response?.data?.message ?? "프로필 생성 실패");

      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-bold">고객 프로필 생성</h2>

      <label>이용 서비스</label>
      <select value={moveType} onChange={(e) => setMoveType(e.target.value)} className="rounded border p-2">
        {moveTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      <label>내가 사는 지역</label>
      <select value={currentArea} onChange={(e) => setCurrentArea(e.target.value)} className="rounded border p-2">
        <option value="">-- 지역 선택 --</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <label>프로필 이미지 (URL, 선택)</label>
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        className="w-full rounded border p-2"
      />

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        제출
      </button>
    </form>
  );
}
