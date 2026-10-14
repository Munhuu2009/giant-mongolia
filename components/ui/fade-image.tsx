"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

type FadeImageProps = ImageProps & { skeletonTone?: "light" | "dark" };

/** next/image that shows a shimmer until the real image has decoded, then fades it in. Use with `fill`. */
export function FadeImage({ className, onLoad, skeletonTone = "light", alt, ...props }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton tone={skeletonTone} className="absolute inset-0" />}
      <Image
        alt={alt}
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        data-loaded={loaded}
        className={cn(
          "transition-[opacity,transform] duration-700 ease-snappy",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
}
