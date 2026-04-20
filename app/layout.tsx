import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Hero",
  description: "Web-App zum einfachen Erstellen und Lösen von Quizzen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className="h-full antialiased"
    >
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-lime-100 dark:bg-gray-800 p-4">
          <h1 className="text-center">Header</h1>
        </header>
        {children}
        <footer className="bg-lime-100 dark:bg-gray-800 p-4">
          <h1 className="text-center">Footer</h1>
        </footer>
      </body>
    </html>
  );
}
