import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse(null, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin VMAFFEI Motors", charset="UTF-8"'
    }
  });
}

export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUser = process.env.ADMIN_USER || "admin";

  if (!adminPassword) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("ADMIN_PASSWORD não configurado no servidor.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
    return NextResponse.next();
  }

  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const decoded = atob(authHeader.slice(6));
    const colonIndex = decoded.indexOf(":");
    if (colonIndex < 0) return unauthorized();

    const user = decoded.slice(0, colonIndex);
    const password = decoded.slice(colonIndex + 1);

    if (user !== adminUser || password !== adminPassword) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
