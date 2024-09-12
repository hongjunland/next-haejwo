import type { Metadata } from "next";
import "./globals.css";
// import Footer from "./footer";
import Header from "./header";

export const metadata: Metadata = {
  title: "해줘",
  description: "귀찮은거 다 해주는 도구 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header/>
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
