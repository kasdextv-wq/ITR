import { company } from "./data.js";

export function normalizePhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 && !value.trim().startsWith("+"))
    return `+7${digits}`;
  if (digits.length === 11 && /^[78]/.test(digits))
    return `+7${digits.slice(1)}`;
  return `+${digits}`;
}

export function isValidPhone(value) {
  if (!/^[+\d\s()\-]+$/.test(value)) return false;
  if ((value.match(/\+/g) || []).length > 1) return false;
  if (value.includes("+") && !value.trim().startsWith("+")) return false;
  const digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+"))
    return digits.length >= 10 && digits.length <= 15;
  return digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits));
}

export function formatPhone(value) {
  if (!isValidPhone(value)) return value;
  const phone = normalizePhone(value);
  if (phone.startsWith("+7") && phone.length === 12) {
    return `+7 (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`;
  }
  return phone;
}

export function createRequest(values) {
  const name = String(values.name || "").trim();
  const service = String(values.service || "Комплексное решение");
  const message = String(values.message || "").trim();
  const text = [
    "Здравствуйте! Хочу обсудить проект с ИТР.",
    "",
    `Имя: ${name}`,
    `Телефон: ${normalizePhone(String(values.phone || ""))}`,
    `Направление: ${service}`,
    ...(message ? ["", "О проекте:", message] : []),
  ].join("\n");
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Заявка с сайта ИТР: ${service}`)}&body=${encodeURIComponent(text)}`;
  return { text, mailto };
}
