"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/navbar";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dateMade, setDateMade] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, dateMade }),
    });
    router.push("/dashboard/admin");
  }

  return (
    <div className="page-dashboard-admin-add">
      <Navbar isAdmin />
      <main className="p-5">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border p-2" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (numeric)" className="w-full border p-2" />
          <input value={dateMade} onChange={(e) => setDateMade(e.target.value)} type="date" className="w-full border p-2" />
          <button className="rounded bg-black px-4 py-2 text-white">Create</button>
        </form>
      </main>
    </div>
  );
}
