import React from "react";
import * as z from "zod";
import { nameSchema, usernameSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
const UserFormSchema = z.object({
  profile_image: z.string().url().min(1),
  name: nameSchema,
  username: usernameSchema,
  bio: z.string().min(1).max(1000),
});
function AccountProfile() {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      bio: "",
      name: "",
      profile_image: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormSchema>) {}
  return (
    // <Form {...form}>
    //   <form
    //     className="flex flex-col justify-start gap-10"
    //     onSubmit={form.handleSubmit(onSubmit)}
    //   >
    //     <FormField
    //       control={form.control}
    //       name="name"
    //       render={({ field }) => (
    //         <FormItem className="flex w-full flex-col gap-3">
    //           <FormLabel className="font-medium">اسم</FormLabel>
    //           <FormControl>
    //             <Input
    //               type="text"
    //               className="border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
    //               {...field}
    //             />
    //           </FormControl>
    //         </FormItem>
    //       )}
    //     />
    //   </form>
    // </Form>

    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            پروفایل
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            این اطلاعات به صورت عمومی نمایش داده می شود، بنابراین مراقب آنچه به
            اشتراک می گذارید باشید.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Name */}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                نام
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="نام و نام خانوادگی"
                  />
                </div>
              </div>
            </div>
            {/* Username */}
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                نام کاربری
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="AjabCloud"
                  />
                </div>
              </div>
            </div>
            {/* Gender */}
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                جنسیت
              </label>
              <div className="mt-2">
                <fieldset className="mt-4">
                  <legend className="sr-only">Notification method</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <div className="flex items-center">
                      <input
                        id={"male-check"}
                        name="notification-method"
                        type="radio"
                        defaultChecked={true}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={"male-check"}
                        className="ml-3 mr-1.5 block text-sm font-medium leading-6 text-gray-900"
                      >
                        مرد
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id={"female-check"}
                        name="notification-method"
                        type="radio"
                        defaultChecked={true}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={"female-check"}
                        className="ml-3 mr-1.5 block text-sm font-medium leading-6 text-gray-900"
                      >
                        زن
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            {/* Bio */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                درباره
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                چند جمله در مورد خودتان بنویسید.
              </p>
            </div>
            {/* Photo */}
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                عکس
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  عکس جدید
                </button>
              </div>
            </div>
            {/* Cover Photo */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                عکس کاور
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>آپلود عکس</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pr-1">یا بکشید و اینجا رها کنید</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF تا 10 مگابایت.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          لغو
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          دخیره
        </button>
      </div>
    </form>
  );
}

export default AccountProfile;
