import { google } from "googleapis";
import { NextResponse, NextRequest } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json(); // URL yang mau di-index

    // Path ke file JSON lo
    const keyPath = path.join(process.cwd(), "google-key.json");

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

    const token = await auth.getAccessToken();
    const endpoint =
      "https://indexing.googleapis.com/v3/urlNotifications:publish";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: url,
        type: "URL_UPDATED", // Bisa 'URL_UPDATED' atau 'URL_DELETED'
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      message: "Tembakan meluncur, Bosquu! 😹😹",
      details: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 },
    );
  }
}
