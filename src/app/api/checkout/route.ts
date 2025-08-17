import { NextRequest, NextResponse } from "next/server";

// "Base de datos" en memoria
let purchases: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart, total, shipping } = body;

    // Usar sessionId de cookie en vez de userId
    const sessionId = req.cookies.get("sessionId")?.value;
    if (!sessionId) {
      return NextResponse.json({ success: false, error: "No sessionId cookie" }, { status: 400 });
    }

    const purchase = {
      id: Date.now().toString(),
      sessionId, // ahora es por sesión
      cart,
      total,
      shipping,
      date: new Date().toISOString(),
    };

    purchases.push(purchase);

    return NextResponse.json({ success: true, purchase });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Error al procesar la compra" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;
  if (!sessionId) {
    return NextResponse.json({ success: false, error: "No sessionId cookie" }, { status: 400 });
  }

  const userPurchases = purchases.filter(p => p.sessionId === sessionId);
  return NextResponse.json({ success: true, purchases: userPurchases });
}
