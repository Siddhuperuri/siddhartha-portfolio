# Module 2: Design Language

## Intent

This system turns the approved "editorial technical journal" direction into durable tokens. It is deliberately compact: a small vocabulary, semantic names, and strict usage rules prevent visual drift as later modules add components and case-study content.

## Token source

All production tokens live in `styles/design-tokens.css`. The future application imports that file once from its global stylesheet. Components consume semantic tokens, never raw colour literals or bespoke transition curves.

## Colour and dark theme

The launch theme is dark-only. `--ink-*` and `--paper-*` are foundational scales; component and page code must use semantic aliases such as `--surface`, `--text-primary`, `--border-default`, and `--accent`.

| Token family | Role | Rule |
| --- | --- | --- |
| `--background`, `--surface*` | Canvas and layers | Hierarchy comes from the black → warm-black → deep-brown ramp (`--ink-950` through `--ink-800`), not flat blocks. |
| `--text-*` | Content legibility | `primary` for essential content, `secondary` for supporting copy, `tertiary` for metadata only. |
| `--accent*` | State and emphasis | Amber/burnt-orange is reserved for action, active state, selected data, and limited key emphasis. |
| `--border-*` | Separation | Borders are quiet structure, not decoration. |
| `--success`, `--warning`, `--danger` | Status only | Never repurpose as brand colours. |

## Typography

`--font-display` is reserved for hero/display copy and uses a bold, compact voice. `--font-sans` is the default reading type. `--font-mono` is for short labels, technical metadata, and code-like values. The future app must load the selected fonts through `next/font` and map them to these variables.

| Role | Tokens | Rule |
| --- | --- | --- |
| Display | `--text-display`, `--leading-display`, `--tracking-display` | Short statements only; no long paragraphs or all-caps paragraphs. |
| Headings | `--text-3xl` to `--text-7xl` | Use sentence case and a clear hierarchy. |
| Body | `--text-base`, `--leading-body`, `--tracking-body` | Default minimum for substantial reading content. |
| Supporting | `--text-sm`, `--text-xs` | Metadata and compact controls only; never critical long-form text below 14px. |

## Spacing, grid, and layout

Use the 4px-derived spacing scale. Spacing communicates hierarchy before decoration. `--space-section` creates predictable editorial rhythm between major blocks.

- Desktop grid: 12 columns, `--grid-gutter`, and `--grid-margin`.
- Primary content: `--container-content` (1200px maximum).
- Visual/hero media: `--container-wide` (1440px maximum).
- Long-form reading: `--container-reading` (736px maximum).
- Never allow text blocks to stretch to the visual container without a reading-width constraint.
- Later components may span 3, 4, 6, 8, 9, or 12 grid columns; avoid arbitrary spans that weaken alignment.

## Radius, elevation, glass, lighting, and texture

| System | Tokens | Rule |
| --- | --- | --- |
| Radius | `--radius-xs` through `--radius-2xl` | Use `md` for controls, `lg` for cards, `xl`+ only for large media surfaces. |
| Elevation | `--shadow-1` through `--shadow-3` | Elevation is rare in the dark system; use borders first. |
| Glass | `--glass-*` | Restrict to floating controls, small overlays, and temporary contextual surfaces. Always retain a solid fallback. |
| Lighting | `--light-*`, `--shadow-glow` | Ambient amber lighting may support a focal interaction; never use it behind body copy. |
| Texture | `--texture-grid`, `--texture-dot` | Grid/dot texture must be CSS-generated, low contrast, and removable without content loss. |

Glass must maintain a clear boundary, text contrast, and adequate backing colour. Backdrop blur is an enhancement—not a requirement for meaning or readability.

## Motion and animation

The token set standardises duration, easing, and the only allowed common transforms. Use `--ease-standard` for micro-interactions, `--ease-emphasized` for entrance/reveal choreography, `--ease-enter` for entering overlays, and `--ease-exit` for dismissal.

- Animate opacity and transform before properties that cause layout or paint work.
- Use `--duration-fast` for button/icon feedback and `--duration-base` for component state changes.
- Use `--duration-slow` or slower only for intentional section choreography.
- Hover lift is limited to `--motion-hover-lift`; press feedback is limited to `--motion-press`.
- Do not animate on initial paint if it delays comprehension.
- The supplied reduced-motion rule makes transitions effectively instant. Later JavaScript animation must additionally respect the same preference.

## Component tokens and interaction rules

All interactive controls use `--control-height-*`, `--control-padding-x-*`, `--radius-md`, semantic surface/text/border tokens, and the shared focus ring. Later component work will add component-specific aliases only when a real reusable primitive requires them.

- Rest: semantic surface and text; border provides structure.
- Hover: use a modest surface/border shift or the shared lift, not both by default.
- Active: use `--accent-active` only for selected/active meaning; press feedback is scale-based.
- Focus: `:focus-visible` ring is mandatory and must never be removed.
- Disabled: use `--text-disabled` and prevent hover/lift; preserve readable contrast.

## Icon rules

- Use Lucide React icons only unless a project asset itself is the subject.
- Default stroke width: 1.75; use 2 only at small sizes where legibility requires it.
- Icon size follows `--icon-*`; pair icon and text with `--space-2` gap.
- Decorative icons are `aria-hidden`; icon-only controls require an accessible name.
- Do not use icons to replace labels for unfamiliar actions.

## Accessibility requirements

1. Maintain WCAG 2.2 AA contrast: 4.5:1 for normal text and 3:1 for large text, UI boundaries, and focus indicators.
2. Preserve native semantics and keyboard operation; no pointer-only interactions.
3. Keep target size at least 44px for primary interactive controls, using surrounding hit area when visual height is smaller.
4. Never communicate state with colour, motion, blur, or position alone.
5. Respect `prefers-reduced-motion`; every animated explanation needs a static equivalent.
6. Keep selection, focus, scrollbar, and native text behaviours usable; no cursor replacements or scrolljacking.
7. Test forced-colors mode before release; decorative borders/effects may disappear, but content and control boundaries must remain discernible.

## Validation checklist for later modules

- No hard-coded colours, font sizes, radii, shadow values, durations, or easing curves in reusable components.
- Every component uses semantic token aliases and has default/hover/active/focus/disabled behaviour where applicable.
- Dynamic effects have a static, readable fallback.
- Typography, spacing, and grid alignment remain coherent at the documented desktop QA widths.
