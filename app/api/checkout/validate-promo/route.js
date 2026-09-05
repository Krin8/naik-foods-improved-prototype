import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { promoCode, subtotal } = await req.json();

    if (!promoCode) {
      return NextResponse.json({ discount: 0 });
    }

    let discount = 0;

    if (promoCode === "PROMO10") {
      discount = Math.round(subtotal * 0.10);
    } else {
      const referral = await prisma.referral.findUnique({
        where: { code: promoCode },
      });
      if (referral) {
        discount = referral.discountAmt;
      }
    }

    discount = Math.min(discount, subtotal);
    
    return NextResponse.json({ discount });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json({ error: "Failed to validate promo code" }, { status: 500 });
  }
}
