import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
	title: "QuickHire - Simple Job Board Application",
	description:
		"Great platform for the job seeker that searching for new career heights and passionate about startups.",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="antialiased font-sans bg-white min-h-screen flex flex-col">
				<Navbar />
				<main className="grow">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
