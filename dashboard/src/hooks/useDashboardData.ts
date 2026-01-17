"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { octokitClient } from "@/lib/github/octokit";
import { NetworkInterface } from "@/interfaces/network-interface";
import { getRefinedAcessToken } from "./usePAT";
import { HomeContext } from "@/src/context";

export function useDashboardData(session: any) {
  const [mutualFollowers, setMutualFollowers] = useState<NetworkInterface[]>(
    []
  );
  const [nonFollowers, setNonFollowers] = useState<NetworkInterface[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  const sessionUserIdRef = useRef<string | null>(null);
  const tokenRef = useRef<boolean | null>(null);
  const { token } = useContext(HomeContext)!;

  useEffect(() => {
    const currentUserId = session?.user?.githubProfile?.id;
    const tokenChanged = tokenRef.current !== null && tokenRef.current !== token;
    const shouldFetch = !hasFetchedRef.current || 
                       sessionUserIdRef.current !== currentUserId || 
                       tokenChanged;

    if (!shouldFetch || !session?.user?.githubProfile) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      let acess: string | null;

      if (!session.acessToken)
        acess = await getRefinedAcessToken("refinedAcessToken");
      else acess = session.acessToken;

      if (!acess || typeof acess !== "string") {
        console.warn("Sem token disponível");
        setLoading(false);
        return;
      }

      // Token já vem descriptografado do servidor, não precisa descriptografar novamente
      const githubToken = acess;
      const login = session.user.githubProfile.login;

      const followersResponse = await octokitClient(1, githubToken, login);
      const followingResponse = await octokitClient(2, githubToken, login);
      const issuesResponse = await octokitClient(4, githubToken, login);

      const followers = Array.isArray(followersResponse)
        ? followersResponse
        : followersResponse.data;

      const following = Array.isArray(followingResponse)
        ? followingResponse
        : followingResponse.data;

      const issues = Array.isArray(issuesResponse)
        ? issuesResponse
        : issuesResponse.data;

      const mutual = following.filter((u: any) =>
        followers.some((f: any) => f.id === u.id)
      );

      const non = following.filter(
        (u: any) => !followers.some((f: any) => f.id === u.id)
      );

      setMutualFollowers(mutual);
      setNonFollowers(non);
      setIssues(issues);
      setLoading(false);
      hasFetchedRef.current = true;
      sessionUserIdRef.current = currentUserId;
      tokenRef.current = token;
    };

    fetchData();
  }, [session?.user?.githubProfile?.id, session?.acessToken, token]);

  return { mutualFollowers, nonFollowers, issues, loading };
}
