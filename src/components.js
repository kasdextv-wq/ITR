import { company } from "./data.js";
import { office } from "./office.js";
import { icon } from "./icons.js";

export const navigation = [
  ["index", "Главная"],
  ["about", "О компании"],
  ["services", "Услуги"],
  ["catalog", "Магазин"],
  ["careers", "Работа у нас"],
  ["contacts", "Контакты"],
];

export const brand = `<a class="brand" href="index.html" aria-label="ИТР — на главную"><span class="brand-mark">и<span>т</span>р<span class="brand-dot"></span></span><span class="brand-name">Инженерно-технические<br> решения</span></a>`;

export function header(page) {
  const links = navigation
    .map(
      ([id, title]) =>
        `<a href="${id}.html"${page === id || (page.startsWith("service-") && id === "services") ? ' class="active" aria-current="page"' : ""}>${title}</a>`,
    )
    .join("");
  return `<div class="utility-bar"><div class="container utility-inner"><a href="contacts.html">${icon("pin")} Красноярск и Красноярский край</a><a href="reviews.html">Отзывы клиентов ${icon("diagonal")}</a><a href="mailto:${company.email}">${company.email} ${icon("diagonal")}</a></div></div>
    <header class="header"><div class="container header-inner">${brand}<nav class="desktop-nav" aria-label="Основная навигация">${links}</nav><div class="header-contact"><a class="header-phone" href="tel:${company.phoneHref}">${company.phone}</a><span>${office.hours}</span></div><div class="theme-control"><span class="theme-symbol" aria-hidden="true">◐</span><select id="theme-mode" aria-label="Тема оформления"><option value="system">Как в системе</option><option value="light">Светлая</option><option value="dark">Тёмная</option></select></div><button class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">${icon("menu")}</button></div><nav class="mobile-nav" id="mobile-menu" aria-label="Мобильная навигация" hidden>${links}<a href="reviews.html">Отзывы клиентов</a><a href="tel:${company.phoneHref}">${company.phone}</a></nav></header>`;
}

export function footer() {
  return `<footer class="footer container" id="footer"><div class="footer-main"><div class="footer-brand">${brand}<p>Системы работают.<br> Вы занимаетесь главным.</p></div><div class="footer-nav"><span class="footer-label">НАВИГАЦИЯ</span>${navigation
    .slice(1)
    .map(([id, title]) => `<a href="${id}.html">${title}</a>`)
    .join(
      "",
    )}<a href="reviews.html">Отзывы клиентов</a></div><div class="footer-contacts"><span class="footer-label">НА СВЯЗИ</span><a href="tel:${company.phoneHref}">${company.phone}</a><a href="mailto:${company.email}">${company.email} ${icon("diagonal")}</a></div><div class="footer-location"><span class="footer-label">НАШ ОФИС</span><p>${icon("pin")} ул. Высотная, 2 ст8 пом12</p><p>${office.office}</p><p>${icon("clock")} ${office.hours}</p><a class="text-button" href="contacts.html">Как добраться ${icon("arrow")}</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${company.name}</span><button type="button" data-privacy>Персональные данные</button><a href="#">Наверх ↑</a></div></footer>`;
}

export function pageHeading(label, title, text, parent) {
  return `<section class="container page-heading"><nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span>${parent ? `<a href="${parent.href}">${parent.label}</a><span>/</span>` : ""}<span aria-current="page">${label}</span></nav><p class="eyebrow"><span></span>${label.toUpperCase()}</p><h1>${title}</h1><p class="page-lead">${text}</p></section>`;
}

export function officeSection() {
  return `<section class="office-section container section" id="office" aria-labelledby="office-title"><p class="section-label"><span>ИТР</span>ДАВАЙТЕ ВСТРЕТИМСЯ</p><div class="section-heading"><h2 id="office-title">Рядом с вами.<br> В Красноярске.</h2><p>Приезжайте обсудить проект.<br> Перед визитом лучше позвонить.</p></div><div class="office-layout"><div class="office-card"><span class="office-icon">${icon("pin")}</span><h3>Наш офис</h3><address>${office.address}<strong>${office.office}</strong></address><p class="entrance-note">${office.entrance}.</p><div class="office-hours">${icon("clock")} ${office.hours}</div><a class="office-phone" href="tel:${company.phoneHref}">${company.phone}</a><a class="button button-primary" href="${office.routeUrl}" target="_blank" rel="noopener noreferrer">Построить маршрут ${icon("diagonal")}</a><a class="text-button" href="${office.mapUrl}" target="_blank" rel="noopener noreferrer">Карточка компании в 2ГИС ${icon("arrow")}</a></div><div class="office-map"><div class="map-stage"><img src="assets/images/office-map.webp" alt="Карта 2ГИС: офис ИТР на улице Высотной, 2 ст8 пом12, отмечен синей точкой" width="1000" height="550" loading="lazy"><button class="button map-load" data-map-load data-map-src="${office.mapEmbed}">${icon("pin")} Открыть интерактивную карту</button><div class="map-frame" id="office-map-frame" hidden></div></div><p class="map-note">Схема проезда доступна без интернета. Интерактивная карта загружается по нажатию. Картографические данные — <a href="${office.mapUrl}" target="_blank" rel="noopener noreferrer">2ГИС</a>.</p></div></div></section>`;
}

