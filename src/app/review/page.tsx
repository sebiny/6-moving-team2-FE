import InputText from "@/components/InputText";
import Header from "@/app/review/component/Header";
import React from "react";
import Main from "./component/Main";

function page() {
  return (
    <div>
      <div>
        {/* <InputText /> */}
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default page;
