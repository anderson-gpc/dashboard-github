import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const hasToken = (await cookies()).has("github_pat");
  return NextResponse.json({ hasToken });
}
