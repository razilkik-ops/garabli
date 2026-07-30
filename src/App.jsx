import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Eye,
  HourglassMedium,
  Info,
  ListChecks,
  ListNumbers,
  ShieldCheck,
  Sparkle,
  UserCircle,
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "О практикуме", id: "about", icon: Info },
  { label: "Программа", id: "program", icon: ListNumbers },
  { label: "Результаты", id: "results", icon: Sparkle },
  { label: "Автор", id: "author", icon: UserCircle },
];

const STORY_ITEMS = [
  {
    icon: Eye,
    title: "Абсолютная ясность",
    description:
      "Вы чётко увидите истинную первопричину, почему ситуации повторялись, и поймёте, какую защитную функцию выполняло ваше одиночество.",
  },
  {
    icon: ShieldCheck,
    title: "Внутренняя опора",
    description:
      "Поймёте, как бережно снимать «броню» дома и возвращать себе право на живые чувства и безопасность без риска для своих границ.",
  },
  {
    icon: HourglassMedium,
    title: "Выход из вечного ожидания",
    description:
      "Осознаете, как перестать зависеть от чужих оценок или сообщений и вернуть контроль над своей жизнью.",
  },
  {
    icon: ListChecks,
    title: "Пошаговый алгоритм",
    description:
      "Унесёте с собой готовую матрицу действий для построения понятных партнёрских отношений на равных.",
  },
];

const AUDIENCE_ITEMS = [
  "На работе просчитывает риски наперёд, а в личной жизни строит железную защиту, блокируя живое тепло и оставаясь в изоляции.",
  "Мастерски решает любые кризисы в бизнесе, но дома не может выключить режим директора.",
  "Видит свои отношения как тяжёлую работу, где по привычке везёт абсолютно всё на себе.",
  "Выбирает партнёров, которых нужно постоянно мотивировать, тянуть вверх и опекать.",
  "Отдаёт все ресурсы, а взамен получает лишь хроническую неблагодарность и опустошение.",
  "Успешен и твёрд в социуме, но перед близкими пасует, соглашается на неудобное и проглатывает обиды, пока внутри копится глухая злость на саму себя.",
  "Откладывает личное счастье на потом («Вот масштабирую компанию, закрою проект — и тогда…») либо соглашается на вторые роли, путая эмоциональные качели с истинной глубиной.",
];

const PROGRAM_DAYS = [
  {
    title: "Где я? Ревизия и цена моих ошибок",
    image: "/assets/program-day-1.png",
    imageAlt: "Бронзовая винтовая лестница, снятая снизу",
    lessons: [
      "Урок 1. Почему ты бежишь по кругу? Считаем реальную стоимость твоих шишек: сколько времени и нервов уходит на одни и те же действия. Вскрытие сценария и фиксация точек слива сил.",
      "Урок 2. Чью жизнь ты живёшь на самом деле? Инструкция, как отделить свои реальные желания от чужих ожиданий, требований и социальных «надо».",
    ],
  },
  {
    title: "Иллюзия контроля. Сколько можно тащить?",
    image: "/assets/program-day-2.png",
    imageAlt: "Тёмная архитектура с узким лучом тёплого света",
    lessons: [
      "Урок 3. Как перестать везти всё на себе? Разбираем наши социальные роли. Учимся выключать режим сильной женщины и делегировать задачи без страха, что всё рухнет.",
      "Урок 4. Как убрать из жизни манипуляторов. Разбираем, на какие внутренние кнопки они нажимают, и как спокойно говорить «нет» без оправданий и чувства вины.",
    ],
  },
  {
    title: "Твоя жизнь — твои правила.",
    image: "/assets/program-day-3.png",
    imageAlt: "Слои тёмного материала с бронзовыми подсвеченными краями",
    lessons: [
      "Урок 5. От вечной гонки к нормальной жизни. Разрыв циклических повторений. Заменяем старые обиды на чёткое понимание: кто в окружении свой, а кто — балласт.",
      "Урок 6. Как сделать свои особенности главным топливом. Перестаём полировать идеальный фасад и учимся использовать свой характер для достижения целей.",
      "Урок 7. Финальный план: как жить, а не играть роль. Пошаговый алгоритм, как принимать решения на основе личного комфорта.",
    ],
  },
];

