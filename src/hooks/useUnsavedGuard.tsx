"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import AlertModal from "@/components/common-modal/AlertModal";

type Options = {
  when: boolean;
  message?: string;
  interceptLinks?: boolean;
  interceptBeforeUnload?: boolean; // true: 브라우저 기본 경고 사용
  patchRouterMethods?: boolean;
};

const DEFAULT_MSG = "페이지를 나가시겠습니까?\n작성한 내용이 저장되지 않을 수 있습니다.";

// ----- 모달 싱글톤 (문서 body에 한 번만 붙여 재사용) -----
let modalRoot: Root | null = null;
let modalHostEl: HTMLDivElement | null = null;

function ensureModalRoot() {
  if (typeof window === "undefined") return;
  if (!modalHostEl) {
    modalHostEl = document.createElement("div");
    modalHostEl.id = "global-unsaved-guard-modal-root";
    modalHostEl.style.position = "relative"; // 안전
    document.body.appendChild(modalHostEl);
    modalRoot = createRoot(modalHostEl);
  }
}

function unmountModal() {
  if (modalRoot && modalHostEl) {
    modalRoot.render(<></>);
  }
}

function showModal(message: string, onConfirm: () => void, onClose: () => void) {
  ensureModalRoot();
  if (!modalRoot) return;
  modalRoot.render(
    <AlertModal
      type="handleClick"
      message={message}
      onConfirm={onConfirm} // 확인 시 실제 이동/뒤로가기
      onClose={onClose} // 바깥 클릭/닫기
      buttonText="확인"
    />
  );
}

// ------------------------------------------------------------

export function useUnsavedChangesGuard({
  when,
  message = DEFAULT_MSG,
  interceptLinks = true,
  interceptBeforeUnload = true, // 기본 경고 숨기고 커스텀 모달 위주면 false 권장
  patchRouterMethods = true
}: Options) {
  const router = useRouter();

  // 최신 상태/문구 유지
  const whenRef = useRef(when);
  const msgRef = useRef(message);
  useEffect(() => {
    whenRef.current = when;
  }, [when]);
  useEffect(() => {
    msgRef.current = message;
  }, [message]);

  // popstate 용
  const ignoringPopRef = useRef(false);
  const barrierActiveRef = useRef(false);

  // 대기 액션(모달 확인 시 실행)
  const pendingActionRef = useRef<null | (() => void)>(null);

  const openGuardWith = (action: () => void) => {
    if (!whenRef.current) {
      action();
      return;
    }
    pendingActionRef.current = action;

    // 모달 표시
    showModal(
      msgRef.current,
      () => {
        // 확인
        const a = pendingActionRef.current;
        pendingActionRef.current = null;
        try {
          history.replaceState({}, "", location.href);
        } catch {}
        a?.();
        // 모달 닫기
        unmountModal();
      },
      () => {
        // 닫기/취소(머무르기)
        pendingActionRef.current = null;
        unmountModal();
        // popstate 바리어 유지는 popstate 핸들러에서 보강
      }
    );
  };

  // 1) 새로고침/창닫기 — 브라우저 기본 경고
  useEffect(() => {
    if (!interceptBeforeUnload) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!whenRef.current) return;

      e.preventDefault(); // 최신 브라우저용

      (e as any).returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [interceptBeforeUnload]);

  // 2) 뒤/앞 버튼(popstate) 가드 — 히스토리 바리어
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pushBarrier = () => {
      try {
        history.pushState({ __unsaved_guard: true }, "", location.href);
        barrierActiveRef.current = true;
      } catch {}
    };

    const popHandler = () => {
      if (!whenRef.current) {
        barrierActiveRef.current = false;
        return;
      }
      if (ignoringPopRef.current) {
        ignoringPopRef.current = false;
        return;
      }

      // 사용자 뒤/앞 이동 → 모달
      openGuardWith(() => {
        barrierActiveRef.current = false;
        ignoringPopRef.current = true;
        history.back();
      });

      // 취소 시 현재 페이지에 남아야 하므로, 다음 tick에 바리어 재설치
      setTimeout(() => {
        if (whenRef.current && !barrierActiveRef.current) pushBarrier();
      }, 0);
    };

    if (when) {
      if (!barrierActiveRef.current) pushBarrier();
      window.addEventListener("popstate", popHandler);
      return () => {
        window.removeEventListener("popstate", popHandler);
        barrierActiveRef.current = false;
        ignoringPopRef.current = false;
      };
    } else {
      barrierActiveRef.current = false;
      ignoringPopRef.current = false;
    }
  }, [when]);

  // 3) 내부 링크(<a>/<Link>) 클릭 가로채기
  useEffect(() => {
    if (!interceptLinks) return;

    const onClickCapture = (e: MouseEvent) => {
      if (!whenRef.current) return;

      // 새 탭/특수 클릭 패스
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return; // 외부 링크 패스

      e.preventDefault();
      openGuardWith(() => {
        try {
          history.replaceState({}, "", location.href);
        } catch {}
        router.push(url.pathname + url.search + url.hash);
      });
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [interceptLinks, router]);

  // 4) programmatic navigation 보호 (push/replace/back)
  useEffect(() => {
    if (!patchRouterMethods) return;
    const r: any = router;

    const orig = {
      push: r.push?.bind(router),
      replace: r.replace?.bind(router),
      back: r.back?.bind(router)
    };

    if (orig.push) {
      r.push = (...args: any[]) => openGuardWith(() => orig.push(...args));
    }
    if (orig.replace) {
      r.replace = (...args: any[]) => openGuardWith(() => orig.replace(...args));
    }
    if (orig.back) {
      r.back = () => openGuardWith(() => orig.back());
    }

    return () => {
      if (orig.push) (r as any).push = orig.push;
      if (orig.replace) (r as any).replace = orig.replace;
      if (orig.back) (r as any).back = orig.back;
    };
  }, [patchRouterMethods, router]);
}
