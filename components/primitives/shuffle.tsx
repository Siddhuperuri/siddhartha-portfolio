"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";

import "@/components/primitives/shuffle.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export type ShuffleDirection = "down" | "left" | "right" | "up";
export type ShuffleAnimationMode = "evenodd" | "random";
export type ShuffleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export type ShuffleProps = {
  animationMode?: ShuffleAnimationMode;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  ease?: string;
  loop?: boolean;
  loopDelay?: number;
  maxDelay?: number;
  onShuffleComplete?: () => void;
  respectReducedMotion?: boolean;
  rootMargin?: string;
  scrambleCharset?: string;
  shuffleDirection?: ShuffleDirection;
  shuffleTimes?: number;
  stagger?: number;
  style?: CSSProperties;
  tag?: ShuffleTag;
  text: string;
  textAlign?: CSSProperties["textAlign"];
  threshold?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
};

/**
 * React Bits' Shuffle, ported as-is: SplitText breaks the text into chars,
 * each char is wrapped in a fixed-size strip containing scrambled copies
 * plus the real glyph, and GSAP slides the strip to reveal the real glyph
 * on scroll-into-view (and again on hover). Kept faithful to the supplied
 * implementation — only typing (refs, DOM nodes, GSAP instances) and the
 * CSS import path are adapted for this Next.js/TypeScript codebase.
 */
