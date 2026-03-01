import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
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

					{/* Navigation Links - Centered */}
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

					{/* Auth Buttons */}
					<div className="flex items-center space-x-8">
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
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
