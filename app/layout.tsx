import "./globals.css";
import React from "react";
import { ReactNode } from "react";
import Header from "@/components/layout/Header/Header";
import { ModalContextProvider } from "@/contexts/ModalContext";
import { UserContextProvider } from "@/contexts/UserContext";
import Modal from "@/components/common/Modal";
import Footer from "@/components/layout/Footer/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Startup Toolkit",
  description:
    "A community-driven resource hub where entrepreneurs and founders share valuable insights, tools, and tips for building and growing startups. Find curated resources on funding, marketing, product development, and more.",
};

type RootProps = {
  children: ReactNode;
};

const Root = async ({ children }: RootProps) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserContextProvider>
            <ModalContextProvider>
              <main className="app-wrapper relative flex min-h-screen w-full flex-col items-center">
                <Header />
                {children}
                <Footer />
                <Modal />
              </main>
            </ModalContextProvider>
          </UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Root;
