"use client";
import React, { useState } from "react";
import Header from "../../../components/Header";
import Main from "./component/Main";

function Page() {
  const [selectedIdx, setSelectedIdx] = useState("1");
  return (
    <div>
      <Header type="review" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      <Main selectedIdx={selectedIdx} />
    </div>
  );
}

export default Page;
