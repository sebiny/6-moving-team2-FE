export async function translateWithDeepL(text: string, targetLang: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLang })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "번역 실패");
  }

  const data = await res.json();
  return data.translation;
}
