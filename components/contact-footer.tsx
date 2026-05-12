"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { FacebookBrandIcon, InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/brand-icons";
import { ContactConciergeButton } from "@/components/contact-concierge";
import { contactLines, emailAddress, emailComposeHref, socialLinks } from "@/components/data";
import { Reveal } from "@/components/reveal";

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "instagram") {
    return <InstagramBrandIcon className="h-5 w-5 text-gold/80" />;
  }

  return <FacebookBrandIcon className="h-5 w-5 text-gold/80" />;
}

export function ContactFooter() {
  return (
    <footer id="contact" className="bg-[#0B223D] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <div className="rounded-lg border border-gold/25 bg-ink px-5 py-10 text-center sm:px-10 lg:px-14">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact Us</p>
          <Link href="#top" className="mx-auto inline-flex flex-col items-center gap-4" aria-label="Back to Blissful Puffs home">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/50 bg-black">
              <Image src="/assets/logo.jpeg" alt="Blissful Puffs logo" fill sizes="64px" className="object-cover" />
            </span>
            <span>
              <span className="block font-serif text-3xl font-semibold leading-none text-white sm:text-4xl">
                Blissful Puffs
              </span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Premium Hookah Rental Services
              </span>
            </span>
          </Link>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-smoke">
            Cape Town premium Hookah rental services. Delivery is included in the listed price, with orders available
            from 8am to 23:00pm and pick up the following day by 11:30am.
          </p>

          <div className="mx-auto mt-9 grid max-w-xl gap-3">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <ContactConciergeButton
                iconClassName="h-5 w-5 text-white"
                className="flex w-full items-center justify-center gap-3 rounded-md border border-white/15 bg-[#C5A059] px-5 py-4 text-white shadow-[0_18px_44px_rgba(197,160,89,0.2)] transition hover:border-gold/80 hover:shadow-[0_0_28px_rgba(197,160,89,0.28)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink"
              >
                Order Now
              </ContactConciergeButton>
            </motion.div>

            <Link
              href={emailComposeHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Email Blissful Puffs with a prefilled booking request"
              className="flex min-w-0 items-center justify-center gap-3 rounded-md border border-white/10 bg-[#0B223D] p-4 text-white transition hover:border-gold/60"
            >
              <Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="min-w-0 break-all text-sm font-medium">{emailAddress}</span>
            </Link>

            {contactLines.map((line) => {
              return (
                <Link
                  key={line.label}
                  href={line.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-center justify-center gap-3 rounded-md border border-white/10 bg-[#0B223D] p-4 text-white transition hover:border-gold/60"
                >
                  <WhatsAppBrandIcon className="h-5 w-5 shrink-0 text-gold/80" />
                  <span className="text-sm font-semibold">{line.label}</span>
                  <span className="text-sm font-medium text-smoke/90">{line.display}</span>
                </Link>
              );
            })}

            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-md border border-white/10 bg-[#0B223D] p-4 text-white transition hover:border-gold/60"
              >
                <SocialIcon icon={social.icon} />
                <span className="text-sm font-semibold">{social.label}</span>
                <span className="text-sm text-smoke/80">{social.handle}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.18em] text-smoke/70 sm:flex-row sm:justify-between">
          <p>© 2026 Blissful Puffs. All rights reserved. Designed for the Discerning.</p>
          
        </div>
      </Reveal>
    </footer>
  );
}
