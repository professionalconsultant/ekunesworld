// DeepL proxy for the admin panel. Key lives in the DEEPL_KEY secret, never in the browser.
// Supabase checks the caller's login (JWT) before this runs, so only signed-in admins can use it.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const TARGET: Record<string, string> = { ko: "KO", zh: "ZH", ja: "JA", fr: "FR", ru: "RU", es: "ES", pt: "PT-PT", de: "DE", nl: "NL" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const { text, to } = await req.json();
  const target = TARGET[to];
  const key = Deno.env.get("599f8c6e-6c39-4d97-9f39-1139f90e7bf0:fx");
  if (!key || !target || !text) return Response.json({ error: "bad request" }, { status: 400, headers: CORS });
  const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
  const r = await fetch(`https://${host}/v2/translate`, {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text: [text], source_lang: "EN", target_lang: target }),
  });
  if (!r.ok) return Response.json({ error: "deepl " + r.status }, { status: r.status, headers: CORS });
  const j = await r.json();
  return Response.json({ text: j.translations?.[0]?.text || "" }, { headers: CORS });
});
