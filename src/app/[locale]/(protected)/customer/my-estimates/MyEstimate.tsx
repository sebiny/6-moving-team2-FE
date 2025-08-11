"use client";

import { useEffect, useRef, useState } from "react";
import PendingEstimates from "./estimate-pending/page";
import PastEstimates from "./estimate-past/page";
import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";

export default function MyEstimatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") ?? "pending";
  const [selectedIdx, setSelectedIdx] = useState<"1" | "2">("1");

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSelectedIdx(tab === "past" ? "2" : "1");
  }, [tab]);

  const handleTabChange = (idx: string) => {
    const nextIdx = (idx === "2" ? "2" : "1") as "1" | "2";
    setSelectedIdx(nextIdx);
    const nextTab = nextIdx === "2" ? "past" : "pending";
    router.replace(`/customer/my-estimates?tab=${nextTab}`);
    // 탭 변경 시 본문으로 포커스 이동(화면리더에 전환 알림)
    requestAnimationFrame(() => mainRef.current?.focus());
  };

  return (
    <div className="flex h-screen flex-col">
      {/* 스킵 링크 */}
      <a
        href="#main-content"
        className="sr-only rounded bg-white px-3 py-2 shadow focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        본문으로 건너뛰기
      </a>

      {/* 상단 고정 헤더 */}
      <header
        className="fixed z-9 w-full bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] lg:top-22"
        aria-label="내 견적 관리 상단"
      >
        {/* 헤더 컴포넌트가 role="tablist" 등을 제공하도록 아래 참고사항대로 보강 권장 */}
        <Header type="estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      </header>

      {/* 본문 */}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="bg-background-200 flex-1 pt-13 outline-none lg:pt-22"
        aria-labelledby={selectedIdx === "1" ? "tab-pending" : "tab-past"}
      >
        {/* 각 패널을 role="tabpanel"로 감싸고, aria-labelledby로 탭과 연결 */}
        <section id="tabpanel-pending" role="tabpanel" aria-labelledby="tab-pending" hidden={selectedIdx !== "1"}>
          {selectedIdx === "1" && <PendingEstimates />}
        </section>

        <section id="tabpanel-past" role="tabpanel" aria-labelledby="tab-past" hidden={selectedIdx !== "2"}>
          {selectedIdx === "2" && <PastEstimates />}
        </section>
      </main>
    </div>
  );
}
