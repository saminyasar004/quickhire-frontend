import Link from "next/link";
import Image from "next/image";

const CTASection = () => {
	return (
		<section className="py-24 container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="bg-primary rounded-3xl overflow-hidden relative min-h-[400px] flex items-center">
				{/* Background blobs */}
				<div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
					<Image
						src="/hero-pattern.png"
						alt=""
						fill
						className="object-cover"
					/>
				</div>

				<div className="relative z-10 px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
					<div>
						<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
							Start posting <br /> jobs today
						</h2>
						<p className="text-primary-foreground/80 text-lg mb-10 max-w-md">
							Start posting jobs for only $10. Reach thousands of
							job seekers today.
						</p>
						<Link
							href="/admin"
							className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-xl hover:shadow-2xl transition-all"
						>
							Sign Up For Free
						</Link>
					</div>

					<div className="hidden lg:block relative h-[350px]">
						<div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[120%] bg-white/10 rounded-3xl backdrop-blur-3xl p-4 rotate-3">
							<Image
								src="/dashboard-view.svg"
								alt="Dashboard View"
								fill
								className="object-cover rounded-2xl shadow-2xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
