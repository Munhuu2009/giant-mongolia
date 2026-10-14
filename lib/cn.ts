export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const easeSnappy = [0.22, 1, 0.36, 1] as const;
export const easeExit = [0.4, 0, 1, 1] as const;
