// src/app/api/cart/item/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type CartItem = { productId: string; quantity: number };
type SessionDoc = { sessionId: string; cart: CartItem[]; createdAt: Date };

async function getSessionsCollection() {
  const client = await clientPromise;
  return client.db("watersugar").collection<SessionDoc>("sessions");
}

function getSessionId(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/sessionId=([^;]+)/);
  return match ? match[1] : null;
}

export async function DELETE(req: Request) {
  try {
    const sessionId = getSessionId(req);
    if (!sessionId) return NextResponse.json({ error: "No session" }, { status: 400 });

    const body = await req.json();
    const { productId } = body;
    if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

    const sessions = await getSessionsCollection();
    const session = await sessions.findOne({ sessionId });
    if (!session) return NextResponse.json({ ok: true, cart: [] });

    // Eliminar solo el item que coincida con productId
    await sessions.updateOne(
      { sessionId },
      { $pull: { cart: { productId } } }
    );

    const updatedSession = await sessions.findOne({ sessionId });
    return NextResponse.json({ ok: true, cart: updatedSession?.cart || [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
