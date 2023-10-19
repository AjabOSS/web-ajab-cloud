import env from "@/env";
import axios, { AxiosError } from "axios";

const baseURL = env.NEXT_PUBLIC_BASE_URL;

const AuthedRequest = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${JSON.parse(
      localStorage.getItem("token") as string,
    )}`,
  },
  baseURL,
});

const UnAuthedRequest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
});

export default AuthedRequest;
export { UnAuthedRequest };
