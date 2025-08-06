import { NextRequest, NextResponse } from "next/server";
// import your db here

export async function POST(req: NextRequest) {
  const { userId, token } = await req.json();
  // TEST: Accept '111111' as valid token
  if (token === "111111") {
    return NextResponse.json({ success: true });
  }
  // const user = await db.user.findUnique({ where: { id: userId } });
  // if (user.emailVerificationToken === token && user.emailVerificationTokenExpires > Date.now()) {
  //   await db.user.update({ where: { id: userId }, data: { emailVerified: true, emailVerificationToken: null } });
  //   return NextResponse.json({ success: true });
  // }
  return NextResponse.json({
    success: false,
    message: "Invalid or expired token",
  });
}
