import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    Review: (await import(`../messages/${locale}/Review.json`)).default,
    Landing: (await import(`../messages/${locale}/Landing.json`)).default,
    FindDriver: (await import(`../messages/${locale}/FindDriver.json`)).default,
    Gnb: (await import(`../messages/${locale}/Gnb.json`)).default,
    Chip: (await import(`../messages/${locale}/Chip.json`)).default,
    Date: (await import(`../messages/${locale}/Date.json`)).default,
    //고객
    EstimateReq: (await import(`../messages/${locale}/EstimateReq.json`)).default,
    MyEstimates: (await import(`../messages/${locale}/MyEstimates.json`)).default,
    //기사
    ReceivedReq: (await import(`../messages/${locale}/ReceivedReq.json`)).default,
    DriverMypage: (await import(`../messages/${locale}/DriverMypage.json`)).default,
    MyEstimate: (await import(`../messages/${locale}/MyEstimate.json`)).default,
    // 필요시 계속 추가 가능
    Profile: (await import(`../messages/${locale}/Profile.json`)).default
  };
  return {
    locale,
    messages
  };
});
