"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { ContactConciergeButton } from "@/components/contact-concierge";

type ProductCardProps = {
  product: {
    title: string;
    price: string;
    billing: string;
    description: string;
    image: string;
    specs: readonly string[];
  };
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0B223D]"
    >
      <div className="relative aspect-video overflow-hidden bg-black sm:aspect-[5/4] lg:aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Premium Hookah</p>
            <h3 className="mt-2 break-words text-2xl font-semibold leading-tight text-white">{product.title}</h3>
          </div>
          <div className="w-full shrink-0 text-left">
            <p className="whitespace-normal text-2xl font-semibold leading-tight text-gold">{product.price}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-smoke">{product.billing}</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-smoke">{product.description}</p>

        <ul className="mt-5 grid gap-3">
          {product.specs.map((spec) => (
            <li key={spec} className="flex items-center gap-3 text-sm text-white/86">
              <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: "easeOut" }} className="mt-auto pt-6">
          <ContactConciergeButton
            iconClassName="h-4 w-4 text-white"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-[#C5A059] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(197,160,89,0.2)] transition hover:border-gold/80 hover:shadow-[0_0_28px_rgba(197,160,89,0.28)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink"
          >
            Order Now
          </ContactConciergeButton>
        </motion.div>
      </div>
    </motion.article>
  );
}
