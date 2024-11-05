"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Redirect to the dashboard if the user is already signed in
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className="flex h-screen items-center justify-center flex-grow overflow-auto">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </main>
  );
}
