"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AuthCheck() {
  const [authStatus, setAuthStatus] = useState<{ authenticated: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();
        setAuthStatus(data);
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setAuthStatus({ authenticated: false, message: "Unable to check authentication status" });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Checking authentication...</div>;
  }

  if (!authStatus) {
    return <div className="text-center py-4">Authentication status unavailable</div>;
  }

  return (
    <div className="rounded-lg border p-6 text-center">
      <h3 className="text-xl font-bold mb-2">
        {authStatus.authenticated ? "✅ Already Signed In" : "⚠️ Not Signed In"}
      </h3>
      <p className="mb-4 text-muted-foreground">{authStatus.message}</p>
      {authStatus.authenticated ? (
        <Button onClick={() => window.open("https://aol.com", "_blank")}>
          Open AOL Services
        </Button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Open AOL in another tab to authenticate, then refresh this page
          </p>
          <Button onClick={() => window.open("https://aol.com", "_blank")} variant="secondary">
            Go to AOL.com
          </Button>
        </div>
      )}
    </div>
  );
}