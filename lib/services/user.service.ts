import { AxiosError } from "axios";
import { UnAuthedRequest } from "./config";
import { uniqueFields } from "@/lib/constants/constants";
import { Dispatch, SetStateAction } from "react";

let message = "مشکلی نامشخص رخ داده است.";
async function signUp(
  credentials: any,
  setShowError: Dispatch<SetStateAction<boolean>>,
): Promise<string> {
  try {
    const { data } = await UnAuthedRequest.post("auth/register/", credentials);
    console.log(data);

    return "با موفقیت وارد شدید.";
  } catch (error) {
    const err = error as AxiosError;
    const data = err.response?.data as object;

    uniqueFields.forEach((value: string, key: string) => {
      if (key === Object.entries(data)[0][0]) {
        message = `${uniqueFields.get(key)} وارد شده تکراری است.`;
      }
    });

    setShowError(true);
    return message;
  }
}

export { signUp };
