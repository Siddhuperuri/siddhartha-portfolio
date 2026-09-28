"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { contactDetails, engagementTypes, projectTypes } from "@/content/contact";

const contactFormSchema = z.object({
  company: z.string().max(120).optional(),
  consent: z.literal(true, { message: "Please agree to the privacy policy." }),
  email: z.email("Enter an email address I can reply to."),
  engagement: z.enum(engagementTypes),
  message: z.string().min(12, "A sentence or two about the problem is enough."),
  name: z.string().min(2, "Please add your name."),
  projectType: z.enum(projectTypes),
  timeline: z.string().max(120).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ROW = "border-t border-[rgba(10,10,10,0.16)] md:grid md:grid-cols-[minmax(0,13rem)_1fr] md:items-baseline";
const LABEL =
  "block pt-[var(--space-5)] font-[family-name:var(--font-sans)] text-[15px] leading-[1.3] text-[var(--ink-950)] md:pb-[var(--space-5)]";
const FIELD =
  "w-full bg-transparent pb-[var(--space-5)] pt-[var(--space-2)] font-[family-name:var(--font-sans)] text-[15px] leading-[1.4] text-[var(--ink-950)] outline-none placeholder:text-[rgba(10,10,10,0.34)] focus-visible:ring-0 md:pt-[var(--space-5)]";
const ERROR =
  "block pb-[var(--space-4)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--red-600)]";

/**
 * Composes the answers into a message body. The site has no mail backend, so
 * submitting hands the finished text to the visitor's own mail client rather
 * than posting it somewhere it would be silently dropped — a form that
 * pretends to send is worse than one that is honest about the handoff.
 */
function composeMail(values: ContactFormValues) {
  const lines = [
    `Name: ${values.name}`,
    values.company ? `Company: ${values.company}` : null,
    `Email: ${values.email}`,
    `Project type: ${values.projectType}`,
    `Engagement: ${values.engagement}`,
    values.timeline ? `Timeline: ${values.timeline}` : null,
    "",
    values.message,
  ].filter((line): line is string => line !== null);

  const subject = `${values.engagement} — ${values.projectType}`;
  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

function SelectChevron() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-[rgba(10,10,10,0.55)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactForm() {
  const [handedOff, setHandedOff] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ContactFormValues>({
    defaultValues: {
      company: "",
      engagement: engagementTypes[0],
      message: "",
      name: "",
      projectType: projectTypes[0],
      timeline: "",
    },
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    // `assign`, not `location.href = …`: the compiler's immutability rule
    // reads the property write as mutating module-scope state.
    window.location.assign(composeMail(values));
    setHandedOff(true);
  };

  return (
    <form className="w-full" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-name">
          Name
        </label>
        <div>
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={FIELD}
            id="contact-name"
            type="text"
            {...register("name")}
          />
          {errors.name ? <span className={ERROR}>{errors.name.message}</span> : null}
        </div>
      </div>

      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-company">
          Company <span className="text-[rgba(10,10,10,0.4)]">(optional)</span>
        </label>
        <input
          autoComplete="organization"
          className={FIELD}
          id="contact-company"
          type="text"
          {...register("company")}
        />
      </div>

      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-email">
          Email
        </label>
        <div>
          <input
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={FIELD}
            id="contact-email"
            type="email"
            {...register("email")}
          />
          {errors.email ? <span className={ERROR}>{errors.email.message}</span> : null}
        </div>
      </div>

      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-project-type">
          Project type
        </label>
        <div className="relative">
          <select className={`${FIELD} appearance-none pr-8`} id="contact-project-type" {...register("projectType")}>
            {projectTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      </div>

      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-engagement">
          Engagement
        </label>
        <div className="relative">
          <select className={`${FIELD} appearance-none pr-8`} id="contact-engagement" {...register("engagement")}>
            {engagementTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <SelectChevron />
        </div>
      </div>

      <div className={ROW}>
        <label className={LABEL} htmlFor="contact-timeline">
          Timeline <span className="text-[rgba(10,10,10,0.4)]">(rough dates are fine)</span>
        </label>
        <input className={FIELD} id="contact-timeline" type="text" {...register("timeline")} />
      </div>

      <div className={`${ROW} md:items-start`}>
        <label className={LABEL} htmlFor="contact-message">
          Message
        </label>
        <div>
          <textarea
            aria-invalid={Boolean(errors.message)}
            className={`${FIELD} min-h-[7rem] resize-y`}
            id="contact-message"
            rows={4}
            {...register("message")}
          />
          {errors.message ? <span className={ERROR}>{errors.message.message}</span> : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[var(--space-6)] border-t border-[rgba(10,10,10,0.16)] pt-[var(--space-6)]">
        <div>
          <label className="flex items-center gap-[var(--space-3)] font-[family-name:var(--font-sans)] text-[13px] text-[rgba(10,10,10,0.72)]">
            <input
              aria-invalid={Boolean(errors.consent)}
              className="size-4 shrink-0 accent-[var(--red-500)]"
              type="checkbox"
              {...register("consent")}
            />
            <span>
              I agree with the{" "}
              <a className="underline underline-offset-4" href="/privacy-policy">
                privacy policy
              </a>
            </span>
          </label>
          {errors.consent ? <span className={`${ERROR} pt-[var(--space-2)]`}>{errors.consent.message}</span> : null}
        </div>

        <button
          className="inline-flex items-center gap-[var(--space-2)] bg-[var(--ink-950)] px-[var(--space-6)] py-[var(--space-3)] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-eyebrow)] text-[var(--paper-100)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--red-500)] hover:text-[var(--ink-950)] disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          <span aria-hidden className="inline-block size-1.5 rounded-full bg-[var(--red-500)]" />
          Submit form
        </button>
      </div>

      <p
        aria-live="polite"
        className="pt-[var(--space-5)] font-[family-name:var(--font-mono)] text-[10px] uppercase leading-[1.8] tracking-[var(--tracking-eyebrow)] text-[rgba(10,10,10,0.52)]"
      >
        {handedOff
          ? "Your mail client should have opened with the message ready to send."
          : `Submitting opens your mail client, addressed to ${contactDetails.email}.`}
      </p>
    </form>
  );
}
