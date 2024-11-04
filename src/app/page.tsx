import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main className="flex-grow overflow-auto">
      <div className="relative flex gap-3">
        <h2 className="text-lg font-bold mb-10 text-center">
          <Link
            href="/reading"
            className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
          >
            Try our Reading Tutor beta-version!
          </Link>
        </h2>
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
