import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navbar";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  if (!id) {
    console.log("99999 NO ID");
    notFound();
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    console.log("99999 NO PRODUCT");
    notFound();
  }

  return (
    <div className="page-dashboard-admin-edit">
      <Navbar isAdmin />

      <main className="p-5">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <form id="edit-form" action={`/api/products/${product.id}`} method="post" className="max-w-md space-y-4">
          <input name="_method" type="hidden" value="PUT" />
          <input defaultValue={product.name} name="name" placeholder="Name" className="w-full border p-2" />
          <input defaultValue={product.price.toString()} name="price" placeholder="Price" className="w-full border p-2" />
          <input defaultValue={product.dateMade.toISOString().slice(0, 10)} name="dateMade" type="date" className="w-full border p-2" />
          <button type="submit" className="rounded bg-black px-4 py-2 text-white">Save</button>
        </form>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            // intercept form submission to call PUT endpoint
            const f = document.getElementById('edit-form');
            f.addEventListener('submit', async function(e){
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                price: form.price.value,
                dateMade: form.dateMade.value
              };
              await fetch(form.action, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              window.location.href = '/dashboard/admin';
            });
          })();
        ` }} />
      </main>
    </div>
  );
}
