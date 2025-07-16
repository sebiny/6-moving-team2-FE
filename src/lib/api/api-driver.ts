import { DriverType } from "@/types/driverType";
import { cookieFetch, defaultFetch } from "../FetchClient";

export const driverService = {
  getAllDriversDefault: async (): Promise<DriverType[] | null> => {
    return await defaultFetch("/drivers", {
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
