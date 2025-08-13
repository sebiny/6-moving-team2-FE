'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Options = {
  when: boolean;
  message?: string;
  interceptLinks?: boolean;
  interceptBeforeUnload?: boolean;
  patchRouterMethods?: boolean;
};

const DEFAULT_MSG =
  '페이지를 나가시겠습니까? 작성된 내용이 저장되지 않을 수 있습니다.';

export function useUnsavedChangesGuard({
  when,
  message = DEFAULT_MSG,
  interceptLinks = true,
  interceptBeforeUnload = true,
  patchRouterMethods = true,
}: Options) {
  const router = useRouter();
  const whenRef = useRef(when);
  const msgRef = useRef(message);

  // popstate 내부에서 재진입/루프 방지용
  const ignoringPopRef = useRef(false);
  // 우리가 쌓아둔 바리어가 현재 히스토리 top 에 있는지 여부
  const barrierActiveRef = useRef(false);

  useEffect(() => {
    whenRef.current = when;
  }, [when]);
  useEffect(() => {
    msgRef.current = message;
  }, [message]);

  const confirmLeave = () => (!whenRef.current ? true : window.confirm(msgRef.current));

  // -----------------------------
  // 1) 새로고침/창닫기 방지
  // -----------------------------
  useEffect(() => {
    if (!interceptBeforeUnload) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!whenRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [interceptBeforeUnload]);

  // ----------------------------------------
  // 2) 뒤/앞 버튼(popstate) 가드 (바리어 방식)
  // ----------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pushBarrier = () => {
      try {
        history.pushState({ __unsaved_guard: true }, '', location.href);
        barrierActiveRef.current = true;
      } catch {
        // iOS 사파리 등 edge 환경 보호
      }
    };

    const popHandler = (e: PopStateEvent) => {
      if (!whenRef.current) {
        barrierActiveRef.current = false;
        return; // 작성 중이 아니면 가드 안함
      }
      if (ignoringPopRef.current) {
        // 우리가 의도적으로 back() 호출해서 발생한 pop
        ignoringPopRef.current = false;
        return;
      }

      // 여기 도달했다는 건 사용자가 뒤/앞 버튼을 눌러 "바리어"를 pop 한 상태
      const ok = window.confirm(msgRef.current);
      if (ok) {
        // 정말 나가려는 경우: 가드를 잠시 해제하고 한 칸 더 이동
        barrierActiveRef.current = false;
        ignoringPopRef.current = true;
        history.back(); // 진짜 이전 페이지로
      } else {
        // 취소: 현재 위치로 머무르게 다시 바리어를 세움
        pushBarrier();
      }
    };

    // when이 true가 되는 순간 바리어를 세우고, false가 되면 정리
    if (when) {
      if (!barrierActiveRef.current) pushBarrier();
      window.addEventListener('popstate', popHandler);
      return () => {
        window.removeEventListener('popstate', popHandler);
        barrierActiveRef.current = false;
        ignoringPopRef.current = false;
      };
    } else {
      // when=false로 바뀌면 혹시 남아있을 수 있는 핸들러/상태 정리
      barrierActiveRef.current = false;
      ignoringPopRef.current = false;
    }
  }, [when]); // ← when 변화에 맞춰 바리어 등록/해제

  // ------------------------------------
  // 3) 내부 링크(<a>/<Link>) 클릭 가로채기
  // ------------------------------------
  useEffect(() => {
    if (!interceptLinks) return;

    const onClickCapture = (e: MouseEvent) => {
      if (!whenRef.current) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;

      e.preventDefault();
      if (confirmLeave()) {
        // popstate 가드가 남아있으면 해제
        history.replaceState({}, '', location.href);
        // Next routing
        router.push(url.pathname + url.search + url.hash);
      }
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, [interceptLinks, router]);

  // -------------------------------------------------
  // 4) programmatic navigation 보호 (push/replace/back)
  // -------------------------------------------------
  useEffect(() => {
    if (!patchRouterMethods) return;

    const r: any = router;
    const orig = {
      push: r.push?.bind(router),
      replace: r.replace?.bind(router),
      back: r.back?.bind(router),
    };

    const guardCall = (fn: Function, ...args: any[]) => {
      if (confirmLeave()) {
        // 우리가 쌓은 바리어가 있으면 정리하여 중첩 방지
        try { history.replaceState({}, '', location.href); } catch {}
        return fn(...args);
      }
    };

    // 재정의
    if (orig.push) r.push = (...args: any[]) => guardCall(orig.push, ...args);
    if (orig.replace) r.replace = (...args: any[]) => guardCall(orig.replace, ...args);
    if (orig.back) r.back = () => guardCall(orig.back);

    return () => {
      if (orig.push) (r as any).push = orig.push;
      if (orig.replace) (r as any).replace = orig.replace;
      if (orig.back) (r as any).back = orig.back;
    };
  }, [patchRouterMethods, router]);
}
