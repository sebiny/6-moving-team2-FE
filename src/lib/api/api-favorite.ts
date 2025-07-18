import { cookieFetch } from "../FetchClient";

export const favoriteService = {
  createFavorite: async (driverId: string) => {
    console.log("create 실행");
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "POST" });
  },
  deleteFavorite: async (driverId: string) => {
    console.log("delete 실행");
    return await cookieFetch(`/favorite/drivers/${driverId}`, { method: "DELETE" });
  }
};
