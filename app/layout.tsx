import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Configure Manrope for your display headings (replacing Syne)
const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-display",
    display: "swap",
});

// Configure DM Sans for regular body text
const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-body",
    display: "swap",
});

// Configure JetBrains Mono for code blocks or metrics counters
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "ClyHealth — Biological Age Dashboard",
    description: "AI-powered health analytics and biological age tracking",
    authors: [{ name: "ClyHealth" }],
};

export const viewport: Viewport = {
    themeColor: "#0d0f14",
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}