const FORMAT_ITEMS = [
  {
    label: "Формат",
    text: "Практический онлайн-практикум — 3 интенсивных дня.",
  },
  {
    label: "Минимум теории",
    text: "Никаких длинных скучных лекций. Только ёмкие разборы, матрицы и рабочие схемы.",
  },
  {
    label: "Инструменты",
    text: "Бесплатная интерактивная экспресс-диагностика слепых зон и PDF-руководство «Анатомия скрытых сценариев».",
  },
  {
    label: "Интеграция",
    text: "Все задания направлены на разбор ваших реальных жизненных ситуаций.",
  },
];

const AUTHOR_CREDENTIALS = [
  "Диплом военного психолога (1995 год)",
  "Более 15 лет практического опыта в сфере восстановления личной автономии",
  "Эксперт по системному анализу и телеведущий",
  "Автор программ: «Точка опоры», «Безопасная близость», «Связь достижений и эмоций»",
  "Методологическая опора: системное мышление, аналитическая психология, теории зрелой близости",
];

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function App() {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const durationRef = useRef(10);
  const targetTimeRef = useRef(0);
  const lastTargetTimeRef = useRef(0);
  const seekDirectionRef = useRef(0);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgramDay, setActiveProgramDay] = useState(0);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const triggers = [];

    const context = gsap.context(() => {
      const storyPanels = gsap.utils.toArray(".story-panel");
      const storyCards = storyPanels.map((panel) =>
        panel.querySelector(".story-card"),
      );
      const header = scene.querySelector(".header");
      const navTargets = gsap.utils.toArray(".nav-reveal");
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "bottom bottom",
          scrub: reducedMotion ? true : 0.12,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(storyPanels, { autoAlpha: 0 });
      gsap.set(storyCards, { autoAlpha: 0 });
      gsap.set(header, { autoAlpha: 0 });
      gsap.set(navTargets, { autoAlpha: 0 });

      const addGlitchSequence = (timeline, target, at = 0) => {
        timeline
          .fromTo(
            target,
            {
              autoAlpha: 0,
              x: -28,
              y: 12,
              filter:
                "blur(10px) brightness(1.8) contrast(1.35) drop-shadow(14px 0 #ff005d) drop-shadow(-14px 0 #00eaff)",
              textShadow: "0 0 transparent",
            },
            {
              autoAlpha: 0.76,
              x: 18,
              y: -7,
              filter:
                "blur(2px) brightness(1.45) contrast(1.2) drop-shadow(11px 0 #ff005d) drop-shadow(-11px 0 #00eaff)",
              textShadow: "10px 0 #ff005d, -10px 0 #00eaff",
              duration: 0.22,
              ease: "steps(2)",
            },
            at,
          )
          .to(
            target,
            {
              autoAlpha: 1,
              x: -14,
              y: 6,
              filter:
                "blur(1px) brightness(1.3) drop-shadow(-9px 0 #ff005d) drop-shadow(9px 0 #00eaff)",
              textShadow: "-9px 0 #ff005d, 9px 0 #00eaff",
              duration: 0.18,
              ease: "steps(1)",
            },
            at + 0.22,
          )
          .to(
            target,
            {
              autoAlpha: 0.82,
              x: 9,
              y: -4,
              filter:
                "blur(1.5px) brightness(1.5) drop-shadow(7px 0 #ff005d) drop-shadow(-7px 0 #00eaff)",
              textShadow: "7px 0 #ff005d, -7px 0 #00eaff",
              duration: 0.16,
              ease: "steps(1)",
            },
            at + 0.4,
          )
          .to(
            target,
            {
              autoAlpha: 1,
              x: -4,
              y: 2,
              filter:
                "blur(0.5px) brightness(1.2) drop-shadow(-4px 0 #ff005d) drop-shadow(4px 0 #00eaff)",
              textShadow: "-4px 0 #ff005d, 4px 0 #00eaff",
              duration: 0.14,
              ease: "steps(1)",
            },
            at + 0.56,
          )
          .to(
            target,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              textShadow: "0 0 transparent",
              duration: 0.36,
              ease: "power3.out",
            },
            at + 0.7,
          )
          .set(
            target,
            {
              clearProps: "filter,textShadow",
            },
            at + 1.06,
          );
      };

      const addGlitchIn = (target, at) => {
        addGlitchSequence(storyTimeline, target, at);
      };

      const showPanel = (index, start, exit, direction = 1) => {
        const panel = storyPanels[index];
        const card = storyCards[index];

        storyTimeline.set(panel, { autoAlpha: 1 }, start);

        if (reducedMotion) {
          storyTimeline.fromTo(
            card,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            },
            start,
          );
        } else {
          addGlitchIn(card, start);
        }

        if (exit === null) return;

        storyTimeline
          .to(
            card,
            reducedMotion
              ? {
                  autoAlpha: 0,
                  y: -12,
                  duration: 0.8,
                  ease: "power2.in",
                }
              : {
                  autoAlpha: 0,
                  xPercent: direction * 170,
                  yPercent: -42,
                  rotation: direction * -2.5,
                  scale: 1.08,
                  filter: "blur(11px)",
                  duration: 0.82,
                  ease: "power4.in",
                },
            exit,
          )
          .set(panel, { autoAlpha: 0 }, exit + 0.82);
      };

      showPanel(0, 3, 15, 1);
      showPanel(1, 18, 29, -1);
      showPanel(2, 32, 40, 1);
      showPanel(3, 42, 50, -1);
      showPanel(4, 52, 60, 1);
      showPanel(5, 62, 70, -1);

      storyTimeline.set(header, { autoAlpha: 1 }, 72);
      navTargets.forEach((target, index) => {
        const at = 72 + index * 0.72;

        if (reducedMotion) {
          storyTimeline.fromTo(
            target,
            { autoAlpha: 0, y: -8 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            at,
          );
        } else {
          addGlitchIn(target, at);
        }
      });

      showPanel(6, 77, null);
      storyTimeline.to({ value: 0 }, { value: 1, duration: 22 }, 78);

      const targets = gsap.utils.toArray(".glitch-reveal");

      targets.forEach((element) => {
        const delay = Number(element.dataset.glitchDelay || 0);
        const trigger = element;
        const start = element.dataset.glitchStart || "top 82%";

        gsap.set(element, { autoAlpha: 0 });

        triggers.push(
          ScrollTrigger.create({
            trigger,
            start,
            once: true,
            onEnter: () => {
              if (reducedMotion) {
                gsap.fromTo(
                  element,
                  { autoAlpha: 0, y: 10 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.48,
                    delay,
                    ease: "power2.out",
                  },
                );
                return;
              }

              const elementTimeline = gsap.timeline({ delay });
              addGlitchSequence(elementTimeline, element);
            },
          }),
        );
      });

      const manifesto = document.querySelector(".manifesto");
      const manifestoBackground = document.querySelector(
        ".manifesto-background",
      );
      const manifestoItems = manifesto
        ? gsap.utils.toArray(".manifesto-reveal", manifesto)
        : [];
      const manifestoLabel = manifesto?.querySelector(".manifesto-label");
      const manifestoLines = manifesto
        ? gsap.utils.toArray(".manifesto-line", manifesto)
        : [];
      const manifestoQuote = manifesto?.querySelector(".manifesto-quote");

      if (manifesto && manifestoBackground) {
        gsap.fromTo(
          manifestoBackground,
          { yPercent: -3, scale: 1.1 },
          {
            yPercent: 3,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: manifesto,
              start: "top bottom",
              end: "bottom top",
              scrub: reducedMotion ? true : 0.8,
            },
          },
        );
      }

      if (manifesto && manifestoItems.length) {
        if (reducedMotion) {
          gsap.fromTo(
            manifestoItems,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: manifesto,
                start: "top 76%",
                once: true,
              },
            },
          );
        } else {
          const manifestoTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: manifesto,
              start: "top 72%",
              once: true,
            },
          });

          manifestoTimeline
            .fromTo(
              manifestoLabel,
              {
                autoAlpha: 0,
                y: 18,
                filter: "blur(8px)",
                letterSpacing: "0.52em",
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0.34em",
                duration: 0.7,
                ease: "power3.out",
              },
            )
            .fromTo(
              manifestoLines,
              {
                autoAlpha: 0,
                y: 42,
                clipPath: "inset(0 0 100% 0)",
                filter: "blur(10px)",
              },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.18,
                ease: "power4.out",
              },
              0.18,
            )
            .fromTo(
              manifestoQuote,
              {
                autoAlpha: 0,
                y: 28,
                filter: "blur(8px)",
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power3.out",
              },
              0.9,
            );
        }
      }

      const audience = document.querySelector(".audience");
      const audienceIntro = audience
        ? gsap.utils.toArray(".audience-intro", audience)
        : [];
      const audienceVisual = audience?.querySelector(".audience-visual");
      const audienceImage = audience?.querySelector(".audience-image");
      const audienceItems = audience
        ? gsap.utils.toArray(".audience-item", audience)
        : [];

      if (audience && audienceIntro.length && audienceVisual) {
        if (reducedMotion) {
          gsap.fromTo(
            [...audienceIntro, audienceVisual, ...audienceItems],
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: audience,
                start: "top 78%",
                once: true,
              },
            },
          );
        } else {
          const audienceTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: audience,
              start: "top 72%",
              once: true,
            },
          });

          audienceTimeline
            .fromTo(
              audienceIntro,
              {
                autoAlpha: 0,
                y: 24,
                filter: "blur(10px)",
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
              },
            )
            .fromTo(
              audienceVisual,
              {
                autoAlpha: 0,
                y: 34,
                scale: 1.035,
                filter: "blur(16px)",
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power4.out",
              },
              0.16,
            );

          audienceItems.forEach((item, index) => {
            gsap.fromTo(
              item,
              {
                autoAlpha: 0,
                x: index % 2 === 0 ? 28 : -28,
                y: 18,
                filter: "blur(8px)",
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: 0.72,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });
        }
      }

      if (audience && audienceImage && !reducedMotion) {
        gsap.fromTo(
          audienceImage,
          { yPercent: -3, scale: 1.07 },
          {
            yPercent: 3,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: audience,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      const program = document.querySelector(".program-section");
      const programIntro = program
        ? gsap.utils.toArray(".program-intro", program)
        : [];
      const programDays = program
        ? gsap.utils.toArray(".program-day", program)
        : [];

      if (program && programIntro.length) {
        gsap.fromTo(
          programIntro,
          reducedMotion
            ? { autoAlpha: 0, y: 12 }
            : { autoAlpha: 0, y: 28, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.5 : 0.86,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: program,
              start: "top 76%",
              once: true,
            },
          },
        );
      }

      programDays.forEach((day, index) => {
        const media = day.querySelector(".program-media");
        const image = day.querySelector(".program-image");
        const copy = day.querySelector(".program-copy");
        const lessons = gsap.utils.toArray(".program-lesson", day);

        triggers.push(
          ScrollTrigger.create({
            trigger: day,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveProgramDay(index),
            onEnterBack: () => setActiveProgramDay(index),
          }),
        );

        if (reducedMotion) {
          gsap.fromTo(
            [media, copy],
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: day,
                start: "top 82%",
                once: true,
              },
            },
          );
          return;
        }

        const dayTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: day,
            start: "top 78%",
            once: true,
          },
        });

        dayTimeline
          .fromTo(
            media,
            {
              autoAlpha: 0,
              y: 42,
              clipPath:
                index % 2 === 0
                  ? "inset(0 100% 0 0 round 38px)"
                  : "inset(0 0 0 100% round 38px)",
              filter: "blur(12px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0 0 round 38px)",
              filter: "blur(0px)",
              duration: 1.05,
              ease: "power4.out",
            },
          )
          .fromTo(
            copy,
            {
              autoAlpha: 0,
              x: index % 2 === 0 ? 38 : -38,
              filter: "blur(8px)",
            },
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.82,
              ease: "power3.out",
            },
            0.18,
          )
          .fromTo(
            lessons,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.48,
          );

        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -4, scale: 1.08 },
            {
              yPercent: 4,
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: day,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }
      });

      const formatSection = document.querySelector(".format-section");
      const formatIntro = formatSection
        ? gsap.utils.toArray(".format-intro", formatSection)
        : [];
      const formatItems = formatSection
        ? gsap.utils.toArray(".format-item", formatSection)
        : [];

      if (formatSection) {
        gsap.fromTo(
          [...formatIntro, ...formatItems],
          reducedMotion
            ? { autoAlpha: 0, y: 12 }
            : { autoAlpha: 0, y: 30, filter: "blur(9px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.5 : 0.78,
            stagger: reducedMotion ? 0.05 : 0.11,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formatSection,
              start: "top 74%",
              once: true,
            },
          },
        );
      }

      const authorSection = document.querySelector(".author-section");
      const authorImage = authorSection?.querySelector(".author-portrait");
      const authorContent = authorSection?.querySelector(".author-content");
      const authorItems = authorSection
        ? gsap.utils.toArray(".author-reveal", authorSection)
        : [];

      if (authorSection && authorImage && authorContent) {
        const authorTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: authorSection,
            start: "top 74%",
            once: true,
          },
        });

        authorTimeline
          .fromTo(
            authorImage,
            reducedMotion
              ? { autoAlpha: 0, y: 12 }
              : {
                  autoAlpha: 0,
                  y: 42,
                  clipPath: "inset(100% 0 0 0 round 42px)",
                  filter: "blur(12px)",
                },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0 0 0 round 42px)",
              filter: "blur(0px)",
              duration: reducedMotion ? 0.5 : 1,
              ease: "power4.out",
            },
          )
          .fromTo(
            authorItems,
            reducedMotion
              ? { autoAlpha: 0, y: 10 }
              : { autoAlpha: 0, x: 28, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              duration: reducedMotion ? 0.45 : 0.72,
              stagger: 0.08,
              ease: "power3.out",
            },
            reducedMotion ? 0.12 : 0.2,
          );
      }

      const closingSection = document.querySelector(".closing-section");
      const closingItems = closingSection
        ? gsap.utils.toArray(".closing-reveal", closingSection)
        : [];

      if (closingSection && closingItems.length) {
        gsap.fromTo(
          closingItems,
          reducedMotion
            ? { autoAlpha: 0, y: 10 }
            : { autoAlpha: 0, y: 30, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.48 : 0.82,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closingSection,
              start: "top 74%",
              once: true,
            },
          },
        );
      }
    }, scene);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      triggers.forEach((trigger) => trigger.kill());
      context.revert();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const scene = sceneRef.current;
    if (!video || !scene) return undefined;

    video.pause();
    video.currentTime = 0.001;

    const syncFrame = (force = false) => {
      frameRef.current = 0;
      if (
        (!video.seeking || force) &&
        Math.abs(video.currentTime - targetTimeRef.current) > 1 / 60
      ) {
        video.currentTime = targetTimeRef.current;
      }
    };

    const updateFromScroll = () => {
      const rect = scene.getBoundingClientRect();
      const scrollRange = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollRange);
      const nextTargetTime =
        nextProgress * Math.max(durationRef.current - 0.06, 0);
      const targetDelta = nextTargetTime - lastTargetTimeRef.current;
      const nextDirection =
        Math.abs(targetDelta) > 1 / 240
          ? Math.sign(targetDelta)
          : seekDirectionRef.current;
      const directionChanged =
        nextDirection !== 0 &&
        seekDirectionRef.current !== 0 &&
        nextDirection !== seekDirectionRef.current;

      targetTimeRef.current = nextTargetTime;
      lastTargetTimeRef.current = nextTargetTime;

      if (nextDirection !== 0) {
        seekDirectionRef.current = nextDirection;
      }

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.001 ? nextProgress : current,
      );

      if (directionChanged) {
        if (frameRef.current) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
        syncFrame(true);
        return;
      }

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(syncFrame);
      }
    };

    const onMetadata = () => {
      if (Number.isFinite(video.duration)) durationRef.current = video.duration;
      updateFromScroll();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    const onSeeked = () => syncFrame();

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    updateFromScroll();

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const cueOpacity = clamp(1 - progress / 0.035);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToProgramDay = (index) => {
    document
      .getElementById(`program-day-${index + 1}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main>
      <section className="scroll-scene" ref={sceneRef} aria-label="Антиграбли">
        <div className="hero">
          <video
            className="hero-video"
            ref={videoRef}
            src="/assets/hero-scrub.mp4?v=5501"
            preload="auto"
            playsInline
            muted
            aria-label="Видеоряд практикума"
          />
          <div className="hero-shade" aria-hidden="true" />

          <header className="header">
            <nav className="desktop-nav" aria-label="Навигация по странице">
              {NAV_ITEMS.map(({ label, id, icon: Icon }) => {
                return (
                  <button
                    className="glass glass-nav nav-reveal"
                    key={id}
                    onClick={() => scrollTo(id)}
                  >
                    <Icon aria-hidden="true" size={20} weight="light" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              className="glass menu-button nav-reveal"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <ListNumbers aria-hidden="true" size={20} weight="light" />
              <span>Меню</span>
            </button>
            <nav
              className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
              id="mobile-nav"
              aria-label="Мобильная навигация"
            >
              {NAV_ITEMS.map(({ label, id, icon: Icon }) => (
                <button key={id} onClick={() => scrollTo(id)}>
                  <Icon aria-hidden="true" size={20} weight="light" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </header>

          <div className="story-stage">
            <section className="story-panel story-panel--brand">
              <div className="story-card story-card--brand">
                <h1>Антиграбли</h1>
              </div>
            </section>

            <section className="story-panel story-panel--tagline">
              <div className="story-card story-card--tagline">
                <p>Трёхдневный практикум</p>
                <h2>«Выйди из круга»</h2>
              </div>
            </section>

            {STORY_ITEMS.map(({ icon: Icon, title, description }) => (
              <section className="story-panel story-panel--benefit" key={title}>
                <article className="story-card benefit-card">
                  <div className="glass benefit-icon" aria-hidden="true">
                    <Icon size={38} weight="light" />
                  </div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </article>
              </section>
            ))}

            <section className="story-panel story-panel--final">
              <div className="story-card final-card">
                <p className="final-kicker">Время выйти из круга</p>
                <p className="final-description">
                  Авторская методология Константина Юманова для женщин, которые
                  устали тащить всё на себе и хотят вернуть контроль над своей
                  жизнью.
                </p>
                <button
                  className="glass glass-nav cta"
                  onClick={() => scrollTo("about")}
                >
                  <span>Принять участие</span>
                  <ArrowRight aria-hidden="true" size={20} weight="light" />
                </button>
              </div>
            </section>
          </div>

          <div
            className="scroll-cue"
            style={{ opacity: cueOpacity }}
            aria-hidden={cueOpacity < 0.05}
          >
            <span>Листайте вниз</span>
            <small>СКРОЛЛ</small>
          </div>

          <div className="progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </section>

      <section className="manifesto" id="about" aria-labelledby="manifesto-title">
        <img
          className="manifesto-background"
          src="/assets/manifesto-bg.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="manifesto-shade" aria-hidden="true" />
        <div className="manifesto-content">
          <p className="manifesto-label manifesto-reveal">МАНИФЕСТО · 01</p>
          <h2 className="manifesto-statement" id="manifesto-title">
            <span className="manifesto-line manifesto-reveal">
              Давайте без иллюзий. Если в жизни из раза в раз повторяется один и
              тот же финал — меняются только лица и декорации.
            </span>
            <span className="manifesto-line manifesto-reveal">
              Дело не в везении или токсичном окружении. Дело в привычном
              механизме действий, который запускается на автомате.
            </span>
            <span className="manifesto-line manifesto-reveal">
              Пора разобраться, как устроен этот процесс, и вернуть себе
              управление собственной жизнью.
            </span>
          </h2>
          <blockquote className="manifesto-quote manifesto-reveal">
            <p>
              Пока вы не начнёте замечать свои автоматические действия, они
              будут управлять вашей жизнью, а вы назовёте это судьбой.
            </p>
            <cite>К. Г. Юнг</cite>
          </blockquote>
        </div>
      </section>

      <section className="audience" id="results" aria-labelledby="audience-title">
        <div className="audience-heading">
          <p className="audience-kicker audience-intro">
            ДЛЯ КОГО ЭТОТ ПРАКТИКУМ · 02
          </p>
          <h2 className="audience-title audience-intro" id="audience-title">
            Практикум будет особенно полезен, если вы:
          </h2>
        </div>

        <div className="audience-layout">
          <figure className="audience-visual">
            <img
              className="audience-image"
              src="/assets/audience-editorial.png"
              alt="Женщина рядом с прозрачной спиралью ДНК"
            />
            <div className="audience-visual-shade" aria-hidden="true" />
            <figcaption>
              <span>Не характер.</span>
              <strong>Повторяющийся механизм.</strong>
            </figcaption>
          </figure>

          <ol className="audience-list">
            {AUDIENCE_ITEMS.map((item, index) => (
              <li className="audience-item" key={item}>
                <span className="audience-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="program-section"
        id="program"
        aria-labelledby="program-title"
      >
        <div className="program-heading">
          <p className="program-kicker program-intro">
            ПРОГРАММА ПРАКТИКУМА · 03
          </p>
          <h2 className="program-title program-intro" id="program-title">
            Матрица решений:
            <span>3 дня, 7 уроков</span>
          </h2>
        </div>

        <nav
          className="program-nav glass program-intro"
          aria-label="Навигация по дням практикума"
        >
          <span className="program-nav-label">ДЕНЬ</span>
          {PROGRAM_DAYS.map((day, index) => (
            <button
              className={activeProgramDay === index ? "is-active" : ""}
              key={day.title}
              onClick={() => scrollToProgramDay(index)}
              aria-current={activeProgramDay === index ? "step" : undefined}
              aria-label={`Перейти к дню ${index + 1}`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </nav>

        <div className="program-days">
          {PROGRAM_DAYS.map((day, index) => (
            <article
              className={`program-day ${
                index % 2 === 1 ? "program-day--reverse" : ""
              }`}
              id={`program-day-${index + 1}`}
              key={day.title}
            >
              <figure className="program-media">
                <img
                  className="program-image"
                  src={day.image}
                  alt={day.imageAlt}
                  loading="lazy"
                />
                <div className="program-media-shade" aria-hidden="true" />
                <figcaption>
                  {String(index + 1).padStart(2, "0")}
                  <small>/ 03</small>
                </figcaption>
              </figure>

              <div className="program-copy">
                <p className="program-day-label">ДЕНЬ {index + 1}</p>
                <h3>{day.title}</h3>
                <ul>
                  {day.lessons.map((lesson) => (
                    <li className="program-lesson" key={lesson}>
                      <span aria-hidden="true" />
                      <p>{lesson}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="format-section"
        id="format"
        aria-labelledby="format-title"
      >
        <div className="format-heading">
          <p className="format-kicker format-intro">ФОРМАТ ОБУЧЕНИЯ · 04</p>
          <h2 className="format-title format-intro" id="format-title">
            Как всё проходит
          </h2>
        </div>

        <div className="format-layout">
          <div className="format-score format-intro" aria-label="3 дня, 7 уроков">
            <span>
              <strong>3</strong>
              <small>дня</small>
            </span>
            <span>
              <strong>7</strong>
              <small>уроков</small>
            </span>
          </div>

          <dl className="format-list">
            {FORMAT_ITEMS.map((item, index) => (
              <div className="format-item" key={item.label}>
                <span className="format-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt>{item.label}</dt>
                  <dd>{item.text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="author-section"
        id="author"
        aria-labelledby="author-title"
      >
        <div className="author-heading">
          <p className="author-kicker author-reveal">АВТОР МЕТОДОЛОГИИ · 05</p>
        </div>

        <div className="author-layout">
          <figure className="author-portrait">
            <img
              src="/assets/author-konstantin-reference.png"
              alt="Константин Александрович Юманов"
              loading="lazy"
            />
            <figcaption>15+ лет системного анализа</figcaption>
          </figure>

          <div className="author-content">
            <h2 className="author-reveal" id="author-title">
              Константин Александрович Юманов
            </h2>
            <p className="author-role author-reveal">
              Эксперт по системному анализу повторяющихся жизненных ситуаций
            </p>
            <p className="author-bio author-reveal">
              Я — Константин Юманов. Более 15 лет я занимаюсь системным анализом
              повторяющихся жизненных ситуаций, разбором скрытых сценариев и
              выводом клиентов из циклических тупиков. Никаких пустых лозунгов,
              обещаний мгновенного чуда и эзотерики. В основе моей работы лежит
              жёсткая логика причинно-следственных связей, практическая
              психология и нейробиология.
            </p>

            <ul className="author-credentials author-reveal">
              {AUTHOR_CREDENTIALS.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>

            <blockquote className="author-case author-reveal">
              <p className="author-case-label">КЕЙС ИЗ ПРАКТИКИ</p>
              <p>
                Клиентка Н., владелица логистического бизнеса. Обратилась с
                классическим «режимом директора», который не выключался дома, и
                5-летним стажем одиночества. После пошагового разбора
                автоматических реакций и перестройки личных границ смогла
                создать стабильные партнёрские отношения на равных за 8
                месяцев. При этом позиции в бизнесе полностью сохранены.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section
        className="closing-section"
        id="join"
        aria-labelledby="closing-title"
      >
        <div className="closing-ambient" aria-hidden="true" />
        <div className="closing-content">
          <span className="closing-line closing-reveal" aria-hidden="true" />
          <h2 className="closing-reveal" id="closing-title">
            Позвольте себе выдохнуть и начать жить по собственным правилам.
          </h2>
          <p className="closing-lead closing-reveal">
            Ждём вас на практикуме «АНТИ-ГРАБЛИ».
          </p>
          <a
            className="glass closing-cta closing-reveal"
            href="https://t.me/umanko4"
            target="_blank"
            rel="noreferrer"
          >
            <span>Принять участие в практикуме</span>
            <ArrowRight aria-hidden="true" size={25} weight="thin" />
          </a>
          <p className="closing-contact closing-reveal">
            Или напишите нам в Telegram:{" "}
            <a href="https://t.me/umanko4" target="_blank" rel="noreferrer">
              @umanko4
            </a>
          </p>
        </div>

        <footer className="footer">
          <div>
            <p className="footer-brand">АНТИ-ГРАБЛИ</p>
            <p>Авторская методология Константина Юманова</p>
          </div>
          <div>
            <p className="footer-label">КОНТАКТЫ</p>
            <a href="https://t.me/umanko4" target="_blank" rel="noreferrer">
              Telegram: @umanko4
            </a>
          </div>
          <div>
            <p className="footer-label">РАЗДЕЛЫ</p>
            <button onClick={() => scrollTo("about")}>О практикуме</button>
            <button onClick={() => scrollTo("program")}>Программа</button>
            <button onClick={() => scrollTo("results")}>Результаты</button>
            <button onClick={() => scrollTo("author")}>Автор</button>
          </div>
          <p className="footer-legal">
            ИП Юманов Константин Александрович. УНП 9876435. Все права защищены
            © 2026
          </p>
        </footer>
      </section>
    </main>
  );
}
