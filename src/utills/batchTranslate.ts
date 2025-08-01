// utils/batchTranslate.ts
import { translateWithDeepL } from "./translateWithDeepL";

export async function batchTranslate<T extends Record<string, string>>(texts: T, locale: string): Promise<T> {
  const entries = await Promise.all(
    Object.entries(texts).map(async ([key, value]) => {
      try {
        const translated = await translateWithDeepL(value, locale.toUpperCase());
        return [key, translated];
      } catch (e) {
        console.warn(`번역 실패: ${key}`, e);
        return [key, value];
      }
    })
  );

  return Object.fromEntries(entries) as T;
}
