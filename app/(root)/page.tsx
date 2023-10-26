"use client";
import { useSession } from "next-auth/react";

function page() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <main className="flex h-screen items-center justify-center text-3xl font-black">
      سلام دنیا
    </main>
  );
}

export default page;
