import { redirect } from "next/navigation";

/** Member portal entry — default to dashboard. */
export default function MemberIndexPage() {
  redirect("/member/dashboard");
}
