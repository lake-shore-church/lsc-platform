import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Member and staff sign-in for Lake Shore Church.",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  "sign-in": "Sign in with your email to access the member or staff portal.",
  pending:
    "Your account is signed in but not yet approved for the member portal. Contact the church office.",
  "staff-only": "This area is for church staff. Sign in with a staff account.",
  "check-email": "Check your email for a sign-in link.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; redirect?: string }>;
}) {
  const params = await searchParams;
  const message = params.message ? MESSAGES[params.message] : MESSAGES["sign-in"];

  return (
    <main className="min-h-screen bg-background py-16">
      <Container className="mx-auto max-w-md">
        <h1 className="font-display text-h1 text-brand-primary">Sign in</h1>
        <p className="mt-3 text-base text-foreground-secondary">{message}</p>
        <LoginForm redirectTo={params.redirect ?? "/member/dashboard"} />
        <p className="mt-8 text-sm text-foreground-muted">
          Church members and staff receive access by email. If you need help,{" "}
          <a href="/contact" className="link-hover text-brand-primary">
            contact us
          </a>
          .
        </p>
      </Container>
    </main>
  );
}
