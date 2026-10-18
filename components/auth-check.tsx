"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AuthCheck() {
  const [authStatus, setAuthStatus] = useState<{
    authenticated: boolean;
    message: string;
    username?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(false);

  // Check for existing AOL authentication
  const checkAOLAuth = async () => {
    setCheckingAuth(true);
    try {
      // In a real implementation, this would call our API endpoint
      // that checks for actual AOL authentication
      const response = await fetch("/api/auth/check-aol-session");

      if (response.ok) {
        const data = await response.json();
        setAuthStatus(data);
      } else {
        // Fallback to simulated check
        setAuthStatus({
          authenticated: false,
          message: "No existing AOL session detected. Please open AOL in another tab."
        });
      }
    } catch (error) {
      console.error("Failed to check AOL auth status:", error);
      // Fallback to simulated check
      setAuthStatus({
        authenticated: false,
        message: "Unable to check AOL authentication status. Please open AOL in another tab."
      });
    } finally {
      setCheckingAuth(false);
      setLoading(false);
    }
  };

  // Manual verification that user has opened AOL in another tab
  const handleManualVerification = async () => {
    setCheckingAuth(true);
    try {
      // In a real implementation, this would attempt to verify
      // that the user has actually opened AOL in another tab
      const response = await fetch("/api/auth/manual-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setAuthStatus({
          authenticated: data.authenticated,
          message: data.authenticated
            ? "AOL session verified!"
            : "Please ensure you're signed in to AOL in another tab, then try again.",
          username: data.username
        });
      } else {
        setAuthStatus({
          authenticated: false,
          message: "Unable to verify AOL session. Please ensure you're signed in to AOL in another tab."
        });
      }
    } catch (error) {
      console.error("Failed to verify AOL session:", error);
      setAuthStatus({
        authenticated: false,
        message: "Unable to verify AOL session. Please ensure you're signed in to AOL in another tab."
      });
    } finally {
      setCheckingAuth(false);
    }
  };

  // Redirect to AOL for authentication
  const handleAOLLogin = () => {
    // In a real implementation, this would redirect to AOL's OAuth endpoint
    window.open("https://aol.com", "_blank");
  };

  // Open AOL email
  const handleOpenEmail = () => {
    // In a real implementation, this would open the user's AOL email
    window.open("https://mail.aol.com", "_blank");
  };

  useEffect(() => {
    checkAOLAuth();
  }, []);

  if (loading || checkingAuth) {
    return <div className="text-center py-4">Checking AOL authentication...</div>;
  }

  if (!authStatus) {
    return <div className="text-center py-4">Authentication status unavailable</div>;
  }

  return (
    <div className="rounded-lg border p-6 text-center">
      <h3 className="text-xl font-bold mb-2">
        {authStatus.authenticated ? "✅ Signed In" : "⚠️ Not Signed In"}
      </h3>
      <p className="mb-4 text-muted-foreground">{authStatus.message}</p>

      {authStatus.authenticated ? (
        <div className="space-y-2">
          <p className="text-sm">Welcome back{authStatus.username ? `, ${authStatus.username}` : ""}!</p>
          <Button onClick={handleOpenEmail}>
            Open AOL Email
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              To access AOL services:
            </p>
            <ol className="text-sm text-left list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Sign in to <a href="https://aol.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">aol.com</a> in another tab</li>
              <li>Click the verification button below</li>
            </ol>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handleManualVerification}>
              Verify My AOL Session
            </Button>
            <Button onClick={handleAOLLogin} variant="secondary">
              Go to AOL.com
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}