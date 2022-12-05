import { GetServerSidePropsContext } from "next";
import { Api } from "../api";
import { User } from "../types";

export const checkAuth = async (
  ctx: GetServerSidePropsContext
): Promise<User | null> => {
  try {
    return await Api(ctx).getMe();
  } catch (error) {
    console.log(error);

    return null;
  }
};
