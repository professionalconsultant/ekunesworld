/* =============================================================
   EkunesWorld — main.js
   Page rendering, language switching, theme, menu and forms.
   You normally don’t need to edit this file: content lives in
   content.js and interface text in i18n.js.
   ============================================================= */
(() => {
  "use strict";

  const { site: SITE, sections: SECTIONS, posts: POSTS } = window.EKUNES;
  const STR = window.EKUNES_I18N;

  /* ---------- Languages ---------- */
  const LANGS = {
    mn: { name: "Монгол",     short: "MN", html: "mn",      locale: "mn-MN" },
    en: { name: "English",    short: "EN", html: "en",      locale: "en-GB" },
    ko: { name: "한국어",      short: "KO", html: "ko",      locale: "ko-KR" },
    zh: { name: "中文",        short: "中文", html: "zh-Hans", locale: "zh-CN" },
    ja: { name: "日本語",      short: "日本語", html: "ja",    locale: "ja-JP" },
    fr: { name: "Français",   short: "FR", html: "fr",      locale: "fr-FR" },
    ru: { name: "Русский",    short: "RU", html: "ru",      locale: "ru-RU" },
    es: { name: "Español",    short: "ES", html: "es",      locale: "es-ES" },
    pt: { name: "Português",  short: "PT", html: "pt",      locale: "pt-BR" },
    de: { name: "Deutsch",    short: "DE", html: "de",      locale: "de-DE" },
    nl: { name: "Nederlands", short: "NL", html: "nl",      locale: "nl-NL" }
  };
  const LANG_ORDER = ["mn", "en", "ko", "zh", "ja", "fr", "ru", "es", "pt", "de", "nl"];
  // Languages written without spaces between words.
  const NO_SPACE = ["zh", "ja"];
  // Korean, Chinese and Japanese typefaces load only when needed.
  const FONT_CSS = {
    ko: "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&family=Noto+Sans+KR:wght@400;500&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500&family=Noto+Sans+SC:wght@400;500&display=swap",
    ja: "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&family=Noto+Sans+JP:wght@400;500&display=swap"
  };

  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;
  const app = $("#app");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pickLang = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS[q]) return q;
    const saved = store.get("ekunes-lang");
    if (saved && LANGS[saved]) return saved;
    if (SITE.defaultLang && LANGS[SITE.defaultLang]) return SITE.defaultLang;
    const prefs = navigator.languages || [navigator.language || "en"];
    for (const l of prefs) {
      const c = String(l).slice(0, 2).toLowerCase();
      if (LANGS[c]) return c;
    }
    return "en";
  };
  let lang = pickLang();

  /* ---------- Helpers ---------- */
  const t = (key, vars = {}, l = lang) => {
    const s = (STR[l] && STR[l][key]) ?? STR.en[key] ?? key;
    const all = Object.assign({ author: SITE.author }, vars);
    return s.replace(/\{(\w+)\}/g, (m, k) => (all[k] != null ? all[k] : m));
  };
  const loc = (v) => {
    if (v == null) return "";
    if (typeof v === "string" || Array.isArray(v)) return v;
    return v[lang] ?? v.en ?? "";
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plain = (s) => String(s).replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "");
  const sectionOf = (id) => SECTIONS.find((s) => s.id === id);
  const subOf = (s, id) => (s && id ? s.subs.find((x) => x.id === id) : null) || null;
  const byDate = (list) => list.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const contentSections = () => SECTIONS.filter((s) => s.id !== "collaborate");

  // Some browsers have no Mongolian date data, so Mongolian dates are written by hand.
  const MN_DAYS = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
  const fmtDate = (value, opts = { year: "numeric", month: "long", day: "numeric" }) => {
    const d = value instanceof Date ? value : new Date(value + "T12:00:00");
    if (lang === "mn") {
      const date = `${d.getFullYear()} оны ${d.getMonth() + 1}-р сарын ${d.getDate()}`;
      return opts.weekday ? `${date}, ${MN_DAYS[d.getDay()]} гараг` : date;
    }
    try { return new Intl.DateTimeFormat(LANGS[lang].locale, opts).format(d); }
    catch (e) { return d.toDateString(); }
  };

  const loadFont = (l) => {
    if (!FONT_CSS[l] || document.querySelector(`link[data-font="${l}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_CSS[l];
    link.dataset.font = l;
    document.head.appendChild(link);
  };

  /* ---------- Icons (thin line, 24px grid) ---------- */
  const svg = (inner) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inner}</svg>`;
  const ICON = {
    arrow: svg('<path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>'),
    moon: svg('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
    link: svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
    play: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>',
    share: svg('<path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/>'),
    linkedin: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    facebook: svg('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    youtube: svg('<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>')
  };

  /* ---------- Building blocks ---------- */
  // A coloured "cashmere swatch" stands in until a photo is added.
  const media = ({ tone = "oat", text = "", image = "", pos = "", alt = "", cls = "" }) => `
    <div class="media ${cls}">
      <div class="swatch tone-${esc(tone)}" aria-hidden="true"><span class="swatch-text">${esc(text)}</span></div>
      ${image ? `<img src="${esc(image)}" alt="${esc(alt)}" ${pos ? `style="object-position:${esc(pos)}"` : ""} loading="lazy" decoding="async" onerror="this.remove()">` : ""}
    </div>`;

  // YouTube: show the cover first and load the player only when someone presses play.
  const ytThumb = (id, wide) => `https://i.ytimg.com/vi/${id}/${wide ? "sddefault" : "oardefault"}.jpg`;
  const videoFrame = (id, title, wide = false, poster = "") => `
    <div class="video-frame${wide ? " video-frame--wide" : ""}">
      <button class="video-poster" type="button" data-video="${esc(id)}" data-title="${esc(title)}" aria-label="${esc(t("watch.play"))}: ${esc(title)}">
        <img src="${esc(poster || ytThumb(id, wide))}" alt="" loading="lazy" decoding="async">
        <span class="video-play">${ICON.play}</span>
      </button>
    </div>`;
  const playVideo = (btn) => {
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(btn.dataset.video)}?autoplay=1&playsinline=1&rel=0`;
    frame.title = btn.dataset.title || "YouTube";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    btn.replaceWith(frame);
  };

  const socialLinks = () => SITE.social.map((s) =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${ICON[s.icon] || ICON.link}</a>`).join("");

  const entry = (p, showSection = false) => {
    const s = sectionOf(p.section);
    const sub = subOf(s, p.sub);
    const kind = showSection ? `${t("nav." + s.id)}${sub ? ", " + loc(sub.name) : ""}` : (sub ? loc(sub.name) : t("nav." + s.id));
    const side = p.image
      ? `<span class="entry-thumb"><img src="${esc(p.image)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></span>`
      : `<span class="entry-read">${esc(t("card.min", { n: p.read }))}</span>`;
    return `
      <li class="entry">
        <a href="#read/${esc(p.slug)}">
          <span class="entry-meta"><span class="entry-kind">${esc(kind)}</span><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></span>
          <span class="entry-main">
            <span class="entry-title">${esc(loc(p.title))}</span>
            <span class="entry-excerpt">${esc(loc(p.excerpt))}</span>
          </span>
          ${side}
        </a>
      </li>`;
  };
  const entries = (list, showSection) => `<ul class="entries">${list.map((p) => entry(p, showSection)).join("")}</ul>`;

  const tabs = (items, activeId, label) => `
    <nav class="tabs-wrap" aria-label="${esc(label)}"><div class="tabs">
      ${items.map((it) => `<a class="tab" href="${it.href}" ${it.id === activeId ? 'aria-current="page"' : ""}>${esc(it.label)}${it.count != null ? `<span class="tab-count">${it.count}</span>` : ""}</a>`).join("")}
    </div></nav>`;

  const nextLink = (href, label, title) => `
    <a class="next" href="${href}">
      <span class="next-label">${esc(label)}</span>
      <span class="next-title">${esc(title)}</span>
    </a>`;

  const pageHead = ({ num = "", title, tagline = "", intro = "", aside = "" }) => `
    <header class="page-head">
      <div class="page-head-text">
        ${num ? `<p class="page-num">${esc(num)}</p>` : ""}
        <h1 class="page-title">${title}</h1>
        ${tagline ? `<p class="page-tagline">${tagline}</p>` : ""}
        ${intro ? `<p class="page-intro">${intro}</p>` : ""}
      </div>
      ${aside ? `<div class="page-head-aside">${aside}</div>` : ""}
    </header>`;

  // Official Instagram embeds. If Instagram is blocked, a plain link to the post shows instead.
  const instaSection = () => {
    const posts = SITE.instagramPosts || [];
    if (!posts.length) return "";
    const ig = SITE.social.find((s) => s.icon === "instagram");
    return `
      <section class="block insta" aria-labelledby="insta-title">
        <div class="wrap">
          <div class="block-head">
            <h2 class="h2" id="insta-title">${t("insta.title")}</h2>
            ${ig ? `<a class="text-link" href="${esc(ig.url)}" target="_blank" rel="noopener">${t("insta.follow")} ${esc(ig.handle || "")}</a>` : ""}
          </div>
          <div class="insta-row">
            ${posts.map((url) => `
              <div class="insta-item">
                <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}" data-instgrm-version="14">
                  <a class="text-link" href="${esc(url)}" target="_blank" rel="noopener">${t("insta.view")}</a>
                </blockquote>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  };

  let igObserver;
  const loadInstagram = () => {
    const sec = $(".insta", app);
    if (!sec) return;
    const run = () => {
      if (window.instgrm && window.instgrm.Embeds) { window.instgrm.Embeds.process(); return; }
      if (document.querySelector("script[data-ig]")) return; // still loading; it processes on load
      const sc = document.createElement("script");
      sc.src = "https://www.instagram.com/embed.js";
      sc.async = true;
      sc.dataset.ig = "1";
      document.body.appendChild(sc);
    };
    if (!("IntersectionObserver" in window)) { run(); return; }
    if (igObserver) igObserver.disconnect();
    // Load Instagram only when the reader gets near the section, to keep the page fast.
    igObserver = new IntersectionObserver((list) => {
      if (list.some((x) => x.isIntersecting)) { igObserver.disconnect(); run(); }
    }, { rootMargin: "600px 0px" });
    igObserver.observe(sec);
  };

  /* ---------- Views ---------- */
  const viewHome = () => {
    loadFont("ko"); loadFont("zh"); loadFont("ja"); // the language list in the hero shows every script
    const others = LANG_ORDER.filter((c) => c !== lang);
    const latest = byDate(POSTS).slice(0, 6);

    const spreads = SECTIONS.map((s) => {
      const subs = s.subs.map((x) => {
        const n = POSTS.filter((p) => p.section === s.id && p.sub === x.id).length;
        return `<li><a href="#${s.id}/${x.id}"><span>${esc(loc(x.name))}</span>${n ? `<span class="count">${n}</span>` : ""}</a></li>`;
      }).join("");
      return `
        <article class="spread">
          <a class="spread-media" href="#${s.id}" tabindex="-1" aria-hidden="true">${media({ tone: s.tone, text: loc(s.title), image: s.image, pos: s.imagePosition, alt: loc(s.title) })}</a>
          <div class="spread-text">
            <h3 class="spread-title"><span class="spread-num">${s.num}</span>${esc(loc(s.title))}</h3>
            <p class="spread-tagline">${esc(loc(s.tagline))}</p>
            <ul class="spread-subs">${subs}</ul>
            <a class="text-link" href="#${s.id}">${esc(loc(s.cta))}</a>
          </div>
        </article>`;
    }).join("");

    const services = [1, 2, 3, 4, 5, 6].map((n) => `<li>${t(`collab.s${n}t`)}</li>`).join("");
    const statement = loc(SITE.statement);
    const roles = [
      { k: "journalist", href: "#articles" },
      { k: "writer", href: "#stories" },
      { k: "stylist", href: "#styling" }
    ];
    const yt = SITE.youtube || {};

    return {
      html: `
      <section class="hero">
        <div class="hero-main">
          <h1 class="hero-title anim" style="--d:0">${t("hero.title")}</h1>
          <p class="hero-lead anim" style="--d:140">${t("hero.text")}</p>
          <div class="hero-actions anim" style="--d:220">
            <a class="btn" href="#journal">${t("hero.cta")}</a>
            <a class="text-link" href="#collaborate">${t("hero.cta2")}</a>
          </div>
        </div>
        <figure class="hero-figure anim anim--fade" style="--d:180">
          ${media({ tone: "tengri", text: SITE.author, image: SITE.images.hero, pos: SITE.images.heroPosition, alt: SITE.author, cls: "media--portrait" })}
          <figcaption>${t("hero.caption")}</figcaption>
        </figure>
        <div class="motto">
          <p class="motto-label anim" style="--d:300">${t("hero.mottoLabel")}</p>
          <ul>
            ${others.map((c, i) => `
              <li class="anim" style="--d:${360 + i * 90}">
                <button type="button" data-set-lang="${c}" lang="${LANGS[c].html}">
                  <span class="motto-lang">${LANGS[c].name}</span>
                  <span class="motto-text">${esc(plain(t("hero.title", {}, c).replace(/<br\s*\/?>/gi, NO_SPACE.includes(c) ? "" : " ")))}</span>
                </button>
              </li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="block roles-block" aria-labelledby="roles-title">
        <div class="wrap">
          ${statement && statement[2] ? `<blockquote class="statement" id="roles-title"><p>${esc(statement[2])}</p><cite>${esc(SITE.author)}</cite></blockquote>` : ""}
          <ul class="roles">
            ${roles.map((r) => `
              <li class="role">
                <h3>${t(`roles.${r.k}T`)}</h3>
                <p>${t(`roles.${r.k}D`)}</p>
                <a class="text-link" href="${r.href}">${t(`roles.${r.k}L`)}</a>
              </li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="block block--tint" aria-labelledby="sections-title">
        <div class="wrap">
          <h2 class="h2" id="sections-title">${t("home.sectionsTitle")}</h2>
          <div class="spreads">${spreads}</div>
        </div>
      </section>

      <section class="block" aria-labelledby="latest-title">
        <div class="wrap">
          <div class="block-head">
            <h2 class="h2" id="latest-title">${t("home.latestTitle")}</h2>
            <a class="text-link" href="#journal">${t("home.viewAll")}</a>
          </div>
          ${entries(latest, true)}
        </div>
      </section>

      ${(yt.videos || []).length ? `
      <section class="block block--tint" aria-labelledby="watch-title">
        <div class="wrap">
          <div class="block-head">
            <h2 class="h2" id="watch-title">${t("watch.title")}</h2>
            <a class="text-link" href="${esc(yt.channel)}" target="_blank" rel="noopener">${t("watch.more")}</a>
          </div>
          <div class="videos">
            ${yt.videos.map((v) => `<figure class="video">${videoFrame(v.id, loc(v.title))}<figcaption class="video-title">${esc(loc(v.title))}</figcaption></figure>`).join("")}
          </div>
        </div>
      </section>` : ""}

      ${instaSection()}

      <section class="band" aria-labelledby="band-title">
        <div class="wrap band-grid">
          <div>
            <h2 class="band-title" id="band-title">${t("band.title")}</h2>
            <p class="band-text">${t("band.text")}</p>
            <a class="btn btn--light" href="#collaborate/proposal">${t("form.title")}</a>
          </div>
          <ul class="band-list">${services}</ul>
        </div>
      </section>

      <section class="letter" aria-labelledby="letter-title">
        <div class="wrap letter-grid">
          <div>
            <h2 class="h2" id="letter-title">${t("news.title")}</h2>
            <p class="letter-text">${t("news.text")}</p>
          </div>
          <div>
            <form class="letter-form" id="newsForm" novalidate>
              <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
              <label class="visually-hidden" for="newsEmail">${t("news.placeholder")}</label>
              <input id="newsEmail" name="email" type="email" autocomplete="email" placeholder="${esc(t("news.placeholder"))}" required>
              <button type="submit">${t("news.button")}</button>
            </form>
            <p class="form-status" id="newsStatus" role="status" aria-live="polite"></p>
          </div>
        </div>
      </section>`,
      title: "",
      nav: ""
    };
  };

  const viewSection = (s, subId) => {
    const sub = subOf(s, subId);
    const all = POSTS.filter((p) => p.section === s.id);
    const list = byDate(all.filter((p) => !sub || p.sub === sub.id));
    const i = SECTIONS.indexOf(s);
    const next = SECTIONS[(i + 1) % SECTIONS.length];
    const items = [{ id: "", label: t("section.all"), href: `#${s.id}`, count: all.length },
      ...s.subs.map((x) => ({ id: x.id, label: loc(x.name), href: `#${s.id}/${x.id}`, count: all.filter((p) => p.sub === x.id).length }))];
    return {
      html: `
        ${pageHead({
          num: s.num,
          title: esc(loc(s.title)),
          tagline: esc(loc(s.tagline)),
          intro: esc(loc(s.intro)),
          aside: media({ tone: s.tone, text: loc(s.title), image: s.image, pos: s.imagePosition, alt: loc(s.title), cls: "media--portrait" })
        })}
        ${tabs(items, sub ? sub.id : "", loc(s.title))}
        <section class="listing"><div class="wrap">
          ${list.length ? entries(list, false) : `<div class="empty"><p>${t("section.empty")}</p><a class="text-link" href="#journal">${t("home.viewAll")}</a></div>`}
        </div></section>
        ${s.id === "style" ? `
        <section class="band" aria-labelledby="stylist-title">
          <div class="wrap band-grid">
            <div>
              <h2 class="band-title" id="stylist-title">${t("styling.bandTitle")}</h2>
              <p class="band-text">${t("styling.text")}</p>
              <a class="btn btn--light" href="#styling">${t("roles.stylistL")}</a>
            </div>
            <ul class="band-list">${[1, 2, 3, 4, 5, 6].map((n) => `<li>${t(`styling.s${n}t`)}</li>`).join("")}</ul>
          </div>
        </section>` : ""}
        ${nextLink(`#${next.id}`, t("section.next"), loc(next.title))}`,
      title: sub ? `${loc(sub.name)}, ${loc(s.title)}` : loc(s.title),
      nav: s.id,
      key: "list:" + s.id
    };
  };

  const viewJournal = (secId) => {
    const s = contentSections().find((x) => x.id === secId);
    const list = byDate(POSTS.filter((p) => !s || p.section === s.id));
    const items = [{ id: "", label: t("section.all"), href: "#journal", count: POSTS.length },
      ...contentSections().map((x) => ({ id: x.id, label: t("nav." + x.id), href: `#journal/${x.id}`, count: POSTS.filter((p) => p.section === x.id).length }))];
    return {
      html: `
        ${pageHead({ title: t("journal.title"), intro: t("journal.text") })}
        ${tabs(items, s ? s.id : "", t("journal.title"))}
        <section class="listing"><div class="wrap">${entries(list, !s)}</div></section>`,
      title: t("journal.title"),
      nav: "",
      key: "list:journal"
    };
  };

  const viewArticle = (p) => {
    const s = sectionOf(p.section);
    const sub = subOf(s, p.sub);
    const body = loc(p.body) || [];
    const poem = p.format === "poem";
    const related = [...byDate(POSTS.filter((x) => x !== p && x.section === p.section)),
                     ...byDate(POSTS.filter((x) => x.section !== p.section))].slice(0, 3);
    return {
      html: `
        <article class="article">
          <header class="article-head">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="#${s.id}">${esc(t("nav." + s.id))}</a>
              ${sub ? `<span aria-hidden="true">/</span><a href="#${s.id}/${sub.id}">${esc(loc(sub.name))}</a>` : ""}
            </nav>
            <h1 class="article-title">${esc(loc(p.title))}</h1>
            <p class="article-lede">${esc(loc(p.excerpt))}</p>
          </header>
          ${p.video
            ? `<div class="article-video">${videoFrame(p.video, loc(p.title), true, p.image)}</div>`
            : (p.image ? `<figure class="article-figure"><img src="${esc(p.image)}" alt="${esc(loc(p.title))}" onerror="this.parentNode.remove()"></figure>` : "")}
          <div class="article-body">
            <aside class="article-aside">
              <dl>
                <div><dt>${t("article.byLabel")}</dt><dd>${esc(SITE.author)}</dd></div>
                <div><dt>${t("article.dateLabel")}</dt><dd><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></dd></div>
                <div><dt>${t("article.readLabel")}</dt><dd>${esc(t("card.min", { n: p.read }))}</dd></div>
                <div><dt>${t("article.share")}</dt><dd class="share-row">
                  ${navigator.share ? `<button class="icon-btn" type="button" data-share="native" aria-label="${esc(t("article.share"))}">${ICON.share}</button>` : ""}
                  <button class="icon-btn" type="button" data-share="copy" aria-label="${esc(t("article.copy"))}">${ICON.link}</button>
                  <button class="icon-btn" type="button" data-share="linkedin" aria-label="LinkedIn">${ICON.linkedin}</button>
                  <button class="icon-btn" type="button" data-share="facebook" aria-label="Facebook">${ICON.facebook}</button>
                </dd></div>
              </dl>
            </aside>
            <div class="prose${poem ? " prose--poem" : ""}">
              ${body.map((para) => `<p>${esc(para).replace(/\n/g, "<br>")}</p>`).join("")}
              ${p.link ? `<p class="prose-link"><a class="btn" href="${esc(p.link.url)}" target="_blank" rel="noopener">${esc(loc(p.link.label))}</a></p>` : ""}
            </div>
          </div>
        </article>
        <section class="block block--tint" aria-labelledby="related-title">
          <div class="wrap">
            <h2 class="h2" id="related-title">${t("article.related")}</h2>
            ${entries(related, true)}
          </div>
        </section>`,
      title: loc(p.title),
      nav: s.id,
      key: "read:" + p.slug,
      article: true
    };
  };

  const viewCollab = (subId) => {
    const s = sectionOf("collaborate");
    const sub = subOf(s, subId);
    const services = [1, 2, 3, 4, 5, 6].map((n) => ({ t: t(`collab.s${n}t`), d: t(`collab.s${n}d`) }));
    const steps = [1, 2, 3, 4].map((n) => ({ t: t(`collab.p${n}t`), d: t(`collab.p${n}d`) }));
    return {
      html: `
        ${pageHead({
          num: s.num,
          title: t("collab.title"),
          intro: t("collab.text"),
          aside: media({ tone: s.tone, text: loc(s.title), image: s.image, alt: loc(s.title), cls: "media--portrait" })
        })}
        ${tabs(s.subs.map((x) => ({ id: x.id, label: loc(x.name), href: `#collaborate/${x.id}` })), sub ? sub.id : "", loc(s.title))}

        <section class="block" id="services" aria-labelledby="services-title">
          <div class="wrap">
            <h2 class="h2" id="services-title">${t("collab.servicesTitle")}</h2>
            <ul class="services">${services.map((x) => `<li class="service"><h3>${x.t}</h3><p>${x.d}</p></li>`).join("")}</ul>
          </div>
        </section>

        <section class="block block--tint" aria-labelledby="process-title">
          <div class="wrap">
            <h2 class="h2" id="process-title">${t("collab.processTitle")}</h2>
            <ol class="steps">${steps.map((x) => `<li class="step"><h3>${x.t}</h3><p>${x.d}</p></li>`).join("")}</ol>
          </div>
        </section>

        <section class="block" id="proposal" aria-labelledby="proposal-title">
          <div class="wrap proposal">
            <div class="proposal-intro">
              <h2 class="h2" id="proposal-title">${t("form.title")}</h2>
              <p class="lead">${t("form.text")}</p>
              <p class="direct">${t("form.direct")} <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
              <div class="social">${socialLinks()}</div>
            </div>
            <form class="form" id="proposalForm" novalidate>
              <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
              <div class="field-row">
                <label class="field"><span>${t("form.name")}</span><input name="name" autocomplete="name" required></label>
                <label class="field"><span>${t("form.email")}</span><input name="email" type="email" autocomplete="email" required></label>
              </div>
              <label class="field"><span>${t("form.org")}</span><input name="organisation" autocomplete="organization"></label>
              <label class="field field--select"><span>${t("form.type")}</span>
                <select name="type">${services.map((x) => `<option>${x.t}</option>`).join("")}<option>${t("form.other")}</option></select>
              </label>
              <label class="field"><span>${t("form.message")}</span><textarea name="message" rows="5" required></textarea></label>
              <button class="btn" type="submit">${t("form.send")}</button>
              <p class="form-status" id="proposalStatus" role="status" aria-live="polite"></p>
            </form>
          </div>
        </section>
        ${nextLink("#about", t("section.next"), t("about.title"))}`,
      title: loc(s.title),
      nav: "collaborate",
      key: "collab",
      anchor: sub ? sub.anchor : null
    };
  };

  const viewStyling = (part) => {
    const services = [1, 2, 3, 4, 5, 6].map((n) => ({ t: t(`styling.s${n}t`), d: t(`styling.s${n}d`) }));
    const steps = [1, 2, 3, 4].map((n) => ({ t: t(`styling.p${n}t`), d: t(`styling.p${n}d`) }));
    return {
      html: `
        ${pageHead({
          title: t("styling.title"),
          intro: t("styling.text"),
          aside: media({ tone: "camel", text: t("roles.stylistT"), image: SITE.images.styling, pos: SITE.images.stylingPosition, alt: SITE.author, cls: "media--square" })
        })}
        <section class="block" aria-labelledby="styling-services">
          <div class="wrap">
            <h2 class="h2" id="styling-services">${t("styling.servicesTitle")}</h2>
            <ul class="services">${services.map((x) => `<li class="service"><h3>${x.t}</h3><p>${x.d}</p></li>`).join("")}</ul>
            <p class="services-cta"><a class="btn" href="#styling/book">${t("styling.formTitle")}</a></p>
          </div>
        </section>
        <section class="block block--tint" aria-labelledby="styling-process">
          <div class="wrap">
            <h2 class="h2" id="styling-process">${t("styling.processTitle")}</h2>
            <ol class="steps">${steps.map((x) => `<li class="step"><h3>${x.t}</h3><p>${x.d}</p></li>`).join("")}</ol>
          </div>
        </section>
        <section class="block" id="book" aria-labelledby="book-title">
          <div class="wrap proposal">
            <div class="proposal-intro">
              <h2 class="h2" id="book-title">${t("styling.formTitle")}</h2>
              <p class="lead">${t("styling.formText")}</p>
              <p class="direct">${t("form.direct")} <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
              <div class="social">${socialLinks()}</div>
            </div>
            <form class="form" id="stylingForm" data-subject="Styling" novalidate>
              <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
              <div class="field-row">
                <label class="field"><span>${t("form.name")}</span><input name="name" autocomplete="name" required></label>
                <label class="field"><span>${t("form.email")}</span><input name="email" type="email" autocomplete="email" required></label>
              </div>
              <label class="field"><span>${t("form.org")}</span><input name="organisation" autocomplete="organization"></label>
              <label class="field field--select"><span>${t("form.type")}</span>
                <select name="type">${services.map((x) => `<option>${x.t}</option>`).join("")}<option>${t("form.other")}</option></select>
              </label>
              <label class="field"><span>${t("form.message")}</span><textarea name="message" rows="5" required></textarea></label>
              <button class="btn" type="submit">${t("styling.send")}</button>
              <p class="form-status" role="status" aria-live="polite"></p>
            </form>
          </div>
        </section>
        ${nextLink("#style", t("section.next"), loc(sectionOf("style").title))}`,
      title: t("nav.styling"),
      nav: "styling",
      key: "styling",
      anchor: part === "book" ? "book" : null
    };
  };

  const viewContact = () => ({
    html: `
      ${pageHead({ title: t("contact.title"), intro: t("contact.text") })}
      <section class="block" aria-labelledby="contact-title">
        <div class="wrap proposal">
          <div class="proposal-intro">
            <h2 class="h2" id="contact-title">${t("contact.title")}</h2>
            <p class="direct">${t("form.direct")} <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
            <div class="social">${socialLinks()}</div>
          </div>
          <form class="form" id="contactForm" data-subject="Message" novalidate>
            <input type="text" name="_honey" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="field-row">
              <label class="field"><span>${t("form.name")}</span><input name="name" autocomplete="name" required></label>
              <label class="field"><span>${t("form.email")}</span><input name="email" type="email" autocomplete="email" required></label>
            </div>
            <label class="field"><span>${t("form.message")}</span><textarea name="message" rows="6" required></textarea></label>
            <button class="btn" type="submit">${t("contact.send")}</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>`,
    title: t("contact.title"),
    nav: "",
    key: "contact"
  });

  const viewAbout = () => {
    const values = [1, 2, 3].map((n) => ({ t: t(`about.v${n}t`), d: t(`about.v${n}d`) }));
    loadFont("ko"); loadFont("zh"); loadFont("ja");
    return {
      html: `
        <section class="about">
          <figure class="about-figure">
            ${media({ tone: "oat", text: SITE.author, image: SITE.images.about, pos: SITE.images.aboutPosition, alt: SITE.author, cls: "media--portrait" })}
            <figcaption>${t("about.caption")}</figcaption>
          </figure>
          <div class="about-text">
            <h1 class="page-title">${t("about.title")}</h1>
            <p class="about-lead">${t("about.lead")}</p>
            <p>${t("about.p1")}</p>
            <p>${t("about.p2")}</p>
            <p class="signature">${esc(SITE.author)}</p>
          </div>
        </section>

        ${loc(SITE.statement).length ? `
        <section class="block block--tint" aria-labelledby="statement-title">
          <div class="wrap">
            <h2 class="h2" id="statement-title">${t("about.statementTitle")}</h2>
            <blockquote class="statement statement--full">
              ${loc(SITE.statement).map((line) => `<p>${esc(line)}</p>`).join("")}
              <cite>${esc(SITE.author)}</cite>
            </blockquote>
          </div>
        </section>` : ""}

        <section class="block" aria-labelledby="values-title">
          <div class="wrap">
            <h2 class="h2" id="values-title">${t("about.valuesTitle")}</h2>
            <ul class="values">${values.map((v) => `<li class="value"><h3>${v.t}</h3><p>${v.d}</p></li>`).join("")}</ul>
          </div>
        </section>

        <section class="block block--tint" aria-labelledby="langs-title">
          <div class="wrap">
            <h2 class="h2" id="langs-title">${t("about.langTitle")}</h2>
            <ul class="langs">
              ${LANG_ORDER.map((c) => `<li><button type="button" data-set-lang="${c}" lang="${LANGS[c].html}" ${c === lang ? 'aria-current="true"' : ""}>${LANGS[c].name}</button></li>`).join("")}
            </ul>
          </div>
        </section>

        <section class="block" aria-labelledby="follow-title">
          <div class="wrap">
            <h2 class="h2" id="follow-title">${t("about.follow")}</h2>
            <ul class="follow">
              ${SITE.social.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${ICON[s.icon] || ICON.link}<span class="follow-name">${esc(s.label)}</span><span class="follow-handle">${esc(s.handle || "")}</span></a></li>`).join("")}
            </ul>
          </div>
        </section>
        ${nextLink("#stories", t("section.next"), loc(SECTIONS[0].title))}`,
      title: t("about.title"),
      nav: "about",
      key: "about"
    };
  };

  const viewNotFound = () => ({
    html: `${pageHead({ title: t("nf.title"), intro: t("nf.text") })}
      <section class="listing"><div class="wrap"><a class="btn" href="#">${t("nf.link")}</a></div></section>`,
    title: t("nf.title"),
    nav: "",
    key: "404"
  });

  /* ---------- Router ---------- */
  let lastKey = "";
  // The site handles its own navigation. Inside chat previews and other embedded frames a
  // plain "#link" would turn the frame blank, so links are intercepted and routed here.
  let current = null;
  const hashNow = () => { try { return location.hash; } catch (e) { return ""; } };
  const goTo = (href) => {
    const h = href.charAt(0) === "#" ? href : "#" + href;
    current = h;
    try { history.pushState(null, "", h); } catch (e) { /* embedded frames may forbid this */ }
    route({ focus: true });
  };
  const route = (opts = {}) => {
    const raw = decodeURIComponent((current != null ? current : hashNow()).replace(/^#\/?/, ""));
    const [a = "", b = ""] = raw.split("/");
    let view;
    if (!a || a === "home") view = viewHome();
    else if (a === "read") { const p = POSTS.find((x) => x.slug === b); view = p ? viewArticle(p) : viewNotFound(); }
    else if (a === "journal") view = viewJournal(b);
    else if (a === "about") view = viewAbout();
    else if (a === "styling") view = viewStyling(b);
    else if (a === "contact") view = viewContact();
    else if (a === "collaborate") view = viewCollab(b);
    else { const s = sectionOf(a); view = s ? viewSection(s, b) : viewNotFound(); }

    // Switching a filter tab inside the same list keeps the reader’s place.
    const keepPlace = opts.keepScroll || (view.key && view.key.startsWith("list:") && view.key === lastKey);

    app.innerHTML = view.html;
    if (!keepPlace) {
      app.classList.remove("page-in");
      void app.offsetWidth; // restart the fade
      app.classList.add("page-in");
    }

    document.title = view.title ? `${plain(view.title)} — ${SITE.name}` : `${SITE.name} — ${SITE.journal}`;
    $$("[data-nav]").forEach((el) => {
      const on = el.dataset.nav === view.nav;
      el.classList.toggle("is-active", on);
      const link = el.querySelector("a");
      if (link) { if (on) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current"); }
    });
    document.body.classList.toggle("is-article", !!view.article);
    closeMenu();
    bindPage();
    loadInstagram();

    if (!keepPlace) {
      const target = view.anchor && document.getElementById(view.anchor);
      if (target) requestAnimationFrame(() => target.scrollIntoView());
      else window.scrollTo(0, 0);
      if (opts.focus) app.focus({ preventScroll: true });
    }
    lastKey = view.key || "";
    onScroll();
  };

  /* ---------- Chrome: navigation, language, social ---------- */
  const navItems = () => [
    { id: "", label: t("nav.home"), num: "" },
    ...SECTIONS.flatMap((s) => {
      const item = { id: s.id, label: t("nav." + s.id), num: s.num, subs: s.subs };
      return s.id === "style" ? [item, { id: "styling", label: t("nav.styling"), num: "" }] : [item];
    }),
    { id: "about", label: t("nav.about"), num: "" }
  ];

  const renderNav = () => {
    const items = navItems();
    $("#nav").innerHTML = items.map((it) => `
      <li class="${it.subs ? "has-sub" : ""}" data-nav="${it.id}">
        <a href="#${it.id}">${esc(it.label)}</a>
        ${it.subs ? `<ul class="sub">${it.subs.map((x) => `<li><a href="#${it.id}/${x.id}">${esc(loc(x.name))}</a></li>`).join("")}</ul>` : ""}
      </li>`).join("");

    $("#menuList").innerHTML = items.map((it, i) => `
      <li class="menu-item" style="--i:${i}" data-nav="${it.id}">
        <div class="menu-row">
          <a class="menu-link" href="#${it.id}">${esc(it.label)}</a>
          ${it.subs ? `<button class="menu-toggle" type="button" aria-expanded="false" aria-label="${esc(it.label)}">${ICON.plus}</button>` : ""}
        </div>
        ${it.subs ? `<ul class="menu-sub">${it.subs.map((x) => `<li><a href="#${it.id}/${x.id}">${esc(loc(x.name))}</a></li>`).join("")}</ul>` : ""}
      </li>`).join("");

    $("#footJournal").innerHTML = contentSections().map((s) => `<li><a href="#${s.id}">${esc(loc(s.title))}</a></li>`).join("")
      + `<li><a href="#journal">${esc(t("journal.title"))}</a></li>`;
    $("#footConnect").innerHTML = `
      <li><a href="#styling">${esc(t("roles.stylistL"))}</a></li>
      <li><a href="#collaborate">${esc(t("nav.collaborate"))}</a></li>
      <li><a href="#collaborate/proposal">${esc(t("form.title"))}</a></li>
      <li><a href="#about">${esc(t("nav.about"))}</a></li>
      <li><a href="#contact">${esc(t("footer.write"))}</a></li>`;
  };

  const renderLangSwitches = () => {
    $$("[data-lang-switch]").forEach((el) => {
      el.classList.remove("open");
      el.innerHTML = `
        <button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${esc(t("ui.language"))}">${ICON.globe}<span>${LANGS[lang].short}</span></button>
        <ul class="lang-menu">
          ${LANG_ORDER.map((c) => `<li><button type="button" data-set-lang="${c}" lang="${LANGS[c].html}" ${c === lang ? 'aria-current="true"' : ""}>${LANGS[c].name}<span>${LANGS[c].short}</span></button></li>`).join("")}
        </ul>`;
    });
    $("#menuLangs").innerHTML = LANG_ORDER.map((c) =>
      `<button type="button" data-set-lang="${c}" lang="${LANGS[c].html}" ${c === lang ? 'aria-current="true"' : ""}>${LANGS[c].name}</button>`).join("");
    $("#footLangs").innerHTML = LANG_ORDER.map((c) =>
      `<li><button type="button" data-set-lang="${c}" lang="${LANGS[c].html}" ${c === lang ? 'aria-current="true"' : ""}>${LANGS[c].name}</button></li>`).join("");
  };

  const closeLangs = () => $$("[data-lang-switch]").forEach((el) => {
    el.classList.remove("open");
    const b = el.querySelector(".lang-btn");
    if (b) b.setAttribute("aria-expanded", "false");
  });

  const applyStatic = () => {
    root.lang = LANGS[lang].html;
    $$("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $("#today").textContent = fmtDate(new Date(), { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    $("#year").textContent = new Date().getFullYear();
    $("#menuOpen").setAttribute("aria-label", t("ui.menu"));
    $("#menuClose").setAttribute("aria-label", t("ui.close"));
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
  };

  const setLang = (l, initial = false) => {
    if (!LANGS[l]) return;
    lang = l;
    store.set("ekunes-lang", l);
    loadFont(l);
    applyStatic();
    renderNav();
    renderLangSwitches();
    paintThemeButtons();
    if (initial) return;
    // Drop a ?lang= parameter so the new choice sticks after reload.
    try { if (location.search.includes("lang=")) history.replaceState(null, "", location.pathname + location.hash); } catch (e) { /* embedded frame */ }
    const y = window.scrollY;
    route({ keepScroll: true });
    window.scrollTo(0, y);
    closeMenu();
  };

  /* ---------- Theme ---------- */
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : mq.matches);
  const paintThemeButtons = () => $$("[data-theme-toggle]").forEach((b) => {
    b.innerHTML = isDark() ? ICON.sun : ICON.moon;
    b.setAttribute("aria-label", t("ui.theme"));
    b.setAttribute("aria-pressed", String(isDark()));
  });
  const toggleTheme = () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    store.set("ekunes-theme", next);
    paintThemeButtons();
  };
  if (mq.addEventListener) mq.addEventListener("change", paintThemeButtons);

  /* ---------- Mobile menu ---------- */
  const menu = $("#menu");
  const openMenu = () => {
    document.body.classList.add("menu-open");
    menu.inert = false;
    menu.setAttribute("aria-hidden", "false");
    $("#menuOpen").setAttribute("aria-expanded", "true");
    setTimeout(() => $("#menuClose").focus(), 60);
  };
  function closeMenu() {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    menu.inert = true;
    menu.setAttribute("aria-hidden", "true");
    $("#menuOpen").setAttribute("aria-expanded", "false");
  }

  /* ---------- Forms & sharing ---------- */
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const setStatus = (el, msg, isError = false) => {
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("is-error", isError);
  };
  const postForm = async (url, form, subject) => {
    const data = new FormData(form);
    data.append("_subject", subject);
    data.append("_template", "table");
    data.append("_captcha", "false");
    const res = await fetch(url, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    let reply = null;
    try { reply = await res.json(); } catch (e) { /* some services reply with plain text */ }
    if (reply && (reply.success === false || reply.success === "false")) throw new Error("rejected");
  };
  const failText = () => `${t("form.error")} ${SITE.email}`;
  const mailto = (subject, body) =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Opens the visitor's email app. Some embedded previews block this, so the address is also shown in the message.
  const openMail = (url) => {
    try {
      const a = document.createElement("a");
      a.href = url; a.rel = "noopener"; a.style.display = "none";
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e) { /* blocked: the address is shown in the status message */ }
  };

  async function onNewsletter(form) {
    const status = $("#newsStatus");
    const email = form.elements.email.value.trim();
    if (!validEmail(email)) { setStatus(status, t("news.invalid"), true); form.elements.email.focus(); return; }
    if (SITE.newsletterEndpoint) {
      try { await postForm(SITE.newsletterEndpoint, form, `${SITE.journal}: newsletter sign-up`); form.reset(); setStatus(status, t("news.thanks")); }
      catch (err) { setStatus(status, failText(), true); }
    } else {
      openMail(mailto(`${SITE.journal} — newsletter`, `Please add ${email} to The Ekunes Letter.`));
      setStatus(status, `${t("news.mailto")} ${SITE.email}`);
    }
  }

  async function onProposal(form) {
    const status = form.querySelector(".form-status");
    const f = form.elements;
    const val = (n) => (f[n] ? f[n].value.trim() : "");
    const name = val("name"), email = val("email"), message = val("message"), org = val("organisation"), type = val("type");
    if (!name || !validEmail(email) || !message) { setStatus(status, t("form.required"), true); return; }
    const subject = `${form.dataset.subject || "Proposal"}${type ? ": " + type : ""} — ${name}`;
    if (SITE.formEndpoint) {
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      try { await postForm(SITE.formEndpoint, form, subject); form.reset(); setStatus(status, t("form.sent")); }
      catch (err) { setStatus(status, failText(), true); }
      finally { btn.disabled = false; }
    } else {
      const body = `Name: ${name}\nEmail: ${email}${org ? `\nOrganisation: ${org}` : ""}${type ? `\nType: ${type}` : ""}\n\n${message}`;
      openMail(mailto(subject, body));
      setStatus(status, `${t("form.mailto")} ${SITE.email}`);
    }
  }

  // Forms are handled by script. Embedded previews often block native form submission,
  // so the button click is handled too (Enter in a field also triggers that click).
  function wireForm(form, handler) {
    if (!form) return;
    const run = (e) => { e.preventDefault(); handler(form); };
    form.addEventListener("submit", run);
    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.addEventListener("click", run);
  }

  function bindPage() {
    wireForm($("#newsForm", app), onNewsletter);
    wireForm($("#proposalForm", app), onProposal);
    wireForm($("#stylingForm", app), onProposal);
    wireForm($("#contactForm", app), onProposal);
  }

  let toastTimer;
  const toast = (msg) => {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  };

  const share = async (kind) => {
    const url = /^https?:/.test(location.href) ? location.href : (SITE.url || "") + hashNow();
    if (kind === "native" && navigator.share) {
      try { await navigator.share({ title: document.title, url }); } catch (e) { /* cancelled */ }
      return;
    }
    if (kind === "copy") {
      try { await navigator.clipboard.writeText(url); toast(t("article.copied")); }
      catch (e) { try { window.prompt(t("article.copy"), url); } catch (e2) { /* blocked */ } }
      return;
    }
    const u = encodeURIComponent(url);
    const target = kind === "linkedin"
      ? `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
      : `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    window.open(target, "_blank", "noopener");
  };

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const el = e.target;
    if (el.closest(".skip")) { e.preventDefault(); app.focus(); return; }

    const link = el.closest("a[href^='#']");
    if (link && !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      closeLangs();
      goTo(link.getAttribute("href"));
      return;
    }

    const setL = el.closest("[data-set-lang]");
    if (setL) { setLang(setL.dataset.setLang); return; }

    const langBtn = el.closest(".lang-btn");
    if (langBtn) {
      const wrap = langBtn.parentElement;
      const willOpen = !wrap.classList.contains("open");
      closeLangs();
      if (willOpen) { wrap.classList.add("open"); langBtn.setAttribute("aria-expanded", "true"); }
      return;
    }
    if (!el.closest("[data-lang-switch]")) closeLangs();

    if (el.closest("[data-theme-toggle]")) { toggleTheme(); return; }
    if (el.closest("#menuOpen")) { openMenu(); return; }
    if (el.closest("#menuClose")) { closeMenu(); return; }
    if (el.closest("[data-top]")) { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); return; }

    const toggle = el.closest(".menu-toggle");
    if (toggle) {
      const li = toggle.closest(".menu-item");
      const open = li.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      return;
    }
    if (el.closest("#menu a")) closeMenu();

    const vid = el.closest("[data-video]");
    if (vid) { playVideo(vid); return; }

    const sh = el.closest("[data-share]");
    if (sh) share(sh.dataset.share);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeMenu(); closeLangs(); }
  });

  const fromAddressBar = () => { current = null; route({ focus: true }); };
  window.addEventListener("hashchange", fromAddressBar);
  window.addEventListener("popstate", fromAddressBar);

  /* ---------- Scroll: compact header + reading progress ---------- */
  const masthead = $(".masthead");
  const progress = $("#progress");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const limit = masthead && masthead.offsetHeight ? masthead.offsetHeight : 8;
      document.body.classList.toggle("is-scrolled", y > limit);
      if (document.body.classList.contains("is-article")) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Start ---------- */
  menu.inert = true;
  $$("[data-social]").forEach((el) => { el.innerHTML = socialLinks(); });
  setLang(lang, true);
  route();
})();
