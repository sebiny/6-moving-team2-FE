"use client";
import React, { useState } from "react";
import Gnb from "@/components/layout/Gnb";
import Header from "../../components/Header";
import Main from "./component/Main";

function Page() {
  const [selectedIdx, setSelectedIdx] = useState("1");
  return (
    <div>
      <Gnb />
      <Header type="review" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      <Main selectedIdx={selectedIdx} />
    </div>
  );
}

export default Page;
