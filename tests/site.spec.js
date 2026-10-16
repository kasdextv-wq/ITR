import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages } from "../src/pages.js";

function pageUrl(name = "index") {
  return process.env.ITR_TEST_URL
    ? new URL(`${name}.html`, process.env.ITR_TEST_URL).href
    : `/${name}.html`;
}

for (const entry of pages) {
  test(`${entry.id}: page, assets, anchors and layout work`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(pageUrl(entry.id));
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(entry.title);
    await page.evaluate(() => document.fonts.ready);
    const checks = await page.evaluate(async () => {
      const ids = [...document.querySelectorAll("[id]")].map(
        (element) => element.id,
      );
      const images = [...document.images];
      images.forEach((image) => (image.loading = "eager"));
      const brokenImages = await Promise.all(
        images.map((image) =>
          image
            .decode()
            .then(() => null)
            .catch(() => image.src),
        ),
      );
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        duplicates: ids.length !== new Set(ids).size,
        anchors: [...document.querySelectorAll('a[href^="#"]')]
          .filter(
            (link) => link.hash && !document.getElementById(link.hash.slice(1)),
          )
          .map((link) => link.hash),
        brokenImages: brokenImages.filter(Boolean),
      };
    });
    expect(checks).toEqual({
      overflow: false,
      duplicates: false,
      anchors: [],
      brokenImages: [],
    });
    expect(errors).toEqual([]);
  });
}

for (const theme of ["light", "dark"]) {
  test(`${theme}: automatically follows OS and passes accessibility checks`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const name of ["index", "contacts", "catalog", "service-video"]) {
      await page.goto(pageUrl(name));
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(page.locator("#theme-mode")).toHaveValue("system");
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    }
  });
}

test("theme can be overridden, follows live OS changes and survives navigation", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(pageUrl());
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("#theme-mode").selectOption("light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator('.footer-nav a[href="about.html"]').click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "about");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("#theme-mode")).toHaveValue("light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("#theme-mode").selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("services filter and navigate to a real detail page", async ({ page }) => {
  await page.goto(pageUrl("services"));
  await page.locator('[data-filter="power"]').click();
  await expect(page.locator(".service-card")).toHaveCount(1);
  await page.locator(".service-trigger").click();
  await expect(page.locator("body")).toHaveAttribute(
    "data-page",
    "service-electric",
  );
  await expect(page.locator("#service")).toHaveValue("Электромонтаж");
  await page.locator(".service-detail [data-request]").click();
  await expect(page.locator("#name")).toBeFocused();
});

test("filters show all groups and tabs work with keyboard", async ({
  page,
}) => {
  await page.goto(pageUrl());
  await page.locator('[data-filter="security"]').click();
  await expect(page.locator(".service-card")).toHaveCount(4);
  await page.locator('[data-filter="network"]').click();
  await expect(page.locator(".service-card")).toHaveCount(1);
  await page.locator('[data-filter="all"]').click();
  await expect(page.locator(".service-card")).toHaveCount(6);
  await page.locator("#tab-industry").click();
  await expect(page.locator("#diagram-label")).toHaveText(
    "Промышленный объект",
  );
  await page.locator("#tab-industry").press("ArrowRight");
  await expect(page.locator("#tab-home")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.locator("#solution-copy [data-request]").click();
  await expect(page.locator("#service")).toHaveValue(
    "Комплексное решение для частного объекта",
  );
});

test("form validates input and prepares a draft without claiming delivery", async ({
  page,
}) => {
  await page.goto(pageUrl("contacts"));
  await page.locator("#name").fill("Иван");
  await page.locator("#phone").fill("123");
  await page.locator("#message").fill("Офис 100 м² <script>alert(1)</script>");
  await expect(page.locator("#phone")).toHaveAttribute("aria-invalid", "true");
  await page.locator("#phone").fill("83912181618");
  await page.locator("#consent").check();
  await page.locator(".submit-button").click();
  await expect(page.locator("#request-dialog")).toBeVisible();
  await expect(page.locator("#request-preview")).toHaveValue(
    /Телефон: \+73912181618/,
  );
  await expect(page.locator("#request-preview")).toHaveValue(
    /<script>alert\(1\)<\/script>/,
  );
  await expect(page.locator("#request-dialog")).toContainText(
    "Заявка ещё не отправлена",
  );
  await expect(page.locator("#open-mail")).toHaveAttribute(
    "href",
    /^mailto:info@itr124.ru\?subject=/,
  );
  await page.locator("#copy-request").click();
  await expect(page.locator("#copy-status")).not.toBeEmpty();
  await page.keyboard.press("Escape");
  await expect(page.locator("#request-dialog")).not.toBeVisible();
});

test("map retains the office data and only loads external content after a click", async ({
  page,
}) => {
  const externalRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("2gis")) externalRequests.push(request.url());
  });
  await page.goto(pageUrl("contacts"));
  await expect(page.locator(".office-card")).toContainText(
    "Высотная, 2 ст8 пом12",
  );
  await expect(page.locator(".office-card")).toContainText(
    "Офис 3.6, 2-й этаж",
  );
  await expect(page.locator(".office-card")).toContainText(
    "Вход со двора, домофон 17",
  );
  expect(externalRequests).toEqual([]);
  await page.route("https://makemap.2gis.ru/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html><body>Map fixture</body></html>",
    }),
  );
  await page.locator("[data-map-load]").click();
  await expect(page.locator("#office-map-frame iframe")).toHaveAttribute(
    "src",
    /^https:\/\/makemap.2gis.ru\/widget\?data=/,
  );
  await expect(page.locator("#office-map-frame")).toBeVisible();
});

test("catalog enquiry retains selected equipment", async ({ page }) => {
  await page.goto(pageUrl("catalog"));
  await page.locator(".catalog-card [data-request]").first().click();
  await expect(page.locator("#service")).toHaveValue(
    "Оборудование: Видеонаблюдение",
  );
});

test("reviews contain real source links and FAQ and privacy are operable", async ({
  page,
}) => {
  await page.goto(pageUrl());
  await expect(page.locator(".review-card")).toHaveCount(2);
  await expect(page.locator(".review-card a").first()).toHaveAttribute(
    "href",
    /2gis.ru/,
  );
  const faq = page.locator(".faq-list details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await page.locator(".footer-bottom [data-privacy]").click();
  await expect(page.locator("#privacy-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#privacy-dialog")).not.toBeVisible();
});

test("mobile menu opens and navigates to a real page", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile);
  await page.goto(pageUrl());
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.locator('#mobile-menu a[href="services.html"]').click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "services");
  await expect(page.locator("#mobile-menu")).not.toBeVisible();
});
