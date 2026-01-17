"use server";

import crypto from "crypto";

const key = Buffer.from(process.env.CRYPT_KEY!, "base64");

export async function decrypt(token: string): Promise<string> {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) {
      throw new Error(`Token inválido: esperado formato 'data:iv:tag', recebido '${token.substring(0, 50)}...'`);
    }

    const [data, iv, tag] = parts;

    if (!data || !iv || !tag) {
      throw new Error("Token criptografado incompleto - partes vazias detectadas");
    }

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(tag, "base64"));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(data, "base64")),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    throw error;
  }
}
