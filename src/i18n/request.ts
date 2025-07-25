import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import FindDrivers from "@/app/[locale]/(guest)/drivers/_components/FindDrivers";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    // ...(await import(`../messages/${locale}/common.json`)).default,
    // ...(await import(`../messages/${locale}/Button.json`)).default,
    // ...(await import(`../messages/${locale}/Driver.json`)).default,
    Review: (await import(`../messages/${locale}/Review.json`)).default,
    Landing: (await import(`../messages/${locale}/Landing.json`)).default,
    FindDriver: (await import(`../messages/${locale}/FindDriver.json`)).default,
    Gnb: (await import(`../messages/${locale}/Gnb.json`)).default,
    Chip: (await import(`../messages/${locale}/Chip.json`)).default,
    //고객
    EstimateReq: (await import(`../messages/${locale}/EstimateReq.json`)).default,
    MyEstimates: (await import(`../messages/${locale}/MyEstimates.json`)).default,
    //기사
    ReceivedReq: (await import(`../messages/${locale}/ReceivedReq.json`)).default,
    DriverMypage: (await import(`../messages/${locale}/DriverMypage.json`)).default
    // 필요시 계속 추가 가능
  };
  return {
    locale,
    messages
  };
});
