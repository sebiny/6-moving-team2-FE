import { translateWithDeepL } from "./translateWithDeepL";

export async function batchTranslate<T extends Record<string, string>>(texts: T, locale: string): Promise<T> {
  const entries = await Promise.all(
    Object.entries(texts).map(async ([key, value]) => {
      try {
        const translated = await translateWithDeepL(value, locale.toUpperCase());
        //DeepL API가 target_lang 파라미터에 대문자 언어 코드를 요구
        return [key, translated];
      } catch (e) {
        console.warn(`번역 실패: ${key}`, e);
        return [key, value];
      }
    })
  );

  return Object.fromEntries(entries) as T;
}
//await batchTranslate({ hello: "Hello", bye: "Goodbye" }, "ko");
// 결과 예: { hello: "안녕하세요", bye: "안녕히 가세요" }
