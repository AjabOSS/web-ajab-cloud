"use client";
import React from "react";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { useSession } from "next-auth/react";
import { useGetUserByUsername } from "@/lib/Queries/user.query";

interface IProps {
  params: { username: string };
}
function Page({ params: { username } }: IProps) {
  const { data, status } = useSession();
  const { data: user } = useGetUserByUsername(username || "");
  console.log(user);

  if (status == "loading") return null;

  return (
    <section>
      <ProfileHeader
        accountId={user?.user_id}
        username={user?.username}
        name={user?.name}
        bio={user?.bio}
        imageURL={user?.profile_image}
        authUsername={data?.user.username}
      />
    </section>
  );
}

export default Page;
