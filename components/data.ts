import type { LucideIcon } from "lucide-react";
import { Headphones, ShoppingBag } from "lucide-react";

export const emailAddress = "blissfulpuffs543@gmail.com";
export const emailSubject = "Blissful Puffs Booking Request";
export const emailBody =
  "Hi Blissful Puffs,\n\nI would like to enquire about a premium hookah rental booking.\n\nName:\nLocation:\nDate and time:\nPreferred setup:\n";
export const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
  emailBody
)}`;
export const emailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  emailAddress
)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

export const contactLines = [
  {
    label: "Main Number",
    display: "+27 61 589 0112",
    href: "https://wa.me/27615890112",
    copy: "Orders, quotes, product selection, and availability.",
    icon: ShoppingBag
  },
  {
    label: "Alternative Number",
    display: "+27 63 607 8192",
    href: "https://wa.me/27636078192",
    copy: "Alternative WhatsApp line, delivery timing, setup coordination, and event support.",
    icon: Headphones
  }
] satisfies Array<{
  label: string;
  display: string;
  href: string;
  copy: string;
  icon: LucideIcon;
}>;

export const navLinks = [
  { label: "Price List", href: "#catalog" },
  { label: "Contact Us", href: "#contact" }
] as const;

export const products = [
  {
    title: "Premium 1 Pipe Hookah Only",
    price: "R350",
    billing: "service per day",
    description:
      "Premium single-pipe hookah rental for a simple, polished setup. Delivery fee included.",
    image: "/assets/lv-gold.jpg",
    specs: ["1 premium hookah pipe", "Hookah only", "Delivery fee included"]
  },
  {
    title: "Premium 2 Pipe Hookah Only",
    price: "R400",
    billing: "service per day",
    description:
      "Two-pipe hookah rental for sharing at home, villas, or private events. Delivery fee included.",
    image: "/assets/double.jpeg",
    specs: ["2 premium hookah pipes", "Hookah only", "Delivery fee included"]
  },
  {
    title: "Premium 1 Pipe Hookah Package",
    price: "R450",
    billing: "service per day",
    description:
      "Single-pipe premium hookah package with charcoal, flavours, mouth pieces, and tongs included.",
    image: "/assets/h26-gold.jpeg",
    specs: ["1 premium hookah pipe", "8 charcoal", "4 flavours", "2 mouth pieces", "1 pair of tongs"]
  },
  {
    title: "Premium 2 Pipe Hookah Package",
    price: "R500",
    billing: "service per day",
    description:
      "Two-pipe premium hookah package with charcoal, flavours, mouth pieces, and tongs included.",
    image: "/assets/modern-trio.jpg",
    specs: ["2 premium hookah pipes", "8 charcoal", "4 flavours", "2 mouth pieces", "1 pair of tongs"]
  }
] as const;

export const extras = [
  { item: "Extra coal", detail: "6 pieces", price: "R60" },
  { item: "Extra shisha flavour", detail: "1 pack", price: "R50" },
  { item: "Extra mouth pieces", detail: "4 pieces", price: "R30" }
] as const;

export const damageCharges = [
  {
    items: "Info pack, springs, tongs, rubbers, coal burner lid, coal holder lid, ball bearings, stem diffuser, plug adapter",
    price: "R180 per item"
  },
  {
    items: "Pipes, bowl, coal holder, coal burner, head adapter, shaft adapter, tray",
    price: "R350 per item"
  },
  {
    items: "Main shaft, bottom stem, glass base, bag",
    price: "R700 per item"
  }
] as const;

export const deliveryReturns = [
  "Delivery times: 8am to 23:00pm",
  "Delivery costs: included in the price",
  "Pick up: following day by 11:30am"
] as const;

export const socialLinks = [
  {
    label: "Instagram",
    handle: "@blissful_puff",
    href: "https://www.instagram.com/blissful_puff/",
    icon: "instagram"
  },
  {
    label: "Facebook",
    handle: "Blissful Puffs",
    href: "https://www.facebook.com/BlissfulPuffs",
    icon: "facebook"
  }
] as const;
