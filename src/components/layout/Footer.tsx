import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-[#18191C] text-white pt-20 pb-10 lg:pt-24 lg:pb-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1.5fr] gap-12 lg:gap-16 mb-16 lg:mb-20">
					{/* Logo & Description */}
					<div className="col-span-1">
						<Link href="/" className="flex items-center gap-2 mb-8">
							<Image
								src="/logo-white.svg"
								alt="QuickHire"
								width={100}
								height={100}
								className="w-40 h-40 object-contain"
							/>
						</Link>
						<p className="text-gray-400 leading-relaxed max-w-sm text-base">
							Great platform for the job seeker that passionate
							about startups. Find your dream job easier.
						</p>
					</div>

					{/* About Link Column */}
					<div className="col-span-1">
						<h4 className="text-lg font-bold mb-8 text-white">
							About
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Companies
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Advice
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources Link Column */}
					<div className="col-span-1">
						<h4 className="text-lg font-bold mb-8 text-white">
							Resources
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Help Docs
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Guide
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Updates
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-400 hover:text-white transition-colors text-base"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter Section */}
					<div className="col-span-1">
						<h4 className="text-lg font-bold mb-6 text-white text-left">
							Get job notifications
						</h4>
						<p className="text-gray-400 mb-8 text-base text-left">
							The latest job news, articles, sent to your inbox
							weekly.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<input
								type="email"
								placeholder="Email Address"
								className="bg-white px-4 py-4 w-full text-gray-900 focus:outline-none placeholder:text-gray-400 rounded-none"
							/>
							<button className="bg-[#4640DE] hover:bg-[#3b36c0] text-white px-8 py-4 font-bold transition-all whitespace-nowrap rounded-none">
								Subscribe
							</button>
						</div>
					</div>
				</div>

				{/* Divider and Bottom Bar */}
				<div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
					<p className="text-gray-500 text-sm font-medium order-2 md:order-1 text-center md:text-left">
						2021 @ QuickHire. All rights reserved.
					</p>
					<div className="flex items-center gap-4 order-1 md:order-2">
						{/* Facebook Icon Box */}
						<Link
							href="#"
							className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</Link>
						{/* Instagram Icon Box */}
						<Link
							href="#"
							className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</Link>
						{/* Dribbble Icon Box */}
						<Link
							href="#"
							className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm6.14 4.32c.29.39.53.82.72 1.28c-1.47.41-3.15.58-4.8.46c-.23-.62-.48-1.25-.76-1.85c1.88-.23 3.65-.03 4.84.11zM12 4c.4 0 .79.04 1.17.11c-.11.23-.23.47-.35.71c-1.39.26-2.58.55-3.55.85c.38.74.8 1.54 1.26 2.37c-.77.21-1.6.38-2.48.51c-.13-.37-.28-.73-.42-1.09c-.61.16-1.15.29-1.63.4c.16-.92.51-1.78 1-2.54c1.19-.6 2.62-.97 4-.97c.33 0 .66.02 1 .07c.01-.14.01-.28.01-.42zm-5.73 4.19c.4-.09.85-.19 1.34-.31c.14.37.28.74.43 1.11c-1.4.24-2.5.42-3.32.55c.35-.49.77-.94 1.24-1.35h.31zM4 12c0-.42.04-.84.11-1.25c.89-.14 2.1-.34 3.63-.61c.17.47.36.95.55 1.43c-1.33.51-2.42 1.1-3.23 1.76c-.66-.82-1.06-1.83-1.06-2.93v-.4zm1.14 4.31c.7-.6 1.63-1.12 2.76-1.56c.19.51.38 1.05.58 1.62c-1.26.54-2.22 1.14-2.84 1.76c-.19-.58-.36-1.19-.5-1.82zM12 20a7.95 7.95 0 0 1-5.11-1.87c.61-.55 1.51-1.11 2.68-1.6c.11.33.22.66.33 1c.21.61.43 1.25.66 1.88c-.89.37-1.84.59-2.84.66c1.37.59 2.9 1 4.28 1zm3.17-.89c-.23-.62-.44-1.24-.65-1.85c.16-.01.32-.01.48-.01c1.33 0 2.58.11 3.61.32c-.52.61-1.15 1.13-1.87 1.52c-.51-.12-1.05-.22-1.57-.31zM20 12c0 1.11-.23 2.16-.64 3.12c-1.09-.23-2.43-.36-3.86-.36c-.14 0-.28 0-.42.01c.18-.54.36-1.09.52-1.65c1.47-.11 3-.38 4.4-.77c.23-.39.42-.79.56-1.22c.15-.36.26-.74.34-1.13c-.3 0-.54.01-.8.01c-.01-.01-.32 0-.62 0h1.92z" />
							</svg>
						</Link>
						{/* LinkedIn Icon Box */}
						<Link
							href="#"
							className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
							</svg>
						</Link>
						{/* Twitter Icon Box */}
						<Link
							href="#"
							className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
