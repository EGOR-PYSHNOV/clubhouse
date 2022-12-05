import { UserModel } from "./../../types/user";
import jwt from "jsonwebtoken";

export const createJwtToken = (user: UserModel): string => {
  const token = jwt.sign(
    {
      data: user,
    },

    process.env.JWT_SECRET_KEY || "",

    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};
