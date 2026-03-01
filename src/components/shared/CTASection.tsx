import Link from "next/link";
import Image from "next/image";

const CTASection = () => {
	return (
		<section className="py-32 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden">
					{/* Background Shape - SVG from user */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/shape-background.svg"
							alt=""
							fill
							className="object-cover lg:object-fill"
							priority
						/>
					</div>

					<div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 lg:px-20 py-24">
						<div className="text-white">
							<h2 className="text-[56px] font-black leading-[1.1] mb-8">
								Start posting <br /> jobs today
							</h2>
							<p className="text-white/80 text-xl font-medium mb-12">
								Start posting jobs for only $10.
							</p>
							<Link
								href="/admin"
								className="inline-block bg-white text-[#4640DE] font-black px-12 py-5 text-xl hover:shadow-2xl hover:scale-105 transition-all"
							>
								Sign Up For Free
							</Link>
						</div>

						<div className="relative hidden lg:block h-full">
							<div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[120%] h-[120%]">
								<Image
									src="/dashboard-view.svg"
									alt="Dashboard View"
									fill
									className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
