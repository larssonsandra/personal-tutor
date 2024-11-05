import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-grow overflow-auto">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Välkommen till Personal Tutor
        </h2>
        <p className="mb-4">
          En webbplats som hjälper dig att lära dig med personliga lärare.
        </p>
        <Link className="text-blue-500 underline" href="/dashboard">
          Gå till vår dashboard
        </Link>
      </section>
    </main>
  );
}
