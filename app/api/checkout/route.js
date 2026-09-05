import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";
import { sendOrderConfirmation } from "@/lib/email";

const SHIPPING_FEE = 60;
const FREE_SHIPPING_THRESHOLD = 999;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock_12345",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret_abc123",
});

export async function POST(req) {
  try {
    const { items, address, paymentMethod, promoCode } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!address || !address.firstName || !address.email || !address.phone || !address.street || !address.city || !address.pincode) {
      return NextResponse.json({ error: "Incomplete address information" }, { status: 400 });
    }

    // ======== SERVER-SIDE PRICE CALCULATION ========
    // Fetch actual product prices from the database — never trust client totals.
    const slugs = items.map(i => i.slug).filter(Boolean);
    const dbProducts = await prisma.product.findMany({
      where: { slug: { in: slugs } },
    });

    const productMap = {};
    for (const p of dbProducts) {
      productMap[p.slug] = p;
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const dbProduct = productMap[item.slug];
      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.slug}` }, { status: 400 });
      }

      // If a variant was selected, parse variants JSON and use variant price
      let unitPrice = dbProduct.price;
      if (item.variantIndex !== undefined && item.variantIndex !== null) {
        try {
          const variants = JSON.parse(dbProduct.variants || "[]");
          if (variants[item.variantIndex]) {
            unitPrice = variants[item.variantIndex].price;
          }
        } catch { /* use default price */ }
      }

      subtotal += unitPrice * item.quantity;
      orderItems.push({
        productId: dbProduct.id,
        name: dbProduct.name,
        price: unitPrice,
        quantity: item.quantity,
      });
    }

    let discount = 0;
    let validReferral = null;
    
    if (promoCode === "PROMO10") {
      discount = Math.round(subtotal * 0.10);
    } else if (promoCode) {
      // Check Referral table
      const referral = await prisma.referral.findUnique({
        where: { code: promoCode },
      });
      if (referral) {
        discount = referral.discountAmt; // typically 100
        validReferral = referral;
      }
    }
    
    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, subtotal);
    const finalSubtotal = subtotal - discount;

    const shipping = finalSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = finalSubtotal + shipping;

    // ======== CREATE ORDER IN DATABASE ========
    const order = await prisma.order.create({
      data: {
        totalAmount: total,
        status: paymentMethod === "COD" ? "PENDING_COD" : "PENDING",
        paymentMethod: paymentMethod || "UPI",
        customerName: `${address.firstName} ${address.lastName}`,
        customerEmail: address.email,
        customerPhone: address.phone,
        shippingAddress: `${address.street}, ${address.city} - ${address.pincode}`,
        items: {
          create: orderItems,
        },
      },
    });

    if (validReferral) {
      await prisma.referral.update({
        where: { id: validReferral.id },
        data: { usedCount: { increment: 1 } },
      });
    }

    // ======== COD PATH ========
    if (paymentMethod === "COD") {
      // Re-fetch order with items for email template
      const fullOrder = await prisma.order.findUnique({
        where: { id: order.id },
        include: { items: true },
      });
      await sendOrderConfirmation(fullOrder);
      
      // Generate referral code
      const generatedCode = address.firstName ? `${address.firstName.toUpperCase()}100` : `FRIEND${order.id.substring(0, 4).toUpperCase()}`;
      try {
        await prisma.referral.upsert({
          where: { code: generatedCode },
          update: {},
          create: {
            code: generatedCode,
            discountAmt: 100.0,
            referrerId: order.id,
          }
        });
      } catch (e) { console.error(e) }

      return NextResponse.json({
        orderId: order.id,
        paymentMethod: "COD",
        total,
        referralCode: generatedCode,
      });
    }

    // ======== RAZORPAY PATH ========
    const razorpayOptions = {
      amount: Math.round(total * 100), // paise
      currency: "INR",
      receipt: order.id,
    };

    let razorpayOrder;
    if (process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test") && process.env.RAZORPAY_KEY_ID !== "rzp_test_mock_12345") {
      razorpayOrder = await razorpay.orders.create(razorpayOptions);
    } else {
      // Mock Razorpay response for development
      razorpayOrder = {
        id: `order_mock_${Date.now()}`,
        amount: razorpayOptions.amount,
      };
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayId: razorpayOrder.id },
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
