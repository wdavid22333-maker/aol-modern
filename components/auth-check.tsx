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
      // This is a simplified check - in a real implementation, you would:
      // 1. Check for AOL-specific cookies
      // 2. Validate them against AOL's authentication system
      // 3. Retrieve user information

      // For demonstration, we'll simulate checking for AOL cookies
      const cookies = document.cookie;
      const hasAOLCookies = cookies.includes('aol') || cookies.includes('aim') || cookies.includes('compuserve');

      if (hasAOLCookies) {
        // Simulate fetching user info from AOL
        // In reality, this would involve calling AOL's OpenID Connect API
        setAuthStatus({
          authenticated: true,
          message: "Existing AOL session detected",
          username: "AOL User" // This would be retrieved from AOL's API
        });
      } else {
        setAuthStatus({
          authenticated: false,
          message: "No existing AOL session found"
        });
      }
    } catch (error) {
      console.error("Failed to check AOL auth status:", error);
      setAuthStatus({
        authenticated: false,
        message: "Unable to check AOL authentication status"
      });
    } finally {
      setCheckingAuth(false);
      setLoading(false);
    }
  };

  // Manual verification that user has opened AOL in another tab
  const handleManualVerification = () => {
    setAuthStatus({
      authenticated: true,
      message: "Manual verification complete",
      username: "AOL User"
    });
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
        {authStatus.authenticated ? "✅ Already Signed In" : "⚠️ Not Signed In"}
      </h3>
      <p className="mb-4 text-muted-foreground">{authStatus.message}</p>

      {authStatus.authenticated ? (
        <div className="space-y-2">
          <p className="text-sm">Welcome back, {authStatus.username}!</p>
          <Button onClick={() => window.open("https://aol.com", "_blank")}>
            Open AOL Services
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              To access AOL services without signing in again:
            </p>
            <ol className="text-sm text-left list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Open <a href="https://aol.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">aol.com</a> in another tab and sign in</li>
              <li>Once signed in, click the button below to verify your session</li>
            </ol>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handleManualVerification}>
              I've opened AOL in another tab
            </Button>
            <Button onClick={checkAOLAuth} variant="secondary">
              Check Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}