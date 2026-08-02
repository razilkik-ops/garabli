import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDots,
  Circle,
  Info,
  LightbulbFilament,
  ListNumbers,
  Minus,
  Quotes,
  Sparkle,
  Target,
  TelegramLogo,
  UserCircle,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

const NAV_ITEMS = [
  { label: "О практикуме", id: "about", icon: Info },
  { label: "Программа", id: "program", icon: ListNumbers },
  { label: "Результаты", id: "results", icon: Sparkle },
  { label: "Автор", id: "author", icon: UserCircle },
];

const INTRO_POINTS = [
  "Практический разбор для людей, которые устали тащить всё на себе, откладывать свои интересы и хотят увидеть понятные, честные ориентиры в отношениях.",
  "Для тех, кто чувствует внутреннее выгорание, стоит на развилке и ищет прямые, логичные шаги, чтобы выйти из затянувшегося тупика.",
];

const ABOUT_DETAILS = [
  {
    icon: assetUrl("assets/about-icon-person.png"),
    alt: "Иконка профиля",
    content: (
      <>
        Более <strong>15 лет</strong> я занимаюсь системным анализом повторяющихся
        жизненных ситуаций, разбором скрытых сценариев и выводом людей из
        циклических тупиков.
      </>
    ),
  },
  {
    icon: assetUrl("assets/about-icon-brain.png"),
    alt: "Иконка системного мышления",
    content: (
      <>
        Никаких пустых лозунгов, обещаний мгновенного чуда и эзотерики. В основе
        работы лежит <strong>четкая логика</strong> причинно-следственных связей,
        практическая психология и нейробиология.
      </>
    ),
  },
  {
    icon: assetUrl("assets/about-icon-target.png"),
    alt: "Иконка цели",
    content: (
      <>
        Я приглашаю вас на <strong>трехдневный практикум «Анти - грабли»</strong>,
        где мы разберем, как сбросить изнуряющее напряжение и вернуть контроль над
        своим состоянием.
      </>
    ),
  },
  {
    icon: assetUrl("assets/about-icon-shield.png"),
    alt: "Иконка защиты",
    content: (
      <>
        Мы не будем учиться манипуляциям или заучивать приемы для свиданий. Мы
        возьмем классические ситуации и тактично разложим их на элементы, чтобы
        обнаружить <strong>скрытые триггеры</strong> и остановить разрушительный
        сценарий.
      </>
    ),
  },
];

const ABOUT_STATS = [
  {
    icon: assetUrl("assets/about-icon-star.png"),
    alt: "Иконка опыта",
    value: "15+ лет",
    label: "практики и анализа",
  },
  {
    icon: assetUrl("assets/about-icon-group.png"),
    alt: "Иконка группы людей",
    value: "Тысячи",
    label: "разобранных ситуаций",
  },
  {
    icon: assetUrl("assets/about-icon-target.png"),
    alt: "Иконка фокуса",
    value: "Один фокус",
    label: "вернуть вам управление",
  },
];

const AUDIENCE_ITEMS = [
  {
    text: "Испытывает страх одиночества и будущего.",
    icon: assetUrl("assets/audience-icon-person-v2.png"),
    alt: "Иконка человека",
  },
  {
    text: "Находится в “режиме директора 24/7” — привык тащить всё на себе в бизнесе и в отношениях. Никак не может «выключиться».",
    icon: assetUrl("assets/audience-icon-briefcase-v2.png"),
    alt: "Иконка портфеля",
  },
  {
    text: "Привык ждать подвоха и держать оборону, из-за чего чувствует себя в полной изоляции.",
    icon: assetUrl("assets/audience-icon-shield-v2.png"),
    alt: "Иконка защиты",
  },
  {
    text: "Раз за разом тянет на себе тех, кого нужно опекать, получая в ответ лишь опустошение.",
    icon: assetUrl("assets/audience-icon-clock-v2.png"),
    alt: "Иконка времени",
  },
  {
    text: "Живет в режиме отложенного счастья — прячется за масштабными задачами, чтобы не решать проблемы в личных отношениях.",
    icon: assetUrl("assets/audience-icon-heart-v2.png"),
    alt: "Иконка сердца",
  },
  {
    text: "Подавляет свои желания, соглашаясь на неудобные условия, пока внутри копится злость на собственную мягкость.",
    icon: assetUrl("assets/audience-icon-sprout-v2.png"),
    alt: "Иконка ростка",
  },
];

