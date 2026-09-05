import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { pincode } = await req.json();

    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
    }

    if (process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD) {
      // Authenticate with Shiprocket
      const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }),
      });

      if (!authRes.ok) {
        throw new Error("Shiprocket authentication failed");
      }

      const authData = await authRes.json();
      const token = authData.token;

      // Check serviceability
      // Using 411001 (Pune) as default pickup postcode, weight 1kg
      const pickupPostcode = process.env.SHIPROCKET_PICKUP_POSTCODE || "411001";
      const serviceRes = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickupPostcode}&delivery_postcode=${pincode}&weight=1&cod=1`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const serviceData = await serviceRes.json();
      
      if (serviceData.status === 200 && serviceData.data && serviceData.data.available_courier_companies.length > 0) {
        const couriers = serviceData.data.available_courier_companies;
        // Find best courier (just taking the first available one for ETA)
        const bestCourier = couriers[0];
        
        // Check if any courier supports COD
        const codAvailable = couriers.some(c => c.cod === 1);
        
        return NextResponse.json({
          serviceable: true,
          eta: bestCourier.etd || "3-5 days",
          codAvailable,
          message: "Standard delivery area",
        });
      } else {
        return NextResponse.json({
          serviceable: false,
          message: "Unserviceable location",
        });
      }
    }

    // Mock Shiprocket/Delhivery response for local dev without credentials
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
