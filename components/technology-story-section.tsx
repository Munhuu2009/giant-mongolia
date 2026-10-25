"use client";

/* eslint-disable @next/next/no-img-element -- direct image load/error events are required for the stage layers. */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { useLanguage } from "@/components/language-provider";

const STEP_DURATION_MS = 5000;
const PARTICLES_ENABLED = true;
const PARTICLE_COUNT = 30;

type Point = { x: number; y: number };
type Step = {
  id: string;
  keys: {
    category: string;
    title: string;
    description: string;
    stat: string;
    alt: string;
  };
  bg: string | null;
  fg: string;
  objectPosition: string;
  hotspot: Point;
  zoomOrigin: Point;
};

const technologySteps: Step[] = [
  {
    id: "advanced-sl",
    keys: {
      category: "technology.story.step01.category",
      title: "technology.story.step01.title",
      description: "technology.story.step01.description",
      stat: "technology.story.step01.stat",
      alt: "technology.story.step01.alt",
    },
    bg: null,
    fg: "/images/technology/propel-head-tube.webp",
    objectPosition: "center",
    hotspot: { x: 52, y: 46 },
    zoomOrigin: { x: 52, y: 46 },
  },
  {
    id: "overdrive-aero",
    keys: {
      category: "technology.story.step02.category",
      title: "technology.story.step02.title",
      description: "technology.story.step02.description",
      stat: "technology.story.step02.stat",
      alt: "technology.story.step02.alt",
    },
    bg: null,
    fg: "/images/technology/propel-front.webp",
    objectPosition: "center",
    hotspot: { x: 58, y: 52 },
    zoomOrigin: { x: 58, y: 52 },
  },
  {
    id: "d-fuse",
    keys: {
      category: "technology.story.step03.category",
      title: "technology.story.step03.title",
      description: "technology.story.step03.description",
      stat: "technology.story.step03.stat",
      alt: "technology.story.step03.alt",
    },
    bg: null,
    fg: "/images/technology/propel-handlebar.webp",
    objectPosition: "center",
    hotspot: { x: 47, y: 37 },
    zoomOrigin: { x: 47, y: 37 },
  },
  {
    id: "maestro",
    keys: {
      category: "technology.story.step04.category",
      title: "technology.story.step04.title",
      description: "technology.story.step04.description",
      stat: "technology.story.step04.stat",
      alt: "technology.story.step04.alt",
    },
    bg: null,
    fg: "/images/technology/emtb-shock.webp",
    objectPosition: "center",
    hotspot: { x: 56, y: 54 },
    zoomOrigin: { x: 56, y: 54 },
  },
  {
    id: "syncdrive-pro",
    keys: {
      category: "technology.story.step05.category",
      title: "technology.story.step05.title",
      description: "technology.story.step05.description",
      stat: "technology.story.step05.stat",
      alt: "technology.story.step05.alt",
    },
    bg: null,
    fg: "/images/technology/emtb-motor.webp",
    objectPosition: "center",
    hotspot: { x: 51, y: 58 },
    zoomOrigin: { x: 51, y: 58 },
  },
  {
    id: "aluxx-sl",
    keys: {
      category: "technology.story.step06.category",
      title: "technology.story.step06.title",
      description: "technology.story.step06.description",
      stat: "technology.story.step06.stat",
      alt: "technology.story.step06.alt",
    },
    bg: null,
    fg: "/images/technology/talon-head-tube.webp",
    objectPosition: "center",
    hotspot: { x: 48, y: 43 },
    zoomOrigin: { x: 48, y: 43 },
  },
];

type Particle = { x: number; y: number; radius: number; speed: number; opacity: number };
type Line = { fromX: number; fromY: number; toX: number; toY: number };

