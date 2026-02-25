import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Genric/Header/Header";
import Footer from "@/components/Genric/Footer/Footer";

export const metadata = {
  title: "Medibank",
  description: "Centralised EHR ",
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'], // Include desired weights
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={outfit.className}>
        <Header/>
          {children}
        <Footer/>
        </body>
    </html>
  );
}
