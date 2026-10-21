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
    <div className={["card", hoverEffect ? "card-hover" : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
