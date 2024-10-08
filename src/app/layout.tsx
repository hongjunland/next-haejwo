import type { Metadata } from "next";
import "./globals.css";
// import Footer from "./footer";
import Header from "./header";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

export const metadata: Metadata = {
  title: "해줘",
  description: "귀찮은것들을 '딸깍!' 해주는 도구 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {<GoogleAnalytics gaId={"G-HFVBYYHTZB"} />}
        <Header/>
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
