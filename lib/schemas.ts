import * as z from "zod";

export const nameSchema = z
  .string()
  .min(1, { message: "نام اجباری است." })
  .max(50);
export const usernameSchema = z
  .string()
  .trim()
  .min(5, {
    message: "نام کاربری باید حداقل 5 کاراکتر باشد.",
  })
  .regex(/^[a-zA-Z\d\s_-]*[a-zA-Z][a-zA-Z\d\s_-]*$/, {
    message: "نام کاربری باید انگلیسی باشد.",
  });

export const passwordSchema = z
  .string()
  .min(8, {
    message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
  })
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: "رمز عبور باید حداقل شامل یک حرف بزرگ و کوچک و کاراکتر خاص باشد.",
  });

export const emailSchema = z
  .string()
  .min(1, { message: "آدرس ایمیل اجباری است." })
  .email({
    message: "آدرس ایمیل نامعتبر",
  });
