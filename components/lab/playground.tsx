"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Link2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { ExperimentStage } from "@/components/lab/experiment-stage";
import {
  defaultValues,
  sanitizeValues,
  type Control,
  type ControlValue,
  type ControlValues,
  type Experiment,
} from "@/content/experiments";
import { cn } from "@/lib/utils";

const mono =
  "font-[family-name:var(--font-mono)] uppercase tracking-[var(--tracking-eyebrow)]";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red-500)]";
const toolButton = cn(
  mono,
  focusRing,
  "inline-flex h-10 min-w-10 items-center justify-center gap-2 border border-[var(--rule-default)] px-3 text-[10px] text-[var(--paper-200)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--paper-300)] hover:text-[var(--paper-100)] motion-reduce:transition-none",
);

// How long the controls must rest before the experiment is rebuilt with them.
const COMMIT_DELAY_MS = 160;

function readHash(experiment: Experiment): ControlValues {
  const params = new URLSearchParams(window.location.hash.slice(1));
  return sanitizeValues(experiment, Object.fromEntries(params));
}

/** Only the values that differ from the defaults, as a URL fragment. */
function toHash(experiment: Experiment, values: ControlValues) {
  const params = new URLSearchParams();
  for (const control of experiment.controls) {
    const value = values[control.key];
    if (value !== control.value) {
      params.set(
        control.key,
        typeof value === "boolean" ? (value ? "1" : "0") : String(value),
      );
    }
  }
  const hash = params.toString();
  return hash ? `#${hash}` : "";
}

function randomValue(control: Control): ControlValue {
  switch (control.kind) {
    case "range": {
      const steps = Math.round((control.max - control.min) / control.step);
      const value = control.min + Math.round(Math.random() * steps) * control.step;
      return Number(value.toFixed(4));
    }
    case "color":
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
    case "toggle":
      return Math.random() > 0.5;
    case "select":
      return control.options[Math.floor(Math.random() * control.options.length)].value;
    default:
      return control.value;
  }
}

type FieldProps = {
  control: Control;
  onChange: (value: ControlValue) => void;
  value: ControlValue;
};

function Field({ control, onChange, value }: FieldProps) {
  const id = useId();
  const label = (
    <label className={cn(mono, "text-[10px] text-[var(--paper-300)]")} htmlFor={id}>
      {control.label}
    </label>
  );

  if (control.kind === "range") {
    return (
      <div>
        <div className="flex items-baseline justify-between gap-3">
          {label}
          <output
            className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--paper-100)] tabular-nums"
            htmlFor={id}
          >
            {value as number}
          </output>
        </div>
        <input
          className="lab-range mt-2 w-full"
          id={id}
          max={control.max}
          min={control.min}
          onChange={(event) => onChange(Number(event.target.value))}
          step={control.step}
          type="range"
          value={value as number}
        />
      </div>
    );
  }

  if (control.kind === "color") {
    return (
      <div className="flex items-center justify-between gap-3">
        {label}
        <span className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--paper-300)] uppercase">
            {value as string}
          </span>
          <input
            className={cn(
              focusRing,
              "size-10 cursor-pointer border border-[var(--rule-default)] bg-transparent p-1",
            )}
            id={id}
            onChange={(event) => onChange(event.target.value)}
            type="color"
            value={value as string}
          />
        </span>
      </div>
    );
  }

  if (control.kind === "toggle") {
    return (
      <div className="flex items-center justify-between gap-3">
        {label}
        <input
          checked={value as boolean}
          className="lab-switch"
          id={id}
          onChange={(event) => onChange(event.target.checked)}
          role="switch"
          type="checkbox"
        />
      </div>
    );
  }

  const inputClass = cn(
    focusRing,
    "mt-2 h-10 w-full border border-[var(--rule-default)] bg-[var(--ink-950)] px-3 font-[family-name:var(--font-sans)] text-[14px] text-[var(--paper-100)]",
  );

  if (control.kind === "select") {
    return (
      <div>
        {label}
        <select
          className={inputClass}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value as string}
        >
          {control.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        autoComplete="off"
        className={inputClass}
        id={id}
        maxLength={control.maxLength}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        type="text"
        value={value as string}
      />
    </div>
  );
}

type PlaygroundProps = {
  experiment: Experiment;
  index: number;
  next: { slug: string; title: string };
  previous: { slug: string; title: string };
  total: number;
};

