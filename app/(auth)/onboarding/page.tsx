"use client";
import { useSession } from "next-auth/react";
import AccountProfile from "@/components/forms/AccountProfile";

function Page() {
  const { data, status } = useSession();

  if (status === "loading") return null;

  return (
    <main
      className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20"
      dir="rtl"
    >
      <h1 className="font-bold">تکمیل پروفایل</h1>
      <p className="mt-3">برای استفاده از عجب ابر پروفایل خود را کامل کنید</p>

      <section className="mt-9 bg-slate-50 p-10">
        <AccountProfile
          user={{
            name: data?.user.name,
            username: data?.user.username,
            bio: data?.user.bio,
            profile_image: data?.user.profile_image,
            is_male: data?.user.is_male,
          }}
        />
      </section>
    </main>
  );
}

export default Page;
