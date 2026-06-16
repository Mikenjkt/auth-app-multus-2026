import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import ProductTable from "@/components/product-table";
import { prisma } from "@/lib/prisma";

export default async function UserPage() {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  const products = await (prisma as any).product.findMany({ orderBy: { createdAt: "desc" } });

  const serial = products.map((p: any) => ({ id: p.id, name: p.name, price: p.price.toString(), dateMade: p.dateMade.toISOString() }));

  return (
    <div className="page-dashboard-user">
      <Navbar />

      <main className="p-5">
        <h1 className="mb-4 text-2xl font-bold">Dashboard User</h1>

        <ProductTable products={serial} />
      </main>
    </div>
  );
}