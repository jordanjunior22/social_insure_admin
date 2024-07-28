import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Insure",
  description: "Social Insure admin panel",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
