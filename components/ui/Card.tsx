import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export default function Card({
  hoverEffect = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 overflow-hidden ${
        hoverEffect
          ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}