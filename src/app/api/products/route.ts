import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  // serialize Decimal and Date
  const result = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price.toString(),
    dateMade: p.dateMade.toISOString(),
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.price || !body.dateMade) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const created = await prisma.product.create({
    data: {
      name: String(body.name),
      price: body.price,
      dateMade: new Date(body.dateMade),
    },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}
