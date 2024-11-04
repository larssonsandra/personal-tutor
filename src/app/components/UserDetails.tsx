"use client";

import { useSession, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user || !session) return null;

  return (
    <div className="p-16 rounded-lg border border-[#EDEDED] bg-[#F1F1F2] background relative">
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-full relative flex justify-center flex-col items-center gap-3">
          <h2 className="text-lg font-bold mb-10">
            <Link
              href="/reading"
              className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              Try our Reading Tutor beta-version!
            </Link>
          </h2>
          <img src={user.imageUrl} className="size-20 rounded-full" />
          <h3 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-[#666666]">
            {user.emailAddresses[0].emailAddress}
          </p>
          <p className="text-sm text-[#666666]">Progress ...</p>
        </div>
      </div>
    </div>
  );
}
