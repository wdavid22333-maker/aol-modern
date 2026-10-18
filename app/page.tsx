import { Button } from "@/components/ui/button";
import { AuthCheck } from "@/components/auth-check";

export default function Home() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">AOL Modern</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          A modern interface for AOL that works seamlessly with your existing AOL authentication.
          No need to sign in again - just open AOL in another tab and enjoy!
        </p>

        <AuthCheck />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="w-40">
            Get Started
          </Button>
          <Button size="lg" variant="secondary" className="w-40">
            Learn More
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Email</h3>
            <p className="text-muted-foreground">Access your AOL email with a modern interface</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Chat</h3>
            <p className="text-muted-foreground">Instant messaging with friends and family</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Forums</h3>
            <p className="text-muted-foreground">Join community discussions</p>
          </div>
        </div>
      </div>
    </div>
  );
}