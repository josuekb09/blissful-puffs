"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Gem, Mail, RefreshCw, Send, Sparkles, X } from "lucide-react";
import { WhatsAppBrandIcon } from "@/components/brand-icons";
import { contactLines, emailAddress, emailComposeHref, products, socialLinks } from "@/components/data";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const assistantName = "Puff Concierge";
const longChatThreshold = 9;

const starterMessage =
  "Hi, I am Puff Concierge, your Blissful Puffs hookah rental guide. Tell me your location, date, time, or preferred setup and I will help you choose the right option.";

const outOfScopeMessage =
  "Puff Concierge is focused on Blissful Puffs only. Ask me about bookings, prices, products, delivery, extras, damages, or contact details.";

const quickQuestions = [
  "What are your prices?",
  "What is included with R450?",
  "Main or alternative number?",
  "What time do you deliver?"
] as const;

const bookingDetails = ["name", "location", "date and time", "preferred setup"] as const;

const businessTerms = [
  "about",
  "blissful",
  "puffs",
  "shisha",
  "hookah",
  "pipe",
  "pipes",
  "booking",
  "book",
  "order",
  "quote",
  "price",
  "cost",
  "included",
  "deliver",
  "delivery",
  "setup",
  "set up",
  "event",
  "party",
  "birthday",
  "wedding",
  "corporate",
  "villa",
  "yacht",
  "rooftop",
  "apartment",
  "airbnb",
  "hotel",
  "cape town",
  "clean",
  "cleaning",
  "hygiene",
  "sealed",
  "whatsapp",
  "email",
  "contact",
  "support",
  "sales",
  "flavour",
  "flavor",
  "blend",
  "nicotine",
  "business",
  "service",
  "catalog",
  "catalogue",
  "guest",
  "guests",
  "people",
  "pax",
  "recommend",
  "best",
  "payment",
  "deposit",
  "cash",
  "eft",
  "card",
  "charcoal",
  "coal",
  "hose",
  "mouthpiece"
];

