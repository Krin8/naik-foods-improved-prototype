import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, orderId } = await req.json();

    if (!email || !orderId) {
      return NextResponse.json({ error: "Email and Order ID are required" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerEmail: email,
      },
      include: {
        items: true,
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found or email does not match" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order tracking error:", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}
