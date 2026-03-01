import type { Metadata } from "next";
import AppLayout from "@/components/layout/AppLayout";
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
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
