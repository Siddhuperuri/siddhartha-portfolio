"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { useReducedMotionPreference } from "@/hooks/use-reduced-motion";

import "@/components/primitives/gradual-blur.css";

export type GradualBlurPosition = "bottom" | "left" | "right" | "top";
export type GradualBlurCurve = "bezier" | "ease-in" | "ease-in-out" | "ease-out" | "linear";
export type GradualBlurTarget = "page" | "parent";
export type GradualBlurPresetName =
  | "bottom"
  | "footer"
  | "header"
  | "intense"
  | "left"
  | "page-footer"
  | "page-header"
  | "right"
  | "sharp"
  | "sidebar"
  | "smooth"
  | "subtle"
  | "top";

export type GradualBlurProps = {
  animated?: "scroll" | boolean;
  className?: string;
  curve?: GradualBlurCurve;
  desktopHeight?: string;
  desktopWidth?: string;
  divCount?: number;
  duration?: string;
  easing?: string;
  exponential?: boolean;
  height?: string;
  hoverIntensity?: number;
  mobileHeight?: string;
  mobileWidth?: string;
  onAnimationComplete?: () => void;
  opacity?: number;
  position?: GradualBlurPosition;
  preset?: GradualBlurPresetName;
  responsive?: boolean;
  strength?: number;
  style?: CSSProperties;
  tabletHeight?: string;
  tabletWidth?: string;
  target?: GradualBlurTarget;
  width?: string;
  zIndex?: number;
};

type ResolvedConfig = Omit<Required<GradualBlurProps>, "onAnimationComplete" | "preset"> & {
  onAnimationComplete?: () => void;
} & Record<string, unknown>;

const DEFAULT_CONFIG = {
  animated: false as "scroll" | boolean,
  className: "",
  curve: "linear" as GradualBlurCurve,
  divCount: 5,
  duration: "0.3s",
  easing: "ease-out",
  exponential: false,
  height: "6rem",
  opacity: 1,
  position: "bottom" as GradualBlurPosition,
  responsive: false,
  strength: 2,
  style: {} as CSSProperties,
  target: "parent" as GradualBlurTarget,
  zIndex: 1000,
};

const PRESETS: Record<GradualBlurPresetName, Partial<GradualBlurProps>> = {
  bottom: { height: "6rem", position: "bottom" },
  footer: { curve: "ease-out", height: "8rem", position: "bottom" },
  header: { curve: "ease-out", height: "8rem", position: "top" },
  intense: { divCount: 8, exponential: true, height: "10rem", strength: 4 },
  left: { height: "6rem", position: "left" },
  "page-footer": { height: "10rem", position: "bottom", strength: 3, target: "page" },
  "page-header": { height: "10rem", position: "top", strength: 3, target: "page" },
  right: { height: "6rem", position: "right" },
  sharp: { curve: "linear", divCount: 4, height: "5rem" },
  sidebar: { height: "6rem", position: "left", strength: 2.5 },
  smooth: { curve: "bezier", divCount: 10, height: "8rem" },
  subtle: { divCount: 3, height: "4rem", opacity: 0.8, strength: 1 },
  top: { height: "6rem", position: "top" },
};

const CURVE_FUNCTIONS: Record<GradualBlurCurve, (progress: number) => number> = {
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  linear: (p) => p,
};

const mergeConfigs = (...configs: Array<Record<string, unknown>>) =>
  configs.reduce((acc, config) => ({ ...acc, ...config }), {} as Record<string, unknown>);

const getGradientDirection = (position: GradualBlurPosition) =>
  ({
    bottom: "to bottom",
    left: "to left",
    right: "to right",
    top: "to top",
  })[position] || "to bottom";

const debounce = <Args extends unknown[]>(fn: (...args: Args) => void, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
};

function useResponsiveDimension(responsive: boolean, config: ResolvedConfig, key: "height" | "width") {
  const [value, setValue] = useState(config[key] as string | undefined);

  useEffect(() => {
    if (!responsive) {
      return undefined;
    }

    const capitalizedKey = key[0].toUpperCase() + key.slice(1);

    const calc = () => {
      const width = window.innerWidth;
      let next = config[key] as string | undefined;

      if (width <= 480 && config[`mobile${capitalizedKey}`]) {
        next = config[`mobile${capitalizedKey}`] as string;
      } else if (width <= 768 && config[`tablet${capitalizedKey}`]) {
        next = config[`tablet${capitalizedKey}`] as string;
      } else if (width <= 1024 && config[`desktop${capitalizedKey}`]) {
        next = config[`desktop${capitalizedKey}`] as string;
      }

      setValue(next);
    };

    const debounced = debounce(calc, 100);

    calc();
    window.addEventListener("resize", debounced);

    return () => window.removeEventListener("resize", debounced);
  }, [responsive, config, key]);

  return responsive ? value : (config[key] as string | undefined);
}

