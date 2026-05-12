import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Blissful Puffs | Premium Hookah Rental Services Cape Town",
  description:
    "Cape Town premium Hookah rental services with delivery included in the listed price.",
  openGraph: {
    title: "Blissful Puffs | Premium Hookah Rental Services",
    description:
      "Premium shisha and hookah rentals delivered to your doorstep, villa, or event in Cape Town.",
    images: ["/assets/modern-trio.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="luxury-scrollbar">{children}</body>
    </html>
  );
}
