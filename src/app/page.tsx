import Link from "next/link";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <section className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300">
            PerformAI
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Performance Review System
          </h1>

          <p className="text-base leading-7 text-zinc-400">
            Sign in with your company Cognito account to review OKRs,
            submit feedback, and view analytics.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="h-11 w-full bg-purple-600 text-white hover:bg-purple-500"
        >
          <Link
            href="/api/auth/login"
            className="gap-2"
          >
            <LogIn size={18} />
            Sign in
          </Link>
        </Button>
      </section>
    </main>
  );
}
