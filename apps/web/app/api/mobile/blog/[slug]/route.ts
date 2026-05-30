import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@repo/cms";
import { serializeMobileBlogPostDetail } from "@/lib/mobile-serialize";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post: serializeMobileBlogPostDetail(post) });
}
