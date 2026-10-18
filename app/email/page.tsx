"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EmailPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [emailData, setEmailData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-aol-session");
        if (response.ok) {
          const data = await response.json();
          setAuthenticated(data.authenticated);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleOpenAOLMail = () => {
    window.open("https://mail.aol.com", "_blank");
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border p-8 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">AOL Email Access</h1>
          <p className="mb-6 text-muted-foreground">
            You need to be signed in to AOL to access your email.
          </p>
          <Button onClick={handleOpenAOLMail} size="lg">
            Sign in to AOL Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="rounded-lg border p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AOL Email</h1>
          <Button onClick={handleOpenAOLMail}>
            Open Full AOL Mail
          </Button>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Modern AOL Email Interface</h2>
          <p className="text-muted-foreground mb-4">
            This is a conceptual interface showing how AOL email could be accessed through our modern interface.
          </p>
          <p className="text-sm text-muted-foreground">
            In a full implementation, this would connect to AOL's email API to display your actual emails.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Inbox</h3>
            <p className="text-sm text-muted-foreground">Conceptual view of your AOL inbox</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Compose</h3>
            <p className="text-sm text-muted-foreground">Modern email composition interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}