const RESULTS = [
  {
    title: "Абсолютная ясность",
    text: "Вы четко увидите истинную первопричину, почему ситуации повторялись, и поймете, какую защитную функцию выполняло ваше одиночество.",
    icon: assetUrl("assets/results-icon-clarity-v2.png"),
    alt: "Иконка ясности",
  },
  {
    title: "Внутренняя опора",
    text: "Поймете, как бережно снимать «броню» в отношениях и возвращать себе право на живые чувства и безопасность без риска для своих границ.",
    icon: assetUrl("assets/results-icon-support-v2.png"),
    alt: "Иконка внутренней опоры",
  },
  {
    title: "Выход из вечного ожидания",
    text: "Осознаете, как перестать зависеть от чужих оценок или сообщений и вернуть контроль над своей жизнью.",
    icon: assetUrl("assets/results-icon-exit-v2.png"),
    alt: "Иконка выхода",
  },
  {
    title: "Пошаговый алгоритм",
    text: "Унесете с собой готовую матрицу действий для построения понятных партнерских отношений на равных.",
    icon: assetUrl("assets/results-icon-steps-v2.png"),
    alt: "Иконка пошагового алгоритма",
  },
];

const PROGRAM_DAYS = [
  {
    title: "Где я?\nРевизия и цена моих ошибок",
    image: assetUrl("assets/program-day-1.png"),
    imageAlt: "Бронзовая винтовая лестница",
    lessons: [
      {
        title: "Почему ты бежишь по кругу?",
        text: "Считаем реальную стоимость твоих шишек: сколько времени и нервов уходит на одни и те же действия. Вскрытие сценария и фиксация точек слива сил.",
      },
      {
        title: "Чью жизнь ты живешь на самом деле?",
        text: "Инструкция, как отделить свои реальные желания от чужих ожиданий, требований и социальных «надо».",
      },
    ],
  },
  {
    title: "Иллюзия контроля.\nСколько можно все тянуть на себе?",
    image: assetUrl("assets/program-day-2.png"),
    imageAlt: "Тёмная архитектура с тёплым светом",
    lessons: [
      {
        title: "Как перестать везти всё на себе?",
        text: "Разбираем наши социальные роли. Учимся выключать режим “стальной машины” и делегировать задачи без страха, что всё рухнет.",
      },
      {
        title: "Как убрать из жизни манипуляторов.",
        text: "Разбираем, на какие внутренние кнопки они нажимают, и как спокойно говорить «нет» без оправданий и чувства вины.",
      },
    ],
  },
  {
    title: "Твоя жизнь — твои правила.",
    image: assetUrl("assets/program-day-3.png"),
    imageAlt: "Тёмные слои с бронзовыми краями",
    lessons: [
      {
        title: "От вечной гонки к нормальной жизни.",
        text: "Разрыв циклических повторений. Заменяем старые обиды на четкое понимание: кто в окружении свой, а кто — балласт.",
      },
      {
        title: "Как сделать свои “слабости” главным топливом.",
        text: "Перестаем полировать идеальный фасад и учимся использовать свой характер для достижения целей.",
      },
      {
        title: "Финальный план: Как жить, а не играть роль.",
        text: "Пошаговый алгоритм, как принимать решения на основе личного комфорта.",
      },
    ],
  },
];

const FORMAT_ITEMS = [
  {
    label: "Формат",
    text: "Эффективный онлайн-практикум (3 интенсивных дня).",
    icon: CalendarDots,
  },
  {
    label: "Минимум теории",
    text: "Никаких длинных скучных лекций. Только емкие разборы, матрицы и рабочие схемы.",
    icon: BookOpen,
  },
  {
    label: "Инструменты",
    text: "Бесплатная интерактивная экспресс-диагностика слепых зон и PDF-руководство «Анатомия скрытых сценариев».",
    icon: LightbulbFilament,
  },
  {
    label: "Интеграция",
    text: "Все задания направлены на разбор ваших реальных жизненных ситуаций.",
    icon: Target,
  },
];

const AUTHOR_CREDENTIALS = [
  {
    label: "Профессиональный фундамент",
    text: "Диплом военного психолога (1995 год). Более 15 лет практического опыта в сфере восстановления личной автономии и разбора циклических тупиков.",
  },
  {
    label: "Медийность",
    text: "Эксперт по системному анализу и телеведущий с многолетним стажем работы.",
  },
  {
    label: "Авторские программы",
    text: "Создатель системных методик («Точка опоры» — работа со страхами, «Связь достижений и эмоций», «Безопасная близость»).",
  },
  {
    label: "Методологическая опора",
    text: "Системное мышление, концепции аналитической психологии, теории зрелой близости и смысловой ориентированности.",
  },
];

