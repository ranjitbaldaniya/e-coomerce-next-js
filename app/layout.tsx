import AuthProvider from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Nextjs",
  description: "E-commerce with Next Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className={mulish.className}
      >
        <AuthProvider>
          {/* <Provider store={store}> */}
            <Navbar />
            {children}
            <Footer />
          {/* </Provider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
