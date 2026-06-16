"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: string; // decimal as string
  dateMade: string; // ISO
};

export default function ProductTable({ products, isAdmin = false }: { products: Product[]; isAdmin?: boolean }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function fmtPrice(s: string) {
    const n = Number(s);
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "IDR" }).format(n);
  }

  function fmtDate(iso: string) {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Made</th>
            {isAdmin && (
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((p, i) => (
            <tr key={p.id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{i + 1}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{p.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtPrice(p.price)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtDate(p.dateMade)}</td>
              {isAdmin && (
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <Link href={`/dashboard/admin/edit/${p.id}`} className="inline-flex mr-2 items-center rounded bg-yellow-400 px-2 py-1 text-xs font-medium text-gray-900 hover:bg-yellow-500">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="inline-flex items-center rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
