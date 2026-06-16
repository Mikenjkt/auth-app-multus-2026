import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  //Cek lagi kalo minsal nanti gabisa btw

  try {
    await (prisma as any).product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
    //gak adaaaaaaaaaa
  }
}

//ini yang buat handle edit
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  try {
    const updated = await (prisma as any).product.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        dateMade: new Date(body.dateMade),
      },
    });

    return NextResponse.json({ id: updated.id });
  } catch (e) {
    return NextResponse.json({ error: "Could not update" }, { status: 400 });
  }
}
