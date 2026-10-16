import { company, services } from "./data.js";
import { icon } from "./icons.js";
import {
  header,
  footer,
  pageHeading,
  officeSection,
  reviewsSection,
  allBrands,
} from "./components.js";
import { dialogs } from "./dialogs.js";
import {
  heroSection,
  metricsSection,
  servicesSection,
  solutionsSection,
  aboutSection,
  partnersSection,
  processSection,
  faqSection,
  contactSection,
} from "./sections.js";

const heading = pageHeading;

function principlesSection() {
  const values = [
    [
      "Качество",
      "Подбираем оборудование по условиям объекта и проверяем работу систем перед передачей.",
    ],
    [
      "Доверие",
      "Объясняем, зачем нужно каждое решение и из чего складывается стоимость проекта.",
    ],
    [
      "Ответственность",
      "Согласуем объём работ и сроки заранее. Фиксируем договорённости в договоре.",
    ],
    [
      "Комфорт",
      "Берём на себя взаимодействие между инженерными системами и обучаем работе с ними.",
    ],
    [
      "Развитие",
      "Проектируем системы так, чтобы их можно было обслуживать и расширять по мере роста задач.",
    ],
  ];
  return `<section class="container section principles"><div class="section-heading"><h2>То, на чём<br> строится наша работа.</h2><p>Пять принципов команды ИТР.</p></div><div class="principles-grid">${values.map(([title, text], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>`;
}

function catalogSection() {
  const equipment = [
    [
      "camera",
      "Видеонаблюдение",
      "IP-камеры, регистраторы, накопители и оборудование для удалённого доступа.",
      "Hikvision · HiWatch · Dahua · RVI",
    ],
    [
      "bolt",
      "Электрооборудование",
      "Автоматика, распределительные щиты, кабельная продукция и оборудование для освещения.",
      "Legrand · DEKraft · КЭАЗ",
    ],
    [
      "fire",
      "Пожарная безопасность",
      "Извещатели, приёмно-контрольные приборы и оборудование для оповещения.",
      "Болид · Рубеж",
    ],
    [
      "shield",
      "Охранные системы",
      "Датчики движения и открытия, контрольные панели и устройства оповещения.",
      "Подбор под зоны охраны",
    ],
    [
      "access",
      "Контроль доступа",
      "Считыватели, контроллеры, замки, турникеты, домофоны и автоматика.",
      "PERCo · Tantos · DoorHan",
    ],
    [
      "network",
      "Сетевое оборудование",
      "Коммутаторы, точки доступа, монтажные шкафы, медные и оптоволоконные линии.",
      "Локальные сети · Оптоволокно",
    ],
  ];
  return `<section class="container section catalog-section"><div class="catalog-notice">${icon("document")}<p>Оборудование подбирается под проект. Наличие, комплектацию и стоимость уточняем при обращении — без неподтверждённых цен и лишних позиций.</p></div><div class="catalog-grid">${equipment.map(([symbol, title, text, brands], index) => `<article class="catalog-card"><div class="catalog-icon">${icon(symbol)}<span>0${index + 1}</span></div><h2>${title}</h2><p>${text}</p><span class="catalog-brands">${brands}</span><button class="text-button" data-request="Оборудование: ${title}">Запросить подбор ${icon("arrow")}</button></article>`).join("")}</div></section>`;
}

function careersSection() {
  return `<section class="container section careers-section"><div class="career-intro"><h2>Хорошие системы<br> создают хорошие люди.</h2><p>В работе ценим аккуратность, техническую грамотность и ответственность за результат. Если вам близок такой подход, расскажите о своём опыте.</p><p>Наличие открытых вакансий и условия работы уточняем лично. Направления ниже — специализации нашей команды, а не объявление о гарантированном наборе.</p></div><div class="career-directions">${[
    [
      "Инженерные решения",
      "Обследование объектов, подбор оборудования, проработка технических решений.",
    ],
    [
      "Монтаж и пусконаладка",
      "Электромонтаж, слаботочные системы, настройка и проверка оборудования.",
    ],
    [
      "Сервис и сопровождение",
      "Диагностика, обслуживание и помощь клиентам в работе с системами.",
    ],
  ]
    .map(
      ([title, text]) =>
        `<article>${icon("tools")}<div><h3>${title}</h3><p>${text}</p></div></article>`,
    )
    .join(
      "",
    )}</div><div class="career-apply"><div><p class="eyebrow">ПОЗНАКОМИМСЯ?</p><h2>Расскажите о себе.</h2><p>Укажите специализацию, опыт и удобный способ связи. Резюме можно приложить к письму в вашем почтовом приложении.</p></div><div><a class="button button-primary" href="mailto:${company.email}?subject=${encodeURIComponent("Хочу работать в ИТР")}">Написать о себе ${icon("diagonal")}</a><a class="text-button" href="tel:${company.phoneHref}">${company.phone}</a></div></div></section>`;
}

function serviceDetail(service) {
  return `<section class="container section service-detail"><div class="service-detail-copy"><span class="large-service-icon">${icon(service.icon)}</span><h2>Продуманное решение.<br> От проекта до запуска.</h2><p>${service.detail}</p><ul class="detail-tags">${service.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul><button class="button button-primary" data-request="${service.title}">Обсудить задачу ${icon("arrow")}</button></div><div class="service-scope"><p class="section-label">ЧТО ВХОДИТ В РАБОТУ</p>${service.includes.map((item, index) => `<div><span>0${index + 1}</span><p>${item}</p>${icon("check")}</div>`).join("")}<p class="scope-note">Точный состав работ, сроки и гарантийные условия фиксируем в договоре после обследования объекта.</p></div></section><section class="container project-preparation"><div><h2>Что поможет<br> подготовить предложение?</h2><p>Даже если у вас пока нет технического задания, начнём с короткого разговора.</p></div><ul class="check-list">${["Назначение объекта и его площадь", "Что уже установлено и что нужно изменить", "План помещений или схема, если есть", "Желаемые сроки и ориентир по бюджету"].map((text) => `<li><span class="check-icon">${icon("check")}</span>${text}</li>`).join("")}</ul></section>`;
}

