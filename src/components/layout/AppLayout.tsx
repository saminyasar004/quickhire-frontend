"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAdminPath = pathname?.startsWith("/admin");
	const isAuthPath = pathname?.startsWith("/auth");

	const hideLayout = isAdminPath || isAuthPath;

	return (
		<>
			{!hideLayout && <Navbar />}
			<main className={`grow ${!hideLayout ? "pt-20" : ""}`}>
				{children}
			</main>
			{!hideLayout && <Footer />}
		</>
	);
}
