(() => {
  var company = {
    phone: "+7 (391) 218-16-18",
    phoneHref: "+73912181618",
    email: "info@itr124.ru",
    name: "ООО «Инженерно-технические решения»",
    city: "Красноярск",
  };
  var services = [
    {
      id: "video",
      number: "01",
      category: "security",
      icon: "camera",
      title: "Видеонаблюдение",
      description: "Всё под контролем. На объекте и на экране вашего телефона.",
      tags: ["IP-камеры", "Удалённый доступ"],
      detail:
        "Подбираем камеры под освещение, геометрию помещений и задачи наблюдения. Продумываем хранение архива и безопасный удалённый доступ.",
      includes: [
        "Обследование объекта и план размещения камер",
        "Подбор камер, регистраторов и накопителей",
        "Монтаж, настройка архива и доступа",
        "Обучение работе с системой",
      ],
    },
    {
      id: "electric",
      number: "02",
      category: "power",
      icon: "bolt",
      title: "Электромонтаж",
      description: "Надёжное электроснабжение — основа бесперебойной работы.",
      tags: ["Силовые сети", "Освещение"],
      detail:
        "Проектируем и монтируем электрические сети для частных, коммерческих и промышленных объектов. Учитываем нагрузку и возможность дальнейшего расширения.",
      includes: [
        "Расчёт нагрузок и подбор оборудования",
        "Сборка и установка распределительных щитов",
        "Прокладка кабельных линий и монтаж освещения",
        "Проверка и пусконаладка",
      ],
    },
    {
      id: "fire",
      number: "03",
      category: "security",
      icon: "fire",
      title: "Пожарная безопасность",
      description: "Раннее обнаружение угроз и своевременное оповещение людей.",
      tags: ["Пожарная сигнализация", "СОУЭ"],
      detail:
        "Создаём системы обнаружения пожара и оповещения с учётом назначения объекта. Согласовываем взаимодействие с другими инженерными системами.",
      includes: [
        "Обследование и подготовка технического решения",
        "Монтаж извещателей и приёмно-контрольных приборов",
        "Настройка системы оповещения",
        "Испытания и техническое обслуживание",
      ],
    },
    {
      id: "alarm",
      number: "04",
      category: "security",
      icon: "shield",
      title: "Охранная сигнализация",
      description: "Защита помещений и периметра, когда вас нет рядом.",
      tags: ["Датчики", "Защита периметра"],
      detail:
        "Подбираем охранные датчики и сценарии реагирования под режим работы объекта. Помогаем контролировать несанкционированный доступ в помещения.",
      includes: [
        "Определение зон охраны",
        "Монтаж датчиков и контрольной панели",
        "Настройка уведомлений и сценариев",
        "Проверка системы и инструктаж",
      ],
    },
    {
      id: "access",
      number: "05",
      category: "security",
      icon: "access",
      title: "Контроль доступа",
      description: "Управляйте доступом на объект без лишних сложностей.",
      tags: ["СКУД", "Домофония"],
      detail:
        "Организуем доступ сотрудников, посетителей и транспорта. Объединяем считыватели, замки, турникеты и домофонию в понятную систему.",
      includes: [
        "Проработка точек прохода и прав доступа",
        "Монтаж считывателей и исполнительных устройств",
        "Настройка программного обеспечения",
        "Интеграция с видеонаблюдением при необходимости",
      ],
    },
    {
      id: "network",
      number: "06 / 07",
      category: "network",
      icon: "network",
      title: "Сети и связь",
      description: "Стабильное соединение для людей, оборудования и бизнеса.",
      tags: ["Локальные сети", "Оптоволокно"],
      detail:
        "Строим локальные и оптоволоконные сети: от рабочих мест до связи между зданиями. Продумываем структуру, маркировку и запас для развития.",
      includes: [
        "Проектирование структуры сети",
        "Прокладка медных и оптоволоконных линий",
        "Монтаж шкафов и сетевого оборудования",
        "Тестирование соединений и передача документации",
      ],
    },
  ];
  var solutions = {
    business: {
      label: "Для бизнеса",
      icon: "building",
      kicker: "ОФИСЫ · МАГАЗИНЫ · БИЗНЕС-ЦЕНТРЫ",
      title: "Бизнес работает.\nСистемы не подводят.",
      description:
        "Объединяем безопасность, электроснабжение и связь, чтобы вы могли сосредоточиться на своём деле.",
      items: [
        "Контроль доступа сотрудников и посетителей",
        "Видеонаблюдение за ключевыми зонами",
        "Стабильная сеть и надёжное электроснабжение",
      ],
      diagram: "Бизнес-центр",
      request: "Комплексное решение для бизнеса",
    },
    industry: {
      label: "Для предприятий",
      icon: "factory",
      kicker: "ПРОИЗВОДСТВА · СКЛАДЫ · ЛОГИСТИКА",
      title: "Надёжность в масштабе\nвашего предприятия.",
      description:
        "Учитываем производственные процессы, протяжённость сетей и требования к безопасности на всей территории.",
      items: [
        "Охрана периметра и контроль въезда",
        "Пожарная сигнализация и оповещение",
        "Силовые и оптоволоконные сети между корпусами",
      ],
      diagram: "Промышленный объект",
      request: "Комплексное решение для предприятия",
    },
    home: {
      label: "Для частных объектов",
      icon: "home",
      kicker: "ДОМА · КОТТЕДЖИ · ЖИЛЫЕ КОМПЛЕКСЫ",
      title: "Спокойствие дома.\nДаже когда вы далеко.",
      description:
        "Создаём удобные системы для повседневной жизни. Всё необходимое — без избыточного оборудования и сложных настроек.",
      items: [
        "Камеры с доступом со смартфона",
        "Домофония и охранная сигнализация",
        "Электрика, освещение и домашняя сеть",
      ],
      diagram: "Частный объект",
      request: "Комплексное решение для частного объекта",
    },
  };
  var paths = {
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone:
      '<path d="m8 3 2 5-3 2c1 4 3 6 7 7l2-3 5 2v3c0 2-2 3-4 2C9 20 4 15 3 7c-1-2 0-4 2-4Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    camera:
      '<path d="m3 6 13-3 4 10-13 3Z"/><path d="m19 9 3-1v6l-2-1M9 16l-2 4H2v-5"/><circle cx="15" cy="9" r="1.5"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
    fire: '<path d="M12 2c1 5 7 6 7 12a7 7 0 0 1-14 0c0-3 2-5 4-7 0 4 2 4 2 4s3-3 1-9Z"/><path d="M10 21c-4-5 2-9 2-9s5 6 2 9"/>',
    shield:
      '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
    access:
      '<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="8" r="2"/><path d="M9 15h6m-5 3h4"/>',
    network:
      '<rect x="8" y="2" width="8" height="6" rx="1"/><path d="M12 8v5M4 17v-4h16v4"/><rect x="1" y="17" width="6" height="5" rx="1"/><rect x="9" y="17" width="6" height="5" rx="1"/><rect x="17" y="17" width="6" height="5" rx="1"/>',
    building:
      '<path d="M3 22V6l10-4v20M13 9h8v13M1 22h22M6 8h3m-3 4h3m-3 4h3m8-3h1m-1 4h1"/>',
    factory: '<path d="M3 22V10l6 3V8l7 5V3h4l2 19ZM6 17h2m4 0h2m4 0h1"/>',
    home: '<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-9h6v9"/>',
    document: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h8"/>',
    tools:
      '<path d="M14 6a5 5 0 0 0-6 6L2 18l4 4 6-6a5 5 0 0 0 6-6l-4 2-3-3Z"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  };
  var icon = (name, className = "") =>
    `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
  var arrow = icon("arrow");
  var checkItem = (text) =>
    `<li><span class="check-icon">${icon("check")}</span>${text}</li>`;
  function serviceCards(category = "all") {
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
  function solutionContent(key) {
    const item = solutions[key];
    return `<span class="micro-label">${item.kicker}</span><h3>${item.title.replace("\n", "<br> ")}</h3><p>${item.description}</p><ul class="check-list">${item.items.map(checkItem).join("")}</ul><button class="text-button" data-request="${item.request}">Подобрать решение ${arrow}</button>`;
  }
  function normalizePhone(value) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 10 && !value.trim().startsWith("+"))
      return `+7${digits}`;
    if (digits.length === 11 && /^[78]/.test(digits))
      return `+7${digits.slice(1)}`;
    return `+${digits}`;
  }
  function isValidPhone(value) {
    if (!/^[+\d\s()\-]+$/.test(value)) return false;
    if ((value.match(/\+/g) || []).length > 1) return false;
    if (value.includes("+") && !value.trim().startsWith("+")) return false;
    const digits = value.replace(/\D/g, "");
    if (value.trim().startsWith("+"))
      return digits.length >= 10 && digits.length <= 15;
    return (
      digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits))
    );
  }
  function formatPhone(value) {
    if (!isValidPhone(value)) return value;
    const phone2 = normalizePhone(value);
    if (phone2.startsWith("+7") && phone2.length === 12) {
      return `+7 (${phone2.slice(2, 5)}) ${phone2.slice(5, 8)}-${phone2.slice(8, 10)}-${phone2.slice(10)}`;
    }
    return phone2;
  }
  function createRequest(values) {
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
  var app = document.querySelector("#app");
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.querySelector("#mobile-menu");
  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Закрыть меню" : "Открыть меню",
    );
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
  var dialogs = [...document.querySelectorAll("dialog")];
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
  var filters = [...document.querySelectorAll("[data-filter]")];
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
  var tabs = [...document.querySelectorAll("[data-solution]")];
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
    document.querySelector("#diagram-label").textContent =
      solutions[key].diagram;
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
      if (next === void 0) return;
      event.preventDefault();
      selectSolution(tabs[next]);
      tabs[next].focus();
    });
  });
  var form = document.querySelector("#contact-form");
  var phone = document.querySelector("#phone");
  var phoneError = document.querySelector("#phone-error");
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
  document
    .querySelector("#copy-request")
    .addEventListener("click", async () => {
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
  var requestedService = document.body.dataset.service;
  if (requestedService)
    document.querySelector("#service").value = requestedService;
  var mapButton = document.querySelector("[data-map-load]");
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
})();
