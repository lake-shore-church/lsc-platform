import { NextResponse } from "next/server";
import { getEventById } from "@repo/db";
import { serializeMobileEvent } from "@/lib/mobile-serialize";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const event = await getEventById(id).catch(() => null);
  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ event: serializeMobileEvent(event) });
}
