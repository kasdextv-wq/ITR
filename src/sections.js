import { company, services, solutions, steps, faqs } from "./data.js";
import { icon } from "./icons.js";

const arrow = icon("arrow");
const sectionLabel = (number, text) =>
  `<p class="section-label"><span>${number}</span>${text}</p>`;
const checkItem = (text) =>
  `<li><span class="check-icon">${icon("check")}</span>${text}</li>`;

export function serviceCards(category = "all") {
  return services
    .filter((service) => category === "all" || service.category === category)
    .map(
      (service) => `
    <article class="service-card">
      <div class="service-card-top"><span class="service-icon">${icon(service.icon)}</span><span class="service-number">${service.number}</span></div>
      <h3><a class="service-trigger" href="service-${service.id}.html" aria-describedby="description-${service.id}">${service.title}</a></h3>
      <p id="description-${service.id}">${service.description}</p>
      <div class="service-card-bottom"><span class="tags">${service.tags.map((tag) => `<span>${tag}</span>`).join("")}</span><span class="card-arrow">${icon("diagonal")}</span></div>
    </article>`,
    )
    .join("");
}

function diagram() {
  return `<div class="blueprint" aria-label="Схематичная визуализация инженерных систем здания">
    <span class="blueprint-caption"><span class="live-dot"></span> ЕДИНАЯ СИСТЕМА</span>
    <svg class="building-diagram" viewBox="0 0 560 355" fill="none" aria-hidden="true">
      <defs><pattern id="windows" width="27" height="29" patternUnits="userSpaceOnUse"><path d="M5 5h14v15H5Z" fill="#202b36" stroke="#40505e" stroke-width=".7"/></pattern><linearGradient id="wall" x1="130" y1="100" x2="370" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#26313b"/><stop offset="1" stop-color="#151d26"/></linearGradient></defs>
      <path d="m50 240 233-137 238 138-235 137Z" stroke="#34404c" stroke-dasharray="4 6"/>
      <path d="m93 218 185-108 187 108-185 109Z" fill="#141c24" stroke="#3b4b5a"/>
      <path d="m129 124 146 84v99l-146-84Z" fill="url(#wall)" stroke="#60717f"/>
      <path d="m275 208 147-85v99l-147 85Z" fill="#1b2530" stroke="#60717f"/>
      <path d="m129 124 147-85 146 84-147 85Z" fill="#26333f" stroke="#82919d"/>
      <path d="m144 124 132-75 131 74-132 76Z" stroke="#455764"/>
      <path d="m145 145 112 64v68l-112-64Z" fill="url(#windows)" stroke="#40505e"/>
      <path d="m293 216 111-63v65l-111 65Z" fill="url(#windows)" stroke="#40505e"/>
      <path d="m241 286 19 11v-40l-19-11Z" fill="#a68053" stroke="#d4ae7c"/>
      <path d="m222 93 48 28 49-28-49-28Z" fill="#1a232c" stroke="#70818f"/><path d="M222 93v16l48 28 49-28V93m-49 28v16" stroke="#70818f"/>
      <path d="M153 175H74v-47M358 185h124v-39M334 255h112v46M213 269v41h-84" stroke="#ec4448" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="153" cy="175" r="5" fill="#ed454a"/><circle cx="358" cy="185" r="5" fill="#ed454a"/><circle cx="334" cy="255" r="5" fill="#ed454a"/><circle cx="213" cy="269" r="5" fill="#ed454a"/>
      <circle cx="153" cy="175" r="12" stroke="#ed454a" stroke-opacity=".35"/><circle cx="358" cy="185" r="12" stroke="#ed454a" stroke-opacity=".35"/>
    </svg>
    <div class="diagram-tag diagram-tag-one">${icon("camera")} Видеонаблюдение</div>
    <div class="diagram-tag diagram-tag-two">${icon("fire")} Пожарная безопасность</div>
    <div class="diagram-tag diagram-tag-three">${icon("access")} Контроль доступа</div>
    <div class="diagram-tag diagram-tag-four">${icon("bolt")} Электроснабжение</div>
    <div class="blueprint-bottom"><span id="diagram-label">Бизнес-центр</span><span>Схема интеграции / ИТР</span></div>
  </div>`;
}

export function solutionContent(key) {
  const item = solutions[key];
  return `<span class="micro-label">${item.kicker}</span><h3>${item.title.replace("\n", "<br> ")}</h3><p>${item.description}</p><ul class="check-list">${item.items.map(checkItem).join("")}</ul><button class="text-button" data-request="${item.request}">Подобрать решение ${arrow}</button>`;
}

