import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { pincode } = await req.json();

    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
    }

    // Mock Shiprocket/Delhivery response
    // In production, you would securely fetch the Shiprocket API here:
    // const res = await fetch("https://apiv2.shiprocket.in/v1/external/courier/serviceability/", { headers: ... })

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const firstDigit = parseInt(pincode[0]);

    if (firstDigit === 9) {
      return NextResponse.json({
        serviceable: false,
        message: "Unserviceable location",
      });
    } else if (firstDigit >= 5) {
      return NextResponse.json({
        serviceable: true,
        eta: "7-10 days",
        codAvailable: false,
        message: "Extended delivery area",
      });
    } else {
      return NextResponse.json({
        serviceable: true,
        eta: "3-5 days",
        codAvailable: true,
        message: "Standard delivery area",
      });
    }
  } catch (error) {
    console.error("Shipping API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
