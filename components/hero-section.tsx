"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Clock, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { ContactConciergeButton } from "@/components/contact-concierge";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-68px)] overflow-hidden bg-ink lg:min-h-[860px] xl:min-h-[920px]"
    >
      <Image
        src="/assets/hero-bg.jpeg"
        alt="Blissful Puffs premium hookah rental setup in Cape Town"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.4) 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-68px)] max-w-7xl flex-col justify-end px-4 pb-10 pt-20 sm:px-6 sm:pb-14 lg:min-h-[860px] lg:px-8 xl:min-h-[920px]">
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="min-w-0 max-w-4xl w-full"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold sm:text-sm">
            Cape Town Premium Shisha / Hookah
          </p>
          <h1 className="mt-5 max-w-[22rem] font-serif text-5xl font-semibold leading-[0.98] text-white sm:max-w-4xl sm:text-7xl lg:text-8xl">
            Cape Town premium Hookah rental services.
          </h1>
          <p className="mt-6 max-w-[21rem] text-base leading-7 text-smoke sm:max-w-2xl sm:text-xl sm:leading-8">
            Full service luxury shisha / premium shisha delivered to your doorstep, villa, or event, ready in 45 minutes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <Link
                href="#catalog"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gold/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-gold/15 hover:shadow-[0_0_28px_rgba(212,175,55,0.2)] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink sm:w-auto"
              >
                Types & Prices List
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <ContactConciergeButton
                iconClassName="h-5 w-5 text-white"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-[#C5A059] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_44px_rgba(197,160,89,0.2)] transition hover:border-gold/80 hover:shadow-[0_0_28px_rgba(197,160,89,0.28)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink sm:w-auto"
              >
                Order Now
              </ContactConciergeButton>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="mt-12 grid w-full gap-3 border-t border-white/15 pt-5 sm:grid-cols-3 lg:max-w-3xl"
        >
          {[
            { label: "45-minute arrival window", icon: Clock },
            { label: "Delivery fee included", icon: ShieldCheck },
            { label: "Doorstep, villa, or event", icon: MapPin }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 text-sm font-medium text-white/88">
                <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
