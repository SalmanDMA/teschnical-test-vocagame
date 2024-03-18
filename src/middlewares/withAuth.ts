import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { cookies } from "next/headers";
import { checkUserKeys, findCookieKeys } from "@/utils/searchKeyCookies";

const authPage = ["/auth/login", "/auth/register"];
export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const cookieStore = cookies();
    const pathName = req.nextUrl.pathname;
    if (requireAuth.includes(pathName)) {
      const cookieKeys = cookieStore.getAll();

      const resultCookies: string[] = await findCookieKeys(cookieKeys);
      const userKeys = await checkUserKeys(resultCookies);

      if (!userKeys && !authPage.includes(pathName)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
    return middleware(req, next);
  };
}
