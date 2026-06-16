"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-6 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
    >
      Logout
    </button>
  );
}
