import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const coiny = localFont({
  src: "./fonts/Coiny-Regular.ttf",
  weight: "400",
  variable: "--font-coiny",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thông điệp từ vũ trụ",
  description: "Một thông điệp đang chờ được khám phá giữa các vì sao.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${orbitron.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable} ${coiny.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
