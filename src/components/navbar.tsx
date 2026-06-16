"use client";

import Link from "next/link";
import LogoutButton from "./logout-button";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-semibold text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/dashboard/user" className="text-sm text-gray-600 hover:text-gray-800">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/dashboard/admin/add"
              className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add
            </Link>
          )}

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
