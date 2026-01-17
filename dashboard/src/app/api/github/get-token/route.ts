import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/brycpt/descrypt";

export async function GET() {
  try {
    const encryptedToken = (await cookies()).get("github_pat")?.value;
    
    if (!encryptedToken) {

      return NextResponse.json(
        { token: null },
        { status: 200 }
      );
    }

    const decryptedToken = await decrypt(encryptedToken);

    return NextResponse.json(
      { token: decryptedToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao obter token", details: String(error) },
      { status: 500 }
    );
  }
}
