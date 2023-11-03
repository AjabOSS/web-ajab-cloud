import React from "react";
import Link from "next/link";
import Image from "next/image";
import env from "@/env";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface IProps {
  accountId: number | undefined;
  authUsername: string | undefined;
  name: string | undefined;
  username: string | undefined;
  imageURL: string | undefined;
  bio: string | undefined;
}
function ProfileHeader({
  accountId,
  bio,
  imageURL,
  username,
  name,
  authUsername,
}: IProps) {
  return (
    <div className="flex w-full flex-col justify-start">
      {/* Photo & Username & Name & Edit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={`${env.NEXT_PUBLIC_FILE_BASE_URL}${imageURL}` || ""}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-right text-sm font-bold sm:text-2xl">
              {name}
            </h2>
            <p dir="ltr" className="text-gray-1 text-center font-medium">
              @{username}
            </p>
          </div>
        </div>
        {username === authUsername && (
          <Link href="/profile/edit">
            <div className="flex cursor-pointer gap-3 rounded-lg bg-primary px-4 py-2 text-white">
              <p className="max-sm:hidden">ویرایش</p>
              <PencilSquareIcon className="h-5 w-5" />
            </div>
          </Link>
        )}
      </div>

      {/* Bio */}
      <p className="mt-6 max-w-lg">{bio}</p>
      {/* Divider */}
      <div className="mt-12 h-0.5 w-full bg-gray-300" />
    </div>
  );
}

export default ProfileHeader;
