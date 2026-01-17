"use client";


import { useSession } from "next-auth/react";
import { useState, useContext, useRef, useEffect } from "react";
import { HomeContext } from "@/src/context";
import { getRefinedAcessToken } from "./usePAT";

export function useDashboard() {
      const { data: session, status } = useSession();
      const [actionsGit, setActionGit] = useState<boolean>(false);
      const {token} = useContext(HomeContext)!;
      const checkedUserIdRef = useRef<number | null>(null);
      const lastTokenRef = useRef<boolean | null>(null);
    
      useEffect(() => {
        const checkUser = async () => {
          if (status === "authenticated" && session?.user?.githubProfile) {
            const githubProfile = session.user.githubProfile;
            const userId = githubProfile.id;
            const tokenChanged = lastTokenRef.current !== null && lastTokenRef.current !== token;
            
            if (checkedUserIdRef.current === userId && !tokenChanged) {
              return;
            }

            try {
              const tokenValue = await getRefinedAcessToken("refinedAcessToken");
              const hasToken = tokenValue !== null;
              if (hasToken) setActionGit(true);
              else setActionGit(false);
              checkedUserIdRef.current = userId;
              lastTokenRef.current = token;
            } catch (error) {
              throw new Error(`[ERROR]: ${error}`);
            }
          }
        };
    
        checkUser();
      }, [status, session?.user?.githubProfile?.id, token]);

      return {actionsGit}
}