const REVIEWS = [
  {
    label: "Границы и спокойствие",
    author: "Участница практикума",
    text: "За три дня практикума ,которые просто пролетели, но каждый шаг был таким точным и не было никакой лишней инфы — только четкие схемы, которые работают в жизни, я осознала , как мой привычный режим «всё держать под контролем» незаметно перетёк в отношения, и почему я так сильно устаю. Сейчас у меня благодаря Вам есть простые инструменты, как мягко обозначать свои границы и говорить «нет» без чувства вины. И впервые за долгое время я чувствую, как мои плечи расслабляются и уходит напряжение. От всей души благодарю Вас ❤️",
  },
  {
    label: "Лёгкость вместо контроля",
    author: "Ольга",
    text: "Перед тем, как прийти на курс, думала, что мне просто не везет в отношениях. А на практикуме всё вдруг встало на свои места. Я увидела, как от желания безопасности начинаю слишком много контролировать и брать на себя, даже когда хочется просто тепла. И главное — поняла, что этим можно мягко управлять. На душе стало так легко! Теперь прихожу домой и могу просто выдохнуть, не держать всё в голове. Спасибо за такую ясную, теплую работу без воды — будто сняли",
  },
  {
    label: "Тепло в отношениях",
    author: "Участница практикума",
    text: "Да, конечно! Я всегда была уверена: быть сильной — значит не расслабляться ни на секунду. А за три дня на практикуме вдруг поняла: это не сила, а тихая усталость от попытки всё удержать. Сил на близких уже просто не оставалось. На занятиях я увидела, где беру слишком много на себя, и получила простые шаги, как безопасно отключить этот изматывающий режим «я всё сама». Даже дышать стало как-то легче. И как ни удивительно, когда я начала управлять своим контролем, отношения с мужем и детьми стали ближе и теплее.",
  },
];

