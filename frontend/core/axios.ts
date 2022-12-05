import axiosLib from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const axios = axiosLib.create({
  baseURL: "http://localhost:3002",
  headers: {
    Authorization: "bearer " + cookies?.token,
  },
});

export { axios };