function getVisibleImagePoint(
  point: Point,
  image: HTMLImageElement | null,
  wrapper: HTMLElement | null,
  objectPosition = "center",
) {
  if (!image?.naturalWidth || !wrapper) return point;
  const rect = wrapper.getBoundingClientRect();
  if (!rect.width || !rect.height) return point;
  const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const positions = objectPosition.split(/\s+/);
  const fraction = (position: string | undefined) => {
    if (!position || position === "center") return 0.5;
    if (position === "left" || position === "top") return 0;
    if (position === "right" || position === "bottom") return 1;
    const percent = Number.parseFloat(position);
    return position.endsWith("%") && Number.isFinite(percent) ? percent / 100 : 0.5;
  };
  const verticalFirst = positions[0] === "top" || positions[0] === "bottom";
  const xFraction = fraction(verticalFirst ? positions[1] : positions[0]);
  const yFraction = fraction(verticalFirst ? positions[0] : positions[1]);
  return {
    x: ((point.x / 100 * width + (rect.width - width) * xFraction) / rect.width) * 100,
    y: ((point.y / 100 * height + (rect.height - height) * yFraction) / rect.height) * 100,
  };
}

export default function TechnologyStorySection() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const swipeStartRef = useRef<Point | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [stepResetKey, setStepResetKey] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [offscreen, setOffscreen] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [debug, setDebug] = useState(false);
  const [debugPoint, setDebugPoint] = useState<Point | null>(null);
  const [line, setLine] = useState<Line>({ fromX: 0, fromY: 0, toX: 0, toY: 0 });
  const [hotspotPosition, setHotspotPosition] = useState<Point>(technologySteps[0].hotspot);
  const activeStep = technologySteps[activeIndex];
  const nextStepId = technologySteps[(activeIndex + 1) % technologySteps.length].id;
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const isPlaying = !userPaused && !hovering && !focused && !tabHidden && !offscreen && !reducedMotion;
  const activeImageLoaded = loadedImages[activeStep.fg];

  function selectStep(index: number) {
    setActiveIndex((index + technologySteps.length) % technologySteps.length);
    setStepResetKey((key) => key + 1);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setOffscreen(!entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setTabHidden(document.visibilityState !== "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const isDebug = process.env.NODE_ENV === "development" &&
        new URLSearchParams(window.location.search).get("debug") === "1";
      setDebug(isDebug);
      if (isDebug) setUserPaused(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % technologySteps.length);
    }, STEP_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, isPlaying, stepResetKey]);

  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    const image = imageRefs.current[activeStep.id];
    if (!wrapper) return;
    const updateHotspot = () => {
      setHotspotPosition(
        getVisibleImagePoint(activeStep.hotspot, image ?? null, wrapper, activeStep.objectPosition),
      );
    };
    updateHotspot();
    const observer = new ResizeObserver(updateHotspot);
    observer.observe(wrapper);
    window.addEventListener("resize", updateHotspot);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHotspot);
    };
  }, [activeStep, activeIndex, activeImageLoaded]);

  useEffect(() => {
    const stage = stageRef.current;
    const wrapper = imageWrapperRef.current;
    if (!stage || !wrapper) return;
    const updateLine = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const stageBounds = stage.getBoundingClientRect();
      const panelBounds = panel.getBoundingClientRect();
      const dot = hotspotPosition;
      const imageBounds = wrapper.getBoundingClientRect();
      const fromX = panelBounds.right;
      const fromY = descriptionRef.current
        ? descriptionRef.current.getBoundingClientRect().bottom - stageBounds.top
        : panelBounds.bottom - stageBounds.top;
      setLine({
        fromX: fromX - stageBounds.left,
        fromY,
        toX: imageBounds.left - stageBounds.left + dot.x / 100 * imageBounds.width,
        toY: imageBounds.top - stageBounds.top + dot.y / 100 * imageBounds.height,
      });
    };
    const frame = window.requestAnimationFrame(updateLine);
    const observer = new ResizeObserver(updateLine);
    observer.observe(stage);
    observer.observe(wrapper);
    const panelContainer = stage.querySelector(".technology-story__panel");
    if (panelContainer) observer.observe(panelContainer);
    window.addEventListener("resize", updateLine);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateLine);
    };
  }, [activeIndex, activeStep, offscreen, hotspotPosition]);

  useEffect(() => {
    if (!PARTICLES_ENABLED || reducedMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.7 + Math.random() * 1.4,
      speed: 4 + Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.25,
    }));
    let frame = 0;
    let visible = false;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time: number) => {
      frame = 0;
      if (!visible || document.visibilityState !== "visible") return;
      const delta = Math.min((time - (previousTime || time)) / 1000, 0.05);
      previousTime = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed * delta / Math.max(height, 1);
        if (particle.y < -0.02) particle.y = 1.02;
        const x = particle.x * width;
        const y = particle.y * height;
        const glow = context.createRadialGradient(x, y, 0, x, y, particle.radius * 4);
        glow.addColorStop(0, `rgba(190, 220, 255, ${particle.opacity})`);
        glow.addColorStop(1, "rgba(120, 170, 255, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, particle.radius * 4, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (visible && document.visibilityState === "visible" && !frame) {
        frame = window.requestAnimationFrame(draw);
      }
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      schedule();
    }, { threshold: 0.01 });
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      schedule();
    };
    resize();
    intersectionObserver.observe(section);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  function onRailKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectStep(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      selectStep(activeIndex + (dx < 0 ? 1 : -1));
    }
  }

  function onImageClick(event: MouseEvent<HTMLDivElement>) {
    if (!debug) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRefs.current[activeStep.id];
    const display = {
      x: (event.clientX - rect.left) / rect.width * 100,
      y: (event.clientY - rect.top) / rect.height * 100,
    };
    let imagePoint = display;
    if (image?.naturalWidth && image.naturalHeight) {
      const scale = Math.max(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
      const renderedWidth = image.naturalWidth * scale;
      const renderedHeight = image.naturalHeight * scale;
      imagePoint = {
        x: ((display.x / 100 * rect.width - (rect.width - renderedWidth) / 2) / renderedWidth) * 100,
        y: ((display.y / 100 * rect.height - (rect.height - renderedHeight) / 2) / renderedHeight) * 100,
      };
    }
    const x = Number(imagePoint.x.toFixed(2));
    const y = Number(imagePoint.y.toFixed(2));
    setDebugPoint({ x: display.x, y: display.y });
    setUserPaused(true);
    console.info(`Technology hotspot ${activeStep.fg}: { x: ${x}, y: ${y} }`);
  }

  function getImageStyle(step: Step) {
    return {
      objectFit: "cover" as const,
      objectPosition: step.objectPosition,
      transformOrigin: step.id === activeStep.id
        ? `${hotspotPosition.x}% ${hotspotPosition.y}%`
        : `${step.zoomOrigin.x}% ${step.zoomOrigin.y}%`,
    };
  }

  return (
    <section
      ref={sectionRef}
      id="technology"
      aria-labelledby="technology-heading"
      className="technology-section technology-story"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div ref={stageRef} className="technology-story__stage">
        <div
          ref={imageWrapperRef}
          className={`technology-story__visual${debug ? " is-debug" : ""}`}
          onClick={onImageClick}
        >
          <div className="technology-story__background-plate" aria-hidden="true" />
          <div className="technology-story__image-stack">
            {technologySteps.map((step) => (
              <div
                key={step.id}
                className={`technology-story__image-layer${step.id === activeStep.id ? " is-active" : ""}`}
                aria-hidden={step.id !== activeStep.id}
              >
                {step.bg && !failedImages[step.bg] && (
                  <img
                    src={step.bg}
                    alt=""
                    className="technology-story__background-image"
                    draggable={false}
                    onLoad={() => setLoadedImages((current) => ({ ...current, [step.bg!]: true }))}
                    onError={() => {
                      console.warn(`[TechnologyStory] Image failed to load: ${step.bg}`);
                      setFailedImages((current) => ({ ...current, [step.bg!]: true }));
                    }}
                  />
                )}
                {!failedImages[step.fg] && (
                  <img
                    ref={(node) => {
                      imageRefs.current[step.id] = node;
                    }}
                    src={step.fg}
                    alt={t(step.keys.alt)}
                    className={`technology-story__photo${step.id === activeStep.id ? " is-active" : ""}${loadedImages[step.fg] ? " is-loaded" : ""}`}
                    style={getImageStyle(step)}
                    loading={step.id === activeStep.id || step.id === nextStepId ? "eager" : "lazy"}
                    draggable={false}
                    onLoad={() => setLoadedImages((current) => ({ ...current, [step.fg]: true }))}
                    onError={() => {
                      console.warn(`[TechnologyStory] Image failed to load: ${step.fg}`);
                      setFailedImages((current) => ({ ...current, [step.fg]: true }));
                    }}
                  />
                )}
                <div
                  className={`technology-story__image-placeholder${loadedImages[step.fg] ? " is-loaded" : ""}`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="technology-story__scrim" aria-hidden="true" />
          {PARTICLES_ENABLED && <canvas ref={canvasRef} className="technology-story__particles" aria-hidden="true" />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`hotspot-${activeStep.id}`}
              className="technology-story__hotspot"
              style={{
                left: `calc(${hotspotPosition.x}% - 0.5rem)`,
                top: `calc(${hotspotPosition.y}% - 0.5rem)`,
                transformOrigin: `${activeStep.zoomOrigin.x}% ${activeStep.zoomOrigin.y}%`,
              }}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.7 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              aria-hidden="true"
            >
              <span className="technology-story__pulse" />
              <motion.span
                className="technology-story__hotspot-label"
                initial={reducedMotion ? false : { opacity: 0, scaleX: 0.8 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.2 }}
              >
                {t(activeStep.keys.title)}
              </motion.span>
            </motion.div>
          </AnimatePresence>
          {debug && debugPoint && (
            <span
              className="technology-story__debug-crosshair"
              style={{ left: `${debugPoint.x}%`, top: `${debugPoint.y}%` }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="technology-story__content">
          <header className="technology-story__header">
            <p>{t("technology.story.eyebrow")}</p>
            <h2 id="technology-heading">{t("technology.story.heading")}</h2>
            <span>{t("technology.story.tagline")}</span>
          </header>
          <div className="technology-story__layout">
            <nav
              className="technology-story__rail"
              aria-label={t("technology.story.rail")}
              onKeyDown={onRailKeyDown}
            >
              {technologySteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={`technology-story__rail-step${index === activeIndex ? " is-active" : ""}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                  aria-label={`${String(index + 1).padStart(2, "0")}: ${t(step.keys.title)}`}
                  onClick={() => selectStep(index)}
                >
                  <span className="technology-story__rail-dot" />
                  <span className="technology-story__rail-label">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {t(step.keys.title)}
                  </span>
                  {index === activeIndex && (
                    <span
                      key={activeIndex}
                      className="technology-story__rail-progress"
                    >
                      <span
                        key={`${stepResetKey}-${isPlaying}`}
                        className={`technology-story__rail-progress-fill${isPlaying ? " is-running" : ""}`}
                        style={{ animationDuration: `${STEP_DURATION_MS}ms` }}
                      />
                    </span>
                  )}
                </button>
              ))}
              <button
                type="button"
                className="technology-story__play-toggle"
                aria-pressed={isPlaying}
                onClick={() => {
                  setUserPaused(isPlaying);
                }}
              >
                {isPlaying ? t("technology.story.pause") : t("technology.story.play")}
              </button>
            </nav>
            <div className="technology-story__panel" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep.id}
                  ref={panelRef}
                  className="technology-story__feature"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                >
                  <motion.p
                    className="technology-story__counter"
                    initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : 0.02 }}
                  >
                    {activeNumber} <span>/ 06</span>
                  </motion.p>
                  <motion.p
                    className="technology-story__category"
                    initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : 0.06 }}
                  >
                    {t(activeStep.keys.category)}
                  </motion.p>
                  <motion.h3
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.08 }}
                  >
                    {t(activeStep.keys.title)}
                  </motion.h3>
                  <motion.p
                    ref={descriptionRef}
                    className="technology-story__description"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.14 }}
                  >
                    {t(activeStep.keys.description)}
                  </motion.p>
                  <motion.span
                    className="technology-story__stat"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.2 }}
                  >
                    {t(activeStep.keys.stat)}
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <svg className="technology-story__connector" aria-hidden="true">
          <path
            key={activeStep.id}
            d={`M ${line.fromX} ${line.fromY} L ${line.toX} ${line.toY}`}
            pathLength="1000"
            className={reducedMotion ? "is-static" : ""}
          />
        </svg>
      </div>
    </section>
  );
}
