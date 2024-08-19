import { UserButton } from "@clerk/nextjs";
import { UserDetails } from "@/app/components/UserDetails";
export default async function DashboardPage() {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <UserDetails />
      </main>
    </>
  );
}
