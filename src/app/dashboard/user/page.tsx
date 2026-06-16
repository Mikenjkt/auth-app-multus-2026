import { auth } from "@/auth";

export default async function UserPage() {
  const session = await auth();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">
        Dashboard User
      </h1>

      <p>
        Welcome {session?.user?.email}
      </p>

      <p>
        Role: {session?.user?.role}
      </p>
    </div>
  );
}