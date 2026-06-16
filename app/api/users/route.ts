import { NextResponse } from "next/server";
import { prisma, serializeUser } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        skillsTeach: { include: { skill: true } },
        skillsLearn: { include: { skill: true } },
        portfolio: true,
      },
    });

    return NextResponse.json(users.map(serializeUser));
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
