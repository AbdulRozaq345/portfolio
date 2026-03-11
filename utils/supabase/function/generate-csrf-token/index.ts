// @ts-expect-error: This URL import is resolved by the Supabase Edge (Deno) runtime.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  const token = crypto.randomUUID();

  // Set secure cookie
  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    `csrf_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  );

  return new Response(JSON.stringify({ token }), { headers, status: 200 });
});
