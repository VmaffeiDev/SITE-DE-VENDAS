import { NextResponse, type NextRequest } from "next/server";

function isAuthorized(request: NextRequest) {
  const user = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return true;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  const credentials = atob(authorization.slice("Basic ".length));
  const separator = credentials.indexOf(":");
  const providedUser = credentials.slice(0, separator);
  const providedPassword = credentials.slice(separator + 1);

  return providedUser === user && providedPassword === password;
}

export function middleware(request: NextRequest) {
  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  return new Response("Autenticacao necessaria.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="VMAFFEI Motors Admin"'
    }
  });
}

export const config = {
  matcher: ["/admin/:path*"]
};