function createInitialMessages(): ChatMessage[] {
  return [
    {
      id: 1,
      role: "assistant",
      text: starterMessage
    }
  ];
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function hasGreeting(value: string) {
  return /(^|\s)(hello|hi|hey)([\s.!?]|$)/.test(value) || includesAny(value, [
    "good morning",
    "good afternoon",
    "good evening"
  ]);
}

function productSummary() {
  return products.map((product) => `${product.title}: ${product.price} (${product.billing}).`).join("\n");
}

function contactSummary() {
  return contactLines.map((line) => `${line.label}: ${line.display} - ${line.copy}`).join("\n");
}

function bookingChecklist() {
  return bookingDetails.map((detail) => `- ${detail}`).join("\n");
}

function getGuestCount(value: string) {
  const directMatch = value.match(/(\d{1,3})\s*(guests?|people|persons?|pax|friends|clients|attendees)/);

  if (directMatch) {
    return Number(directMatch[1]);
  }

  if (includesAny(value, ["guest", "guests", "people", "pax", "event", "party", "booking"])) {
    const forMatch = value.match(/for\s+(\d{1,3})/);
    return forMatch ? Number(forMatch[1]) : null;
  }

  return null;
}

function setupRecommendationForGuests(guestCount: number) {
  if (guestCount <= 4) {
    return `For ${guestCount} guests, one premium 1 pipe hookah should feel comfortable. Choose the R450 package if you want charcoal, flavours, mouth pieces, and tongs included.`;
  }

  if (guestCount <= 10) {
    return `For ${guestCount} guests, the premium 2 pipe hookah option is smoother for sharing. Choose the R500 package if you want charcoal, flavours, mouth pieces, and tongs included.`;
  }

  if (guestCount <= 18) {
    return `For ${guestCount} guests, ask the team whether you should book more than one setup. Send the location, date, time, and how many people will be sharing.`;
  }

  return `For ${guestCount} guests, ask for a custom event quote. The team can help plan multiple hookah setups and delivery timing.`;
}

function getAssistantReply(question: string) {
  const normalized = question.toLowerCase().trim();
  const guestCount = getGuestCount(normalized);

  if (!normalized) {
    return "Ask me a Blissful Puffs question and I will point you in the right direction.";
  }

  if (hasGreeting(normalized) && normalized.length < 18) {
    return "Hello. I can help you choose a setup, check what details to send for a quote, or find the best contact us line for Blissful Puffs.";
  }

  if (includesAny(normalized, ["new chat", "start over", "reset chat", "clear chat"])) {
    return "Use the New chat button at the top of this panel when the conversation gets long. I will reset the thread and keep the first welcome message.";
  }

  if (guestCount !== null && guestCount > 0) {
    return `${setupRecommendationForGuests(guestCount)}\n\nFor a quote, send:\n${bookingChecklist()}`;
  }

  if (includesAny(normalized, ["r450", "450", "r500", "500", "included", "include", "package"])) {
    return "The R450 package includes 1 premium hookah pipe, 8 charcoal, 4 flavours, 2 mouth pieces, and 1 pair of tongs. The R500 package includes the same extras with 2 premium hookah pipes.";
  }

  if (
    includesAny(normalized, ["recommend", "best", "which", "choose", "difference", "compare", "what should i book"]) &&
    includesAny(normalized, ["signature", "crystal", "setup", "pipe", "option", "book"])
  ) {
    return "Choose 1 pipe for a smaller booking and 2 pipes when more people will share. The package options include 8 charcoal, 4 flavours, 2 mouth pieces, and 1 pair of tongs.";
  }

  if (includesAny(normalized, ["about", "who are you", "what do you do", "company", "business"])) {
    return "Blissful Puffs offers Cape Town premium Hookah rental services. The team delivers premium shisha / hookah setups to your doorstep, villa, or event.";
  }

  if (
    includesAny(normalized, [
      "price",
      "prices",
      "pricing",
      "cost",
      "how much",
      "rate",
      "rates",
      "fee",
      "fees"
    ])
  ) {
    return `Our listed hookah rental options are:\n${productSummary()}\n\nDelivery fee is included in the listed price. For the best quote, send:\n${bookingChecklist()}`;
  }

  if (
    includesAny(normalized, [
      "book",
      "booking",
      "order",
      "reserve",
      "quote",
      "hire",
      "rent",
      "available",
      "availability"
    ])
  ) {
    return `To book, send Blissful Puffs:\n${bookingChecklist()}\n\nMain Number is best for new orders and quotes. Alternative Number is useful when you want backup help, timing, setup coordination, or event support.`;
  }

  if (
    includesAny(normalized, [
      "deliver",
      "delivery",
      "location",
      "area",
      "where",
      "cape town",
      "apartment",
      "home",
      "hotel",
      "airbnb",
      "rooftop",
      "villa",
      "yacht"
    ])
  ) {
    return "Blissful Puffs delivers premium shisha / hookah around Cape Town to homes, villas, and events. Delivery is included in the listed price. Send your exact location so the team can confirm timing.";
  }

  if (
    includesAny(normalized, [
      "time",
      "arrival",
      "arrive",
      "ready",
      "setup time",
      "how long",
      "duration",
      "schedule",
      "hours",
      "open",
      "closed"
    ])
  ) {
    return "Deliveries run from 8am to 23:00pm, with pick up the following day by 11:30am. The homepage advertises delivery ready in 45 minutes.";
  }

  if (
    includesAny(normalized, [
      "clean",
      "cleaned",
      "cleaning",
      "hygiene",
      "safe",
      "safety",
      "sealed",
      "sanitized",
      "sanitised",
      "hose",
      "mouthpiece"
    ])
  ) {
    return "Each hookah setup is prepared and checked before dispatch. Extra mouth pieces are also available at R30 for 4 pieces.";
  }

  if (
    includesAny(normalized, [
      "event",
      "events",
      "party",
      "private",
      "birthday",
      "wedding",
      "corporate",
      "villa",
      "yacht",
      "rooftop",
      "hosting",
      "hosted"
    ])
  ) {
    return "Yes. Blissful Puffs delivers to events, villas, and doorstep bookings. For smooth planning, send the venue, date and time, and whether you need one setup or multiple setups.";
  }

  if (includesAny(normalized, ["payment", "pay", "deposit", "cash", "eft", "card", "refund", "cancel"])) {
    return "The site does not list payment or cancellation rules. Ask the Main Number for current payment details, deposit needs, and booking terms before confirming your session.";
  }

  if (
    includesAny(normalized, [
      "product",
      "products",
      "catalog",
      "catalogue",
      "collection",
      "pipe",
      "pipes",
      "hookah",
      "shisha",
      "crystal",
      "signature"
    ])
  ) {
    return `Blissful Puffs currently lists these premium hookah options:\n${productSummary()}\n\nThe R450 and R500 packages include charcoal, flavours, mouth pieces, and tongs.`;
  }

  if (includesAny(normalized, ["flavour", "flavor", "blend", "blends", "nicotine", "premium blend", "charcoal", "coal"])) {
    return "The package options include 8 charcoal and 4 flavours. Extras are R60 for 6 pieces of coal and R50 for 1 shisha flavour pack.";
  }

  if (includesAny(normalized, ["email", "gmail", "mail"])) {
    return `You can email Blissful Puffs at ${emailAddress}. The email button on this site opens a prefilled message so you can send your booking details quickly.`;
  }

  if (includesAny(normalized, ["whatsapp", "phone", "number", "call", "contact", "contact us", "support", "sales"])) {
    return `You can contact Blissful Puffs here:\n${contactSummary()}\n\nMain Number is best for orders and quotes. Alternative Number is the backup line for support, delivery timing, and setup coordination.`;
  }

  if (includesAny(normalized, ["instagram", "facebook", "social", "handle"])) {
    return `You can find Blissful Puffs on ${socialLinks
      .map((social) => `${social.label} as ${social.handle}`)
      .join(" and ")}.`;
  }

  if (includesAny(normalized, businessTerms)) {
    return "Blissful Puffs is a premium Hookah rental service in Cape Town. The team handles premium shisha / hookah delivery to your doorstep, villa, or event.";
  }

  return outOfScopeMessage;
}

export function BusinessAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const nextMessageId = useRef(2);
  const chatViewportRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isLongChat = messages.length >= longChatThreshold;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  function resetChat() {
    nextMessageId.current = 2;
    setInput("");
    setMessages(createInitialMessages());
  }

  function scrollChatToTop() {
    chatViewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function askAssistant(question: string) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextMessageId.current,
      role: "user",
      text: trimmedQuestion
    };
    nextMessageId.current += 1;

    const assistantMessage: ChatMessage = {
      id: nextMessageId.current,
      role: "assistant",
      text: getAssistantReply(trimmedQuestion)
    };
    nextMessageId.current += 1;

    setMessages((currentMessages) => [...currentMessages, userMessage, assistantMessage]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askAssistant(input);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] flex flex-col items-end sm:left-auto sm:right-5">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-label="Puff Concierge assistant"
            className="mb-3 flex max-h-[calc(100svh-7.5rem)] w-full flex-col overflow-hidden rounded-lg border border-gold/30 bg-ink shadow-[0_28px_70px_rgba(0,0,0,0.48)] sm:w-[420px]"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-4">
              <div className="flex min-w-0 items-start gap-3">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold shadow-[0_0_22px_rgba(212,175,55,0.18)]">
                  <Gem className="h-5 w-5" aria-hidden="true" />
                  <Sparkles className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-ink text-white" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{assistantName}</p>
                  <h2 className="mt-1 text-base font-semibold text-white">Your hookah rental guide</h2>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {isLongChat ? (
                  <button
                    type="button"
                    title="Start new chat"
                    aria-label="Start new chat"
                    onClick={resetChat}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-smoke transition hover:border-gold/60 hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : null}
                <button
                  type="button"
                  aria-label="Close Puff Concierge"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-smoke transition hover:border-gold/60 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div ref={chatViewportRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 luxury-scrollbar">
              {isLongChat ? (
                <div className="sticky top-0 z-10 mb-3 flex items-center justify-between gap-2 border-b border-white/10 bg-ink/95 pb-3 backdrop-blur">
                  <button
                    type="button"
                    onClick={scrollChatToTop}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0B223D] px-3 py-2 text-xs font-semibold text-white transition hover:border-gold/60"
                  >
                    <ArrowUp className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    Top of chat
                  </button>
                  <button
                    type="button"
                    onClick={resetChat}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0B223D] px-3 py-2 text-xs font-semibold text-white transition hover:border-gold/60"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    New chat
                  </button>
                </div>
              ) : null}

              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" ? (
                      <span className="mb-1 hidden h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/10 text-gold sm:inline-flex">
                        <Gem className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    ) : null}
                    <p
                      className={`max-w-[86%] whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-[#C5A059] text-white"
                          : "border border-white/10 bg-[#0B223D] text-smoke"
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => askAssistant(question)}
                    className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-left text-xs font-semibold text-white transition hover:border-gold/60 hover:bg-gold/10"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 border-t border-white/10 p-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about setup, price, guest count..."
                  aria-label="Ask Puff Concierge"
                  className="min-w-0 flex-1 rounded-md border border-white/10 bg-[#0B223D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-smoke/45 focus:border-gold/70 focus:ring-2 focus:ring-gold/30"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold/70 bg-[#C5A059] text-white transition hover:shadow-[0_0_22px_rgba(197,160,89,0.28)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {contactLines.map((line) => (
                  <Link
                    key={line.label}
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-0 items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0B223D] px-3 py-2.5 text-xs font-semibold text-white transition hover:border-gold/60"
                  >
                    <WhatsAppBrandIcon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="min-w-0 truncate">{line.label}</span>
                  </Link>
                ))}
                <Link
                  href={emailComposeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-[#0B223D] px-3 py-2.5 text-xs font-semibold text-white transition hover:border-gold/60"
                >
                  <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                  Email Blissful Puffs
                </Link>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isOpen ? "Close Puff Concierge" : "Open Puff Concierge"}
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-md border border-gold/70 bg-[#C5A059] text-white shadow-[0_20px_48px_rgba(0,0,0,0.45)] transition hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-ink"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <>
            <Gem className="h-6 w-6" aria-hidden="true" />
            <Sparkles className="absolute right-2 top-2 h-3.5 w-3.5 text-white" aria-hidden="true" />
          </>
        )}
        <span className="sr-only">{isOpen ? "Close assistant" : "Open assistant"}</span>
      </motion.button>

      {!isOpen ? (
        <div className="mt-2 hidden items-center gap-2 rounded-md border border-white/10 bg-ink/95 px-3 py-2 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          Ask Puff Concierge
        </div>
      ) : null}
    </div>
  );
}
