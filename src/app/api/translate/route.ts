// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { text, targetLang } = await req.json();

  try {
    const result = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      new URLSearchParams({
        auth_key: process.env.DEEPL_API_KEY || "",
        text,
        target_lang: targetLang.toUpperCase()
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    return NextResponse.json({ translated: result.data.translations[0].text });
  } catch (error: any) {
    console.error("DeepL API error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "번역 실패", detail: error?.response?.data }, { status: 500 });
  }
}
