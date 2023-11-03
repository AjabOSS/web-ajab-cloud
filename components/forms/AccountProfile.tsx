import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import { nameSchema, usernameSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import env from "@/env";
interface IProps {
  user: {
    name: string | undefined;
    username: string | undefined;
    profile_image: string | undefined;
    bio: string | undefined;
    is_male: boolean | undefined;
  };
}

interface IFile {
  file: File;
  URL?: string;
}

const formSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  profile_image: z.string().url().min(1),
  bio: z.string().max(1000),
  is_male: z.enum(["male", "female"]),
});

function AccountProfile({
  user: { profile_image, is_male, bio, username, name },
}: IProps) {
  const [profile, setProfile] = useState<IFile | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ? username : "",
      name: name ? name : "",
      profile_image: profile_image ? profile_image : "",
      bio: bio ? bio : "",
      is_male: is_male ? "male" : "female",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function handleImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        setProfile({ file: file, URL: imageDataUrl });
        console.log(imageDataUrl);
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="border-b border-gray-900/10 pb-12">
            {/* Title */}
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              پروفایل
            </h2>
            {/* Subtitle */}
            <p className="mt-1 text-sm leading-6 text-gray-600">
              این اطلاعات به صورت عمومی نمایش داده می شود، بنابراین مراقب آنچه
              به اشتراک می گذارید باشید.
            </p>
            {/* Content */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>نام کاربری</FormLabel>
                    <FormControl className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <Input
                        className="block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>نام</FormLabel>
                    <FormControl className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                      <Input
                        className="block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_male"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>جنسیت</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="male"
                        className="flex items-center justify-end"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormLabel className="font-normal">مرد</FormLabel>
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormLabel className="font-normal">زن</FormLabel>
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="sm:col-span-full">
                    <FormLabel>درباره</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </FormControl>
                    <FormDescription>
                      چند جمله در مورد خودتان بنویسید.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profile_image"
                render={({ field }) => (
                  <FormItem className="sm:col-span-full">
                    <FormLabel>عکس </FormLabel>
                    <FormItem className="mt-2 flex items-center gap-x-3">
                      {field.value ? (
                        <Image
                          src={
                            field.value === profile_image
                              ? `${
                                  env.NEXT_PUBLIC_FILE_BASE_URL + profile_image
                                }`
                              : field.value
                          }
                          alt="profile"
                          width={48}
                          height={48}
                          className="rounded-full object-contain"
                          priority
                        />
                      ) : (
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <label
                        htmlFor="profile_image"
                        className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 focus-within:outline-none focus-within:ring-2 
                        focus-within:ring-primary focus-within:ring-offset-2 hover:bg-gray-50 hover:text-primary"
                      >
                        <span>آپلود عکس</span>
                        <input
                          id="profile_image"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </label>
                    </FormItem>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button variant="ghost">لغو</Button>
          <Button type="submit">ذخیره</Button>
        </div>
      </form>
    </Form>
  );
}

export default AccountProfile;
