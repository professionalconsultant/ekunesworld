/* =============================================================
   EkunesWorld — SUPABASE SETTINGS (for the admin panel)
   -------------------------------------------------------------
   Paste the two values from Supabase → Project Settings → API Keys.
   The "publishable" key (starts with sb_publishable_) is MEANT to be public: it only allows what
   the database rules in supabase-setup.sql allow (read posts).
   NEVER paste a "secret" or "service_role" key here.
   Leave both empty to run the site without the admin panel.
   ============================================================= */
window.EKUNES_DB = {
  url: "https://qohprwimyvhvizomweef.supabase.co",
  publishableKey: "sb_publishable_oVAlSS6bHupuW57Q-KWGjA_3ts7x7D0"   // e.g. "sb_publishable_..."
};
