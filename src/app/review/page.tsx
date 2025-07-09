"use client";
import React, { useState } from "react";
import Gnb from "@/components/layout/Gnb";
import Header from "../../components/Header";
import Main from "./component/Main";
import ReviewModal from "./component/ReviewModal";

function Page() {
  const [selectedIdx, setSelectedIdx] = useState("1");
  return (
    <div>
      <Gnb userRole="guest" />
      <Header type="review" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      <Main selectedIdx={selectedIdx} />
      <ReviewModal />
    </div>
  );
}

export default Page;
