"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Lily_Script_One } from "next/font/google";
import { useSession } from "next-auth/react";
import env from "@/env";
import { CloudIcon } from "@heroicons/react/24/solid";

const lily = Lily_Script_One({ subsets: ["latin"], weight: "400" });

function Topbar() {
  const { data, status } = useSession();
  if (status === "unauthenticated" || status === "loading") return null;
  return (
    <div className="fixed top-0 z-30 flex w-full items-center justify-between bg-slate-50 px-6 py-3">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${data?.user.username}/`}>
          <Image
            src={env.NEXT_PUBLIC_FILE_BASE_URL + data?.user.profile_image}
            alt="user profile"
            width={48}
            height={48}
            className="cursor-pointer rounded-full"
          />
        </Link>

        <span className="mobile-lg:block hidden text-lg font-semibold">
          {data?.user.name}
        </span>
      </div>
      <Link href="/" className="flex items-center gap-2">
        <p className={`${lily.className} text-2xl`}>Ajab Cloud</p>
        <CloudIcon className="mobile-lg:block hidden h-7 w-7" />
      </Link>
    </div>
  );
}

export default Topbar;
