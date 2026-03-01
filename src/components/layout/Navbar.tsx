"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<div className="shrink-0">
						<Link href="/">
							<Image
								src="/logo.svg"
								alt="QuickHire"
								width={160}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>
					</div>

					{/* Navigation Links - Centered (Desktop Only) */}
					<div className="hidden pl-8 items-center md:flex flex-1 justify-start space-x-12">
						<Link
							href="/find-jobs"
							className="text-gray-500 hover:text-primary px-3 py-2 text-lg font-semibold transition-colors"
						>
							Find Jobs
						</Link>
						<Link
							href="/browse-companies"
							className="text-gray-500 hover:text-primary px-3 py-2 text-lg font-semibold transition-colors"
						>
							Browse Companies
						</Link>
					</div>

					{/* Auth Buttons (Desktop Only) */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/login"
							className="text-primary font-bold text-lg hover:opacity-80 transition-all"
						>
							Login
						</Link>
						<Link
							href="/signup"
							className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all text-lg"
						>
							Sign Up
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-500 hover:text-primary p-2 transition-colors"
						>
							{isOpen ? (
								<X className="w-8 h-8" />
							) : (
								<Menu className="w-8 h-8" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu (Overlay) */}
			{isOpen && (
				<div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden transition-all animate-in slide-in-from-top duration-300">
					<div className="px-4 pt-4 pb-8 space-y-4">
						<Link
							href="/find-jobs"
							onClick={() => setIsOpen(false)}
							className="block text-gray-500 hover:text-primary px-3 py-4 text-xl font-semibold border-b border-gray-50"
						>
							Find Jobs
						</Link>
						<Link
							href="/browse-companies"
							onClick={() => setIsOpen(false)}
							className="block text-gray-500 hover:text-primary px-3 py-4 text-xl font-semibold border-b border-gray-50"
						>
							Browse Companies
						</Link>
						<div className="pt-6 flex flex-col space-y-4">
							<Link
								href="/signup"
								onClick={() => setIsOpen(false)}
								className="w-full bg-primary text-white font-bold px-8 py-5 rounded-none text-center text-xl shadow-lg"
							>
								Sign Up For Free
							</Link>
							<Link
								href="/login"
								onClick={() => setIsOpen(false)}
								className="w-full text-primary font-bold px-8 py-4 text-center text-xl"
							>
								Login
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
