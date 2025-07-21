import { cookieFetch } from "../FetchClient";

export const favoriteService = {
  createFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "POST" });
  },
  deleteFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "DELETE" });
  },
  favoriteDrivers: async () => {
    return await cookieFetch(`/favorite?page=1&pageSize=3`);
  }
};
