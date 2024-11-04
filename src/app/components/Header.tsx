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

  if (!user || !session) return null;

  return (
    <header className="flex justify-between px-4 py-2 bg-gray-200">
      <h1>Logo</h1>
      <div className="flex justify-between">
        <SignedIn>
          <SignOutButton>
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign Out
            </button>
          </SignOutButton>
          <img src={user.imageUrl} className="size-10 rounded-full" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
