import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@repo/db";
import { sendEmail } from "@/lib/email";
import { getAuthSession, isStaffRole } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session || !isStaffRole(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { slug?: string; emails?: string[] };
  if (!body.slug || !body.emails?.length) {
    return NextResponse.json({ error: "slug and emails required" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const post = await getBlogPostBySlug(body.slug, supabase);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";
  let sent = 0;
  for (const email of body.emails) {
    const ok = await sendEmail({
      to: email,
      subject: `New from Lake Shore Church: ${post.title}`,
      html: `<p>${post.excerpt ?? post.title}</p><p><a href="${appUrl}/blog/${post.slug}">Read more</a></p>`,
    });
    if (ok) sent += 1;
  }

  return NextResponse.json({ sent, total: body.emails.length });
}
