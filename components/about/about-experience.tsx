"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { InViewMount } from "@/components/primitives/in-view-mount";
import { OutlineButton } from "@/components/primitives/outline-button";
import { SectionRegister } from "@/components/primitives/section-register";
import { AuroraFlow } from "@/components/ui/aurora-flow";
import {
  GithubCalendar,
  type GithubContributionData,
} from "@/components/ui/github-calendar";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { LayeredStack } from "@/components/ui/layered-stack";
import { LensClock } from "@/components/ui/lens-clock";
import { MagnetLines } from "@/components/ui/magnet-lines";
import githubActivity from "@/content/github-activity.json";
import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards";
import { TextMorph } from "@/components/ui/text-morph";
import { contactDetails } from "@/content/contact";
import {
  capabilities,
  processSteps,
  profile,
  skillGroups,
  timeline,
} from "@/content/profile";

const TOTAL = 6;
const eyebrow =
  "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-400)]";
const heading =
  "font-[family-name:var(--font-display)] font-normal leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--paper-100)]";

/**
 * /about — an aurora masthead, then capabilities as a card stack that fans out
 * on hover, the toolkit beside a field of magnets, the process as stacking
 * cards, public GitHub activity, and the background.
 */
export function AboutExperience() {
  return (
    <>
      <section
        aria-labelledby="about-title"
        className="relative isolate overflow-hidden border-b border-[var(--rule-hairline)]"
      >
        <InViewMount
          className="absolute inset-0 -z-10 opacity-60"
          fallback={<div aria-hidden className="h-full w-full bg-[var(--ink-900)]" />}
          staticOk
        >
          <AuroraFlow
            className="h-full w-full"
            colors={["#0a0a0a", "#2a0c09", "#7a1810", "#ff3d2e", "#ffd2cc"]}
            intensity={0.8}
            speed={0.6}
          />
        </InViewMount>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(10,10,10,0.35)] via-[rgba(10,10,10,0.6)] to-[var(--ink-950)]"
        />

        <SectionRegister index={1} label="ABOUT" total={TOTAL} />
        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-10)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.7)] pb-[var(--space-24)]">
          <div className="col-span-12 lg:col-span-9">
            <p className={eyebrow}>{profile.role}</p>
            <h1
              className="mt-[var(--space-6)] font-[family-name:var(--font-display)] text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] font-normal tracking-[var(--tracking-display)] text-[var(--paper-100)]"
              id="about-title"
            >
              <KineticTextReveal
                autoPlay
                className="block"
                splitBy="words"
                stagger={0.06}
                text={profile.name}
              />
            </h1>
            <p className="mt-[var(--space-8)] max-w-[46ch] font-[family-name:var(--font-sans)] text-[20px] leading-[1.5] text-[var(--paper-200)]">
              {profile.statement}
            </p>
            <p
              className={`mt-[var(--space-8)] flex flex-wrap items-baseline gap-x-[0.5em] ${heading} text-[length:var(--text-3xl)] md:text-[length:var(--text-4xl)]`}
            >
              <span className="text-[var(--paper-400)]">Right now: shipping</span>
              <TextMorph
                words={["interfaces", "identities", "prototypes", "systems"]}
              />
            </p>
            <div className="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]">
              <a
                className="group inline-flex h-14 items-center gap-3 border border-[var(--red-500)] bg-[var(--red-500)] px-6 font-[family-name:var(--font-mono)] text-[13px] tracking-[var(--tracking-eyebrow)] text-[var(--ink-950)] uppercase transition-colors hover:border-[var(--red-400)] hover:bg-[var(--red-400)]"
                href={`mailto:${contactDetails.email}`}
              >
                Get in touch
                <Mail aria-hidden className="size-4" />
              </a>
              <OutlineButton href="/work" size="lg">
                View selected work <ArrowUpRight aria-hidden className="size-4" />
              </OutlineButton>
            </div>
          </div>
          <div className="col-span-12 flex items-end lg:col-span-3 lg:justify-end">
            <InViewMount
              className="size-56"
              fallback={<div aria-hidden className="size-56" />}
              staticOk
            >
              <LensClock theme="dark" />
            </InViewMount>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="capabilities-title"
        className="relative border-b border-[var(--rule-hairline)] pb-[var(--space-section)]"
      >
        <SectionRegister index={2} label="CAPABILITIES" total={TOTAL} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
          <h2
            className={`${heading} max-w-[18ch] text-[length:var(--text-4xl)] md:text-[length:var(--text-6xl)]`}
            id="capabilities-title"
          >
            How I approach product &amp; design
          </h2>
          <p className={`mt-[var(--space-6)] ${eyebrow}`}>Hover the stack</p>
          <LayeredStack className="mt-[var(--space-10)] grid min-h-[22rem] grid-cols-1 gap-[var(--grid-gutter)] md:grid-cols-3">
            {capabilities.map((cap) => (
              <article
                className="flex min-h-[22rem] flex-col justify-between border border-[var(--rule-default)] bg-[var(--ink-850)] p-[var(--space-8)]"
                key={cap.title}
              >
                <span className={eyebrow}>{cap.index}</span>
                <div>
                  <h3
                    className={`${heading} text-[length:var(--text-2xl)] md:text-[length:var(--text-3xl)]`}
                  >
                    {cap.title}
                  </h3>
                  <p className="mt-[var(--space-4)] max-w-[32ch] font-[family-name:var(--font-sans)] text-[15px] leading-[1.55] text-[var(--paper-200)]">
                    {cap.summary}
                  </p>
                </div>
              </article>
            ))}
          </LayeredStack>
        </div>
      </section>

      <section
        aria-labelledby="toolkit-title"
        className="relative border-b border-[var(--rule-hairline)] pb-[var(--space-section)]"
      >
        <SectionRegister index={3} label="TOOLKIT" total={TOTAL} />
        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-12)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
          <h2
            className={`${heading} col-span-12 max-w-[14ch] text-[length:var(--text-4xl)] md:text-[length:var(--text-6xl)] lg:col-span-5`}
            id="toolkit-title"
          >
            Toolkit &amp; disciplines
          </h2>
          <div className="col-span-12 grid gap-[var(--space-8)] sm:grid-cols-3 lg:col-span-7">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className={`${eyebrow} text-[var(--red-500)]`}>{group.label}</h3>
                <ul className="mt-[var(--space-4)] space-y-[var(--space-2)] font-[family-name:var(--font-sans)] text-[15px] text-[var(--paper-200)]">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="col-span-12 overflow-hidden border border-[var(--rule-default)]"
          >
            <InViewMount
              className="h-48 w-full"
              fallback={<div className="h-full w-full" />}
            >
              <MagnetLines
                baseAngle={-20}
                className="h-full w-full"
                columns={34}
                containerSize="100%"
                lineColor="rgba(245,245,245,0.5)"
                lineHeight="22px"
                lineWidth="1px"
                rows={6}
              />
            </InViewMount>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="process-title"
        className="relative border-b border-[var(--rule-hairline)]"
      >
        <SectionRegister index={4} label="PROCESS" total={TOTAL} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
          <h2
            className={`${heading} max-w-[16ch] text-[length:var(--text-4xl)] md:text-[length:var(--text-6xl)]`}
            id="process-title"
          >
            Process &amp; practice
          </h2>
        </div>
        <StickyScrollCards
          cardClassName="w-[min(92vw,820px)] border border-[var(--rule-default)] bg-[var(--surface-raised)] shadow-[0_24px_64px_rgb(0_0_0/0.45)]"
          getKey={(step) => step.number}
          items={[...processSteps]}
          renderCard={(step) => (
            <div className="p-[var(--space-8)] md:p-[var(--space-12)]">
              <span className={eyebrow}>Step {step.number}</span>
              <h3
                className={`${heading} mt-[var(--space-8)] text-[length:var(--text-3xl)] md:text-[length:var(--text-5xl)]`}
              >
                {step.title}
              </h3>
              <p className="mt-[var(--space-5)] max-w-[48ch] font-[family-name:var(--font-sans)] text-[17px] leading-[1.55] text-[var(--paper-200)]">
                {step.detail}
              </p>
            </div>
          )}
        />
      </section>

      <section
        aria-labelledby="activity-title"
        className="relative border-b border-[var(--rule-hairline)] pb-[var(--space-section)]"
      >
        <SectionRegister index={5} label="ACTIVITY" total={TOTAL} />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
          <h2
            className={`${heading} max-w-[16ch] text-[length:var(--text-4xl)] md:text-[length:var(--text-6xl)]`}
            id="activity-title"
          >
            Public GitHub activity
          </h2>
          <div className="mt-[var(--space-10)] overflow-x-auto border border-[var(--rule-default)] bg-[var(--ink-900)] p-[var(--space-6)]">
            <GithubCalendar
              colorSchema="red"
              data={githubActivity as GithubContributionData}
              shape="square"
              username={githubActivity.login}
              variant="minimal"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="background-title"
        className="relative pb-[var(--space-section)]"
      >
        <SectionRegister index={6} label="BACKGROUND" total={TOTAL} />
        <div className="mx-auto grid max-w-[var(--container-wide)] grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-[var(--space-10)] px-[var(--grid-margin)] pt-[calc(var(--space-section)*0.5)]">
          <h2
            className={`${heading} col-span-12 max-w-[14ch] text-[length:var(--text-4xl)] md:text-[length:var(--text-6xl)] lg:col-span-5`}
            id="background-title"
          >
            Where I&rsquo;m coming from
          </h2>
          <ol className="col-span-12 border-t border-[var(--rule-default)] lg:col-span-7">
            {timeline.map((item) => (
              <li
                className="flex flex-col justify-between gap-[var(--space-3)] border-b border-[var(--rule-default)] py-[var(--space-8)] sm:flex-row sm:items-baseline"
                key={item.title}
              >
                <div>
                  <h3 className={`${heading} text-[length:var(--text-2xl)]`}>
                    {item.title}
                  </h3>
                  <p className="mt-[var(--space-2)] max-w-[48ch] font-[family-name:var(--font-sans)] text-[15px] leading-[1.55] text-[var(--paper-200)]">
                    {item.detail}
                  </p>
                </div>
                <span className={`${eyebrow} sm:shrink-0 sm:text-right`}>
                  {item.period}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
