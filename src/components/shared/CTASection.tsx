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

					<div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center px-6 lg:px-20 py-16 lg:py-24 text-center lg:text-left">
						<div className="text-white w-full">
							<h2 className="text-4xl lg:text-[56px] font-black leading-[1.1] mb-6 lg:mb-8">
								Start posting <br className="hidden lg:block" />{" "}
								jobs today
							</h2>
							<p className="text-white/80 text-lg lg:text-xl font-medium mb-10 lg:mb-12">
								Start posting jobs for only $10.
							</p>
							<Link
								href="/admin"
								className="inline-block bg-white text-[#4640DE] font-black px-10 lg:px-12 py-4 lg:py-5 text-lg lg:text-xl hover:shadow-2xl hover:scale-105 transition-all"
							>
								Sign Up For Free
							</Link>
						</div>

						<div className="relative w-full aspect-video lg:aspect-auto lg:h-full mt-8 lg:mt-0">
							<div className="lg:absolute lg:top-1/2 lg:-right-10 lg:-translate-y-1/2 w-full lg:w-[120%] lg:h-[120%]">
								<Image
									src="/dashboard-view.svg"
									alt="Dashboard View"
									width={800}
									height={500}
									className="w-full h-auto object-contain"
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