function useIntersectionObserver(ref: React.RefObject<HTMLDivElement | null>, shouldObserve = false) {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
}

/**
 * React Bits' GradualBlur, ported as-is: a stack of absolutely-positioned
 * divs, each mask-cropped to a band of the edge and given a progressively
 * stronger backdrop-filter blur, so the edge reads as a smooth gradual blur
 * rather than a hard cutoff. Kept faithful to the supplied implementation —
 * only prop/state typing and the CSS import path are adapted for this
 * Next.js/TypeScript codebase. The `mathjs` dependency listed alongside the
 * source is unused by the actual implementation (no import references it),
 * so it was not installed.
 */
function GradualBlur(props: GradualBlurProps) {
  const prefersReducedMotion = useReducedMotionPreference();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};

    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as ResolvedConfig;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, "height");
  const responsiveWidth = useResponsiveDimension(config.responsive, config, "width");

  const isVisible = useIntersectionObserver(containerRef, config.animated === "scroll");

  const blurDivs = useMemo(() => {
    const divs: ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i += 1) {
      const progress = curveFunc(i / config.divCount);

      const blurValue = config.exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * config.divCount + 1) * currentStrength;

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;

      if (p3 <= 100) {
        gradient += `, black ${p3}%`;
      }

      if (p4 <= 100) {
        gradient += `, transparent ${p4}%`;
      }

      const direction = getGradientDirection(config.position);

      const divStyle: CSSProperties = {
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        inset: "0",
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        opacity: config.opacity,
        position: "absolute",
        transition:
          config.animated && config.animated !== "scroll"
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined,
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = config.position === "top" || config.position === "bottom";
    const isHorizontal = config.position === "left" || config.position === "right";
    const isPageTarget = config.target === "page";

    const baseStyle: CSSProperties = {
      opacity: isVisible ? 1 : 0,
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      position: isPageTarget ? "fixed" : "absolute",
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style,
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || "100%";
      baseStyle[config.position as "bottom" | "top"] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = "100%";
      baseStyle[config.position as "left" | "right"] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { animated, duration, onAnimationComplete } = config;

  useEffect(() => {
    if (isVisible && animated === "scroll" && onAnimationComplete) {
      const ms = parseFloat(duration) * 1000;
      const timer = setTimeout(() => onAnimationComplete(), ms);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isVisible, animated, onAnimationComplete, duration]);

  // Purely decorative edge vignette — never carries content, so it's always
  // hidden from the accessibility tree, and skipped entirely under
  // prefers-reduced-motion like every other visual-flourish primitive in
  // this codebase (the stacked backdrop-filter layers are a real, ongoing
  // compositor cost on scroll for no functional benefit to those users).
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden
      className={`gradual-blur ${config.target === "page" ? "gradual-blur-page" : "gradual-blur-parent"} ${config.className}`}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
      ref={containerRef}
      style={containerStyle}
    >
      <div className="gradual-blur-inner" style={{ height: "100%", position: "relative", width: "100%" }}>
        {blurDivs}
      </div>
    </div>
  );
}

type GradualBlurComponent = typeof GradualBlur & {
  CURVE_FUNCTIONS: typeof CURVE_FUNCTIONS;
  displayName: string;
  PRESETS: typeof PRESETS;
};

const GradualBlurMemo = memo(GradualBlur) as unknown as GradualBlurComponent;

GradualBlurMemo.displayName = "GradualBlur";
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;

export default GradualBlurMemo;

/**
 * The supplied source self-injects a tiny inline stylesheet as a module
 * side effect (for CDN/no-build-step usage). Kept as-is — it's inert
 * alongside the dedicated gradual-blur.css import above (only sets
 * pointer-events/overflow on classes this codebase already covers via the
 * real stylesheet) and is guarded for SSR the same way it shipped.
 */
function injectStyles() {
  if (typeof document === "undefined") {
    return;
  }

  const styleId = "gradual-blur-styles";

  if (document.getElementById(styleId)) {
    return;
  }

  const styleElement = document.createElement("style");

  styleElement.id = styleId;
  styleElement.textContent = `
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }`;

  document.head.appendChild(styleElement);
}

if (typeof document !== "undefined") {
  injectStyles();
}
