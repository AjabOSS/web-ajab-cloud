import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  sendEmailVerification,
  signUp,
  verifyEmail,
} from "@/lib/services/user.service";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signIn } from "next-auth/react";

const verificationFormSchema = z.object({
  code: z.string().min(1, { message: "کد تایید را وارد کنید." }),
});
function EmailValidationForm({
  token,
  email,
  password,
}: {
  token: string;
  email: string;
  password: string;
}) {
  const [showError, setShowError] = useState(false);
  const verificationForm = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      code: "",
    },
  });
  async function onVerificationSubmit(
    values: z.infer<typeof verificationFormSchema>,
  ) {
    const result = await verifyEmail(token, values.code);
    setShowError(!result);

    if (result) {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  }

  useEffect(() => {
    async function callSendEmailVerification() {
      await sendEmailVerification(token);
    }

    callSendEmailVerification();
  }, [token]);

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="svg"
            viewBox="91, 105, 200,200"
            className="mx-auto h-20 w-auto"
          >
            <g id="svgg">
              <path
                id="path1"
                d="M193.955 123.028 C 191.840 123.680,193.242 120.366,178.749 158.958 C 175.672 167.151,170.347 181.307,166.915 190.417 C 163.483 199.526,157.608 215.135,153.859 225.104 C 150.110 235.073,144.614 249.673,141.646 257.550 C 135.641 273.487,135.696 273.288,136.776 275.132 C 137.932 277.104,140.545 277.780,142.525 276.620 C 144.051 275.725,142.361 279.934,159.411 234.583 C 162.965 225.130,169.014 209.052,172.854 198.854 C 176.694 188.656,183.248 171.234,187.418 160.137 C 195.445 138.779,195.323 139.090,195.502 139.583 C 195.565 139.755,198.436 147.396,201.883 156.563 C 205.330 165.729,209.470 176.739,211.083 181.028 L 214.015 188.827 213.483 189.284 C 213.191 189.536,210.436 191.693,207.361 194.079 C 185.361 211.146,178.781 216.292,178.269 216.830 C 177.243 217.907,166.811 249.868,166.918 251.607 C 167.053 253.795,168.781 255.406,170.998 255.413 C 172.413 255.418,173.146 255.030,175.625 252.968 C 182.689 247.091,207.182 227.032,207.395 226.951 C 207.538 226.896,207.701 226.974,207.758 227.123 C 207.815 227.273,211.871 238.083,216.771 251.146 C 225.929 275.559,226.085 275.930,227.564 276.721 L 228.438 277.188 239.896 277.188 L 251.354 277.188 252.338 276.609 C 253.686 275.817,254.375 274.613,254.375 273.050 C 254.375 271.769,255.526 274.911,237.801 227.813 C 234.050 217.844,230.947 209.500,230.905 209.271 C 230.845 208.934,232.561 207.563,239.905 202.083 C 249.248 195.113,249.712 194.698,250.011 193.063 C 250.608 189.799,247.009 186.995,244.104 188.462 C 242.053 189.497,222.299 204.645,221.885 205.500 C 220.956 207.419,220.451 205.879,232.635 238.290 C 238.783 254.642,243.856 268.186,243.910 268.389 C 244.003 268.735,243.667 268.753,238.239 268.701 L 232.469 268.646 222.817 242.952 C 216.441 225.977,213.000 217.080,212.677 216.733 C 211.495 215.467,209.110 215.005,207.652 215.758 C 207.105 216.041,185.188 233.928,181.190 237.354 C 180.527 237.923,179.945 238.348,179.897 238.300 C 179.848 238.251,180.980 234.653,182.411 230.304 C 184.993 222.453,185.019 222.390,185.892 221.629 C 188.873 219.028,224.044 192.025,241.782 178.719 C 263.880 162.142,263.513 162.443,263.823 160.625 C 264.343 157.577,260.995 154.911,258.052 156.030 C 257.768 156.138,249.447 162.292,239.561 169.705 C 229.675 177.119,221.458 183.195,221.302 183.207 C 221.122 183.221,220.685 182.344,220.120 180.833 C 214.515 165.855,199.463 125.951,199.177 125.313 C 198.254 123.250,196.178 122.342,193.955 123.028 "
                stroke="none"
                fill="#000"
                fillRule="evenodd"
              />
            </g>
          </svg>
          <h2 className="mt-6 text-center text-2xl font-black leading-9 tracking-tight text-gray-900">
            کد تایید به ایمیل شما ارسال شد.
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Form {...verificationForm}>
              <form
                onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}
                className="space-y-6"
                dir="rtl"
              >
                <FormField
                  control={verificationForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کد تایید</FormLabel>
                      <FormControl>
                        <Input
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  تایید
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      {showError && (
        <AlertDialog
          onOpenChange={() => {
            setShowError(!showError);
          }}
          open={showError}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                اطلاعات نادرست
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-center">
                کد وارد شده صحیح نمی باشد.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full flex-row items-center justify-center sm:justify-center">
              <AlertDialogCancel>متوجه شدم</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default EmailValidationForm;
