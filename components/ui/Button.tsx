import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode, Ref } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonTone = "dark" | "light";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonStatus = "idle" | "loading" | "success";

type VariantOptions = {
  variant?: ButtonVariant;
  /** `dark` = near-black button for light surfaces, `light` = warm-white button for dark surfaces. */
  tone?: ButtonTone;
  size?: ButtonSize;
  block?: boolean;
};

const boxSizes: Record<ButtonSize, string> = {
  sm: "h-10 gap-2.5 px-4 text-[11px]",
  md: "h-12 gap-3 px-6 text-xs",
  lg: "h-14 gap-3.5 px-8 text-xs",
};

const textSizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 text-[11px]",
  md: "h-11 gap-2.5 text-xs",
  lg: "h-12 gap-3 text-[13px]",
};

const toneClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    dark: "bg-neutral-900 text-white hover:bg-black",
    light: "bg-paper text-neutral-900 hover:bg-white",
  },
  secondary: {
    dark: "border border-neutral-900/55 text-neutral-900 before:bg-neutral-900 hover:border-neutral-900 hover:text-white",
    light: "border border-white/35 text-white before:bg-paper hover:border-paper hover:text-neutral-900",
  },
  text: {
    dark: "text-neutral-900",
    light: "text-white",
  },
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "overflow-hidden active:translate-y-px after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-snappy hover:after:scale-x-100",
  secondary:
    "overflow-hidden active:translate-y-px before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 before:ease-snappy hover:before:scale-y-100",
  text: "",
};

const baseClasses =
  "group/btn relative isolate inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-bold uppercase leading-none tracking-[0.16em] transition-[color,background-color,border-color,transform,opacity] duration-200 ease-snappy disabled:pointer-events-none";

export function buttonVariants({
  variant = "primary",
  tone = "dark",
  size = "md",
  block = false,
}: VariantOptions = {}): string {
  return cn(
    baseClasses,
    variant === "text" ? textSizes[size] : boxSizes[size],
    toneClasses[variant][tone],
    variantClasses[variant],
    block && "w-full",
  );
}

export function ArrowSwap({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex size-4 shrink-0 overflow-hidden", className)}>
      <ArrowRight
        strokeWidth={2}
        className="size-4 transition-transform duration-300 ease-snappy group-hover/btn:translate-x-full"
      />
      <ArrowRight
        strokeWidth={2}
        className="absolute inset-0 size-4 -translate-x-full text-accent transition-transform duration-300 ease-snappy group-hover/btn:translate-x-0"
      />
    </span>
  );
}

function Label({ variant, arrow, children }: { variant: ButtonVariant; arrow: boolean; children: ReactNode }) {
  if (variant === "text") {
    return (
      <>
        <span className="relative after:pointer-events-none after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-snappy group-hover/btn:after:origin-left group-hover/btn:after:scale-x-100">
          {children}
        </span>
        {arrow && (
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2}
            className="size-3.5 shrink-0 text-accent transition-transform duration-300 ease-snappy group-hover/btn:translate-x-1"
          />
        )}
      </>
    );
  }
  return (
    <>
      {children}
      {arrow && <ArrowSwap />}
    </>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantOptions & {
    arrow?: boolean;
    status?: ButtonStatus;
    successLabel?: ReactNode;
    loadingLabel?: string;
    ref?: Ref<HTMLButtonElement>;
  };

export function Button({
  variant = "primary",
  tone = "dark",
  size = "md",
  block,
  arrow = false,
  status = "idle",
  successLabel,
  loadingLabel = "Loading",
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const busy = status !== "idle";

  return (
    <button
      type={type}
      disabled={disabled || busy}
      aria-busy={status === "loading" || undefined}
      data-status={status}
      className={cn(buttonVariants({ variant, tone, size, block }), disabled && !busy && "opacity-40", className)}
      {...props}
    >
      {/* All states share one grid cell so the button keeps the width of its widest state. */}
      <span className="grid place-items-center gap-[inherit] *:[grid-area:1/1]">
        <span
          aria-hidden={busy || undefined}
          className={cn(
            "inline-flex items-center gap-[inherit] transition-[opacity,transform] duration-200 ease-snappy",
            busy && "-translate-y-1.5 opacity-0",
          )}
        >
          <Label variant={variant} arrow={arrow}>
            {children}
          </Label>
        </span>
        <span
          className={cn(
            "inline-flex transition-[opacity,transform] duration-200 ease-snappy",
            status === "loading" ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
        >
          <Spinner size={18} />
          {status === "loading" && <span className="sr-only">{loadingLabel}</span>}
        </span>
        {successLabel != null && (
          <span
            aria-hidden={status !== "success" || undefined}
            className={cn(
              "inline-flex items-center gap-2 transition-[opacity,transform] duration-300 ease-snappy",
              status === "success" ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
            )}
          >
            <Check aria-hidden="true" strokeWidth={2.5} className="size-4 text-accent" />
            {successLabel}
          </span>
        )}
      </span>
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & VariantOptions & { arrow?: boolean };

export function ButtonLink({
  variant = "primary",
  tone = "dark",
  size = "md",
  block,
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, tone, size, block }), className)} {...props}>
      <Label variant={variant} arrow={arrow}>
        {children}
      </Label>
    </Link>
  );
}

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  label: string;
  tone?: ButtonTone;
  shape?: "square" | "circle";
  size?: "sm" | "md";
  ref?: Ref<HTMLButtonElement>;
};

export function IconButton({
  label,
  tone = "dark",
  shape = "square",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "group/icon relative inline-flex shrink-0 cursor-pointer items-center justify-center transition-[color,background-color,border-color,transform] duration-200 ease-snappy active:scale-[0.94] disabled:pointer-events-none disabled:opacity-35",
        size === "md" ? "size-11" : "size-8",
        shape === "circle" && "rounded-full",
        tone === "dark"
          ? "text-neutral-900 hover:bg-neutral-900/[0.06]"
          : "text-white/85 hover:bg-white/[0.08] hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
