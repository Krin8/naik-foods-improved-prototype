import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ error: "Missing payment verification fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "mock_secret_abc123";
    const isMockKey = secret === "mock_secret_abc123";

    // In mock mode, accept all payments for development
    if (isMockKey) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
      
      const fullOrder = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
      await sendOrderConfirmation(fullOrder);

      const generatedCode = fullOrder.customerName ? `${fullOrder.customerName.split(" ")[0].toUpperCase()}100` : `FRIEND${orderId.substring(0, 4).toUpperCase()}`;
      try {
        await prisma.referral.upsert({
          where: { code: generatedCode },
          update: {},
          create: {
            code: generatedCode,
            discountAmt: 100.0,
            referrerId: orderId,
          }
        });
      } catch (e) { console.error(e) }

      return NextResponse.json({ verified: true, orderId, referralCode: generatedCode });
    }

    // HMAC verification: sha256(order_id|payment_id, key_secret)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Signature valid — mark order as PAID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        razorpayId: razorpay_payment_id,
      },
    });

    const fullOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    await sendOrderConfirmation(fullOrder);

    const generatedCode = fullOrder.customerName ? `${fullOrder.customerName.split(" ")[0].toUpperCase()}100` : `FRIEND${orderId.substring(0, 4).toUpperCase()}`;
    try {
      await prisma.referral.upsert({
        where: { code: generatedCode },
        update: {},
        create: {
          code: generatedCode,
          discountAmt: 100.0,
          referrerId: orderId,
        }
      });
    } catch (e) { console.error(e) }

    return NextResponse.json({ verified: true, orderId, referralCode: generatedCode });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
