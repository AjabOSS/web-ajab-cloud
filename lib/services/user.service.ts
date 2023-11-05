import { AxiosError } from "axios";
import { UnAuthedRequest } from "./config";
import { uniqueFields } from "@/lib/constants/constants";
import { IUser } from "@/types/interfaces";

// TODO: Manage Form data requests and Autheticated requests.

let message = "مشکلی نامشخص رخ داده است.";

export type SignUpMessage =
  | "کد تایید برای صحت سنجی به ایمیل شما ارسال شد."
  | string;
async function signUp(credentials: any): Promise<[SignUpMessage, string]> {
  try {
    const { data } = await UnAuthedRequest.post("auth/register/", credentials);
    return ["کد تایید برای صحت سنجی به ایمیل شما ارسال شد.", data.token];
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as object;

    uniqueFields.forEach((value: string, key: string) => {
      if (key === Object.entries(data)[0][0]) {
        message = `${uniqueFields.get(key)} وارد شده تکراری است.`;
      }
    });

    return [message, ""];
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
        user: data,
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

async function verifyEmail(token: string, code: string): Promise<boolean> {
  try {
    await UnAuthedRequest.post(
      "auth/verify-email/",
      {
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      },
    );
    return true;
  } catch (e) {
    // const err = e as AxiosError;
    return false;
  }
}

async function sendEmailVerification(token: string) {
  try {
    await UnAuthedRequest.post(
      "auth/send-verification-email/",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      },
    );
  } catch (e) {}
}

async function editProfile(token: string, fromData: FormData): Promise<IUser> {
  try {
    const { data } = await UnAuthedRequest.put<IUser>(
      "auth/edit-profile/",
      fromData,
      {
        headers: {
          "Content-Type": "",
          Authorization: `token ${token}`,
        },
      },
    );

    return data;
  } catch (e) {
    console.log(e);
    return {
      bio: "",
    };
  }
}

async function getUserByUsername(username: string): Promise<IUser> {
  try {
    const { data } = await UnAuthedRequest.get<IUser>(
      `auth/get-user-by-username/${username}/`,
    );
    console.log(data);
    return data;
  } catch (error) {
    return {
      bio: "",
      college: "",
      email: "",
      username: "",
      is_active: false,
      is_email_verified: false,
      is_male: false,
    };
  }
}

export {
  signUp,
  userSignIn,
  verifyEmail,
  sendEmailVerification,
  getUserByUsername,
  editProfile,
};
