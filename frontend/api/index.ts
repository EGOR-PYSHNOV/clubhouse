import Cookies from "nookies";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { UserApi } from "./UserApi";
import { RoomApi } from "./RoomApi";

type ApiReturnType = ReturnType<typeof UserApi> & ReturnType<typeof RoomApi>;

export const Api = (ctx: GetServerSidePropsContext): ApiReturnType => {
  const cookies = Cookies.get(ctx);
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://localhost:3002",
    headers: {
      Authorization: "bearer " + token,
    },
  });

  return [UserApi, RoomApi].reduce(
    (prev, f) => ({ ...prev, ...f(instance) }),
    {} as ApiReturnType
  );
};
