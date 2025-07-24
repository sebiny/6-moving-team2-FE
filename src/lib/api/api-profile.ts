import { cookieFetch } from "../FetchClient";

interface PatchDataType {
  name: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export const profileService = {
  updateBasicDriverProfile: async (data: PatchDataType) => {
    return await cookieFetch(`/profile/driver/basic`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  }
};
