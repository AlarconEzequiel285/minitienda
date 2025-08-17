// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type CartItem = { productId: string; quantity: number; size: string};
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

// POST: Agregar producto al carrito
export async function POST(req: Request) {
  try {
    const { sessionId, headers } = ensureSessionIdCookie(req);

    const body = await req.json();
    const { productId, quantity, size } = body;
    if (!productId || !quantity || !size) return NextResponse.json({ error: "Missing data" }, { status: 400, headers });

    const sessions = await getSessionsCollection();
    const session = await sessions.findOne({ sessionId });

    if (session) {
      const index = session.cart.findIndex(c => c.productId === productId && c.size === size);
      if (index >= 0) session.cart[index].quantity += quantity;
      else session.cart.push({ productId, quantity, size });
      await sessions.updateOne({ sessionId }, { $set: { cart: session.cart } });
    } else {
      await sessions.insertOne({ sessionId, cart: [{ productId, quantity, size }], createdAt: new Date() });
    }

    const updatedSession = await sessions.findOne({ sessionId });
    return NextResponse.json({ ok: true, cart: updatedSession?.cart || [] }, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: Obtener carrito
export async function GET(req: Request) {
  try {
    const { sessionId, headers } = ensureSessionIdCookie(req);

    const sessions = await getSessionsCollection();
    const session = await sessions.findOne({ sessionId });

    return NextResponse.json({ ok: true, cart: session?.cart || [] }, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: Vaciar carrito
export async function DELETE(req: Request) {
  try {
    const { sessionId, headers } = ensureSessionIdCookie(req);

    const sessions = await getSessionsCollection();
    await sessions.updateOne({ sessionId }, { $set: { cart: [] } });

    return NextResponse.json({ ok: true, cart: [] }, { headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
