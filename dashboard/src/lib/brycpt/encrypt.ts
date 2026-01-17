"use server";

import crypto from "crypto";

const key = Buffer.from(process.env.CRYPT_KEY!, "base64");

export async function encrypt(value: string): Promise<string> {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    encrypted.toString("base64"),
    iv.toString("base64"),
    tag.toString("base64"),
  ].join(":");
}
