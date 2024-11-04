import { UserButton } from "@clerk/nextjs";
import { UserDetails } from "@/app/components/UserDetails";
export default async function DashboardPage() {
  return (
    <>
      <main className="flex-grow overflow-auto">
        <UserDetails />
      </main>
    </>
  );
}
