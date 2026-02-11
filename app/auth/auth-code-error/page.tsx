import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Authentication Error</h1>
        <p className="text-sm text-muted-foreground">
          The authentication link is invalid or has expired. Please try signing in again.
        </p>
      </div>
      <Link href="/login">
        <Button className="w-full">Back to Sign In</Button>
      </Link>
    </div>
  );
}
