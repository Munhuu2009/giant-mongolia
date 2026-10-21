import Image from "next/image";

type LogoProps = { inverted?: boolean; className?: string };

// Set width and height to your logo's real shape (for example 160 x 40 for a 4:1 logo).
// The className controls how big it is on screen.
export default function Logo({ inverted = false, className }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Giant Mongolia"
      width={160}
      height={40}
      priority
      className={`${className ?? "h-8 w-auto md:h-10"} ${inverted ? "brightness-0 invert" : ""}`}
    />
  );
}

export { Logo };