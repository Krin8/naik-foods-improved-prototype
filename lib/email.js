import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "mock_key");
const EMAIL_FROM = process.env.EMAIL_FROM || "orders@naikfoods.co.in";

export async function sendOrderConfirmation(order) {
  // Only send if we have a real email address
  if (!order.customerEmail) return;

  // In development without an API key, just log
  if (!process.env.RESEND_API_KEY) {
    console.log(`[MOCK EMAIL] Order Confirmation to ${order.customerEmail} for order ${order.id}`);
    return { mock: true };
  }

  const itemsList = order.items
    .map(item => `• ${item.quantity}x ${item.name} (₹${item.price})`)
    .join("\n");

  const textBody = `
Hi ${order.customerName},

Thank you for your order! We are preparing your authentic Maharashtrian delicacies.

Order Number: ${order.id}
Total Amount: ₹${order.totalAmount}
Payment Method: ${order.paymentMethod}

Items:
${itemsList}

Shipping Address:
${order.shippingAddress}

You can track your order here:
https://naikfoods.co.in/orders/track

Need help? Contact us on WhatsApp: https://wa.me/919730046247

Thanks,
Naik Foods
  `;

  try {
    const data = await resend.emails.send({
      from: `Naik Foods <${EMAIL_FROM}>`,
      to: order.customerEmail,
      subject: `Order Confirmed: #${order.id}`,
      text: textBody,
    });
    return data;
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    // Don't throw, we don't want to break the checkout flow if email fails
    return null;
  }
}
