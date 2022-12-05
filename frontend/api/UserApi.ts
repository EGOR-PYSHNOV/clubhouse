import { AxiosInstance } from "axios";
import { User } from "../types";

export const UserApi = (instance: AxiosInstance) => {
  return {
    getMe: async (): Promise<User> => {
      const { data } = await instance.get("/auth/me");
      return data;
    },
    getUserInfo: async (id: number): Promise<User> => {
      const { data } = await instance.get("/user/" + id);
      return data;
    },
  };
};
