"use client";

import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const handleOpenAOLChat = () => {
    window.open("https://aim.aol.com", "_blank");
  };

  return (
    <div className="container py-12">
      <div className="rounded-lg border p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">AOL Instant Messenger</h1>
          <Button onClick={handleOpenAOLChat}>
            Open AIM Chat
          </Button>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Modern AIM Interface</h2>
          <p className="text-muted-foreground mb-4">
            This is a conceptual interface showing how AOL Instant Messenger could be accessed through our modern interface.
          </p>
          <p className="text-sm text-muted-foreground">
            In a full implementation, this would connect to AOL's chat API to display your contacts and messages.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Online Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-2"></div>
              <p className="font-medium">Friend 1</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-2"></div>
              <p className="font-medium">Friend 2</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-2"></div>
              <p className="font-medium">Friend 3</p>
              <p className="text-sm text-muted-foreground">Away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}