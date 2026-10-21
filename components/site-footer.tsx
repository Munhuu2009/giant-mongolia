import Link from "next/link";
import Logo from "@/components/logo";
import NewsletterForm from "@/components/newsletter-form";
import { footerColumns, socials } from "@/data/footer";

export default function SiteFooter() {
  return (
    <footer className="site-footer panel-dark">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo inverted />
            <h2 className="type-headline footer-title">Stay in the ride</h2>
            <p className="type-lead mt-4">New arrivals, group rides, and service offers from Giant Mongolia.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-cols">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul className="mt-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>{`© ${new Date().getFullYear()} Giant Mongolia. Official Giant Bicycles retailer.`}</p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name} className="icon-btn">
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
