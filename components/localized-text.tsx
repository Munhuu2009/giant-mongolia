"use client";

import type { ElementType } from "react";
import { useLanguage } from "@/components/language-provider";

type LocalizedTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

export default function LocalizedText({
  text,
  as: Tag = "span",
  className,
}: LocalizedTextProps) {
  const { translate } = useLanguage();
  return <Tag className={className}>{translate(text)}</Tag>;
}
