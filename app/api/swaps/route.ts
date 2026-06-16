import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const where = userId
      ? { OR: [{ requesterId: userId }, { receiverId: userId }] }
      : {};

    const swaps = await prisma.swapRequest.findMany({
      where,
      include: {
        requester: true,
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(swaps);
  } catch (error) {
    console.error("Fetch swaps error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
