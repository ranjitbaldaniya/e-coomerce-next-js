  import { getToken } from "next-auth/jwt";
  import { NextRequest, NextResponse } from "next/server";

  export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log("path ===>" , path)
    // console.log("token ===>" , token)

    // const publicPaths = path === "/" || path === "/register" ||  path === "/login" ||  path === "/aboutus"||  path === "/contactus";

  //   if (publicPaths && token) {
  //     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  //   }
  //   if (!publicPaths && !token) {
  //     return NextResponse.redirect(new URL("/login", req.nextUrl));
  //   }
  // }
  const publicPaths = ["/", "/register", "/login", "/aboutus", "/contactus"];

    // Allow access to public routes regardless of authentication status
    if (publicPaths.includes(path)) {
      return ;
    }
  
    // Allow access to authenticated routes only if user is logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  export const config = {
    matcher: ["/", "/login" , "/register" , "/dashboard" , "/aboutus" , "/contactus" ],
  };
