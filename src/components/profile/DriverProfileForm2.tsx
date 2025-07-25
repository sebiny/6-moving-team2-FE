"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import TextField from "@/components/input/TextField";
import InputText from "@/components/InputText";
import ChipCircle from "@/components/chip/ChipCircle";

export default function DriverProfileForm() {
  const [nickname, setNickname] = useState("");
  const [career, setCareer] = useState("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const SERVICE_OPTIONS = ["소형이사", "가정이사", "사무실이사"];
  const REGION_OPTIONS = [
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

  const isNicknameValid = useMemo(() => nickname.trim().length > 0, [nickname]);
  const isCareerValid = useMemo(() => /^[0-9]+$/.test(career), [career]);
  const isIntroValid = useMemo(() => intro.trim().length >= 8, [intro]);
  const isDescriptionValid = useMemo(() => description.trim().length >= 10, [description]);
  const isServicesValid = useMemo(() => services.length > 0, [services]);
  const isRegionsValid = useMemo(() => regions.length > 0, [regions]);

  const isFormValid =
    isNicknameValid && isCareerValid && isIntroValid && isDescriptionValid && isServicesValid && isRegionsValid;

  const toggleService = (item: string) => {
    setServices((prev) => (prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]));
  };

  const toggleRegion = (item: string) => {
    setRegions((prev) => (prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert("프로필 등록에 성공했습니다.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-[23px] flex w-[1200px] flex-col gap-12 rounded-[32px] bg-gray-50 px-10 pt-8 pb-10"
    >
      {/* 헤더 */}
      <div className="flex flex-col gap-8">
        <h1 className="text-[32px] font-semibold">기사님 프로필 등록</h1>
        <p className="text-xl">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
      </div>
      <div className="bg-line-100 h-px" />

      <div className="flex items-start justify-between">
        {/* 왼쪽 */}
        <div className="flex w-[500px] flex-col gap-8">
          {/* 프로필 이미지 */}
          <div className="flex flex-col gap-4">
            <p className="text-black-300 text-xl font-semibold">프로필 이미지</p>
            <div className="flex h-40 w-40 items-center justify-center rounded-md">
              <Image src="/assets/images/img_upload.svg" alt="업로드" width={160} height={160} />
            </div>
          </div>
          <div className="bg-line-100 h-px" />

          {/* 별명 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              별명 <span className="text-orange-400">*</span>
            </label>
            <TextField
              value={nickname}
              onChange={setNickname}
              placeholder="사이트에 노출될 별명을 입력해 주세요"
              error={!isNicknameValid && nickname.length > 0 ? "별명을 입력해주세요." : ""}
            />
          </div>
          <div className="bg-line-100 h-px" />

          {/* 경력 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              경력 <span className="text-orange-400">*</span>
            </label>
            <TextField
              value={career}
              onChange={setCareer}
              placeholder="기사님의 경력을 입력해 주세요"
              error={!isCareerValid && career.length > 0 ? "숫자만 입력해주세요." : ""}
            />
          </div>
          <div className="bg-line-100 h-px" />

          {/* 한 줄 소개 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              한 줄 소개 <span className="text-orange-400">*</span>
            </label>
            <TextField
              value={intro}
              onChange={setIntro}
              placeholder="한 줄 소개를 입력해 주세요"
              error={!isIntroValid && intro.length > 0 ? "8자 이상 입력해주세요." : ""}
            />
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex w-[500px] flex-col gap-8">
          {/* 상세 설명 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              상세 설명 <span className="text-orange-400">*</span>
            </label>
            <InputText value={description} onChange={setDescription} setInputValid={() => {}} />
            {!isDescriptionValid && description.length > 0 && (
              <p className="text-base text-rose-500">10자 이상 입력해주세요.</p>
            )}
          </div>
          <div className="bg-line-100 h-px" />

          {/* 제공 서비스 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              제공 서비스 <span className="text-red-500">*</span>
            </label>
            {!isServicesValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>}
            <div className="flex flex-wrap gap-3">
              {SERVICE_OPTIONS.map((s) => (
                <ChipCircle
                  key={s}
                  type="region"
                  text={s}
                  click
                  isSelected={services.includes(s)}
                  onSelect={toggleService}
                />
              ))}
            </div>
          </div>
          <div className="bg-line-100 h-px" />

          {/* 서비스 가능 지역 */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">
              서비스 가능 지역 <span className="text-orange-400">*</span>
            </label>
            {!isRegionsValid && <p className="text-base text-rose-500">* 1개 이상 선택해주세요.</p>}
            {Array.from({ length: Math.ceil(REGION_OPTIONS.length / 5) }).map((_, i) => (
              <div key={i} className="flex gap-3.5">
                {REGION_OPTIONS.slice(i * 5, i * 5 + 5).map((r) => (
                  <ChipCircle
                    key={r}
                    type="region"
                    text={r}
                    click
                    isSelected={regions.includes(r)}
                    onSelect={toggleRegion}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end">
        <Button
          text="시작하기"
          type="orange"
          className="h-15 w-[500px] rounded-2xl text-lg font-semibold"
          isDisabled={!isFormValid}
        />
      </div>
    </form>
  );
}
