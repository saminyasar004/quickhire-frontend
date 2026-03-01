import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-[#18191C] text-white pt-20 pb-10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					<div className="col-span-1 lg:col-span-1">
						<Link href="/" className="inline-block mb-6">
							<Image
								src="/logo-white.svg"
								alt="QuickHire"
								width={140}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>
						<p className="text-gray-400 leading-relaxed max-w-xs">
							Find your dream job among thousands of vacancies
							from leading companies around the world.
						</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-6">About</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/companies"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Companies
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									href="/advice"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Advice
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-6">
							Resources
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/help"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="/guides"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Guides
								</Link>
							</li>
							<li>
								<Link
									href="/updates"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Updates
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-6">
							Get job notifications
						</h4>
						<p className="text-gray-400 mb-6">
							The latest job vacancies, sent directly to your
							inbox weekly.
						</p>
						<div className="flex gap-2">
							<input
								type="email"
								placeholder="Email address"
								className="bg-white/10 border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-all">
								Subscribe
							</button>
						</div>
					</div>
				</div>

				<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-gray-500 text-sm">
						© 2024 QuickHire. All rights reserved.
					</p>
					<div className="flex space-x-6">
						{/* Social icons could go here */}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
