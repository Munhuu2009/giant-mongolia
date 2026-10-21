"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { useLanguage, type TranslationKey } from "@/components/language-provider";
import NewsletterForm from "@/components/newsletter-form";
import { footerColumns, socials } from "@/data/footer";
import { store } from "@/data/store";

const footerTranslations: Record<string, TranslationKey> = {
  Shop: "footer.shop",
  Services: "footer.services",
  "Giant Mongolia": "footer.giant",
  Customer: "footer.customer",
  Road: "footer.road",
  Gear: "footer.gear",
  Mountain: "footer.mountain",
  "E-Bikes": "footer.ebikes",
  Gravel: "footer.gravel",
  City: "footer.city",
  Kids: "footer.kids",
  "Bike Fitting": "footer.bikeFitting",
  "Service & Repair": "footer.serviceRepair",
  "Test Rides": "footer.testRides",
  Warranty: "footer.warranty",
  "About Us": "footer.about",
  "Flagship Store": "footer.flagship",
  "Group Rides": "footer.groupRides",
  Careers: "footer.careers",
  Contact: "footer.contact",
  Shipping: "footer.shipping",
  Returns: "footer.returns",
  FAQ: "footer.faq",
};

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer panel-dark">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo inverted />
            <h2 className="type-headline footer-title">{t("footer.stay")}</h2>
            <p className="type-lead mt-4">{t("footer.description")}</p>
            <address className="footer-store-details">
              <span>{t("store.address")}: {store.address.join(" ")}</span>
              <span>
                {t("store.phone")}: <a href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a>
              </span>
              <span>{t("store.hours")}: {t("store.weekdays")}</span>
              <span>{t("store.hours")}: {t("store.weekends")}</span>
            </address>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-cols">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={t(footerTranslations[col.title])}>
              <h3>{t(footerTranslations[col.title])}</h3>
              <ul className="mt-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {t(footerTranslations[link.label])}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>{`© ${new Date().getFullYear()} Giant Mongolia. ${t("footer.official")}`}</p>
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
