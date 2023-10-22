import { AxiosError } from "axios";
import { UnAuthedRequest } from "./config";
import { uniqueFields } from "@/lib/constants/constants";
import { IUser } from "@/types/interfaces";

let message = "مشکلی نامشخص رخ داده است.";

export type SignUpMessage =
  | "کد تایید برای صحت سنجی به ایمیل شما ارسال شد."
  | string;
async function signUp(credentials: any): Promise<SignUpMessage> {
  try {
    await UnAuthedRequest.post("auth/register/", credentials);
    return "کد تایید برای صحت سنجی به ایمیل شما ارسال شد.";
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as object;

    uniqueFields.forEach((value: string, key: string) => {
      if (key === Object.entries(data)[0][0]) {
        message = `${uniqueFields.get(key)} وارد شده تکراری است.`;
      }
    });

    return message;
  }
}

export type SignInErrorMessage =
  | "صحت سنجی ایمیل"
  | "اطلاعات وارد شده صحیح نمی باشد.";

type SignInRes = {
  isOk: boolean;
  user: IUser | null;
  message?: SignInErrorMessage;
};

async function userSignIn(email: string, password: string): Promise<SignInRes> {
  const credentials = {
    email,
    password,
  };

  try {
    const { data } = await UnAuthedRequest.post(
      "auth/api-token-auth/",
      credentials,
    );

    if (!data.is_email_verified) {
      return {
        isOk: false,
        message: "صحت سنجی ایمیل",
        user: null,
      };
    }
    return { isOk: true, user: data };
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as object;
    return {
      isOk: false,
      message: "اطلاعات وارد شده صحیح نمی باشد.",
      user: null,
    };
  }
}

async function verifyEmail() {}

export { signUp, userSignIn, verifyEmail };
