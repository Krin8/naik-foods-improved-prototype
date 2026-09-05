import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Middleware to check admin secret
function checkAuth(req) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.ADMIN_SECRET || "super_secret_admin_password_123";
  
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return false;
  }
  return true;
}

export async function GET(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin Fetch Orders Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error("Admin Update Order Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
