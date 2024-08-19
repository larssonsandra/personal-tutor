import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="relative flex gap-3">
      <p>Landing page</p>
      <SignIn routing="hash" />
    </div>
  );
}
