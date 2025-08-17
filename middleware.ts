// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Crear cookie sessionId si no existe
  if (!req.cookies.get("sessionId")) {
    const newSessionId = uuidv4();
    res.cookies.set("sessionId", newSessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return res;
}

// Middleware para todas las rutas excepto estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs", // ⚡ Node runtime para usar uuid
};