export const pages = [
  {
    id: "index",
    title: "ИТР — инженерно-технические решения в Красноярске",
    description:
      "Безопасность, электроснабжение и связь для бизнеса и частных объектов. Одна команда от проекта до обслуживания.",
    content: () =>
      heroSection() +
      metricsSection() +
      servicesSection() +
      solutionsSection() +
      aboutSection() +
      partnersSection() +
      processSection() +
      reviewsSection() +
      faqSection() +
      contactSection() +
      officeSection(),
  },
  {
    id: "about",
    title: "О компании — ИТР",
    description:
      "Команда, принципы и подход ООО «Инженерно-технические решения». Инженерные системы в Красноярске.",
    content: () =>
      heading(
        "О компании",
        "Инженерия с ответственностью<br> за <span>результат.</span>",
        "Мы — ООО «Инженерно-технические решения». Проектируем, монтируем и обслуживаем инженерные системы для частных, коммерческих и промышленных объектов.",
      ) +
      metricsSection() +
      aboutSection(true) +
      principlesSection() +
      processSection() +
      allBrands() +
      reviewsSection() +
      contactSection(),
  },
  {
    id: "services",
    title: "Услуги — ИТР",
    description:
      "Видеонаблюдение, электромонтаж, пожарная и охранная сигнализация, СКУД, локальные и оптоволоконные сети.",
    content: () =>
      heading(
        "Услуги",
        "Все системы объекта.<br> <span>В одной команде.</span>",
        "Отдельная задача или комплексное оснащение: подберём решение, которое учитывает ваш объект, бюджет и планы развития.",
      ) +
      servicesSection() +
      solutionsSection() +
      processSection() +
      faqSection() +
      contactSection(),
  },
  {
    id: "catalog",
    title: "Магазин оборудования — ИТР",
    description:
      "Подбор оборудования для видеонаблюдения, электроснабжения, пожарной безопасности, контроля доступа и сетей.",
    content: () =>
      heading(
        "Магазин",
        "Не просто оборудование.<br> <span>Совместимое решение.</span>",
        "Поможем выбрать оборудование для новой системы или расширения существующей. Подберём совместимые компоненты без избыточной комплектации.",
      ) +
      catalogSection() +
      allBrands() +
      contactSection(),
  },
  {
    id: "careers",
    title: "Работа у нас — ИТР",
    description:
      "Работа в команде инженерно-технических решений. Расскажите о своём опыте в проектировании, монтаже или обслуживании систем.",
    content: () =>
      heading(
        "Работа у нас",
        "Работа, за которую<br> <span>не стыдно.</span>",
        "Нам близки люди, которые любят разбираться в технике, работать аккуратно и доводить задачи до результата.",
      ) +
      careersSection() +
      contactSection(),
  },
  {
    id: "contacts",
    title: "Контакты и карта офиса — ИТР",
    description:
      "ИТР в Красноярске: ул. Высотная, 2 ст8 пом12, офис 3.6, 2 этаж. Телефон +7 (391) 218-16-18. Схема проезда и контакты.",
    content: () =>
      heading(
        "Контакты",
        "Хороший проект начинается<br> <span>с разговора.</span>",
        "Позвоните, напишите или приезжайте в офис. Обсудим вашу задачу и подскажем, с чего начать.",
      ) +
      officeSection() +
      contactSection(),
  },
  {
    id: "reviews",
    title: "Отзывы клиентов — ИТР",
    description:
      "Отзывы клиентов об инженерных системах ИТР. Ссылки на исходные публикации в 2ГИС и отзывы организаций на ВБЦ.",
    content: () =>
      heading(
        "Отзывы",
        "За каждой системой —<br> <span>чей-то спокойный день.</span>",
        "Клиенты рассказывают о результате своими словами. Мы сохраняем ссылки на независимые площадки, где опубликованы отзывы.",
      ) +
      reviewsSection(true) +
      contactSection(),
  },
  ...services.map((service) => ({
    id: `service-${service.id}`,
    service: service.title,
    title: `${service.title} в Красноярске — ИТР`,
    description: service.detail,
    content: () =>
      heading(
        service.title,
        `${service.title}.<br> <span>С инженерным подходом.</span>`,
        service.description,
        { href: "services.html", label: "Услуги" },
      ) +
      serviceDetail(service) +
      processSection() +
      faqSection() +
      contactSection(),
  })),
];

export function renderPage(page) {
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101216"><meta name="description" content="${page.description}"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:type" content="website"><meta property="og:locale" content="ru_RU"><title>${page.title}</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><script src="assets/js/theme.js"></script><link rel="stylesheet" href="assets/css/styles.css"><link rel="stylesheet" href="assets/css/pages.css"><script defer src="assets/js/main.js"></script></head><body data-page="${page.id}"${page.service ? ` data-service="${page.service}"` : ""}><a class="skip-link" href="#main">Перейти к содержимому</a><div id="app">${header(page.id)}<main id="main">${page.content()}</main>${footer()}${dialogs()}</div><noscript><p class="noscript">Интерактивные элементы требуют JavaScript. Позвоните: <a href="tel:${company.phoneHref}">${company.phone}</a> или напишите на <a href="mailto:${company.email}">${company.email}</a>.</p></noscript></body></html>`;
}
