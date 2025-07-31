// src/components/Translator.tsx

"use client"; // Next.js app 디렉토리라면 필수!

import { useState } from "react";
import { translateWithDeepL } from "../../../../../utills/translateWithDeepL";

export default function Translator() {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    try {
      const result = await translateWithDeepL(input, "EN");
      setTranslated(result);
    } catch (err: any) {
      alert("번역 실패: " + err.message);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="번역할 내용을 입력하세요"
        className="w-full rounded border p-2"
      />
      <button onClick={handleTranslate} className="rounded bg-blue-500 p-2 text-white">
        번역하기
      </button>
      <div className="min-h-[2rem] rounded border bg-gray-100 p-2">
        <strong>번역 결과:</strong> {translated}
      </div>
    </div>
  );
}
