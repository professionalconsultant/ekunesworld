# EkunesWorld — Ekunes Journal

A multilingual (Монгол · English · 한국어 · 中文) journal website by Enerel Ekune.
Plain HTML, CSS and JavaScript: no build step, no frameworks.

## Files

```
index.html              the page shell (header, menu, footer)
favicon.svg             browser tab icon
assets/css/style.css    all styling (colours and fonts are at the top)
assets/js/content.js    ← EDIT THIS: settings, social links, sections, posts
assets/js/translations.js ← ja, fr, ru, es, pt, de, nl versions of content.js (matched by id/slug)
assets/js/i18n.js       ← EDIT THIS: menu, button and form text in 11 languages
assets/js/main.js       page logic (no need to edit)
assets/images/          put your photos here
```

## Before you publish

1. **Email** — set to `ekune.nrl@gmail.com` in `content.js` (`site.email`).
   The forms deliver messages to it (see "How the forms deliver messages" below), and the address
   is shown on the Collaborate, Styling and Write to us pages.
2. **Photos** — the site currently uses covers from her YouTube videos
   (`i.ytimg.com/...`). They load straight from YouTube, so they stay up as long
   as the videos do. For the best quality, put your own photos in `assets/images/`
   and change the paths in `content.js`:
   - `site.images.hero`, `about`, `styling` — portraits (the `...Position` value moves the crop)
   - each section's `image` and `imagePosition`
   Keep each photo under ~500 KB so the site stays fast. A missing photo shows a coloured panel.
3. **Instagram posts** — the home page shows three of your Instagram posts using
   Instagram's official embed. To change them, open a post on Instagram → ••• →
   Copy link, and paste the links into `instagramPosts` in `content.js`.
4. **YouTube** — the home page shows three videos from `site.youtube.videos` in
   `content.js`. Each one only loads YouTube when a visitor presses play.
5. **Styling page** — `#styling` lists styling services and has a booking form.
   Edit the service names and descriptions in `i18n.js` (keys starting `styling.`)
   so they match what is actually offered.
6. **Your content** — the 12 posts in `content.js` are samples. Replace them with your own.

## Adding a new post

Copy one post block in `content.js` and change it:

```js
{
  slug: "my-new-story",            // web address: #read/my-new-story (must be unique)
  section: "stories",              // stories, articles, style or interviews
  sub: "short-stories",            // a sub-section id from that section
  date: "2026-11-20",              // YYYY-MM-DD — newest appear first
  read: 6,                         // minutes to read
  image: "",                       // optional
  title:   { en: "...", mn: "...", ko: "...", zh: "..." },
  excerpt: { en: "...", mn: "...", ko: "...", zh: "..." },
  body: {
    en: ["First paragraph.", "Second paragraph."],
    mn: ["...", "..."], ko: ["...", "..."], zh: ["...", "..."]
  }
},
```

If a language is missing, English is shown instead. For poems add `format: "poem"`
and use `\n` for line breaks.

## How the forms deliver messages

All forms (Write to us, Submit a proposal, Book a styling session, newsletter) send to
`ekune.nrl@gmail.com` through FormSubmit (https://formsubmit.co), a free service. Visitors do not
need an email app, and the page shows a clear message if sending fails.

**One-time activation (important):** after the site is live, send ONE test message yourself from the
"Write to us" page. FormSubmit emails an activation link to ekune.nrl@gmail.com. Click it once.
After that, every message arrives in your inbox. If your test message does not arrive, send it again
after activating. Check the spam folder for the activation email.

Visitors' name, email and message pass through FormSubmit on the way to your inbox.
To use a different service (for example Formspree), put its address in `formEndpoint` and
`newsletterEndpoint` in `content.js`. If you leave both empty (`""`), the forms open the
visitor's own email app instead.

## Languages

The site picks the visitor's browser language, and remembers their choice.
Link to a specific language with `?lang=mn`, `en`, `ko`, `zh`, `ja`, `fr`, `ru`, `es`, `pt`, `de` or `nl` (e.g. `?lang=ja`),
for example `https://your-domain/?lang=mn`.

## Preview on your computer

Double-click `index.html`, or for a more accurate preview run this in the folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000

## Deploy: GitHub + Cloudflare Pages

1. Create a new repository on GitHub (e.g. `ekunesworld`).
2. Upload everything in this folder (keep the folder structure) using
   **Add file → Upload files**, then **Commit changes**.
3. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git**
   and choose the repository.
4. Build settings: Framework preset **None**, build command **empty**,
   build output directory **/** (the root).
5. Deploy. You get a `*.pages.dev` address; add your own domain under
   **Custom domains**.

Every new commit to GitHub redeploys the site automatically.
(Cloudflare occasionally renames menu items; the steps stay the same.)

## Sharing preview image

To show a picture when the site is shared on social media, add
`assets/images/share.jpg` (1200×630) and uncomment the `og:image`
line in `index.html`, replacing `YOUR-DOMAIN` with your address.

## Admin panel (publish posts without editing code)

`admin.html` lets one signed-in person add, edit and delete posts (Stories, Articles, Style, Interviews).
Posts are stored in Supabase; the site reads them when it loads.

1. Create a free project at supabase.com.
2. SQL Editor → paste `supabase-setup.sql` → Run.
3. Authentication → Users → Add user (your email + a strong password). Then Authentication → Sign In / Providers → turn OFF "Allow new users to sign up". Optionally enable 2FA.
4. Project Settings → API Keys: copy the Project URL and the **publishable** key (`sb_publishable_…`) into `assets/js/config.js`. Never use a secret / `service_role` key.
5. Open `/admin.html` on your site and sign in.

The publishable key is safe to publish: the database rules let the public only read posts, and only the logged-in user write.
