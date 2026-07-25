import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function constantTimeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) {
    let result = 1;
    for (let i = 0; i < Math.max(ea.length, eb.length); i++) {
      result |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
    }
    return false;
  }
  let result = 0;
  for (let i = 0; i < ea.length; i++) {
    result |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  }
  return result === 0;
}

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

    const userOk = constantTimeEqual(user, adminUser);
    const passOk = constantTimeEqual(password, adminPassword);
    if (!userOk || !passOk) {
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
