import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_webhook_secret";

    // 1. Verify Signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex");

    // We bypass signature check for the mock flow if no real webhook secret is configured
    const isMock = secret === "mock_webhook_secret";

    if (expectedSignature !== signature && !isMock) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // 2. Handle Payment Success
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const razorpayOrderId = event.payload.payment.entity.order_id;
      
      if (razorpayOrderId) {
        await prisma.order.updateMany({
          where: { razorpayId: razorpayOrderId },
          data: { status: "PAID" }
        });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
