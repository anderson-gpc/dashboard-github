import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    (await cookies()).delete("github_pat");

    return NextResponse.json(
      { message: "Token removido com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao remover token:", error);
    return NextResponse.json(
      { error: "Erro ao remover token" },
      { status: 500 }
    );
  }
}
