"use server"


import { descrypt } from "@/lib/brycpt/descrypt";
import { octokitClient } from "@/lib/github/octokit";

export async function removeFollowerAction(session: any, userName: string) {
  const token = await descrypt(session.acessToken);
  await octokitClient(3, token, session.user.githubProfile.login, userName);
}

