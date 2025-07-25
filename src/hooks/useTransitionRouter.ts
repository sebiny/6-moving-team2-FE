import { useRouter, usePathname } from "next/navigation";

export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const pushWithTransition = (href: string): ViewTransition | undefined => {
    if (href === pathname) return;

    const doc = document as any;
    if (!doc.startViewTransition) {
      router.push(href);
      return;
    }

    // startViewTransition은 ViewTransition 객체를 반환합니다.
    return doc.startViewTransition(() => {
      router.push(href);
    });
  };

  return { pushWithTransition };
}