export const reviews = [
  {
    name: "Татьяна Гайсина",
    initials: "ТГ",
    date: "10 марта 2024",
    datetime: "2024-03-10",
    quote:
      "Обратилась в эту компанию по рекомендации друзей.Ребята просто супер!Нам нужно было видеонаблюдение по периметру дома.По тому как меня понимали с полуслова,я поняла что ребята знают свое дело на все 100!Сработали четко,быстро и даже убрали мусор после монтажных работ!!!В общем,если вы хотите результат без головной боли,вам сюда!",
  },
  {
    name: "Марина Иванова",
    initials: "МИ",
    date: "5 марта 2024",
    datetime: "2024-03-05",
    quote:
      "Добрый день! Нужны были камеры в магазин ! Парни все сделали быстро , профессионально ! Все объяснили , рассказали ! Работой довольна ! Рекомендую !👍",
  },
];

export function reviewsSection(expanded = false) {
  return `<section class="reviews-section section container" id="reviews" aria-labelledby="reviews-title"><p class="section-label"><span>ОБРАТНАЯ СВЯЗЬ</span>ОПЫТ НАШИХ КЛИЕНТОВ</p><div class="section-heading"><h2 id="reviews-title">О результате —<br> из первых рук.</h2><a class="text-button" href="${expanded ? office.reviewsUrl : "reviews.html"}"${expanded ? ' target="_blank" rel="noopener noreferrer"' : ""}>${expanded ? "Все отзывы на 2ГИС" : "Отзывы клиентов"} ${icon("diagonal")}</a></div><div class="reviews-grid">${reviews.map((review) => `<article class="review-card"><div class="review-top"><span class="review-avatar">${review.initials}</span><div><h3>${review.name}</h3><time datetime="${review.datetime}">${review.date}</time></div><span class="review-source">2ГИС</span></div><blockquote>${review.quote}</blockquote><a class="text-button" href="${office.reviewsUrl}" target="_blank" rel="noopener noreferrer">Читать в источнике ${icon("diagonal")}</a></article>`).join("")}</div><div class="review-bottom"><p>Уже работали с нами? Расскажите о вашем опыте.</p><a class="button button-secondary" href="${office.reviewsUrl}" target="_blank" rel="noopener noreferrer">Оставить отзыв в 2ГИС ${icon("diagonal")}</a></div>${expanded ? `<div class="business-reviews"><div><h3>Отзывы организаций</h3><p>Отзывы по исполненным контрактам доступны на портале «ВБЦ».</p></div><a class="button button-secondary" href="${office.businessReviewsUrl}" target="_blank" rel="noopener noreferrer">Перейти на ВБЦ ${icon("diagonal")}</a></div>` : ""}</section>`;
}

export function allBrands() {
  const brands = [
    ["hikvision", "Hikvision"],
    ["hiwatch", "HiWatch"],
    ["tantos", "Tantos"],
    ["ezviz", "EZVIZ"],
    ["doorhan", "DoorHan"],
    ["dahua", "Dahua"],
    ["rvi", "RVI"],
    ["dekraft", "DEKraft"],
    ["perco", "PERCo"],
    ["legrand", "Legrand"],
    ["rubezh", "Рубеж"],
    ["keaz", "КЭАЗ"],
    ["space", "Space Technology"],
    ["bolid", "Болид"],
    ["satvision", "Satvision"],
    ["vidiacs", "Видиакс"],
  ];
  return `<section class="container section brands-section"><p class="section-label"><span>ОБОРУДОВАНИЕ</span>ПРОВЕРЕННЫЕ ПРОИЗВОДИТЕЛИ</p><div class="section-heading"><h2>Подбираем под задачу,<br> а не под бренд.</h2><p>Совместимость, надёжность<br> и возможность обслуживания.</p></div><div class="all-brands">${brands.map(([file, name]) => `<div><img src="assets/images/brands/${file}.webp" alt="${name}" width="180" height="55" loading="lazy"></div>`).join("")}</div></section>`;
}