function Shuffle({
  animationMode = "evenodd",
  className = "",
  colorFrom,
  colorTo,
  duration = 0.35,
  ease = "power3.out",
  loop = false,
  loopDelay = 0,
  maxDelay = 0,
  onShuffleComplete,
  respectReducedMotion = true,
  rootMargin = "-100px",
  scrambleCharset = "",
  shuffleDirection = "right",
  shuffleTimes = 1,
  stagger = 0.03,
  style = {},
  tag = "p",
  text,
  textAlign = "center",
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = true,
}: ShuffleProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(
    () => typeof document === "undefined" || !("fonts" in document) || document.fonts.status === "loaded",
  );
  const [ready, setReady] = useState(false);

  const splitRef = useRef<GSAPSplitText | null>(null);
  const wrappersRef = useRef<HTMLSpanElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document) || document.fonts.status === "loaded") {
      return;
    }

    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || "");
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || "px" : "px";
    const sign = mv === 0 ? "" : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;

    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) {
        return;
      }

      if (
        respectReducedMotion &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setReady(true);
        onShuffleComplete?.();

        return;
      }

      const el = ref.current;
      const start = scrollTriggerStart;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener("mouseenter", hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }

        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild;
            const orig = inner?.querySelector('[data-orig="1"]');

            if (orig && wrap.parentNode) {
              wrap.parentNode.replaceChild(orig, wrap);
            }
          });
          wrappersRef.current = [];
        }

        try {
          splitRef.current?.revert();
        } catch {
          /* noop */
        }

        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();

        splitRef.current = new GSAPSplitText(el, {
          charsClass: "shuffle-char",
          linesClass: "shuffle-line",
          reduceWhiteSpace: false,
          smartWrap: true,
          type: "chars",
          wordsClass: "shuffle-word",
        });

        const chars = splitRef.current.chars || [];

        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || "";

        chars.forEach((chEl) => {
          const ch = chEl as HTMLElement;
          const parent = ch.parentElement;

          if (!parent) {
            return;
          }

          const w = ch.getBoundingClientRect().width;
          const h = ch.getBoundingClientRect().height;

          if (!w) {
            return;
          }

          const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

          const wrap = document.createElement("span");

          Object.assign(wrap.style, {
            display: "inline-block",
            height: isVertical ? `${h}px` : "auto",
            overflow: "hidden",
            verticalAlign: "bottom",
            width: `${w}px`,
          });

          const inner = document.createElement("span");

          Object.assign(inner.style, {
            display: "inline-block",
            whiteSpace: isVertical ? "normal" : "nowrap",
            willChange: "transform",
          });

          parent.insertBefore(wrap, ch);
          wrap.appendChild(inner);

          const firstOrig = ch.cloneNode(true) as HTMLElement;

          Object.assign(firstOrig.style, {
            display: isVertical ? "block" : "inline-block",
            textAlign: "center",
            width: `${w}px`,
          });

          ch.setAttribute("data-orig", "1");
          Object.assign(ch.style, {
            display: isVertical ? "block" : "inline-block",
            textAlign: "center",
            width: `${w}px`,
          });

          inner.appendChild(firstOrig);

          for (let k = 0; k < rolls; k += 1) {
            const clone = ch.cloneNode(true) as HTMLElement;

            if (scrambleCharset) {
              clone.textContent = rand(scrambleCharset);
            }

            Object.assign(clone.style, {
              display: isVertical ? "block" : "inline-block",
              textAlign: "center",
              width: `${w}px`,
            });
            inner.appendChild(clone);
          }

          inner.appendChild(ch);

          const steps = rolls + 1;

          if (shuffleDirection === "right" || shuffleDirection === "down") {
            const firstCopy = inner.firstElementChild;
            const real = inner.lastElementChild;

            if (real) {
              inner.insertBefore(real, inner.firstChild);
            }

            if (firstCopy) {
              inner.appendChild(firstCopy);
            }
          }

          let startX = 0;
          let finalX = 0;
          let startY = 0;
          let finalY = 0;

          if (shuffleDirection === "right") {
            startX = -steps * w;
            finalX = 0;
          } else if (shuffleDirection === "left") {
            startX = 0;
            finalX = -steps * w;
          } else if (shuffleDirection === "down") {
            startY = -steps * h;
            finalY = 0;
          } else if (shuffleDirection === "up") {
            startY = 0;
            finalY = -steps * h;
          }

          if (shuffleDirection === "left" || shuffleDirection === "right") {
            gsap.set(inner, { force3D: true, x: startX, y: 0 });
            inner.setAttribute("data-start-x", String(startX));
            inner.setAttribute("data-final-x", String(finalX));
          } else {
            gsap.set(inner, { force3D: true, x: 0, y: startY });
            inner.setAttribute("data-start-y", String(startY));
            inner.setAttribute("data-final-y", String(finalY));
          }

          if (colorFrom) {
            inner.style.color = colorFrom;
          }

          wrappersRef.current.push(wrap);
        });
      };

      const inners = () => wrappersRef.current.map((w) => w.firstElementChild as HTMLElement);

      const randomizeScrambles = () => {
        if (!scrambleCharset) {
          return;
        }

        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild;

          if (!strip) {
            return;
          }

          const kids = Array.from(strip.children);

          for (let i = 1; i < kids.length - 1; i += 1) {
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
          }
        });
      };

      const cleanupToStill = () => {
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild as HTMLElement | null;

          if (!strip) {
            return;
          }

          const real = strip.querySelector('[data-orig="1"]');

          if (!real) {
            return;
          }

          strip.replaceChildren(real);
          strip.style.transform = "none";
          strip.style.willChange = "auto";
        });
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) {
          return;
        }

        removeHover();

        const handler = () => {
          if (playingRef.current) {
            return;
          }

          build();

          if (scrambleCharset) {
            randomizeScrambles();
          }

          play();
        };

        hoverHandlerRef.current = handler;
        ref.current.addEventListener("mouseenter", handler);
      };

      const play = () => {
        const strips = inners();

        if (!strips.length) {
          return;
        }

        playingRef.current = true;

        const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

        const tl = gsap.timeline({
          onComplete: () => {
            playingRef.current = false;

            if (!loop) {
              cleanupToStill();

              if (colorTo) {
                gsap.set(strips, { color: colorTo });
              }

              onShuffleComplete?.();
              armHover();
            }
          },
          onRepeat: () => {
            if (scrambleCharset) {
              randomizeScrambles();
            }

            if (isVertical) {
              gsap.set(strips, { y: (_i, t: HTMLElement) => parseFloat(t.getAttribute("data-start-y") || "0") });
            } else {
              gsap.set(strips, { x: (_i, t: HTMLElement) => parseFloat(t.getAttribute("data-start-x") || "0") });
            }

            onShuffleComplete?.();
          },
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          smoothChildTiming: true,
        });

        const addTween = (targets: HTMLElement[], at: number) => {
          const vars: gsap.TweenVars = {
            duration,
            ease,
            force3D: true,
            stagger: animationMode === "evenodd" ? stagger : 0,
          };

          if (isVertical) {
            vars.y = (_i: number, t: HTMLElement) => parseFloat(t.getAttribute("data-final-y") || "0");
          } else {
            vars.x = (_i: number, t: HTMLElement) => parseFloat(t.getAttribute("data-final-x") || "0");
          }

          tl.to(targets, vars, at);

          if (colorFrom && colorTo) {
            tl.to(targets, { color: colorTo, duration, ease }, at);
          }
        };

        if (animationMode === "evenodd") {
          const odd = strips.filter((_, i) => i % 2 === 1);
          const even = strips.filter((_, i) => i % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;

          if (odd.length) {
            addTween(odd, 0);
          }

          if (even.length) {
            addTween(even, evenStart);
          }
        } else {
          strips.forEach((strip) => {
            const d = Math.random() * maxDelay;
            const vars: gsap.TweenVars = { duration, ease, force3D: true };

            if (isVertical) {
              vars.y = parseFloat(strip.getAttribute("data-final-y") || "0");
            } else {
              vars.x = parseFloat(strip.getAttribute("data-final-x") || "0");
            }

            tl.to(strip, vars, d);

            if (colorFrom && colorTo) {
              tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
            }
          });
        }

        tlRef.current = tl;
      };

      const create = () => {
        build();

        if (scrambleCharset) {
          randomizeScrambles();
        }

        play();
        armHover();
        setReady(true);
      };

      const st = ScrollTrigger.create({
        onEnter: create,
        once: triggerOnce,
        start,
        trigger: el,
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        setReady(false);
      };
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        scrollTriggerStart,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete,
      ],
      scope: ref,
    },
  );

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(() => `shuffle-parent ${ready ? "is-ready" : ""} ${className}`, [ready, className]);

  if (tag === "h1") {
    return <h1 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h1>;
  }

  if (tag === "h2") {
    return <h2 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h2>;
  }

  if (tag === "h3") {
    return <h3 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h3>;
  }

  if (tag === "h4") {
    return <h4 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h4>;
  }

  if (tag === "h5") {
    return <h5 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h5>;
  }

  if (tag === "h6") {
    return <h6 className={classes} ref={ref as RefObject<HTMLHeadingElement | null>} style={commonStyle}>{text}</h6>;
  }

  if (tag === "span") {
    return <span className={classes} ref={ref as RefObject<HTMLSpanElement | null>} style={commonStyle}>{text}</span>;
  }

  return <p className={classes} ref={ref as RefObject<HTMLParagraphElement | null>} style={commonStyle}>{text}</p>;
}

export default Shuffle;
