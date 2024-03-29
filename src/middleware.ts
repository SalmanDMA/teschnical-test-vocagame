import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const response = NextResponse.next();
  return response;
}
export default withAuth(mainMiddleware, ["/", "/auth/login", "/auth/register"]);
