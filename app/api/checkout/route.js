import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock_12345",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret_abc123",
});

export async function POST(req) {
  try {
    const { items, subtotal, shipping, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // In a real app, we would re-calculate `total` from the database `Product` table
    // to prevent browser-side tampering. For this prototype, we'll accept the total 
    // but validate the structure.

    // 1. Create order in our Database
    const order = await prisma.order.create({
      data: {
        totalAmount: total,
        status: "PENDING",
        items: {
          create: items.map(item => ({
            productId: String(item.id),
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }
      }
    });

    // 2. Initialize Razorpay Order
    // Razorpay amount is in smallest currency unit (paise)
    const options = {
      amount: Math.round(total * 100), 
      currency: "INR",
      receipt: order.id,
    };

    let razorpayOrder;
    // We try to create a real Razorpay order if valid keys exist, otherwise mock it.
    if (process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test") && process.env.RAZORPAY_KEY_ID !== "rzp_test_mock_12345") {
      razorpayOrder = await razorpay.orders.create(options);
    } else {
      // Mock Razorpay response
      razorpayOrder = {
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
      };
    }

    // 3. Update Order with Razorpay ID
    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayId: razorpayOrder.id }
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
    
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
