import Image from "next/image";
import SearchBar from "../shared/SearchBar";

interface HeroProps {
	onSearch: (query: string, location: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
	return (
		<section className="relative pt-40 pb-20 overflow-hidden bg-white">
			{/* Hero Pattern Background */}
			<div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-0">
				<Image
					src="/hero-pattern.png"
					alt=""
					fill
					className="object-cover object-top-right opacity-100"
					priority
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="flex flex-col lg:flex-row items-center relative">
					<div className="flex-1 pt-10 lg:pt-0 text-center lg:text-left relative">
						<h1 className="text-4xl sm:text-5xl lg:text-[80px] font-black leading-[1.1] text-[#18191C] mb-8 lg:mb-14 tracking-tight">
							Discover <br className="hidden sm:block" />
							more than <br />
							<span className="text-[#007BFF] relative inline-block mt-2 lg:mt-0">
								5000+ Jobs
								<div className="absolute -bottom-2 lg:-bottom-5 left-0 w-full h-2 lg:h-4">
									<Image
										src="/hero-heading-underline.png"
										alt=""
										fill
										className="object-cover"
									/>
								</div>
							</span>
						</h1>

						<p className="text-lg lg:text-xl text-gray-500 mb-10 lg:mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
							Great platform for the job seeker that searching for
							new career heights and passionate about startups.
						</p>

						<div className="relative z-20 mb-8 lg:mb-0 lg:min-h-[100px]">
							<SearchBar onSearch={onSearch} />
						</div>

						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm lg:text-base">
							<span className="text-[#202430] font-medium opacity-70">
								Popular :
							</span>
							<div className="flex flex-wrap justify-center lg:justify-start gap-x-2 gap-y-1 font-semibold text-[#202430]">
								<span className="cursor-pointer hover:text-primary transition-colors">
									UI Designer,
								</span>
								<span className="cursor-pointer hover:text-primary transition-colors">
									UX Researcher,
								</span>
								<span className="cursor-pointer hover:text-primary transition-colors">
									Android,
								</span>
								<span className="cursor-pointer hover:text-primary transition-colors">
									Admin
								</span>
							</div>
						</div>
					</div>

					<div className="flex-1 relative mt-12 lg:mt-0">
						<div className="relative w-full aspect-4/5 max-w-2xl mx-auto">
							<Image
								src="/hero-man-image.png"
								alt="Job Seeker"
								fill
								className="object-contain object-bottom z-10"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
