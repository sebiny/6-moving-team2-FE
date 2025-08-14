// 예시: useTranslate.ts
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export function useTranslate(textMap: Record<string, string>) {
  const locale = useLocale();
  const [translated, setTranslated] = useState(textMap);

  useEffect(() => {
    if (locale === "ko") {
      setTranslated(textMap);
      return;
    }

    const fetchTranslation = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textMap, targetLang: locale.toUpperCase() })
        });
        const data = await res.json();
        setTranslated(data.translation);
      } catch (e) {
        console.warn("번역 실패", e);
        setTranslated(textMap);
      }
    };

    fetchTranslation();
  }, [locale, textMap]);

  return translated;
}
