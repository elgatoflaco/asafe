import { auth } from "@/auth/auth";
import LoginForm from "@/components/auth/login-form";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = (await auth()) as Session | null;

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  );
}