export function heroSection() {
  return `<section class="hero container" aria-labelledby="hero-title">
        <div class="hero-copy"><p class="eyebrow"><span></span> ИНЖЕНЕРИЯ БЕЗ ЛИШНИХ СЛОЖНОСТЕЙ</p><h1 id="hero-title">Все системы.<br> Одна команда.<br> <span>Ваша уверенность.</span></h1><p class="hero-description">Комплексные инженерные решения для бизнеса<br class="desktop-break"> и частных объектов. От первого чертежа<br class="desktop-break"> до бесперебойной работы.</p><div class="hero-actions"><a class="button button-primary" href="#contact">Обсудить проект ${arrow}</a><a class="button button-secondary" href="services.html">Наши услуги ${icon("diagonal")}</a></div><div class="hero-note"><span class="small-check">${icon("check")}</span> Выезд инженера и расчёт сметы — бесплатно</div></div>
        <div class="hero-visual"><img class="hero-image" src="assets/images/engineering-campus.webp" alt="Современное промышленное здание с системой видеонаблюдения — иллюстрация комплексного оснащения" width="1264" height="848" fetchpriority="high"><div class="photo-shade"></div><div class="visual-top"><span class="visual-label"><span class="live-dot"></span> КОМПЛЕКСНЫЙ ПОДХОД</span><span class="visual-cross">+</span></div><div class="hero-marker">${icon("shield")}<span>Всё работает.<br> <strong>Как единая система.</strong></span></div><div class="visual-bottom"><span class="visual-index">01 — 07</span><h2>Продумано до деталей.<br> Надёжно на годы.</h2><span class="visual-corner">${icon("diagonal")}</span></div></div>
      </section>`;
}

export function metricsSection() {
  return `<div class="container"><div class="metrics"><div><strong>10<span>+</span></strong><span>лет инженерной практики</span></div><div><strong>732</strong><span>завершённых объекта</span></div><div><strong>7</strong><span>направлений в одной компании</span></div><div><strong>Полный цикл</strong><span>от проекта до обслуживания</span></div></div></div>`;
}

export function servicesSection() {
  return `<section class="section container" id="services" aria-labelledby="services-title">${sectionLabel("01", "НАШИ КОМПЕТЕНЦИИ")}<div class="section-heading"><h2 id="services-title">Всё, что нужно<br> вашему объекту<span class="red-text">.</span></h2><p>Не нужно искать разных подрядчиков.<br> Спроектируем, установим и объединим<br> все системы в одном проекте.</p></div><div class="filter-list" role="group" aria-label="Фильтр направлений"><button class="filter active" data-filter="all" aria-pressed="true">Все направления <span>7</span></button><button class="filter" data-filter="security" aria-pressed="false">Безопасность</button><button class="filter" data-filter="power" aria-pressed="false">Электроснабжение</button><button class="filter" data-filter="network" aria-pressed="false">Сети и связь</button></div><div class="service-grid" id="service-grid">${serviceCards()}</div><p class="sr-only" id="filter-status" role="status"></p><div class="services-note"><span>${icon("network")} Отдельная задача или комплексное оснащение — подключимся на любом этапе.</span><a href="#contact">Нужна консультация ${arrow}</a></div></section>`;
}

export function solutionsSection() {
  return `<section class="solutions-section" id="solutions" aria-labelledby="solutions-title"><div class="container">${sectionLabel("02", "РЕШЕНИЯ ПОД ВАШИ ЗАДАЧИ")}<div class="section-heading"><h2 id="solutions-title">Разные объекты.<br> Один стандарт надёжности.</h2><p>Учитываем не только площадь,<br> но и то, как живёт и работает ваш объект.</p></div><div class="solution-tabs" role="tablist" aria-label="Тип объекта">${Object.entries(
    solutions,
  )
    .map(
      ([key, item], index) =>
        `<button id="tab-${key}" class="solution-tab ${index === 0 ? "active" : ""}" role="tab" aria-selected="${index === 0}" aria-controls="solution-panel" tabindex="${index === 0 ? 0 : -1}" data-solution="${key}">${icon(item.icon)}${item.label}${icon("diagonal")}</button>`,
    )
    .join(
      "",
    )}</div><div class="solution-panel" id="solution-panel" role="tabpanel" aria-labelledby="tab-business" tabindex="0"><div class="solution-copy" id="solution-copy">${solutionContent("business")}</div>${diagram()}</div></div></section>`;
}

export function aboutSection(detailed = false) {
  return `<section class="section container about-section" id="about" aria-labelledby="about-title"><div class="about-intro">${sectionLabel("03", "О КОМПАНИИ")}<h2 id="about-title">Инженерный подход.<br> Человеческое отношение.</h2><p>Мы — «Инженерно-технические решения». Команда, которая берёт на себя всё: от подбора оборудования до настройки последнего датчика.</p><p>Не усложняем там, где можно сделать просто. Объясняем решения, соблюдаем договорённости и остаёмся рядом после сдачи объекта.</p><a class="text-button" href="${detailed ? "#process" : "about.html"}">${detailed ? "Как мы работаем" : "Подробнее о компании"} ${arrow}</a></div><div class="values"><article><span class="value-icon">${icon("network")}</span><div><h3>Одна команда вместо пяти подрядчиков</h3><p>Системы совместимы друг с другом. А вы точно знаете, кто отвечает за результат.</p></div></article><article><span class="value-icon">${icon("document")}</span><div><h3>Прозрачность на каждом этапе</h3><p>Понятная смета, согласованные сроки и объём работ. Всё важное — в договоре.</p></div></article><article><span class="value-icon">${icon("tools")}</span><div><h3>Поддержка, а не просто монтаж</h3><p>Обучим работе с оборудованием, поможем с обслуживанием и развитием систем.</p></div></article></div></section>`;
}

