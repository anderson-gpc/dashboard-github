"use client";

import { useEffect, useState } from "react";

export function useHasGithubPat() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    fetch("/api/github/has-token")
      .then(res => res.json())
      .then(data => setHasToken(data.hasToken));
  }, []);

  return hasToken;
}

export async function getRefinedAcessToken(key: string): Promise<string | null> {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    
    const response = await fetch("/api/github/get-token");
    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        return data.token;
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

export function setRefinedAcessToken(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    
    fetch("/api/github/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: value }),
    })
      .then(response => {
        if (!response.ok) {
          console.error("Erro ao salvar token no servidor: ", response.statusText);
        }
      })
      .catch(error => console.error("Erro ao salvar token no servidor:", error));
    
    return true;
  } catch (error) {
    return false;
  }
}

export function removeRefinedAcessToken(key: string): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    
    fetch("/api/github/remove-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(error => console.error("Erro ao remover token do servidor:", error));
    
    return true;
  } catch (error) {
    console.error("Erro ao remover token:", error);
    return false;
  }
}
