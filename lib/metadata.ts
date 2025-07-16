import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.craftfolio.space"),
  title: "Craftfolio - Build portfolios in minutes.",
  description: "The easiest way to create professional developer portfolios. Build, customize, and share your portfolio in minutes.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  verification: {
    google: "9b2iZT8DLzwmyJ4ja4Lm7HC_8VSr1Pxiqs7PpqicX5U",
  },
  openGraph: {
    title: "Craftfolio - Build portfolios in minutes.",
    description: "The easiest way to create professional developer portfolios. Build, customize, and share your portfolio in minutes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sumeet Haldar Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craftfolio - Build portfolios in minutes.",
    description: "The easiest way to create professional developer portfolios. Build, customize, and share your portfolio in minutes.",
    images: ["/og-image.png"],
  },
};