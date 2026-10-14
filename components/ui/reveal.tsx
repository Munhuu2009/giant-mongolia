"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeSnappy } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: easeSnappy, delay }}
    >
      {children}
    </motion.div>
  );
}
