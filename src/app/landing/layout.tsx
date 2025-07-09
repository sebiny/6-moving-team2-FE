import Container from "@/components/container/PageContainer";
import Gnb from "@/components/layout/Gnb";

import React, { ReactNode } from "react";

export default function LandingPageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Container padding="0" maxWidth="w-full" className="mt-14 lg:mt-22">
        {children}
      </Container>
    </div>
  );
}
