import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// import your db and email utility here

export async function POST(req: NextRequest) {
  const { email, userId } = await req.json();
  const token = uuidv4();
  // Save token and expiry to user in DB (pseudo-code)
  // await db.user.update({ where: { id: userId }, data: { emailVerificationToken: token, emailVerificationTokenExpires: Date.now() + 1000*60*30 } });
  // Send email (pseudo-code)
  // await sendVerificationEmail(email, token);
  return NextResponse.json({ success: true });
}
