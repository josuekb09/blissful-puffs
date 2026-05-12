"use client";

import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Headphones, PhoneCall, X } from "lucide-react";
import { WhatsAppBrandIcon } from "@/components/brand-icons";
import { contactLines } from "@/components/data";

type ContactConciergeButtonProps = {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  children?: ReactNode;
  ariaLabel?: string;
  showArrow?: boolean;
};

export function ContactConciergeButton({
  className = "",
  iconClassName = "h-5 w-5",
  labelClassName = "",
  children = "Order Now",
  ariaLabel = "Open Blissful Puffs contact us concierge",
  showArrow = false
}: ContactConciergeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const dialog = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close WhatsApp number chooser"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 18, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-gold/30 bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-luxury-line" aria-hidden="true" />
            <button
              type="button"
              aria-label="Close WhatsApp number chooser"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-smoke transition hover:border-gold/60 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="overflow-y-auto p-5 luxury-scrollbar sm:p-7">
              <div className="pr-12">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-gold/35 bg-gold/10 text-gold">
                  <Headphones className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-gold">WhatsApp Order</p>
                <h2 id={titleId} className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Choose a WhatsApp number.
                </h2>
                <p className="mt-3 text-base leading-7 text-smoke">
                  Tap Main Number or Alternative Number and WhatsApp will open with that number.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                {contactLines.map((line) => {
                  return (
                    <Link
                      key={line.label}
                      href={line.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="group flex min-h-32 rounded-lg border border-white/10 bg-[#0B223D] p-5 text-left transition hover:border-gold/70 hover:bg-[#103052] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/30 text-gold">
                        <WhatsAppBrandIcon className="h-6 w-6" />
                      </span>
                      <span className="ml-4 min-w-0 flex-1">
                        <span className="block text-xl font-semibold text-white">{line.label}</span>
                        <span className="mt-2 flex items-center gap-2 text-base font-semibold text-gold">
                          <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {line.display}
                        </span>
                        <span className="mt-3 block text-sm leading-6 text-smoke">{line.copy}</span>
                      </span>
                      <ArrowUpRight className="ml-3 h-5 w-5 shrink-0 text-smoke transition group-hover:text-gold" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button type="button" aria-label={ariaLabel} onClick={() => setIsOpen(true)} className={className}>
        <WhatsAppBrandIcon className={iconClassName} />
        <span className={labelClassName}>{children}</span>
        {showArrow ? <ArrowUpRight className="hidden h-4 w-4 sm:block" aria-hidden="true" /> : null}
      </button>

      {isMounted ? createPortal(dialog, document.body) : null}
    </>
  );
}
