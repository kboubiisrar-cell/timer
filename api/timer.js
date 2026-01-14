import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("timer_events")
      .select("*")
      .order("id", { ascending: true });

    if (error) return res.status(500).json(error);
    return res.json(data);
  }

  if (req.method === "POST") {
    const { error } = await supabase
      .from("timer_events")
      .insert({ timestamp: Date.now() });

    if (error) return res.status(500).json(error);
    return res.status(201).end();
  }

  res.status(405).end();
}