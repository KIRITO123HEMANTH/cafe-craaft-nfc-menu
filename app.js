/* Renders config.js content into the page and wires up interactions. */
(() => {
  const C = window.CAFE_CONFIG;
  const $ = (s) => document.querySelector(s);
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = new Intl.NumberFormat(C.locale, { style: "currency", currency: C.currency });
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Responsive image URL. Unsplash gets sized crops; other hosts are used as-is.
  const img = (src, w) => (src.includes("images.unsplash.com") ? `${src}?auto=format&fit=crop&w=${w}&q=70` : src);
  const srcset = (src, widths) => (src.includes("images.unsplash.com") ? widths.map((w) => `${img(src, w)} ${w}w`).join(", ") : "");

  if (!C.isDemo) document.documentElement.classList.add("is-live");

  // Unconfigured destinations fall back to their demo links
  for (const k in C.demoLinks) C.links[k] = C.links[k] || C.demoLinks[k];

  // Derived contact links
  const tel = "tel:" + C.contact.phone.replace(/[^\d+]/g, "");
  const mail = "mailto:" + C.contact.email;
  for (const el of [$("#phone-link"), $("#dock-call")]) el.href = tel;
  $("#email-link").href = mail;

  // Simple bindings: data-text="path" / data-href="path"
  document.querySelectorAll("[data-text]").forEach((el) => (el.textContent = get(el.dataset.text)));
  document.querySelectorAll("[data-href]").forEach((el) => (el.href = get(el.dataset.href)));
  $("#year").textContent = new Date().getFullYear();

  // ---------- Menu tabs ----------
  const tabs = $("#menu-tabs");
  const panel = $("#menu-panel");
  const tagHtml = (t) => (C.dietary[t] ? `<span class="tag" title="${esc(C.dietary[t].label)}"><abbr title="${esc(C.dietary[t].label)}" style="text-decoration:none">${esc(C.dietary[t].short)}</abbr></span>` : "");

  tabs.innerHTML = C.menu
    .map((c, i) => `<button class="tab" type="button" role="tab" id="tab-${esc(c.id)}" aria-controls="menu-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-cat="${esc(c.id)}">${esc(c.name)}</button>`)
    .join("");

  function selectTab(id, focus) {
    const cat = C.menu.find((c) => c.id === id) || C.menu[0];
    tabs.querySelectorAll(".tab").forEach((b) => {
      const on = b.dataset.cat === cat.id;
      b.setAttribute("aria-selected", on);
      b.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) b.focus();
        // Horizontal only — scrollIntoView would also yank the page vertically.
        tabs.scrollTo({ left: b.offsetLeft - tabs.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
    panel.setAttribute("aria-labelledby", "tab-" + cat.id);
    panel.innerHTML = `
      <div class="cat-banner">
        <img src="${esc(img(cat.image, 800))}" srcset="${esc(srcset(cat.image, [480, 800, 1200]))}" sizes="(min-width: 900px) 800px, 100vw" width="800" height="300" loading="lazy" alt="">
        <div class="cat-banner__text"><h3>${esc(cat.name)}</h3><p>${esc(cat.blurb)}</p></div>
      </div>
      <ul class="items">
        ${cat.items
          .map(
            (it, i) => `
          <li class="item${it.featured ? " item--featured" : ""}" style="animation-delay:${i * 35}ms">
            ${it.featured ? '<span class="item__flag">House signature</span>' : ""}
            <div class="item__row">
              <span class="item__name">${esc(it.name)}</span>
              <span class="item__leader" aria-hidden="true"></span>
              <span class="item__price">${money.format(it.price)}</span>
            </div>
            <p class="item__desc">${esc(it.desc)}</p>
            ${it.tags && it.tags.length ? `<div class="item__tags">${it.tags.map(tagHtml).join("")}</div>` : ""}
          </li>`
          )
          .join("")}
      </ul>`;
  }

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (b) selectTab(b.dataset.cat);
  });
  tabs.addEventListener("keydown", (e) => {
    const list = [...tabs.querySelectorAll(".tab")];
    const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: list.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectTab(list[(next + list.length) % list.length].dataset.cat, true);
  });
  selectTab(C.menu[0].id);

  $("#menu-legend").innerHTML = Object.values(C.dietary)
    .map((d) => `<span><span class="tag">${esc(d.short)}</span>${esc(d.label)}</span>`)
    .join("");

  // ---------- Featured ----------
  const F = C.featured;
  const fImg = $("#featured-img");
  fImg.src = img(F.image, 800);
  fImg.srcset = srcset(F.image, [480, 800, 1200]);
  fImg.sizes = "(min-width: 900px) 560px, 100vw";
  fImg.alt = F.imageAlt;
  $("#featured-price").textContent = money.format(F.price);
  $("#featured-cta").addEventListener("click", () => {
    selectTab(F.menuTab);
    $("#menu").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    tabs.querySelector('[aria-selected="true"]').focus({ preventScroll: true });
  });

  // ---------- Reviews ----------
  const R = C.reviews;
  const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  $("#rating-stars").textContent = stars(R.rating);
  $("#rating-label").textContent = C.isDemo ? `Sample rating out of 5 · for demonstration only` : `out of 5 · ${R.count}`;
  $("#reviews-list").innerHTML = R.items
    .map(
      (r) => `
    <li class="review">
      <span class="stars" role="img" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</span>
      <blockquote>${esc(r.text)}</blockquote>
      <footer><span>${esc(r.author)}</span>${C.isDemo ? '<span class="badge">Sample</span>' : ""}</footer>
    </li>`
    )
    .join("");

  // ---------- Instagram ----------
  $("#insta-grid").innerHTML = C.instagram.images
    .map(
      (p) => `
    <li>
      <img src="${esc(img(p.src, 400))}" srcset="${esc(srcset(p.src, [240, 400, 600]))}" sizes="(min-width: 900px) 380px, 33vw" width="400" height="400" loading="lazy" alt="${esc(p.alt)}">
      ${C.isDemo ? '<span class="insta__demo">Demo</span>' : ""}
    </li>`
    )
    .join("");

  // ---------- Hours (+ today) ----------
  const today = new Date().getDay();
  $("#hours-body").innerHTML = C.hours
    .map((h) => `<tr class="${h.days.includes(today) ? "is-today" : ""}"><th scope="row">${esc(h.label)}</th><td>${esc(h.time)}</td></tr>`)
    .join("");
  const todayRow = C.hours.find((h) => h.days.includes(today));
  if (todayRow) $("#today-hours").textContent = `Today ${todayRow.time}`;

  // ---------- Welcome cue (non-blocking, auto-dismiss) ----------
  const welcome = $("#welcome");
  const hideWelcome = () => {
    welcome.classList.add("is-hiding");
    setTimeout(() => (welcome.hidden = true), 300);
  };
  try {
    if (!sessionStorage.getItem("cc-welcomed")) {
      welcome.hidden = false;
      sessionStorage.setItem("cc-welcomed", "1");
      setTimeout(hideWelcome, 5000);
    }
  } catch {
    welcome.hidden = false;
    setTimeout(hideWelcome, 5000);
  }
  welcome.querySelector("button").addEventListener("click", hideWelcome);

  // ---------- Motion extras (skipped entirely for reduced motion) ----------
  if (reduceMotion) return;

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".section__head, .featured__copy, .featured__media, .card, .reviews__list, .insta__grid").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // Gentle tilt — fine pointers only; touch devices keep the static layered look.
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 10).toFixed(2));
        el.style.setProperty("--rx", (-y * 8).toFixed(2));
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--ry", 0);
        el.style.setProperty("--rx", 0);
      });
    });
  }
})();
