import { serviceCards, solutionContent } from "./sections.js";
import { solutions } from "./data.js";
import { icon } from "./icons.js";
import { createRequest, formatPhone, isValidPhone } from "./form.js";

const app = document.querySelector("#app");

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  menuToggle.innerHTML = icon(open ? "close" : "menu");
}

menuToggle.addEventListener("click", () => setMenu(mobileMenu.hidden));
mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (
    !event.composedPath().includes(document.querySelector(".header")) &&
    !mobileMenu.hidden
  )
    setMenu(false);
});
matchMedia("(min-width: 1101px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

const dialogs = [...document.querySelectorAll("dialog")];

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add("modal-open");
}

dialogs.forEach((dialog) => {
  dialog
    .querySelector("[data-close]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (!dialogs.some((item) => item.open))
      document.body.classList.remove("modal-open");
  });
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
});

function selectRequest(request) {
  dialogs.forEach((dialog) => {
    if (dialog.open) dialog.close();
  });
  const select = document.querySelector("#service");
  const existing = [...select.options].find(
    (option) => option.value === request,
  );
  if (!existing) select.add(new Option(request, request));
  select.value = request;
  document.querySelector("#contact").scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  document.querySelector("#name").focus({ preventScroll: true });
}

app.addEventListener("click", (event) => {
  const request = event.target.closest("[data-request]");
  const privacy = event.target.closest("[data-privacy]");
  if (request) selectRequest(request.dataset.request);
  if (privacy) openDialog(document.querySelector("#privacy-dialog"));
});

const filters = [...document.querySelectorAll("[data-filter]")];
filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    document.querySelector("#service-grid").innerHTML = serviceCards(
      button.dataset.filter,
    );
    const count = document.querySelectorAll(".service-card").length;
    document.querySelector("#filter-status").textContent =
      `Показано карточек: ${count}`;
  });
});

const tabs = [...document.querySelectorAll("[data-solution]")];

function selectSolution(tab) {
  const key = tab.dataset.solution;
  tabs.forEach((button) => {
    const active = tab === button;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  document.querySelector("#solution-copy").innerHTML = solutionContent(key);
  document
    .querySelector("#solution-panel")
    .setAttribute("aria-labelledby", tab.id);
  document.querySelector("#diagram-label").textContent = solutions[key].diagram;
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectSolution(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectSolution(tabs[next]);
    tabs[next].focus();
  });
});

const form = document.querySelector("#contact-form");
const phone = document.querySelector("#phone");
const phoneError = document.querySelector("#phone-error");

function validatePhone() {
  const valid = !phone.value || isValidPhone(phone.value);
  phone.setCustomValidity(valid ? "" : "Укажите корректный номер телефона");
  phone.setAttribute("aria-invalid", String(!valid));
  phoneError.textContent = valid
    ? ""
    : "Проверьте номер, например +7 (391) 218-16-18";
  return valid;
}

phone.addEventListener("input", () => {
  phone.setCustomValidity("");
  phone.removeAttribute("aria-invalid");
  phoneError.textContent = "";
});
phone.addEventListener("blur", () => {
  if (validatePhone()) phone.value = formatPhone(phone.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name");
  name.setCustomValidity(
    name.value.trim().length < 2 ? "Введите ваше имя" : "",
  );
  validatePhone();
  if (!form.reportValidity()) return;
  const request = createRequest(Object.fromEntries(new FormData(form)));
  document.querySelector("#request-preview").value = request.text;
  document.querySelector("#open-mail").href = request.mailto;
  document.querySelector("#copy-status").textContent = "";
  openDialog(document.querySelector("#request-dialog"));
});
document
  .querySelector("#name")
  .addEventListener("input", (event) => event.target.setCustomValidity(""));

document.querySelector("#copy-request").addEventListener("click", async () => {
  const preview = document.querySelector("#request-preview");
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(preview.value);
    status.textContent = "Текст заявки скопирован";
  } catch {
    preview.focus();
    preview.select();
    status.textContent =
      "Текст выделен. Скопируйте его через меню устройства или Ctrl/Cmd + C.";
  }
});

const requestedService = document.body.dataset.service;
if (requestedService)
  document.querySelector("#service").value = requestedService;

const mapButton = document.querySelector("[data-map-load]");
mapButton?.addEventListener("click", () => {
  const holder = document.querySelector("#office-map-frame");
  const frame = document.createElement("iframe");
  frame.src = mapButton.dataset.mapSrc;
  frame.title = "Карта 2ГИС: офис ИТР в Красноярске";
  frame.setAttribute(
    "sandbox",
    "allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation",
  );
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allowFullscreen = true;
  holder.replaceChildren(frame);
  holder.hidden = false;
  mapButton.hidden = true;
  frame.focus();
});
