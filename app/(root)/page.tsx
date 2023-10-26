"use client";
import { signOut, useSession } from "next-auth/react";

function page() {
  const { data } = useSession();
  console.log(data?.user);
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className={"text-3xl font-black"}>سلام دنیا</h1>
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          غیر فعال کن
        </button>
      </div>
    </main>
  );
}

export default page;
