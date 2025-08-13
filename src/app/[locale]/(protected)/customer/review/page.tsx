"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Main from "./_components/Main";

function Page() {
  const [selectedIdx, setSelectedIdx] = useState("1");
  return (
    <div>
      <Header type="review" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      <Main selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
    </div>
  );
}

export default Page;

// import { useState } from "react";

// export default function Home() {
//   const [text, setText] = useState("");
//   const [result, setResult] = useState("");

//   const handleTranslate = async () => {
//     const res = await fetch("http://localhost:4000/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ text, targetLang: "ZH" })
//     });

//     const data = await res.json();
//     setResult(data.translation);
//   };

//   return (
//     <div>
//       <h1>DeepL Translation Test</h1>
//       <textarea value={text} onChange={(e) => setText(e.target.value)} />
//       <button onClick={handleTranslate}>Translate</button>
//       <p>Result: {result}</p>
//     </div>
//   );
// }
