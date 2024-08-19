import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useAuth(); // Hook to check if the user is signed in
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      console.log("IS SIGNED IN");
      // Redirect to the dashboard if the user is signed in
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}
