import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/brycpt/encrypt";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {

      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      );
    }

    
    // Criptografa o token
    const encrypted = await encrypt(token);

    // Salva em cookies criptografado
    (await cookies()).set("github_pat", encrypted, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    });

    return NextResponse.json(
      { message: "Token salvo com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao salvar token", details: String(error) },
      { status: 500 }
    );
  }
}
