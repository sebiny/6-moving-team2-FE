"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieFetch, authUtils } from "@/lib/FetchClient";
import { moveTypes, regions, regionMap, regionMapReverse } from "@/constant/profile";

interface ProfileFormProps {
  userType: "driver" | "customer";
  isEditMode: boolean;
  initialData?: any;
}

export default function ProfileForm({ userType, isEditMode, initialData }: ProfileFormProps) {
  const router = useRouter();

  // 공통 필드
  const [profileImage, setProfileImage] = useState("");
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);

  // 기사 전용 필드
  const [nickname, setNickname] = useState("");
  const [career, setCareer] = useState(1);
  const [shortIntro, setShortIntro] = useState("");
  const [detailIntro, setDetailIntro] = useState("");
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);

  // 고객 전용 필드
  const [currentArea, setCurrentArea] = useState("");
  const [name, setName] = useState(""); // 수정 시에만 사용
  const [phone, setPhone] = useState(""); // 수정 시에만 사용

  useEffect(() => {
    if (isEditMode && initialData) {
      const profileData = userType === "driver" ? initialData.driver : initialData.customer;

      if (!profileData) return;

      // 공통 필드 채우기 (프로필 데이터에서 가져옴)
      setProfileImage(profileData.profileImage || "");
      setSelectedMoveTypes(profileData.moveType || []);

      if (userType === "driver") {
        // 기사 전용 필드 채우기
        setNickname(profileData.nickname || "");
        setCareer(profileData.career || 0);
        setShortIntro(profileData.shortIntro || "");
        setDetailIntro(profileData.detailIntro || "");
        const initialServiceAreas = profileData.serviceAreas
          ?.map((area: { region: string }) => regionMapReverse[area.region])
          .filter(Boolean); // undefined나 "" 제거

        setServiceAreas(initialServiceAreas || []);
      } else if (userType === "customer") {
        // 고객 전용 필드 채우기
        setCurrentArea(profileData.currentArea || "");
        setName(initialData.name || "");
        setPhone(initialData.phone || "");
      }
    }
  }, [isEditMode, initialData, userType]);

  const toggleMoveType = (type: string) => {
    setSelectedMoveTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const toggleRegion = (region: string) => {
    setServiceAreas((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (userType === "driver") {
      if (!nickname.trim()) return alert("별명을 입력해주세요.");
      if (career < 0) return alert("경력은 0 이상의 숫자여야 합니다.");
      if (serviceAreas.length === 0) return alert("서비스 가능 지역을 하나 이상 선택해주세요.");
    }
    if (selectedMoveTypes.length === 0) return alert("제공 서비스를 하나 이상 선택해주세요.");
    if (userType === "customer" && !currentArea) return alert("현재 지역을 선택해주세요.");

    // API 요청 본문 생성
    let payload: any = {
      moveType: selectedMoveTypes,
      profileImage: profileImage || undefined
    };

    if (userType === "driver") {
      payload = {
        ...payload,
        nickname,
        career,
        shortIntro,
        detailIntro,
        serviceAreas: serviceAreas.map((label) => ({ region: regionMap[label] }))
      };
    } else {
      payload = {
        ...payload,
        currentArea
      };
      if (isEditMode) {
        payload.name = name;
        payload.phone = phone;
      }
    }

    try {
      const endpoint = `/profile/${userType}`;
      const method = isEditMode ? "PATCH" : "POST";

      const response = await cookieFetch<{ accessToken?: string }>(endpoint, {
        method,
        body: JSON.stringify(payload)
      });

      if (response && response.accessToken) {
        authUtils.setAccessToken(response.accessToken);
      }

      alert(`프로필 ${isEditMode ? "수정" : "생성"} 완료!`);
      router.push("/"); // 혹은 마이페이지 등으로 이동
    } catch (error: any) {
      console.error(error);
      const message =
        error?.message || (error?.response?.data?.message ?? `프로필 ${isEditMode ? "수정" : "생성"} 실패`);
      alert(message);
    }
  };

  const pageTitle = `${userType === "driver" ? "기사" : "고객"} 프로필 ${isEditMode ? "수정" : "생성"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-bold">{pageTitle}</h2>

      {/* 기사 전용 필드 */}
      {userType === "driver" && (
        <>
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
        </>
      )}

      {/* 고객 전용 필드 (수정 모드) */}
      {userType === "customer" && isEditMode && (
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

      {/* 공통 필드 */}
      <label>프로필 이미지 (URL, 선택)</label>
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        className="w-full rounded border p-2"
      />

      <label>제공/요청 서비스 (중복 선택 가능)</label>
      <div className="flex flex-wrap gap-2">
        {moveTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => toggleMoveType(type.value)}
            className={`rounded border px-3 py-1 ${selectedMoveTypes.includes(type.value) ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* 기사 전용 지역 선택 */}
      {userType === "driver" && (
        <>
          <label>서비스 가능 지역</label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => toggleRegion(region)}
                className={`rounded border px-3 py-1 ${serviceAreas.includes(region) ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                {region}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 고객 전용 지역 선택 */}
      {userType === "customer" && (
        <>
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
        </>
      )}

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        제출
      </button>
    </form>
  );
}