export function partnersSection() {
  return `<div class="container partners"><div class="partners-heading"><span>Проверенное оборудование.<br> <strong>Надёжные производители.</strong></span><p>Подбираем под задачу, а не под бренд</p></div><div class="partner-logos">${[
    ["hikvision", "Hikvision"],
    ["dahua", "Dahua"],
    ["rubezh", "Рубеж"],
    ["perco", "PERCo"],
    ["legrand", "Legrand"],
    ["bolid", "Болид"],
  ]
    .map(
      ([file, label]) =>
        `<img src="assets/images/brands/${file}.webp" alt="${label}" width="150" height="48" loading="lazy">`,
    )
    .join("")}</div></div>`;
}

export function processSection() {
  return `<section class="section container" id="process" aria-labelledby="process-title">${sectionLabel("04", "ПРОСТОЙ И ПОНЯТНЫЙ ПРОЦЕСС")}<div class="section-heading"><h2 id="process-title">От задачи к результату.<br> Без лишних шагов.</h2><a class="text-button" href="#contact">Начнём с разговора ${arrow}</a></div><div class="steps">${steps.map(([title, text], index) => `<article class="step"><div class="step-top"><span>0${index + 1}</span>${index < steps.length - 1 ? icon("arrow") : icon("check")}</div><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>`;
}

export function faqSection() {
  return `<section class="faq-section container" aria-labelledby="faq-title"><div>${sectionLabel("05", "ЕСТЬ ВОПРОСЫ?")}<h2 id="faq-title">Давайте<br> разберёмся.</h2><p>Не нашли свой ответ?<br> <a href="tel:${company.phoneHref}">Позвоните нам ${icon("diagonal")}</a></p></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}<span>${icon("plus")}</span></summary><p>${answer}</p></details>`).join("")}</div></section>`;
}

export function contactSection() {
  return `<section class="container contact-section" id="contact" aria-labelledby="contact-title"><div class="contact-card"><div class="contact-copy"><p class="eyebrow"><span></span> БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</p><h2 id="contact-title">Обсудим <span>ваш проект</span><br> прямо сейчас.</h2><p>Расскажите, что хотите реализовать.<br> Поможем разобраться в деталях и подобрать<br class="desktop-break"> решение именно для вашего объекта.</p><ul class="check-list">${["Выезд инженера на объект — бесплатно", "Смета с понятной стоимостью работ", "Один подрядчик на весь комплекс задач"].map(checkItem).join("")}</ul><div class="contact-direct"><span>Предпочитаете живой разговор?</span><a href="tel:${company.phoneHref}">${company.phone} ${icon("diagonal")}</a></div></div><div class="contact-form-wrap"><h3>Начнём знакомство</h3><p>Оставьте контакты и пару слов о задаче</p><form id="contact-form" action="mailto:${company.email}" method="post" enctype="text/plain"><div class="form-row"><div class="form-field"><label for="name">Ваше имя</label><input id="name" name="name" autocomplete="name" placeholder="Как к вам обращаться" required minlength="2" maxlength="80"></div><div class="form-field"><label for="phone">Телефон</label><input type="tel" id="phone" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" required maxlength="25" aria-describedby="phone-error"><span class="field-error" id="phone-error"></span></div></div><div class="form-field"><label for="service">Что вас интересует?</label><select id="service" name="service"><option value="Комплексное решение">Комплексное решение</option>${services.map((service) => `<option value="${service.title}">${service.title}</option>`).join("")}<option value="Другое / нужна консультация">Другое / нужна консультация</option></select></div><div class="form-field"><label for="message">О проекте <span>необязательно</span></label><textarea id="message" name="message" rows="2" maxlength="2000" placeholder="Тип объекта, площадь, что нужно сделать…"></textarea></div><label class="consent"><input type="checkbox" id="consent" name="consent" required><span>Я согласен на передачу указанных данных компании по электронной почте. <button type="button" class="inline-link" data-privacy>Как используются данные</button></span></label><button class="button button-primary submit-button" type="submit">Подготовить заявку ${arrow}</button><p class="form-note">Подготовим письмо на ${company.email}.<br> Отправку нужно подтвердить в вашем почтовом приложении.</p></form></div></div></section>`;
}
