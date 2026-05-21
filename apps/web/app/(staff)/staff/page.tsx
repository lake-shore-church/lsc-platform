import { redirect } from "next/navigation";

/** Staff portal entry — default to prayer triage dashboard. */
export default function StaffIndexPage() {
  redirect("/staff/prayers");
}
