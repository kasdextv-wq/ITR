import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizePhone,
  isValidPhone,
  formatPhone,
  createRequest,
} from "../src/form.js";
import { services, solutions } from "../src/data.js";

test("normalizes Russian phone numbers", () => {
  assert.equal(normalizePhone("8 (391) 218-16-18"), "+73912181618");
  assert.equal(normalizePhone("3912181618"), "+73912181618");
  assert.equal(normalizePhone("+7 391 218 16 18"), "+73912181618");
});

test("validates phones without accepting malformed input", () => {
  for (const value of [
    "+7 (391) 218-16-18",
    "83912181618",
    "3912181618",
    "+49 151 23456789",
  ])
    assert.ok(isValidPhone(value));
  for (const value of [
    "",
    "12345",
    "abc3912181618",
    "++73912181618",
    "123+73912181618",
    "+1234567890123456",
  ])
    assert.equal(isValidPhone(value), false);
});

test("formats valid Russian numbers and preserves unfinished input", () => {
  assert.equal(formatPhone("83912181618"), "+7 (391) 218-16-18");
  assert.equal(formatPhone("123"), "123");
});

test("creates a correctly encoded email without sending it", () => {
  const request = createRequest({
    name: " Иван ",
    phone: "83912181618",
    service: "Сети и связь",
    message: "Офис & склад\n100 м²",
  });
  assert.ok(request.text.includes("Имя: Иван"));
  assert.ok(request.text.includes("Офис & склад\n100 м²"));
  const url = new URL(request.mailto);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "info@itr124.ru");
  assert.equal(url.searchParams.get("body"), request.text);
  assert.equal(
    url.searchParams.get("subject"),
    "Заявка с сайта ИТР: Сети и связь",
  );
});

test("does not include an empty project description", () => {
  assert.ok(
    !createRequest({ name: "Иван", phone: "83912181618" }).text.includes(
      "О проекте:",
    ),
  );
});

test("service IDs are unique and solution content is complete", () => {
  assert.equal(
    new Set(services.map((service) => service.id)).size,
    services.length,
  );
  for (const service of services)
    assert.ok(service.title && service.detail && service.includes.length);
  for (const solution of Object.values(solutions))
    assert.ok(solution.title && solution.items.length && solution.request);
});
