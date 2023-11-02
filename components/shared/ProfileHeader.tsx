import React from "react";
import Image from "next/image";

interface IProps {
  accountId: number | undefined;
  authUserId: number | undefined;
  name: string | undefined;
  username: string | undefined;
  imageURL: string | undefined;
  bio: string | undefined;
}
function ProfileHeader({
  bio,
  accountId,
  imageURL,
  username,
  name,
  authUserId,
}: IProps) {
  return (
    <div className="flex w-full flex-col justify-start">
      {/* Photo & Username & Name & Edit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imageURL || ""}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-light-1 text-right text-2xl font-bold">
              {name}
            </h2>
            <p dir="ltr" className="text-gray-1 text-center font-medium">
              @{username}
            </p>
          </div>
        </div>
      </div>
      {/* Bio */}
      <p className="mt-6 max-w-lg">{bio}</p>
      {/* Divider */}
      <div className="mt-12 h-0.5 w-full bg-gray-300" />
    </div>
  );
}

export default ProfileHeader;
