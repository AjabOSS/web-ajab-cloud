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

// Interceptors

const inputMap = new Map<string, string>([
  ["email", "ایمیل"],
  ["username", "نام کابری"],
]);

// TODO: Implement global error handling

function inValidInputHandler(
  inputs: Map<string, string>,
  resData: Object,
): string {
  inputMap.forEach((value: string, key: string) => {
    if (key === Object.entries(resData)[0][0]) {
      return `.${inputMap.get(key)} وارد شده تکراری است`;
    }
  });

  return "خیلی عجیبه!";
}

export default AuthedRequest;
export { UnAuthedRequest };
