import InputText from "@/components/InputText";
import Header from "@/app/review/component/Header";
import React from "react";
import Main from "./component/Main";
import Gnb from "@/components/layout/Gnb";

function page() {
  return (
    <div>
      <div>
        <Gnb />
        {/* <InputText /> */}
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default page;
