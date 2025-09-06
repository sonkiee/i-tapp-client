import { NextResponse } from "next/server";
import { parseCookies, setCookie } from "nookies";
import jwt from "jsonwebtoken";

export function middleware(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return NextResponse.redirect("/haha");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.setHeader(
      "Set-Cookie",
      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect("/haha");
  }
}

export const config = {
  matcher: "/api/protected/*",
};
