// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// --- Tipos ---
type CartItem = {
  productId: string;
  quantity: number;
};

type SessionDoc = {
  sessionId: string;
  cart: CartItem[];
  createdAt: Date;
};

// --- Helpers ---
async function getSessionsCollection() {
  const client = await clientPromise;
  const db = client.db("watersugar");
  return db.collection<SessionDoc>("sessions");
}

function getSessionIdFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/sessionId=([^;]+)/);
  return match ? match[1] : null;
}

// --- GET: obtener carrito ---
export async function GET(req: Request) {
  const sessionId = getSessionIdFromRequest(req);
  if (!sessionId)
    return NextResponse.json({ error: "No session" }, { status: 400 });

  const sessions = await getSessionsCollection();
  let session = await sessions.findOne({ sessionId });

  if (!session) {
    await sessions.insertOne({
      sessionId,
      cart: [],
      createdAt: new Date(),
    });
    session = await sessions.findOne({ sessionId });
  }

  // En este punto TS sabe que session no es null
  return NextResponse.json({ sessionId, cart: session!.cart });
}

// --- POST: agregar item al carrito ---
export async function POST(req: Request) {
  try {
    const sessionId = getSessionIdFromRequest(req);
    if (!sessionId)
      return NextResponse.json({ error: "No session" }, { status: 400 });

    const body = await req.json();
    const { productId, quantity } = body;
    if (!productId)
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });

    const qty = Math.max(Number(quantity) || 1, 1);

    const sessions = await getSessionsCollection();
    let session = await sessions.findOne({ sessionId });

    if (!session) {
      await sessions.insertOne({
        sessionId,
        cart: [],
        createdAt: new Date(),
      });
      session = await sessions.findOne({ sessionId });
    }

    // Ahora session nunca es null
    const existingIndex = session!.cart.findIndex((i) => i.productId === productId);

    if (existingIndex > -1) {
      await sessions.updateOne(
        { sessionId, "cart.productId": productId },
        { $inc: { "cart.$.quantity": qty } }
      );
    } else {
      await sessions.updateOne(
        { sessionId },
        { $push: { cart: { productId, quantity: qty } } }
      );
    }

    const updatedSession = await sessions.findOne({ sessionId });
    return NextResponse.json({ ok: true, cart: updatedSession?.cart || [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// --- DELETE: vaciar carrito ---
export async function DELETE(req: Request) {
    try {
      const sessionId = getSessionIdFromRequest(req);
      if (!sessionId)
        return NextResponse.json({ error: "No session" }, { status: 400 });
  
      const sessions = await getSessionsCollection();
      await sessions.updateOne(
        { sessionId },
        { $set: { cart: [] } } // Vacía el array completo
      );
  
      return NextResponse.json({ ok: true, cart: [] });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }