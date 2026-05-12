import { damageCharges, deliveryReturns, extras, products } from "@/components/data";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export function CollectionSection() {
  return (
    <section id="catalog" className="bg-ink px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold sm:text-sm">
              List of Products
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Types of Hookah pipes and prices list.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-smoke">
            Service per day. Price is inclusive of the delivery fee.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.title} delay={index * 0.08} className="h-full">
              <ProductCard product={product} priority={index === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr_0.9fr]">
          <Reveal>
            <section className="h-full rounded-lg border border-white/10 bg-[#0B223D] p-6">
              <h3 className="text-xl font-semibold text-white">Extras</h3>
              <div className="mt-5 grid gap-3">
                {extras.map((extra) => (
                  <div key={extra.item} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-white">{extra.item}</p>
                      <p className="mt-1 text-sm text-smoke/80">{extra.detail}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-gold">{extra.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section className="h-full rounded-lg border border-white/10 bg-[#0B223D] p-6">
              <h3 className="text-xl font-semibold text-white">Damages/Loss Charges</h3>
              <div className="mt-5 grid gap-4">
                {damageCharges.map((charge) => (
                  <div key={charge.items} className="grid gap-2 border-b border-white/10 pb-4 last:border-0 last:pb-0 sm:grid-cols-[1fr_auto]">
                    <p className="text-sm leading-7 text-smoke">{charge.items}</p>
                    <p className="font-semibold text-gold sm:text-right">{charge.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.16}>
            <section className="h-full rounded-lg border border-white/10 bg-[#0B223D] p-6">
              <h3 className="text-xl font-semibold text-white">Delivery & Returns</h3>
              <ul className="mt-5 grid gap-3">
                {deliveryReturns.map((item) => (
                  <li key={item} className="border-b border-white/10 pb-3 text-sm leading-7 text-smoke last:border-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
