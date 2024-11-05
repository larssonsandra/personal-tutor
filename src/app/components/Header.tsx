"use client";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
  useUser,
} from "@clerk/nextjs";

export function Header() {
  const { user } = useUser();
  const { session } = useSession();

  return (
    <header className="flex justify-between px-4 py-2 bg-gray-200">
      <h1>Logo</h1>
      <div className="flex justify-between">
        {/* Check for user and session */}
        {user && session ? (
          <>
            {/* @ts-ignore */}
            <SignedIn>
              <SignOutButton>
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                  Logga ut
                </button>
              </SignOutButton>
              <img src={user.imageUrl} className="size-10 rounded-full" />
            </SignedIn>
          </>
        ) : (
          // Fallback UI when user or session is not available
          <>
            {/* @ts-ignore */}
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                  Logga in
                </button>
              </SignInButton>
            </SignedOut>
            {/* <div>Logga in</div> */}
          </>
        )}
      </div>
    </header>
  );
}
