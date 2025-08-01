import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    Common: (await import(`../messages/${locale}/Common.json`)).default
    Gnb: (await import(`../messages/${locale}/Gnb.json`)).default,
    Chip: (await import(`../messages/${locale}/Chip.json`)).default,
    Date: (await import(`../messages/${locale}/Date.json`)).default,
<<<<<<< HEAD

    EstimateReq: (await import(`../messages/${locale}/EstimateReq.json`)).default,
    MyEstimates: (await import(`../messages/${locale}/MyEstimates.json`)).default,

=======
    Landing: (await import(`../messages/${locale}/Landing.json`)).default,
      
    //고객
    Review: (await import(`../messages/${locale}/Review.json`)).default,
    FindDriver: (await import(`../messages/${locale}/FindDriver.json`)).default,
    EstimateReq: (await import(`../messages/${locale}/EstimateReq.json`)).default,
    MyEstimates: (await import(`../messages/${locale}/MyEstimates.json`)).default,
      
    //기사
>>>>>>> a2e4212c871d738a6f686f917380d0cdd18e8d68
    ReceivedReq: (await import(`../messages/${locale}/ReceivedReq.json`)).default,
    DriverMypage: (await import(`../messages/${locale}/DriverMypage.json`)).default,
    MyEstimate: (await import(`../messages/${locale}/MyEstimate.json`)).default,

    Common: (await import(`../messages/${locale}/Common.json`)).default,

    Login: (await import(`../messages/${locale}/Login.json`)).default,
    Signup: (await import(`../messages/${locale}/Signup.json`)).default,

<<<<<<< HEAD
=======
    //프로필
>>>>>>> a2e4212c871d738a6f686f917380d0cdd18e8d68
    Profile: (await import(`../messages/${locale}/Profile.json`)).default
  };
  return {
    locale,
    messages
  };
});
