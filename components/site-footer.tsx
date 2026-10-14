import Link from "next/link";
import Logo from "@/components/logo";
import NewsletterForm from "@/components/newsletter-form";

const columns = [
  { title: "Shop", links: ["Road", "Mountain", "E-Bikes", "Gravel", "City", "Kids", "Gear"] },
  { title: "Services", links: ["Bike Fitting", "Service & Repair", "Test Rides", "Warranty"] },
  { title: "Giant Mongolia", links: ["About Us", "Flagship Store", "Group Rides", "Careers"] },
  { title: "Customer", links: ["Contact", "Shipping", "Returns", "FAQ"] },
];

const socials = [
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z",
  },
  {
    name: "Facebook",
    href: "#",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z",
  },
  {
    name: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 border-b border-neutral-800 pb-14 lg:grid-cols-2 lg:items-end">
          <div>
            <Logo inverted />
            <h2 className="mt-8 text-3xl font-black uppercase leading-none tracking-tighter md:text-4xl">
              Stay in the ride<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-neutral-400">
              New arrivals, group rides, and service offers from Giant Mongolia.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">{col.title}</h3>
              <ul className="mt-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="flex min-h-10 items-center text-sm text-neutral-300 transition-colors hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-6 border-t border-neutral-800 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-neutral-500">
            {`© ${new Date().getFullYear()} Giant Mongolia. Official Giant Bicycles retailer.`}
          </p>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center border border-neutral-800 text-neutral-300 transition-colors hover:border-white hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
