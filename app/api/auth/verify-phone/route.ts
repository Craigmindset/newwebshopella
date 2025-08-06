import { NextRequest, NextResponse } from "next/server";
// import your db here

export async function POST(req: NextRequest) {
  const { userId, code } = await req.json();
  // TEST: Accept '111111' as valid code
  if (code === "111111") {
    return NextResponse.json({ success: true });
  }
  // const user = await db.user.findUnique({ where: { id: userId } });
  // if (user.phoneVerificationCode === code && user.phoneVerificationCodeExpires > Date.now()) {
  //   await db.user.update({ where: { id: userId }, data: { phoneVerified: true, phoneVerificationCode: null } });
  //   return NextResponse.json({ success: true });
  // }
  return NextResponse.json({
    success: false,
    message: "Invalid or expired code",
  });
}
