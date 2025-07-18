import { cookieFetch } from "../FetchClient";

export const favoriteService = {
  createFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/${driverId}`, { method: "POST" });
  },
  deleteFavorite: async (driverId: string) => {
    return await cookieFetch(`/favorite/${driverId}`, { method: "DELETE" });
  }
};
