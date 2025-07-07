import InputText from "@/components/InputText";
import React from "react";
import Main from "./component/Main";
import Gnb from "@/components/layout/Gnb";
import Header from "../../components/Header";

function page() {
  const headerType = "review";
  return (
    <div>
      <div>
        <Gnb />
        {/* <InputText /> */}
        <Header type={headerType} />
        <Main />
      </div>
    </div>
  );
}

export default page;
