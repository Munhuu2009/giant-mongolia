import Link from "next/link";
import { type ButtonHTMLAttributes, type ComponentProps, forwardRef } from "react";

// primary / secondary / ghost are solid. glass* are for use on top of photos only.
export type ButtonVariant = "primary" | "secondary" | "ghost" | "glass" | "glass-strong";
export type ButtonSize = "sm" | "md" | "lg";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClasses({ variant = "primary", size = "md", className = "" }: StyleProps = {}) {
  return ["btn", `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyleProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, type = "button", ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={buttonClasses({ variant, size, className })} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & StyleProps;

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
