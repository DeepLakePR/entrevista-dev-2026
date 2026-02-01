import Footer from "../components/shared/Footer"
import Header from "../components/shared/Header"
import { Poppins } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Uncode Commerce",
    description: "Teste técnico Uncode Desenvolvedor Front-End Júnior 2026",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={poppins.variable}>
            <body>
                <Header />

                {children}

                <Footer />
            </body>
        </html>
    )
}
