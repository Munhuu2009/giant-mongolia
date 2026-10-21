"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { navItems } from "@/data/navigation";

function isActiveLink(href: string, pathname: string, discipline: string | null) {
  const [path, queryString] = href.split("?");
  const wantedDiscipline = new URLSearchParams(queryString).get("discipline");

  if (wantedDiscipline) {
    return pathname === "/bikes" && discipline === wantedDiscipline;
  }

  if (path === "/bikes") {
    return pathname.startsWith("/bikes") && discipline !== "ebike";
  }

  return pathname === path;
}

export default function SiteNavLinks({
  onNavigate,
  mobile = false,
}: {
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const discipline = searchParams.get("discipline");

  return (
    <ul>
      {navItems.map((item) => {
        const active = isActiveLink(item.href, pathname, discipline);
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={mobile ? (active ? "is-active" : undefined) : `nav-link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
