import useMedia from "use-media";

export default function useMediaHook() {
  const isSm = useMedia({ minWidth: 375 });
  const isMd = useMedia({ minWidth: 744 });
  const isLg = useMedia({ minWidth: 1280 });
  return { isSm, isMd, isLg };
}
