// src/app/api/cart/item/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type CartItem = { productId: string; quantity: number; size: string };
type SessionDoc = { sessionId: string; cart: CartItem[]; createdAt: Date };

async function getSessionsCollection() {
  const client = await clientPromise;
  return client.db("watersugar").collection<SessionDoc>("sessions");
}

// Función para generar headers con cookie si no existe sessionId
function ensureSessionIdCookie(req: Request): { sessionId: string; headers?: Record<string, string> } {
  const cookieHeader = req.headers.get("cookie");
  let sessionId = cookieHeader?.match(/sessionId=([^;]+)/)?.[1];
  const headers: Record<string, string> = {};

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    headers["Set-Cookie"] = `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax`;
  }

  return { sessionId, headers: Object.keys(headers).length ? headers : undefined };
}

// DELETE: eliminar un item del carrito
export async function DELETE(req: Request) {
  try {
    const { sessionId, headers } = ensureSessionIdCookie(req);

    const body = await req.json();
    const { productId, size } = body;
    if (!productId || !size) return NextResponse.json({ error: "Missing productId or size" }, { status: 400, headers });

    const sessions = await getSessionsCollection();
    await sessions.updateOne(
      { sessionId },
      { $pull: { cart: { productId, size } } }
    );

    const updatedSession = await sessions.findOne({ sessionId });
    return NextResponse.json({ ok: true, cart: updatedSession?.cart || [] }, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