function CtaLink({ children, className = "" }) {
  return (
    <a
      className={`cta-link glass ${className}`}
      href="https://t.me/umanko4"
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
    </a>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);

  useEffect(() => {
    if (expandedReview === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setExpandedReview(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedReview]);

  useEffect(() => {
    const revealSelectors = [
      ".header",
      ".hero-content > *",
      ".about-shell > .lead-copy",
      ".about-shell > .invitation-heading",
      ".about-card",
      ".quote",
      ".audience-shell > h2",
      ".audience-item",
      ".audience-cta-card",
      ".results-shell > h2",
      ".results-divider",
      ".result-item",
      ".program .section-shell > h2",
      ".program-intro",
      ".program-day",
      ".format-cta-title",
      ".format-top-cta",
      ".format #format-title",
      ".format-divider",
      ".format-intro",
      ".format-step",
      ".author #author-title",
      ".author-photo",
      ".credentials-list > div",
      ".reviews > h3",
      ".review-card",
      ".contact-shell > *",
      ".footer",
    ];
    const revealItems = document.querySelectorAll(revealSelectors.join(","));

    if (!revealItems.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    document.documentElement.classList.add("site-motion-ready");

    revealItems.forEach((item) => {
      const siblings = item.parentElement ? Array.from(item.parentElement.children) : [];
      const siblingIndex = Math.max(0, siblings.indexOf(item));
      item.classList.add("site-reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 4) * 65}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("site-motion-ready");
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          src={assetUrl("assets/hero-background.mp4")}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />

        <header className="header">
          <nav className="desktop-nav" aria-label="Основная навигация">
            {NAV_ITEMS.map(({ label, id, icon: Icon }) => (
              <button
                className="glass glass-nav"
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <button
            className="menu-button glass"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <ListNumbers size={24} />}
            <span>Меню</span>
          </button>

          {menuOpen && (
            <nav className="mobile-nav glass" id="mobile-nav" aria-label="Мобильная навигация">
              {NAV_ITEMS.map(({ label, id }) => (
                <button key={id} type="button" onClick={() => scrollTo(id)}>
                  {label}
                </button>
              ))}
            </nav>
          )}
        </header>

        <div className="hero-content">
          <h1 id="hero-title">«Анти - грабли»</h1>
          <p className="hero-subtitle">
            Системный 3-х дневный практикум по выходу из замкнутого круга в личных
            отношениях: от "стального режима" к партнерству на равных.
          </p>
          <ul className="hero-points">
            {INTRO_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about" id="about" aria-label="О практикуме">
        <div className="section-shell about-shell">
          <p className="lead-copy">
            Давайте без иллюзий. Если в жизни из раза в раз повторяется один и тот же финал —
            меняются только лица и декорации — дело не в везении или токсичном окружении. Дело в привычном
            механизме действий, который запускается на автомате. Пора разобраться, как устроен этот процесс, и вернуть себе
            управление собственной жизнью.
          </p>
          <div className="invitation-heading">
            <h2>Приглашаем на практикум.</h2>
            <div className="invitation-rule" aria-hidden="true" />
          </div>

          <article className="about-card" aria-labelledby="about-author-title">
            <div className="about-identity">
              <figure className="about-portrait">
                <img
                  src={assetUrl("assets/author-konstantin.jpg")}
                  alt="Константин Александрович Юманов"
                />
              </figure>
              <p className="author-signature">Константин Юманов</p>
              <p className="about-role">
                Практик. Аналитик. Исследователь<br />человеческих сценариев.
              </p>
            </div>

            <div className="about-profile">
              <h3 id="about-author-title">Я — Константин Юманов.</h3>
              <div className="about-detail-list">
                {ABOUT_DETAILS.map(({ icon, alt, content }) => (
                  <div className="about-detail" key={alt}>
                    <img src={icon} alt={alt} />
                    <p>{content}</p>
                  </div>
                ))}
              </div>

              <div className="about-stats" aria-label="Опыт и фокус работы">
                {ABOUT_STATS.map(({ icon, alt, value, label }) => (
                  <div className="about-stat" key={value}>
                    <img src={icon} alt={alt} />
                    <div>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <blockquote className="quote">
            <p>
              «Пока вы не начнете замечать свои автоматические действия, они будут
              управлять вашей жизнью, а вы назовете это судьбой». —
            </p>
            <cite>К.Г. Юнг</cite>
          </blockquote>
        </div>
      </section>

      <section className="section audience" id="audience" aria-labelledby="audience-title">
        <div className="section-shell audience-shell">
          <h2 id="audience-title">Это наиболее полезно тем, кто:</h2>
          <div className="audience-list">
            {AUDIENCE_ITEMS.map(({ text, icon, alt }) => (
              <article className="audience-item" key={text}>
                <img className="audience-icon" src={icon} alt={alt} />
                <p>{text}</p>
              </article>
            ))}
          </div>
          <article className="audience-cta-card">
            <div className="audience-cta-content">
              <h3 className="cta-title">
                Позволь себе выдохнуть и принять участие в практикуме «Антиграбли»
              </h3>
              <CtaLink className="section-cta">Перейти в группу</CtaLink>
            </div>
          </article>
        </div>
      </section>

      <section className="section results" id="results" aria-labelledby="results-title">
        <div className="section-shell results-shell">
          <h2 id="results-title">Результаты, которые вы получите после прохождения практикума.</h2>
          <img
            className="results-divider"
            src={assetUrl("assets/results-divider-v3.png")}
            alt=""
            aria-hidden="true"
          />
          <div className="results-grid">
            {RESULTS.map(({ title, text, icon, alt }, resultIndex) => (
              <article className="result-item" key={title}>
                <div className="result-mark">
                  <img src={icon} alt={alt} />
                  <span>{String(resultIndex + 1).padStart(2, "0")}</span>
                </div>
                <div className="result-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section program" id="program" aria-labelledby="program-title">
        <div className="section-shell">
          <h2 id="program-title">
            Программа 3-х дневного практикума
            <br />
            “Анти - грабли”
            <br />
            Авторская методология К.Юманова.
          </h2>
          <p className="program-intro">
            Система решений разделена на четкие, алгоритмические этапы. Никакой
            абстрактной философии — только таблицы, протоколы действий и понятные
            шаги. Каждый день практикума это всего 20 минут теории остальное время рабочие техники, упражнения и ответы на вопросы.
          </p>

          <div className="program-days">
            {PROGRAM_DAYS.map((day, dayIndex) => (
              <article
                className="program-day"
                key={day.title}
              >
                <figure className="program-image">
                  <img src={day.image} alt={day.imageAlt} />
                  <figcaption>{String(dayIndex + 1).padStart(2, "0")}</figcaption>
                </figure>
                <div className="program-copy">
                  <h3>{day.title}</h3>
                  <ol>
                    {day.lessons.map((lesson) => (
                      <li key={lesson.title}>
                        <p>
                          <strong>{lesson.title}</strong> {lesson.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section format" id="format" aria-labelledby="format-title">
        <div className="section-shell">
          <h3 className="format-cta-title">
            <span>Переходите в закрытую группу Telegram,</span>
            <span className="format-cta-emphasis">если готовы сбросить лишний груз</span>
            <span>и выйти из тупика</span>
          </h3>
          <CtaLink className="format-top-cta">
            Перейти
          </CtaLink>
          <h2 id="format-title">Как все проходит:</h2>
          <div className="format-divider" aria-hidden="true">
            <Minus weight="thin" />
            <Sparkle weight="fill" />
            <Minus weight="thin" />
          </div>
          <p className="format-intro">
            Практикум построен по принципу максимальной применимости и уважения к
            затраченному времени.
          </p>
          <div className="format-timeline" aria-label="Этапы практикума">
            {FORMAT_ITEMS.map(({ label, text, icon: Icon }, index) => (
              <article className="format-step" key={label}>
                <Circle className="format-step-dot" weight="fill" aria-hidden="true" />
                <span className="format-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="format-step-icon" weight="thin" aria-hidden="true" />
                <div className="format-step-copy">
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section author" id="author" aria-labelledby="author-title">
        <div className="section-shell">
          <h2 id="author-title">Курс проводит лично Константин Александрович Юманов.</h2>
          <div className="author-layout">
            <figure className="author-photo">
              <img
                src={assetUrl("assets/author-konstantin.jpg")}
                alt="Константин Александрович Юманов"
              />
            </figure>
            <div className="author-copy">
              <dl className="credentials-list">
                {AUTHOR_CREDENTIALS.map(({ label, text }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="reviews" aria-labelledby="reviews-title">
            <h3 id="reviews-title">Отзывы о курсе:</h3>
            <div className="review-card-row">
              {REVIEWS.map((review, index) => (
                <article className="review-card" key={review.label}>
                  <button
                    className="review-card-button"
                    type="button"
                    onClick={() => setExpandedReview(index)}
                    aria-haspopup="dialog"
                    aria-label={`Открыть отзыв «${review.label}»`}
                  >
                    <span className="review-card-heading">
                      <Quotes aria-hidden="true" weight="thin" />
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <strong>{review.label}</strong>
                    <span className="review-card-preview">{review.text}</span>
                    <span className="review-card-action">Читать отзыв</span>
                  </button>
                </article>
              ))}
            </div>

            {expandedReview !== null && (
              <div
                className="review-modal-backdrop"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setExpandedReview(null);
                }}
              >
                <div
                  className="review-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="expanded-review-title"
                >
                  <div className="review-modal-topline">
                    <span>
                      {String(expandedReview + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedReview(null)}
                      aria-label="Закрыть отзыв"
                      autoFocus
                    >
                      <X aria-hidden="true" />
                    </button>
                  </div>
                  <Quotes className="review-modal-quote" aria-hidden="true" weight="thin" />
                  <h4 id="expanded-review-title">{REVIEWS[expandedReview].label}</h4>
                  <blockquote>
                    <p>{REVIEWS[expandedReview].text}</p>
                    <footer>
                      <strong>{REVIEWS[expandedReview].author}</strong>
                      <span>Практикум «Анти - грабли»</span>
                    </footer>
                  </blockquote>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-shell">
          <h2 id="contact-title">Задать вопрос по курсу:</h2>
          <p className="contact-copy">
            Если у вас остались сомнения или вы хотите уточнить, подойдет ли
            практикум под вашу ситуацию, свяжитесь напрямую:
          </p>
          <div className="contacts">
            <a
              href="https://t.me/umanko4"
              target="_blank"
              rel="noreferrer"
              aria-label="Написать в Telegram"
              title="Telegram"
            >
              <TelegramLogo aria-hidden="true" weight="regular" />
            </a>
            <a
              href="https://wa.me/375296597050"
              target="_blank"
              rel="noreferrer"
              aria-label="Написать в WhatsApp"
              title="WhatsApp"
            >
              <WhatsappLogo aria-hidden="true" weight="regular" />
            </a>
          </div>
          <p className="contact-promise">
            Позволь себе вдохнуть и начать жить по собственным правилам.
          </p>
          <CtaLink className="final-cta">
            Принять участие в практикуме
          </CtaLink>
        </div>
      </section>

      <footer className="footer">
        <p>ИП Юманов Константин Александрович. УНП 193001455. Все права защищены © 2026</p>
      </footer>
    </main>
  );
}
