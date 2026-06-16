import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import { notFound } from "next/navigation";

export default async function UserPage() {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard User</h1>
        <LogoutButton />
      </div>

      <p>Welcome {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}