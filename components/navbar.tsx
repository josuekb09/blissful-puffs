"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContactConciergeButton } from "@/components/contact-concierge";
import { navLinks } from "@/components/data";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink/95 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#top" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none" aria-label="Blissful Puffs home">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-black sm:h-11 sm:w-11">
            <Image
              src="/assets/logo.jpeg"
              alt="Blissful Puffs logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="min-w-0 max-w-[10.5rem] sm:max-w-none">
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-white sm:text-base sm:tracking-[0.18em]">
              Blissful Puffs
            </span>
            <span className="mt-0.5 block truncate text-[9px] uppercase tracking-[0.12em] text-gold sm:mt-1 sm:text-[11px] sm:tracking-[0.2em]">
              Hookah Rental Services
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-smoke transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }} className="hidden sm:block">
            <Link
              href="#catalog"
              className="inline-flex rounded-md border border-gold/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gold/10 hover:shadow-[0_0_22px_rgba(212,175,55,0.18)]"
            >
              Price List
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <ContactConciergeButton
              ariaLabel="Order Blissful Puffs premium hookah via WhatsApp"
              iconClassName="h-4 w-4 text-white"
              labelClassName="hidden sm:inline"
              showArrow
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-[#C5A059] text-sm font-semibold text-white shadow-[0_18px_44px_rgba(197,160,89,0.2)] transition hover:border-gold/80 hover:shadow-[0_0_24px_rgba(197,160,89,0.26)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5"
            >
              Order Now
            </ContactConciergeButton>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
}
