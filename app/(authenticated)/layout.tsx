// app/layout.tsx (or pages/_app.tsx if using older structure)

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Heavens Travel",
  description:
    "Heavens Travel is a website designed for travelers looking for the ultimate experience. You will find a wide selection of popular hotels spread across the globe, from five-star luxury hotels to budget-friendly lodgings. Each hotel includes reviews, photos, and comprehensive information to help you find the perfect place to stay. " +
    "In addition, Heavens Travel offers comprehensive guides to amazing destinations, from tropical paradises to fascinating historic cities. We provide in-depth information on tourist attractions, culture, and travel tips, making it easy to plan your vacation. " +
    "Don't forget to check out our exclusive travel blog, which offers inspiration and guidance from experts as well as personal experiences from other travelers. With interesting articles and practical tips, Heavens Travel is your go-to source for an unforgettable vacation. " +
    "Enjoy the convenience of planning your ultimate trip with Heavens Travel—the perfect portal to find the best hotels, dream destinations, and inspiring travel stories!",
  icons: {
    icon: "/image/icon/logo-circle.png",
  },
  openGraph: {
    title: "Heavens Travel",
    description:
      "Explore top destinations and find your perfect stay with Heavens Travel. From luxury hotels to hidden gems, we've got it all.",
    url: "https://www.htrip.com",
    siteName: "Heavens Travel",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Heavens Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavens Travel",
    description:
      "Discover your dream vacation with Heavens Travel. Browse hotels, explore destinations, and get inspired by our travel blog.",
    images: ["/images/twitter-card.png"],
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
  },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth" style={{ colorScheme: "light" }}>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
