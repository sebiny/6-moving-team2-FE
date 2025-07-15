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

export default function DriverProfileForm() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [career, setCareer] = useState(1);
  const [shortIntro, setShortIntro] = useState("");
  const [detailIntro, setDetailIntro] = useState("");
  const [moveType, setMoveType] = useState("HOME");
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState("");

  const toggleRegion = (region: string) => {
    setServiceAreas((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("별명을 입력해주세요.");
      return;
    }
    if (career < 0) {
      alert("경력은 0 이상의 숫자여야 합니다.");
      return;
    }
    if (serviceAreas.length === 0) {
      alert("서비스 가능 지역을 하나 이상 선택해주세요.");
      return;
    }

    try {
      await cookieFetch("/profile/driver", {
        method: "POST",
        body: JSON.stringify({
          nickname,
          career,
          shortIntro,
          detailIntro,
          moveType,
          profileImage: profileImage || undefined,
          serviceAreas: serviceAreas.map((label) => ({
            region: regionMap[label] // 한글 → enum
          }))
        })
      });

      alert("기사 프로필 생성 완료!");
      router.push("/");
    } catch (error: any) {
      console.error(error);

      const message = error?.message || (error?.response?.data?.message ?? "프로필 생성 실패");

      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-bold">기사 프로필 생성</h2>

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

      <label>제공 서비스</label>
      <select value={moveType} onChange={(e) => setMoveType(e.target.value)} className="rounded border p-2">
        {moveTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

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
