import { cookieFetch } from "../FetchClient";

export const favoriteService = {
  createFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "POST" });
  },
  deleteFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "DELETE" });
  },
  favoriteDrivers: async (page?: number, pageSize?: number) => {
    return await cookieFetch(`/favorite?page=${page}&pageSize=${pageSize}`);
  }
};
