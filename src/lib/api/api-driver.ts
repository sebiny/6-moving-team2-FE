import { DriverType } from "@/types/driverType";
import { cookieFetch, defaultFetch } from "../FetchClient";
import qs from "query-string";

export const driverService = {
  getAllDriversDefault: async (options: {
    keyword?: string;
    orderBy?: string;
    region?: string;
    service?: string;
  }): Promise<DriverType[] | null> => {
    const query = qs.stringify(options, { skipEmptyString: true, skipNull: true });
    return await defaultFetch(`/drivers?${query}`, {
      method: "GET"
    });
  },
  getAllDriversCookie: async (): Promise<DriverType[] | null> => {
    return await cookieFetch("/drivers", {
      method: "GET"
    });
  },
  getDriverDetail: async (): Promise<DriverType | null> => {
    return await defaultFetch("/drivers");
  }
};
