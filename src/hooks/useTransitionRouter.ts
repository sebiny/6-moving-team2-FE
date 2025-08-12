import { useRouter, usePathname } from "next/navigation";

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const pushWithTransition = (path: string): ViewTransition | undefined => {
    if (path === pathname) return;
    if (path === pathname) {
      console.log("같은 경로라서 리턴");
      return;
    }

    const doc = document as any;
    if (!doc.startViewTransition) {
      console.log("View Transition 미지원, 기본 router.push 사용");
      router.push(path);
      return;
    }

    // startViewTransition은 ViewTransition 객체를 반환합니다.
    return doc.startViewTransition(() => {
      console.log("router.push 실행:", path);
      router.push(path);
    });
  };

  return { pushWithTransition };
}
