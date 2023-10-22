import env from "@/env";
import axios, { AxiosError } from "axios";

const baseURL = env.NEXT_PUBLIC_BASE_URL;

const UnAuthedRequest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL,
});

export { UnAuthedRequest };
