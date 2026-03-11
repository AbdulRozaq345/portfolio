import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const { event, details, email, timestamp } = await req.json();

  // Log to audit_logs table
  await supabase
    .from("audit_logs")
    .insert({
      action: event,
      table_name: "security_event",
      user_email: email,
      ip_address: details.ip || "unknown",
      created_at: timestamp,
    });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});