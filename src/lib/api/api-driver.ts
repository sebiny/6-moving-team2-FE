import { DriverType } from "@/types/driverType";
import { cookieFetch, defaultFetch } from "../FetchClient";
import qs from "query-string";

export const driverService = {
  getAllDriversDefault: async (options: {
    keyword?: string;
    orderBy?: string;
    region?: string;
    service?: string;
    page: number;
  }): Promise<{ data: DriverType[]; hasNext: boolean } | null> => {
    const query = qs.stringify(options, { skipEmptyString: true, skipNull: true });
    return await defaultFetch(`/drivers?${query}`, {
      method: "GET"
    });
  },
  getAllDriversCookie: async (options: {
    keyword?: string;
    orderBy?: string;
    region?: string;
    service?: string;
    page: number;
  }): Promise<{ data: DriverType[]; hasNext: boolean } | null> => {
    const query = qs.stringify(options, { skipEmptyString: true, skipNull: true });
    return await cookieFetch("/drivers", {
      method: "GET"
    });
  },
  getDriverDetailDefault: async (id: string): Promise<DriverType | null> => {
    return await defaultFetch(`/drivers/${id}`);
  },
  getDriverDetailCookie: async (id: string): Promise<DriverType | null> => {
    return await cookieFetch(`/drivers/${id}`);
  }
};
