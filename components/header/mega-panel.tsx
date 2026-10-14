"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FadeImage } from "@/components/ui/fade-image";
import type { MegaMenu } from "@/data/catalog";
import { easeExit, easeSnappy } from "@/lib/cn";

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: easeSnappy, staggerChildren: 0.04, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: easeExit } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeSnappy } },
};

export default function MegaPanel({
  menu,
  label,
  onNavigate,
}: {
  menu: MegaMenu;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={`nav-panel-${menu.id}`}
      role="region"
      aria-labelledby={`nav-trigger-${menu.id}`}
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute inset-x-0 top-full border-b border-white/10 bg-ink text-white shadow-[0_32px_48px_-32px_rgba(0,0,0,0.7)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-10 gap-y-8 px-8 pb-8 pt-9">
        <div className="col-span-8 grid grid-cols-4 gap-8">
          {menu.columns.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <p className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                <span aria-hidden="true" className="h-px w-4 bg-accent" />
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group/ml flex items-center gap-2 py-2 text-[15px] font-medium leading-tight text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      <span className="transition-transform duration-300 ease-snappy group-hover/ml:translate-x-1">
                        {link.label}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-300 ease-snappy group-hover/ml:translate-x-0.5 group-hover/ml:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="col-span-4">
          <Link
            href={menu.feature.href}
            onClick={onNavigate}
            className="group/feat relative block aspect-[16/11] overflow-hidden bg-white/5"
          >
            <FadeImage
              src={menu.feature.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 400px, 33vw"
              skeletonTone="dark"
              className="object-cover group-hover/feat:scale-[1.04]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  {menu.feature.eyebrow}
                </span>
                <span className="mt-2 block text-2xl font-black uppercase leading-none tracking-tight">
                  {menu.feature.title}
                </span>
                <span className="mt-2 block text-sm leading-snug text-white/65">{menu.feature.description}</span>
              </span>
              <span className="cut-corner flex size-10 shrink-0 items-center justify-center bg-paper text-neutral-900 transition-colors duration-200 group-hover/feat:bg-accent group-hover/feat:text-white">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-snappy group-hover/feat:-translate-y-0.5 group-hover/feat:translate-x-0.5"
                />
              </span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-12 flex items-center justify-between border-t border-white/10 pt-5"
        >
          <ButtonLink href={menu.allHref} onClick={onNavigate} variant="text" tone="light" size="sm" arrow>
            {`Shop all ${label}`}
          </ButtonLink>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Test rides at our Ulaanbaatar flagship
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