/**
 * One experiment on a page of its own, with its parameters exposed as
 * controls. In "stage" mode the page is exactly one viewport tall, so wheel and
 * drag can only ever reach the experiment. Edits live in the URL fragment, so
 * a tweaked experiment can be shared as a link.
 */
export function Playground({
  experiment,
  index,
  next,
  previous,
  total,
}: PlaygroundProps) {
  const defaults = useMemo(() => defaultValues(experiment), [experiment]);
  const [values, setValues] = useState<ControlValues>(defaults);
  const [committed, setCommitted] = useState<ControlValues>(defaults);
  // null: the layout's default (docked open on desktop stage pages, else shut).
  const [open, setOpen] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();
  const isStage = experiment.mode === "stage";

  // Pick up edits carried in the link, and follow back/forward.
  useEffect(() => {
    const sync = () => {
      const fromHash = readHash(experiment);
      setValues(fromHash);
      setCommitted(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [experiment]);

  // Rebuild the experiment once the controls rest, and record the edit.
  useEffect(() => {
    if (values === committed) return;
    const timer = window.setTimeout(() => {
      setCommitted(values);
      const url = `${window.location.pathname}${toHash(experiment, values)}`;
      window.history.replaceState(window.history.state, "", url);
    }, COMMIT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [committed, experiment, values]);

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (open !== true) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const setValue = useCallback((key: string, value: ControlValue) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const shuffle = () =>
    setValues(
      Object.fromEntries(
        experiment.controls.map((control) => [control.key, randomValue(control)]),
      ),
    );

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}${toHash(experiment, values)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard access can be refused; the address bar already has the link.
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  };

  const edited = experiment.controls.some(
    (control) => values[control.key] !== control.value,
  );
  const stageKey = JSON.stringify(committed);
  const home =
    experiment.group === "work"
      ? { href: "/work", label: "Work" }
      : { href: "/lab", label: "Lab" };
  const pad = (n: number) => String(n).padStart(2, "0");

  // Docked beside the stage on desktop stage pages; otherwise a sheet the
  // visitor opens. Below `lg` it always sits just above the bottom tab bar.
  const panelVisibility = isStage
    ? open === null
      ? "max-lg:hidden"
      : open
        ? ""
        : "hidden"
    : open
      ? ""
      : "hidden";

  const panel = (
    <aside
      aria-label={`${experiment.title} controls`}
      className={cn(
        "flex flex-col border-[var(--rule-default)] bg-[rgba(16,16,16,0.96)]",
        "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-[calc(3.5rem+env(safe-area-inset-bottom))] max-lg:z-30 max-lg:max-h-[55svh] max-lg:border-t",
        isStage
          ? "lg:w-80 lg:shrink-0 lg:border"
          : "lg:fixed lg:top-[4.75rem] lg:right-4 lg:z-30 lg:max-h-[calc(100svh-5.75rem)] lg:w-80 lg:border lg:shadow-[0_24px_60px_rgba(0,0,0,0.5)]",
        panelVisibility,
      )}
      id={panelId}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--rule-default)] px-4 py-2">
        <h2 className={cn(mono, "text-[11px] text-[var(--paper-100)]")}>Controls</h2>
        <div className="flex items-center gap-1">
          <button
            aria-label="Randomise every control"
            className={cn(toolButton, "border-transparent")}
            onClick={shuffle}
            title="Randomise"
            type="button"
          >
            <Shuffle aria-hidden className="size-4" />
          </button>
          <button
            aria-label="Reset controls to their defaults"
            className={cn(toolButton, "border-transparent disabled:opacity-35")}
            disabled={!edited}
            onClick={() => setValues(defaults)}
            title="Reset"
            type="button"
          >
            <RotateCcw aria-hidden className="size-4" />
          </button>
          <button
            aria-label="Close controls"
            className={cn(toolButton, "border-transparent")}
            onClick={() => setOpen(false)}
            title="Close"
            type="button"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      <div
        className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4"
        data-lenis-prevent
      >
        {experiment.controls.map((control) => (
          <Field
            control={control}
            key={control.key}
            onChange={(value) => setValue(control.key, value)}
            value={values[control.key]}
          />
        ))}
      </div>

      <div className="border-t border-[var(--rule-default)] p-3">
        <button className={cn(toolButton, "w-full")} onClick={copyLink} type="button">
          {copied ? (
            <Check aria-hidden className="size-4 text-[var(--red-500)]" />
          ) : (
            <Link2 aria-hidden className="size-4" />
          )}
          <span aria-live="polite">
            {copied ? "Link copied" : "Copy link to this version"}
          </span>
        </button>
      </div>
    </aside>
  );

  const controlsExpanded = open ?? false;

  const toolbar = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-[var(--grid-margin)] py-3">
      <Link className={cn(toolButton, "shrink-0")} href={home.href}>
        <ArrowLeft aria-hidden className="size-4" />
        {home.label}
      </Link>

      <div className="min-w-0 flex-1 max-sm:order-last max-sm:basis-full">
        <p className={cn(mono, "text-[10px] text-[var(--paper-400)]")}>
          [ {pad(index + 1)} / {pad(total)} ] Playground
        </p>
        <h1 className="truncate font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.15] text-[var(--paper-100)]">
          {experiment.title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 max-sm:ml-auto">
        <Link
          aria-label={`Previous experiment: ${previous.title}`}
          className={toolButton}
          href={`/lab/${previous.slug}`}
          title={previous.title}
        >
          <ArrowLeft aria-hidden className="size-4" />
        </Link>
        <Link
          aria-label={`Next experiment: ${next.title}`}
          className={toolButton}
          href={`/lab/${next.slug}`}
          title={next.title}
        >
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <button
          aria-controls={panelId}
          aria-expanded={isStage && open === null ? undefined : controlsExpanded}
          className={cn(
            toolButton,
            "border-[var(--red-500)] text-[var(--paper-100)]",
            // On desktop stage pages the panel starts docked, so the button
            // is only needed once it has been closed.
            isStage && open !== false && "lg:hidden",
          )}
          onClick={() => setOpen(open === true ? false : true)}
          type="button"
        >
          <SlidersHorizontal aria-hidden className="size-4" />
          Tweak
        </button>
      </div>

      <p className="basis-full text-[14px] leading-[1.5] text-[var(--paper-300)] max-lg:hidden">
        {experiment.note}
      </p>
    </div>
  );

  const stage = (
    <ExperimentStage key={stageKey} slug={experiment.slug} values={committed} />
  );

  if (isStage) {
    return (
      <main
        className="flex h-svh flex-col overflow-hidden pt-[4.25rem] max-lg:pb-[calc(3.5rem+env(safe-area-inset-bottom))]"
        id="main-content"
      >
        {toolbar}
        <div className="flex min-h-0 flex-1 gap-4 px-[var(--grid-margin)] pb-4">
          <div
            className="relative min-w-0 flex-1 overflow-hidden border border-[var(--rule-default)] bg-[var(--ink-900)]"
            data-lenis-prevent
            ref={stageRef}
          >
            {stage}
            <button
              aria-label={fullscreen ? "Leave full screen" : "View full screen"}
              className={cn(
                toolButton,
                "absolute right-3 bottom-3 z-20 bg-[rgba(10,10,10,0.7)] backdrop-blur-sm",
              )}
              onClick={toggleFullscreen}
              type="button"
            >
              {fullscreen ? (
                <Minimize2 aria-hidden className="size-4" />
              ) : (
                <Maximize2 aria-hidden className="size-4" />
              )}
            </button>
          </div>
          {panel}
        </div>
      </main>
    );
  }

  return (
    <main
      className="pt-[4.25rem] max-lg:pb-[calc(3.5rem+env(safe-area-inset-bottom))]"
      id="main-content"
    >
      {toolbar}
      <p
        className={cn(
          mono,
          "px-[var(--grid-margin)] pb-3 text-[10px] text-[var(--paper-400)]",
        )}
      >
        Scroll the page to drive it <span aria-hidden>↓</span>
      </p>
      <div className="border-y border-[var(--rule-hairline)]">
        {experiment.slug === "collection-surfer" ? (
          <div className="relative h-[400svh]">
            <div className="sticky top-0 h-svh overflow-hidden">{stage}</div>
          </div>
        ) : experiment.slug === "tilted-grid" ? (
          <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)]">
            {stage}
          </div>
        ) : (
          stage
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-[var(--grid-margin)] py-[var(--space-16)]">
        <Link className={toolButton} href={home.href}>
          <ArrowLeft aria-hidden className="size-4" />
          Back to {home.label}
        </Link>
        <Link
          className={cn(toolButton, "border-[var(--red-500)] text-[var(--paper-100)]")}
          href={`/lab/${next.slug}`}
        >
          Next: {next.title}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
      {panel}
    </main>
  );
}
