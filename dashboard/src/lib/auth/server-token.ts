"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/brycpt/descrypt";

export async function getServerTokenFromCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const encryptedToken = cookieStore.get("github_pat")?.value;
    
    if (!encryptedToken) {
      return null;
    }

    const decrypted = await decrypt(encryptedToken);
    return decrypted;
  } catch (error) {
    console.error("Erro ao obter token do servidor:", error);
    return null;
  }
}
