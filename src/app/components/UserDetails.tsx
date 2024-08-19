"use client";

import { useSession, useUser } from "@clerk/nextjs";

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user || !session) return null;

  return (
    <div className="p-16 rounded-lg border border-[#EDEDED] bg-[#F1F1F2] background relative">
      <div className="p-8 rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5 max-w-[25rem]">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-full relative flex justify-center">
            <img src={user.imageUrl} className="size-20 rounded-full" />
            <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
              <div className="relative">
                <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
              </div>
              <div className="font-mono text-xs bg-black px-1.5 py-1 rounded-md text-white">
                user.imageUrl
              </div>
            </div>
          </div>
          {user.firstName && user.lastName ? (
            <h1 className="text-[1.0625rem] font-semibold relative w-full text-center">
              {user.firstName} {user.lastName}
              <div className="absolute w-fit flex items-center gap-5 top-1/2 -translate-x-2.5 -translate-y-1/2 left-full">
                <div className="relative">
                  <div className="h-px bg-[#BFBFC4] w-[6.5rem]" />
                  <div className="size-1 bg-[#BFBFC4] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
                <div className="font-mono text-xs bg-black px-1.5 py-1 rounded-md text-white">
                  user.firstName
                </div>
                <div className="font-mono text-xs bg-black px-1.5 py-1 rounded-md text-white -translate-x-3">
                  user.lastName
                </div>
              </div>
            </h1>
          ) : (
            <div className="h-4" />
          )}
        </div>
      </div>
    </div>
  );
}
