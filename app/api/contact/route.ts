import { type NextRequest, NextResponse } from "next/server";

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function rateLimit(
  ip: string,
  limit = 5,
  windowMs: number = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Input validation
function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  ) {
    errors.push("Name is required");
  } else if (data.name.trim().length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Please enter a valid email address");
    }
  }

  if (
    !data.subject ||
    typeof data.subject !== "string" ||
    data.subject.trim().length === 0
  ) {
    errors.push("Subject is required");
  } else if (data.subject.trim().length > 200) {
    errors.push("Subject must be less than 200 characters");
  }

  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length === 0
  ) {
    errors.push("Message is required");
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  } else if (data.message.trim().length > 5000) {
    errors.push("Message must be less than 5000 characters");
  }

  return { isValid: errors.length === 0, errors };
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and > characters
    .trim();
}

// Send to Discord webhook
async function sendToDiscord(data: any): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Discord webhook URL not configured");
    return false;
  }

  try {
    const embed = {
      title: "📧 New Contact Form Submission",
      color: 0x86d17b, // Green color matching the portfolio theme
      fields: [
        { name: "👤 Name", value: data.name, inline: true },
        { name: "📧 Email", value: data.email, inline: true },
        { name: "📝 Subject", value: data.subject, inline: false },
        {
          name: "💬 Message",
          value:
            data.message.length > 1000
              ? data.message.substring(0, 1000) + "..."
              : data.message,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `Sent from PCUBE Portfolio • IP: ${data.ip}`,
        icon_url: "https://i.postimg.cc/XqwBYMMy/pcube.png", // Using the PCUBE logo
      },
      thumbnail: {
        url: "https://i.postimg.cc/XqwBYMMy/pcube.png", // Using the PCUBE logo
      },
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [embed],
        username: "Contact Form",
        avatar_url: "https://i.postimg.cc/XqwBYMMy/pcube.png", // Using the PCUBE logo
      }),
    });

    if (!response.ok) {
      console.error(
        "Discord webhook failed:",
        response.status,
        response.statusText
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Discord webhook error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const { isValid, errors } = validateInput(body);
    if (!isValid) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      ip,
    };

    // Check if Discord webhook is configured
    if (!process.env.DISCORD_WEBHOOK_URL) {
      console.error("Discord webhook URL not configured");
      return NextResponse.json(
        {
          error:
            "Contact form is not properly configured. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Send to Discord
    const success = await sendToDiscord(sanitizedData);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to send your message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
