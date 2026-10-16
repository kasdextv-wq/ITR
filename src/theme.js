(() => {
  const key = "itr-theme";
  const valid = new Set(["system", "light", "dark"]);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";

  try {
    const stored = localStorage.getItem(key);
    if (valid.has(stored)) preference = stored;
  } catch {}

  if (location.protocol === "file:") {
    const requested = new URL(location.href).searchParams.get("theme");
    if (valid.has(requested)) preference = requested;
  }

  function apply(value, save = false) {
    document.documentElement.classList.add("theme-changing");
    preference = valid.has(value) ? value : "system";
    const resolved =
      preference === "system" ? (media.matches ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = preference;
    const control = document.querySelector("#theme-mode");
    if (control) control.value = preference;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", resolved === "dark" ? "#101216" : "#f6f7f9");
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("theme-changing"),
      ),
    );
    if (save) {
      try {
        localStorage.setItem(key, preference);
      } catch {}
      if (location.protocol === "file:") {
        try {
          const current = new URL(location.href);
          current.searchParams.set("theme", preference);
          history.replaceState(null, "", current);
        } catch {}
      }
    }
  }

  apply(preference);
  media.addEventListener("change", () => {
    if (preference === "system") apply("system");
  });
  window.addEventListener("storage", (event) => {
    if (event.key === key)
      apply(valid.has(event.newValue) ? event.newValue : "system");
  });
  document.addEventListener("DOMContentLoaded", () => {
    const control = document.querySelector("#theme-mode");
    if (control) {
      control.value = preference;
      control.addEventListener("change", () => apply(control.value, true));
    }
  });
  document.addEventListener(
    "click",
    (event) => {
      if (location.protocol !== "file:") return;
      const link = event.target.closest("a[href]");
      if (!link || link.getAttribute("href").startsWith("#")) return;
      const target = new URL(link.href, location.href);
      if (target.protocol !== "file:" || !target.pathname.endsWith(".html"))
        return;
      target.searchParams.set("theme", preference);
      link.href = target.href;
    },
    true,
  );
})();
