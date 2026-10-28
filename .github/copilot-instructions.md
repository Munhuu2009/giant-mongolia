# Giant Mongolia — Copilot Rules & Guidelines

## Core Stack
- Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion, Zustand, React Three Fiber (R3F).

## Token Savings & Response Efficiency (STRICT)
- DO NOT summarize code back to me, provide conversational preamble ("Sure, I can help with that!"), or write post-code explanations unless explicitly asked.
- Output direct code blocks or concise diffs only.
- If fixing an error, explain the cause in 1 sentence max, followed immediately by code.
- Avoid introducing unnecessary third-party packages or extra abstractions.

## Architecture & Code Standards
- Keep components modular in `components/ui` or `components/layout`.
- TypeScript: Maintain strict types; never use `any`.
- Styling: Use Tailwind CSS utilities. Respect existing design tokens in `globals.css`.
- State Management: Use Zustand for client state (e.g., cart, UI drawers, active language).