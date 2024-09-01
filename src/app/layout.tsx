import type { Metadata } from "next";
import "./globals.css";
import { poppin } from "./ui/fonts";
import AuthContext from "./AuthContext";
import ChangeColor from "./ui/ChangeColor";

export const metadata: Metadata = {
  title: {
    template: '%s | Street Ware',
    default: 'Street Ware',
  },
  description: 'Explore the intersection of fashion and function, where every piece is crafted to elevate your look with unmatched comfort. Find styles that resonate with your unique sense of fashion, blending contemporary trends with timeless appeal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${poppin.className} blue`}>
          <ChangeColor />
          {children}</body>
      </AuthContext>
    </html>
  );
}
